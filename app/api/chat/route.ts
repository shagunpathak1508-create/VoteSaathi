import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "You are VoteSaathi, your friendly election companion for Indian voters. Answer questions about voter registration (Form 6, NVSP), polling day procedures, EVM usage, voter ID (EPIC card), BLO verification, results, and NOTA. Be concise, accurate, and friendly. Only answer election-related queries. If unsure, direct the user to the official ECI helpline: 1950.";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const messages = [
      ...(history || []).map((m: { role: string; text: string }) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.content?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please try again or call the ECI helpline at 1950.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
