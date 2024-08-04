"use server"

import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabse } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, GetSavedQuestionsParams, GetUserByIdParams , GetUserStatsParams, ToggleSaveQuestionParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserById(params: any) {
    try {
        connectToDatabse()

        const { userId } = params;
        const user = await User.findOne({ clerkId: userId })
        return user;

    } catch(error) {
        console.log(error)
    }
}

export async function getUsers(params: GetAllUsersParams) {
    try {
        connectToDatabse()

        // const { page=1, pageSize=20, filter, searchQuery } = params
        const { searchQuery, filter, page=1, pageSize=20 } = params;

        const query: FilterQuery<typeof User> = {}

        let sortOptions = {}

        if(filter) {
            switch (filter) {
                case "new_users":
                    sortOptions = { joinDate: -1 };
                    break;
                case "old_users":
                    sortOptions = { joinDate: 1 };
                    break;
                case "top_contributors":
                    sortOptions = { joinDate: -1}
            }

        }

        if(searchQuery) {
            query.$or = [
                { name: { $regex: new RegExp(searchQuery, 'i') } },
                { username: { $regex: new RegExp(searchQuery, 'i') } },
            ]
        }

        const users = await User.find(query)
            .sort(sortOptions)
            .skip( page > 0 ? ((page - 1) * pageSize) : 0)
            .limit( pageSize )

        const totalUsers = await User.countDocuments(query)
          
        const isNext = totalUsers > ((page - 1) * pageSize) + users.length ;

        console.log(users)
        return {users, isNext}

    } catch (error) {
        console.log(error)
    }
}

export async function createUser(userData: CreateUserParams){
    try {
        connectToDatabse()
        console.log('Creating User')
        const newUser = await User.create(userData)
        console.log('Created User')
        return newUser;

    } catch(error) {
        console.log(error)
    }
}

export async function updateUser(params: UpdateUserParams){
    try {
        connectToDatabse()

        const { clerkId, updateData, path } = params;

        await User.findOneAndUpdate({ clerkId }, updateData, {
            new: true,
        })

        revalidatePath(path);

    } catch(error) {
        console.log(error)
    }
}

export async function deleteUser (params: DeleteUserParams){
    try {
        connectToDatabse()

        const { clerkId } = params;

        const user = await User.findOneAndDelete({ clerkId });

        if(!user){
            throw new Error('User not found');
        }

        // Delete user from database
        // and question, answers, comments, etc
        // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id')

        await Question.deleteMany({ author: user._id})

        // TODO: delete user answers, comments, etc.

        const deletedUser = await User.findByIdAndDelete({ clerkId })

        return deletedUser

    } catch(error) {
        console.log(error);
        throw error;
    }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
    try {
        connectToDatabse()

        const { userId, questionId, path } = params
        console.log("user id: " + userId)

        const user = await User.findById(userId);

        if(!user) {
            throw new Error('User not found')
        }

        const isQuestionSaved = user.saved.includes(questionId)

        if(isQuestionSaved) {
            await User.findByIdAndUpdate(userId, 
                {
                    $pull : { saved: questionId }
                },
                { new: true}
            )
        } else {
            await User.findByIdAndUpdate(userId, 
                {
                    $addToSet: { saved: questionId }
                },
                { new: true}
            )
        }

        revalidatePath(path)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
    try {
        connectToDatabse()
        const { clerkId, searchQuery, filter , page=1, pageSize=10} = params;
        const query: FilterQuery<typeof Question> = searchQuery
        ? { title: {$regex: new RegExp(searchQuery, 'i')}}
        : { };

        let sortOptions = {}

        if(filter) {
            switch (filter) {
                case "most_recent":
                    sortOptions = { createdAt: -1 };
                    break;
                
                case "oldest":
                    sortOptions = { createdAt: 1 };
                    break;

                case "most_voted":
                    sortOptions = { upvotes: -1 };
                    break;

                case "most_viewed":
                    sortOptions = { views: -1 };
                    break;
                
                case "most_answered":
                    sortOptions = { answers: -1 };
                    break;
            }
        }

        const user = await User.findOne( { clerkId }).populate({
            path: 'saved',
            match: query,
            options: {
                sort: sortOptions,
                skip: (page - 1) * pageSize,
                limit: pageSize
            },
            populate: [
                { path: 'tags', model: Tag, select: "_id name" },
                { path: 'author', model: User, select: "_id clerkId name picture"}
            ],
        })

        if(!user) {
            throw new Error('User not found')
        }
        const saved = user.saved

        const isNext = saved > pageSize

        return { questions: saved, isNext }

    } catch (error) {
        console.log(error)
    }
}

export async function getUserInfo(params: GetUserByIdParams){
    try {
        connectToDatabse()

        const { clerkId } = params;

        const user = await User.findOne({ clerkId })

        if(!user) throw new Error("User not found!")

        const totalAnswers = await Answer.countDocuments({ author: user._id })
        const totalQuestions = await Question.countDocuments({ author: user._id })

        const [questionUpvotes] = await Question.aggregate([
            { $match: { author: user._id}},
            { $project: {
                _id: 0, upvotes: {$size: '$upvotes'}
            }},
            { $group: {
                _id: null,
                totalUpvotes: { $sum: "$upvotes"}
            }}
        ])
        const [answerUpvotes] = await Answer.aggregate([
            { $match: { author: user._id}},
            { $project: {
                _id: 0, upvotes: {$size: '$upvotes'}
            }},
            { $group: {
                _id: null,
                totalUpvotes: { $sum: '$upvotes'}
            }}
        ])
        const [questionViews] = await Question.aggregate([
            { $match: { author: user._id}},
            { $group: {
                _id: null,
                totalViews: { $sum: '$views'}
            }}
        ])

        const criteria = [
            { type: 'QUESTION_COUNT' as BadgeCriteriaType, count: totalQuestions },
            { type: 'ANSWER_COUNT' as BadgeCriteriaType , count: totalAnswers },
            { type: 'QUESTION_UPVOTES' as BadgeCriteriaType, count: questionUpvotes?.totalUpvotes || 0 },
            { type: 'ANSWER_UPVOTES' as BadgeCriteriaType, count: answerUpvotes?.totalUpvotes || 0 },
            { type: 'TOTAL_VIEWS' as BadgeCriteriaType, count: questionViews?.totalViews || 0 },
        ]

        const badgeCounts = assignBadges({ criteria })

        return {
            user,
            totalAnswers,
            totalQuestions,
            badgeCounts,
            reputation: user.reputation
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserQuestions(params: GetUserStatsParams) {
    try {
        connectToDatabse()

        const { userId } = params;

        const totalQuestions = await Question.countDocuments({ author: userId })
        const userQuestions = await Question.find({ author: userId })
            .sort({ views: -1, upvotes: -1, createdAt: -1 })
            .populate('tags',  '_id name')
            .populate('author', '_id clerkId name picture')

        return { totalQuestions, questions: userQuestions}

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserAnswers(params: GetUserStatsParams) {
    try {
        connectToDatabse()

        const { userId } = params;

        const totalAnswers = await Answer.countDocuments({ author: userId })
        const userAnswers = await Answer.find({ author: userId })
            .sort({ upvotes: -1})
            .populate('question',  '_id title')
            .populate('author', '_id clerkId name picture')

        return { totalAnswers, answers: userAnswers}

    } catch (error) {
        console.log(error)
        throw error
    }
}