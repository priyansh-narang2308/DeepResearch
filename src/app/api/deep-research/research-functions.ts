import { ResearchState } from "./types";
import z from "zod";
import { callModel } from "./model-caller";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./prompts";

export async function generateSearchQueries(researchState: ResearchState) {
  const results = await callModel(
    {
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      prompt: getPlanningPrompt(
        researchState.topic,
        researchState.clarificationsText
      ),
      system: PLANNING_SYSTEM_PROMPT,
      schema: z.object({
        searchQueries: z.array(z.string()).describe(
          "The search queries that can be used to find the most relevant content which can be used to write the most comprehensive report on the given topic. (max 3 queries)" //how many queries will pass
        ),
      }),
    },
    researchState
  );

  return results;
}
