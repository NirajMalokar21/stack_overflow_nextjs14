"use server"

import Question from "@/database/question.model";
import { connectToDatabse } from "../mongoose"
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";

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
    }
    catch (error) {

    }
}