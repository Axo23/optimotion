import { Response } from 'express';
import { MessageModel } from '../../models/MessageSchema';
import { TrainerInteractionModel } from '../../models/TrainerInteractionSchema';
import { UserModel } from '../../models/UserSchema';
import { getOpenAIResponse } from '../../services/getOpenAIResponse';
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
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const userData: UserDataSubset = {
      height: user.height ?? null,
      weight: user.weight ?? null,
      fitnessLevel: user.fitnessLevel ?? null,
      goals: user.goals ?? null,
      //userNotes: user.userNotes ?? null,
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
    const coachResponse = await getOpenAIResponse(chatGptMessages, userData);
    console.log("Raw Coach Response:", coachResponse);

    // Extract JSON data
    const updatedUserData = extractJsonFromResponse(coachResponse);

    if (updatedUserData) {
      await saveUserData(userId, updatedUserData);
    }

    // Remove JSON before sending to the frontend
    const userFriendlyResponse = coachResponse.replace(/```json\s*|```|{.*}/gs, '').trim();

    let workoutPlan = null;
    if(!Object.values(userData).some((value) => !value)) {
      console.log("All user data available. Generating workout plan...");
      workoutPlan = await createWorkoutPlan(userId);
    } else {
      console.log("User data is still incomplete.");
    }

    console.log("This workoutplan is in sendMessage:",workoutPlan);

    // Save the coach's response in the database
    const coachMessage = new MessageModel({
      trainerInteractionID: trainerInteraction._id,
      content: userFriendlyResponse, // Store the sanitized response
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
