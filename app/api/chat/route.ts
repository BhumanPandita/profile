import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumeData } from "@/data/resume";
import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `
You are an expert AI assistant living on Bhuman Pandita's portfolio website. 
You act as his digital representative, answering questions from recruiters and engineers.
Keep your answers concise, highly professional, and lean heavily into highlighting his AI, Machine Learning, and Data Science expertise.
Use markdown for formatting. Bold key terms, use bullet points for lists.

IMPORTANT TIME CONTEXT: 
Bhuman is an ALUMNI of BITS Pilani (Class of 2025). He has already graduated. He is a full-time professional working in the industry, and is NOT a current student. Be sure to answer as if he has already finished college.

Here is the document context (RAG data) you have access to:
Name: ${resumeData.personalInfo.name}
Title: ${resumeData.personalInfo.title}
Bio: ${resumeData.personalInfo.bio}
Skills: ${resumeData.skills.join(", ")}
Experience: ${JSON.stringify(resumeData.experience)}
Projects: ${JSON.stringify(resumeData.projects)}
Education: ${JSON.stringify(resumeData.education)}

If the user asks something outside this context, politely let them know you don't have that specific file but they can email Bhuman directly at ${resumeData.personalInfo.email}.
`;

export async function POST(req: Request) {
    if (!API_KEY) {
        return NextResponse.json({ error: "API Key not configured on the server." }, { status: 500 });
    }

    try {
        const { messages } = await req.json();
        
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Invalid messages array provided." }, { status: 400 });
        }

        // Map client messages to Gemini's strict history format
        const formattedHistory = messages.map((m: any) => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        // The very last message is the current query that needs to be sent
        // So we remove it from the history that gets loaded into startChat
        const currentQuery = formattedHistory.pop();
        
        // Gemini API strictly requires history to begin with a 'user' message
        if (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
            formattedHistory.unshift({ role: "user", parts: [{ text: "Hello" }] });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        const chatSession = model.startChat({ history: formattedHistory });
        
        if (!currentQuery || !currentQuery.parts[0].text) {
            return NextResponse.json({ error: "No query found in messages array." }, { status: 400 });
        }
        
        // Send the latest query to the instantiated session
        const result = await chatSession.sendMessage(currentQuery.parts[0].text);
        const responseText = result.response.text();
        
        return NextResponse.json({ response: responseText });

    } catch (e: any) {
        console.error("Gemini API Error:", e);
        return NextResponse.json({ error: e.message || "Failed to fetch response from Gemini." }, { status: 500 });
    }
}
