import { create } from "zustand";

interface DeepResearchState {
  topic: string;
  questions: string[];
  answers: string[];
  currentQuestion: number; //index of the question number
  isCompleted: boolean;
  isLoading: boolean;
}

interface DeepResearchActions {
  setTopic: (topic: string) => void;
  setQuestions: (questions: string[]) => void;
  setAnswers: (answers: string[]) => void;
  setCurrentQuestion: (index: number) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialState: DeepResearchState = {
  topic: "",
  questions: [],
  answers: [],
  currentQuestion: 0,
  isCompleted: false,
  isLoading: false,
};

export const useDeepResearchStore = create<
  DeepResearchState & DeepResearchActions
>((set) => ({
  ...initialState,
  // to set it to the state
  setTopic: (topic: string) => set({ topic }),
  setQuestions: (questions: string[]) => set({ questions }),
  setAnswers: (answers: string[]) => set({ answers }),
  setCurrentQuestion: (currentQuestion: number) => set({ currentQuestion }),
  setIsCompleted: (isCompleted: boolean) => set({ isCompleted }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
