"use server"

import Tag from "@/database/tag.model";
// import User from "@/database/user.model";
import { connectToDatabse } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

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

        const tags = await Tag.find({})

        return {tags}

    } catch (error) {
        console.log(error)
    }
}