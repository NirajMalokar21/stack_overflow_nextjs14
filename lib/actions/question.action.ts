"use server"

import Question from "@/database/question.model";
import { connectToDatabse } from "../mongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsByTagIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions (params: GetQuestionsParams) {
    try {
        connectToDatabse();

        const questions = await Question.find({})
            .populate({ path: 'tags', model: Tag})
            .populate({ path: 'author', model: User})

        return {questions}
    } catch(error){
        console.log(error)
    }
}

export async function createQuestion (params: CreateQuestionParams) {
    try {
        connectToDatabse()


        const { title, content, tags, author, path } = params;

        const question = await Question.create({
            title,
            content,
            author,
        })

        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {name: {$regex: new RegExp(`^${tag}$`, "i")}},
                {$setOnInsert: {name: tag}, $push: {questions: question._id}},
                { upsert: true, new: true}
            )

            tagDocuments.push(existingTag._id)
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: {tags: {$each: tagDocuments}}
        })
        
        revalidatePath(path)
    }
    catch (error) {

    }
}

export async function getQuestionById (params: GetQuestionByIdParams) {
    try {
        connectToDatabse()
        const {questionId} = params

        const question = Question.findById(questionId)
            .populate({ path: 'tags', model: Tag, select: '_id name'})
            .populate({ path: 'author', model: User, select: '_id clerkId name picture'})

        return question;

    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function upvoteQuestion(params: QuestionVoteParams) {
    try {
      connectToDatabse();
  
      const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  
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
  
      const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
  
      if(!question) {
        throw new Error("Question not found");
      }
  
      // Increment author's reputation
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function downvoteQuestion(params: QuestionVoteParams) {
    try {
      connectToDatabse();
  
      const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  
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
  
      const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
  
      if(!question) {
        throw new Error("Question not found");
      }
  
      // Increment author's reputation
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }