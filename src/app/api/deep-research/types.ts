import z from "zod";

export interface ResearchFindings {
  summary: string;
  source: string;
}

export interface ResearchState {
  topic: string;
  completedSteps: number;
  tokenUsed: number;
  findings: ResearchFindings[]; //will have smmary and source
  processedUrl: Set<string>;
  clarificationsText: string;
}

export interface ModalCallOptions<T> {
  model: string;
  prompt: string;
  system: string;
  schema?: z.ZodType<T>;
}

export interface SearchResults {
  title: string;
  url: string;
  content: string;
}
