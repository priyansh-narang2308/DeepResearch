import { generateObject } from "ai";
import { ModalCallOptions, ResearchState } from "./types";
import { openRouter } from "./services";

export async function callModel<T>(
  { model, prompt, system, schema }: ModalCallOptions<T>,
  researchState: ResearchState
): Promise<T | string> {
  // Parse the questions using generate object from ai-sdk
  if (!schema) {
    throw new Error("Schema must be provided to callModel.");
  }
  const { object, usage } = await generateObject({
    model: openRouter(model),
    prompt,
    system,
    schema: schema,
  });

  //   Check for the total tokens needed! Usage taken from the ai-sdk
  researchState.tokenUsed += usage.totalTokens!;
  researchState.completedSteps++;

  return object;
}
