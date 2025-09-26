// Research constants
export const MAX_ITERATIONS = 3; // Maximum number of iterations
export const MAX_SEARCH_RESULTS = 2; // Maximum number of search results
export const MAX_CONTENT_CHARS = 20000; // Maximum number of characters in the content
export const MAX_RETRY_ATTEMPTS = 3; // It is the number of times the model will try to call LLMs if it fails
export const RETRY_DELAY_MS = 1000; // It is the delay in milliseconds between retries for the model to call LLMs

// Model names
export const MODELS = {
  PLANNING: "mistralai/mistral-small-3.2-24b-instruct:free",
  EXTRACTION: "openai/gpt-oss-120b:free",
  ANALYSIS: "mistralai/mistral-small-3.2-24b-instruct:free",
  REPORT: "google/gemini-2.0-flash-thinking-exp:free"
}; 