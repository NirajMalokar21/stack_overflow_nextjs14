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

        const questionObject = await Question.findByIdAndUpdate(question, {
            $push: {answers: answer._id}
        })

        await Interaction.create({
          user: author,
          action: "answer",
          question,
          answer: answer._id,
          tags: questionObject.tags
        })
    

        await User.findByIdAndUpdate(author, {
          $inc: { reputation: 10 }
        })
        
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
        const { questionId, sortBy } = params;

        let sortOptions = {}

        if(sortBy) {
          switch(sortBy) {
            case "lowestUpvotes":
              sortOptions = { upvotes: 1 };
              break;

            case "highestUpvotes":
              sortOptions = { upvotes: -1 };
              break;

            case "recent":
              sortOptions = { createdAt: -1 };
              break;

            case "old":
              sortOptions = { createdAt: 1 };
              break;
          }
        }

        const answers = await Answer.find({ question: questionId })
            .populate({ path: 'author', model: User })
            .populate({ path: 'question', model: Question })
            .sort(sortOptions);

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
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: hasupVoted ? -2 : 2}
        })

        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: hasupVoted ? -10 : 10}
        })
    
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
        await User.findByIdAndUpdate(userId, {
          $inc: { reputation: hasdownVoted ? -2 : 2}
        })

        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: hasdownVoted ? -10 : 10}
        })
    
        revalidatePath(path);
      } catch (error) {
        console.log(error);
        throw error;
      }
}