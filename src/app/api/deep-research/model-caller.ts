import { ModalCallOptions, ResearchState } from "./types";

export async function callModel<T>(
  { model, prompt, system, schema }: ModalCallOptions<T>,
  researchState: ResearchState
): Promise<T | string> {
  return "";
}
