import { ResearchState, SearchResults } from "./types";
import z from "zod";
import { callModel } from "./model-caller";
import { getPlanningPrompt, PLANNING_SYSTEM_PROMPT } from "./prompts";
import { exa } from "./services";

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

export async function search(
  query: string,
  researchState: ResearchState
): Promise<SearchResults[]> {
  try {
    const searchResults = await exa.searchAndContents(query, {
      type: "keyword",
      numResults: 3,
      startPublishedDate: new Date(
        Date.now() - 365 * 24 * 60 * 60 * 1000
      ).toISOString(), //this gives from past 1 year content
      endPublishedDate: new Date().toISOString(),
      excludeDomains: ["https://www.youtube.com"],
      livecrawl: "never",
      text: {
        maxCharacters: 20000,
      },
    });

    const fileteredResults=searchResults.results.filter

  } catch (error) {
    console.log("Error: ", error);
  }
}

1:51:59