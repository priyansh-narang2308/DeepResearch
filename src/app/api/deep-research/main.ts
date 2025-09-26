/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  generateSearchQueries,
  processSearchResults,
  search,
} from "./research-functions";
import { ResearchState } from "./types";

export async function deepResearch(researchState: ResearchState) {
  const initlialQueries = await generateSearchQueries(researchState);

  // we are getting 3 intitila queries right
  let currentQueries = (initlialQueries as any).searchQueries;

  // get search results for each fo the queries thats why use while loop

  while (currentQueries && currentQueries.length > 0) {
    const searchResults = currentQueries.map((query: string) =>
      search(query, researchState)
    );
    // as its coming in promise type thats why
    const searchResultsResponses = await Promise.allSettled(searchResults);

    const allSearchResults = searchResultsResponses
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled" &&
          Array.isArray(result.value) &&
          result.value.length > 0
      )
      .map((result) => result.value)
      .flat();

    // Now process the search results that we got
    const newFindings = await processSearchResults(
      allSearchResults,
      researchState
    );

    console.log(newFindings);

    // to stop the loop make it an empty array!
    currentQueries = [];
  }

  return initlialQueries;
}
