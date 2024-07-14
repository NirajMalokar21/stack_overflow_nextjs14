"use server"
import { revalidatePath } from "next/cache";
import { connectToDatabse } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import Interaction from "@/database/interaction.model";

export async function createAnswer (params: CreateAnswerParams) {
    try {
        connectToDatabse()

        const {content, question, author, path } = params;

        const answer = new Answer({content, author, question})

        await Question.findByIdAndUpdate(question, {
            $push: {answers: answer._id}
        })
        // TODO: add interaction
        await answer.save()
        revalidatePath(path)
    }
    catch (error) {

    }
}

export async function deleteAnswer (params: DeleteAnswerParams) {
  try {
    connectToDatabse()

    const { answerId, path } = params;

    const answer = await Answer.findById({ _id: answerId })

    if(!answer) throw Error("Answer not found!")

    await answer.deleteOne({ _id: answerId });
    await Interaction.deleteMany({ answer: answerId });
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId }});

    revalidatePath(path)
    
  } catch (error) {
    console.log(error)
  }
}

export async function getAllAnswers (params: GetAnswersParams) {
    try {
        connectToDatabse()
        const { questionId } = params;

        const answers = await Answer.find({ question: questionId })
            .populate({ path: 'author', model: User })
            .populate({ path: 'question', model: Question })
            .sort({ createdAt: -1 });

        return { answers }

    } catch (error) {
        console.log(error)
        return {answers: [] };
    }
}

export async function upvoteAnswer (params: AnswerVoteParams) {
    try {
        connectToDatabse();
    
        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    
        let updateQuery = {};
    
        if(hasupVoted) {
          updateQuery = { $pull: { upvotes: userId }}
        } else if (hasdownVoted) {
          updateQuery = { 
            $pull: { downvotes: userId },
            $push: { upvotes: userId }
          }
        } else {
          updateQuery = { $addToSet: { upvotes: userId }}
        }
    
        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
    
        if(!answer) {
          throw new Error("Answer not found");
        }
    
        // Increment author's reputation
    
        revalidatePath(path);
      } catch (error) {
        console.log(error);
        throw error;
      }
}

export async function downvoteAnswer (params: AnswerVoteParams) {
    try {
        connectToDatabse();
    
        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    
        let updateQuery = {};
    
        if(hasdownVoted) {
          updateQuery = { $pull: { downvote: userId }}
        } else if (hasupVoted) {
          updateQuery = { 
            $pull: { upvotes: userId },
            $push: { downvotes: userId }
          }
        } else {
          updateQuery = { $addToSet: { downvotes: userId }}
        }
    
        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });
    
        if(!answer) {
          throw new Error("Answer not found");
        }
    
        // Increment author's reputation
    
        revalidatePath(path);
      } catch (error) {
        console.log(error);
        throw error;
      }
}