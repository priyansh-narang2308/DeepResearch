import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import z from "zod";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const toClarifytheresearchGoals = async (topic: string) => {
  const generateQuestionPrompt = `
        Given the research topic "<topic>${topic}</topic>", generate 4 clarifying questions that will help narrow down the research scope. 
        The questions should explore important aspects such as the intended setup, technical requirements, specific tools or frameworks, and any constraints or preferences. 
        Only provide the questions themselves — do not include explanations, headings, or additional commentary, and make the questions detailed so that user can provide a concise response.
`;

  try {
    // Parse the questions using generate object from ai-sdk
    const { object } = await generateObject({
      model: openrouter("x-ai/grok-4-fast:free"),
      prompt: generateQuestionPrompt,
      schema: z.object({
        questions: z.array(z.string()),
      }),
    });

    return object.questions;
  } catch (error) {
    console.log("Error while generating questions: ", error);
  }
};

export async function POST(req: Request) {
  const { topic } = await req.json();
  console.log("Topic: ", topic);

  try {
    const questions = await toClarifytheresearchGoals(topic);
    console.log("Questions: ", questions);

    return NextResponse.json(questions);
  } catch (error) {
    console.log("Error while generating questions: ", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate questions",
      },
      { status: 500 }
    );
  }
}
