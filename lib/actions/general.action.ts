"use server"

import { connectToDatabse } from "../mongoose";
import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
    try {
        await connectToDatabse()
        
    } catch (error) {
        console.log(error)
        throw error
    }
}