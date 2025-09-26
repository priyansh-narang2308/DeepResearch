import { ResearchFindings } from "./types";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const combineFindings = (findings: ResearchFindings[]): string => {
  return findings
//   we can properly demarcate it 
    .map((finding) => `${finding.summary}\n\n Source: ${finding.source}`)
    .join("\n\n---\n\n");
};
