/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateSearchQueries } from "./research-functions";
import { ResearchState } from "./types";

export async function deepResearch(
  researchState: ResearchState,
  dataStream: any
) {
  const initlialQueries = await generateSearchQueries(researchState);
}
