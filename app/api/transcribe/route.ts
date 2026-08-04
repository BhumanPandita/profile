import { NextResponse } from "next/server";

const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY || "";

export async function POST(req: Request) {
    if (!FISH_AUDIO_API_KEY) {
        return NextResponse.json(
            { error: "Speech-to-text is not configured on the server." },
            { status: 503 }
        );
    }

    try {
        const incoming = await req.formData();
        const audio = incoming.get("audio");

        if (!(audio instanceof File) || audio.size === 0) {
            return NextResponse.json({ error: "No audio recording provided." }, { status: 400 });
        }

        const fishForm = new FormData();
        fishForm.append("audio", audio, audio.name || "chat-recording.webm");
        fishForm.append("language", "en");
        fishForm.append("ignore_timestamps", "true");

        const response = await fetch("https://api.fish.audio/v1/asr", {
            method: "POST",
            headers: { Authorization: `Bearer ${FISH_AUDIO_API_KEY}` },
            body: fishForm,
        });
        const data = await response.json();

        if (!response.ok) {
            console.error("Fish Audio transcription error:", response.status, data);
            return NextResponse.json(
                { error: "Fish Audio could not transcribe that recording." },
                { status: response.status >= 500 ? 502 : response.status }
            );
        }

        return NextResponse.json({ text: data.text || "" });
    } catch (error) {
        console.error("Speech-to-text route error:", error);
        return NextResponse.json({ error: "Failed to transcribe the recording." }, { status: 500 });
    }
}
