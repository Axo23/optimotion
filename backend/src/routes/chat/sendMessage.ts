import { Response } from 'express';
import { MessageModel } from '../../models/MessageSchema';
import { TrainerInteractionModel } from '../../models/TrainerInteractionSchema';
import { getOpenAIResponse } from '../../utils/getOpenAIResponse';
import { IGetUserAuthInfoRequest } from '../../types/requests';

export const sendMessage = async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
  const { content, sender, trainerInteractionID } = req.body;

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
    let trainerInteraction;

    // If no interaction ID is provided, create a new TrainerInteraction
    if (!trainerInteractionID) {
      trainerInteraction = new TrainerInteractionModel({
        userID: userId,
        messages: [],
        timeStamp: new Date(),
      });
      await trainerInteraction.save();
    } else {
      // Retrieve the existing TrainerInteraction
      trainerInteraction = await TrainerInteractionModel.findById(trainerInteractionID);
      if (!trainerInteraction) {
        res.status(404).json({ message: 'TrainerInteraction not found.' });
        return;
      }
    }

    // Save the user's message
    const userMessage = new MessageModel({
      trainerInteractionID: trainerInteraction._id,
      content,
      sender,
      timeStamp: new Date(),
    });

    const savedUserMessage = await userMessage.save();

    // Add the user's message ID to the TrainerInteraction
    trainerInteraction.messages.push(savedUserMessage._id);
    await trainerInteraction.save();

    // Fetch the coach's response using OpenAI
    const coachResponse = await getOpenAIResponse(content);

    // Save the coach's message
    const coachMessage = new MessageModel({
      trainerInteractionID: trainerInteraction._id,
      content: coachResponse,
      sender: 'coach',
      timeStamp: new Date(),
    });

    const savedCoachMessage = await coachMessage.save();

    // Add the coach's message ID to the TrainerInteraction
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
