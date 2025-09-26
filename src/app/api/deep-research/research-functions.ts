import { generateObject } from "ai";
import { ResearchState } from "./types";
import { openRouter } from "./services";
import z from "zod";

export async function generateSearchQueries(researchState: ResearchState) {
  // Parse the questions using generate object from ai-sdk
  const { object } = await generateObject({
    model: openRouter("x-ai/grok-4-fast:free"),
    prompt: "",
    system: "",
    schema: z.object({
      questions: z.array(z.string()),
    }),
  });
}
