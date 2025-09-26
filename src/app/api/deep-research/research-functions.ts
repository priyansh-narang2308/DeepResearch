import { ResearchFindings, ResearchState, SearchResults } from "./types";
import z from "zod";
import { callModel } from "./model-caller";
import {
  EXTRACTION_SYSTEM_PROMPT,
  getExtractionPrompt,
  getPlanningPrompt,
  PLANNING_SYSTEM_PROMPT,
} from "./prompts";
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

    const fileteredResults = searchResults.results
      // extract the title and url and content from the particualr reponse
      .filter((r) => r.title && r.text !== undefined)
      .map((r) => ({
        title: r.title || "",
        url: r.url || "",
        content: r.text || "",
      }));

    researchState.completedSteps++;

    return fileteredResults;
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
}

export async function extractContent(
  content: string,
  url: string,
  researchState: ResearchState
) {
  const callingResylt = await callModel(
    {
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      prompt: getExtractionPrompt(
        content,
        researchState.topic,
        researchState.clarificationsText
      ),
      system: EXTRACTION_SYSTEM_PROMPT,
      schema: z.object({
        summary: z.string().describe("A comprehensive summary of the content"),
      }),
    },
    researchState
  );

  return {
    url,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    summary: (callingResylt as any).summary,
  };
}

export async function processSearchResults(
  searchResults: SearchResults[],
  researchState: ResearchState
): Promise<ResearchFindings[]> {
  // Same as hthe planning part of the search queries
  const extractionPromises = searchResults.map((result) =>
    extractContent(result.content, result.url, researchState)
  );
  const extractionResults = await Promise.allSettled(extractionPromises);

  type ExtractionResult = { url: string; summary: string };

  const newFindings = extractionResults
    .filter(
      (result): result is PromiseFulfilledResult<ExtractionResult> =>
        result.status === "fulfilled" &&
        result.value !== null &&
        result.value !== undefined
    )
    .map((result) => {
      const { summary, url } = result.value;
      return {
        summary,
        source: url,
      };
    });

  return newFindings;
}
