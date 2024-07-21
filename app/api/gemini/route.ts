import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)


export const POST = async (request: Request) => {
    const { question } = await request.json();

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
        throw new Error("API key not found in environment variables");
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        if (!model) {
            throw new Error("Model not found");
        }

        const prompt = question.title
        console.log(`Prompt: ${prompt}`)

        const result = await model.generateContent(prompt);
        const response = result.response;
        // @ts-ignore
        const text = response.candidates[0].content.parts[0].text;
        return NextResponse.json({ text })

    } catch (error: any) {
        return NextResponse.json({ error: error.message})
    }
}