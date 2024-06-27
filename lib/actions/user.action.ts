"use server"

import User from "@/database/user.model";
import { connectToDatabse } from "../mongoose"
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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