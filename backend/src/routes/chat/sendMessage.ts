import { Response } from 'express';
import { MessageModel } from '../../models/MessageSchema';
import { TrainerInteractionModel } from '../../models/TrainerInteractionSchema';
import { UserModel } from '../../models/UserSchema';
import { callCoachAgent } from '../../services/callCoachAgent';
import { IGetUserAuthInfoRequest } from '../../types/requests';
import { ChatGptMessage } from '../../types/chatGPTMessage';
import { MessageRequestBody } from '../../types/messageRequestBody';
import { UserDataSubset } from '../../types/userData';
import { extractJsonFromResponse } from '../../utils/extractJsonFromResponse';
import { saveUserData } from "../../services/saveUserData";
import { createWorkoutPlan } from '../../services/createWorkoutPlan';

export const sendMessage = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  const { content, sender, trainerInteractionID }: MessageRequestBody = req.body;

  if (!content || !sender) {
    res.status(400).json({ message: 'Content and sender are required.' });
    return;
  }

  const userId = (req.user as { id: string })?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user ID provided.' });
    return;
  }

  try {
    let user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const userData: UserDataSubset = {
      height: user.height ?? null,
      weight: user.weight ?? null,
      fitnessLevel: user.fitnessLevel ?? null,
      goals: user.goals ?? null,
      userNotes: user.userNotes ?? null,
    };

    let trainerInteraction;

    if (!trainerInteractionID) {
      trainerInteraction = new TrainerInteractionModel({
        userID: userId,
        messages: [],
        timeStamp: new Date(),
      });
      await trainerInteraction.save();
    } else {
      trainerInteraction = await TrainerInteractionModel.findById(trainerInteractionID);
      if (!trainerInteraction) {
        res.status(404).json({ message: 'TrainerInteraction not found.' });
        return;
      }
    }

    const userMessage = new MessageModel({
      trainerInteractionID: trainerInteraction._id,
      content,
      sender,
      timeStamp: new Date(),
    });

    const savedUserMessage = await userMessage.save();
    trainerInteraction.messages.push(savedUserMessage._id);
    await trainerInteraction.save();

    const messages = await MessageModel.find({ trainerInteractionID }).sort({ timeStamp: 1 });

    const chatGptMessages: ChatGptMessage[] = messages.map((msg) => ({
      role: msg.sender === 'coach' ? 'assistant' : 'user',
      content: msg.content,
      name: msg.sender === 'coach' ? 'assistant' : 'user',
    }));

    // Get the assistant's response
    const coachResponse = await callCoachAgent(chatGptMessages, userData);
    console.log("Raw Coach Response:", coachResponse);

    // Check for the "TRIGGER_WORKOUT_PLAN" term
    const triggerWorkout = coachResponse.includes("TRIGGER_WORKOUT_PLAN");

    // Extract JSON data
    const updatedUserData = extractJsonFromResponse(coachResponse);

    if (updatedUserData) {
      await saveUserData(userId, updatedUserData);
      user = await UserModel.findById(userId);
    }

    // Ensure the updated user data is used
    const updatedUserDataForCheck: UserDataSubset = {
      height: user?.height ?? null,
      weight: user?.weight ?? null,
      fitnessLevel: user?.fitnessLevel ?? null,
      goals: user?.goals ?? null,
      userNotes: user?.userNotes ?? null,
    };
    // Remove JSON before sending to the frontend
    const userFriendlyResponse = coachResponse
    .replace(/```json\s*|```|{.*}/gs, '')
    .replace("TRIGGER_WORKOUT_PLAN", "")
    .trim();

    let workoutPlan = null;
    if (triggerWorkout &&
      !Object.values(updatedUserDataForCheck).some((value) => !value) &&
      Array.isArray(updatedUserDataForCheck.goals) && updatedUserDataForCheck.goals.length > 0 &&
      Array.isArray(updatedUserDataForCheck.userNotes) && updatedUserDataForCheck.userNotes.length > 0
    ) {
      workoutPlan = await createWorkoutPlan(userId);
    } else {
      console.log("User data is incomplete or invalid for generating a workout plan.");
    }

    // Save the coach's response in the database
    const coachMessage = new MessageModel({
      trainerInteractionID: trainerInteraction._id,
      content: userFriendlyResponse,
      sender: 'coach',
      timeStamp: new Date(),
    });

    const savedCoachMessage = await coachMessage.save();
    trainerInteraction.messages.push(savedCoachMessage._id);
    await trainerInteraction.save();

    res.status(201).json({
      trainerInteractionID: trainerInteraction._id,
      userMessage: savedUserMessage,
      coachMessage: savedCoachMessage,
    });
  } catch (error) {
    console.error('Error handling messages:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
