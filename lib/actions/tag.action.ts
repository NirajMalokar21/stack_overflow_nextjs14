"use server"

// import User from "@/database/user.model";
import { connectToDatabse } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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