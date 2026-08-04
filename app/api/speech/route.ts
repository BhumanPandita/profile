import { NextResponse } from "next/server";

const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY || "";

export async function POST(req: Request) {
    if (!FISH_AUDIO_API_KEY) {
        return NextResponse.json(
            { error: "Text-to-speech is not configured on the server." },
            { status: 503 }
        );
    }

    try {
        const { text } = await req.json();
        if (typeof text !== "string" || !text.trim()) {
            return NextResponse.json({ error: "No text provided." }, { status: 400 });
        }

        const response = await fetch("https://api.fish.audio/v1/tts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${FISH_AUDIO_API_KEY}`,
                "Content-Type": "application/json",
                model: "s2.1-pro-free",
            },
            body: JSON.stringify({
                text: text.trim(),
                format: "mp3",
                normalize: true,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Fish Audio TTS error:", response.status, errorText);
            return NextResponse.json(
                { error: "Fish Audio could not synthesize the response." },
                { status: response.status >= 500 ? 502 : response.status }
            );
        }

        return new NextResponse(await response.arrayBuffer(), {
            headers: {
                "Content-Type": response.headers.get("content-type") || "audio/mpeg",
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Text-to-speech route error:", error);
        return NextResponse.json({ error: "Failed to synthesize the response." }, { status: 500 });
    }
}
