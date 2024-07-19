"use server"

import Tag, { ITag } from "@/database/tag.model";
// import User from "@/database/user.model";
import { connectToDatabse } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags (params:GetTopInteractedTagsParams) {
    try {
        connectToDatabse();

        // const { userId, limit=3 } = params;

        // const user = await User.findById(userId)

        // if(!user) throw new Error("User not found")

        // Create Interaction model
        const tags = [
            { 
                _id: 1,
                name: 'HTML',
            },
            {
                _id: 2,
                name: 'CSS',
            },
            {
                _id: 3,
                name: 'JAVA'
            }
        ]
        return tags

    } catch (error) {
        
    }
}

export async function getTags(params: GetAllTagsParams) {
    try {
        connectToDatabse()

        // const { page=1, pageSize=20, filter, searchQuery } = params;
        const { searchQuery, filter } = params

        const query: FilterQuery<typeof Tag> = {}

        let sortOptions = {}

        if(filter) {
            switch (filter) {
                case "popular":
                    sortOptions = { questions: -1 };
                    break;
                case "recent":
                    sortOptions = { createdAt: -1 };
                    break;
                case "name":
                    sortOptions = { name: 1 };
                    break;
                case "old": 
                    sortOptions = { createdAt: 1 };
                    break;
            }
        }

        if(searchQuery) {
            query.$or = [
                { name : { $regex: new RegExp(searchQuery, 'i') } }
            ]
        }

        const tags = await Tag.find(query)
            .sort(sortOptions)

        return {tags}

    } catch (error) {
        console.log(error)
    }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
    try {
      connectToDatabse()
      
      const { tagId, searchQuery } = params;
  
      const tagFilter: FilterQuery<ITag> = {_id: tagId}

      const tag = await Tag.findOne(tagFilter).populate({
        path: 'questions',
        model: Question,
        match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' }}
        : {},
        options: {
            sort: { createdAt: -1 }
        },
        populate: [
            { path: 'tags', model: Tag, select: '_id name'},
            { path: 'author', model: User, select: '_id clerkId name picture'}
        ]
      })

      if(!tag) throw new Error('Tag not found')

      const questions = tag.questions
      console.log(tag.name)

      return {tagTitle: tag.name, questions}
      
    } catch (error) {
      console.log(error)
      throw error
    }
}

export async function getTopPopularTags() {
    try {
        connectToDatabse()

        const popularTags = await Tag.aggregate([
            { $project: { name: 1, numberOfQuestions: { $size: "$questions" }}},
            { $sort: { numberOfQuestions: -1 }}, 
            { $limit: 5 }
          ])
      
        return popularTags;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}