"use client";

import { useDeepResearchStore } from "@/store/deepResearchStore";
import React, { useEffect } from "react";
import QuestionForm from "./question-form";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const QuestionAnswerBox = () => {
  const { questions, isCompleted, topic, answers } = useDeepResearchStore();

  const { sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/deep-research",
    }),
  });

  useEffect(() => {
    // any change in isCompleted will run this useEffect!

    if (isCompleted && questions.length > 0) {
      const clarifications = questions.map((question, index) => ({
        question: question,
        answer: answers[index],
      }));

      sendMessage({
        role: "user",
        parts: [
          {
            type: "text",
            text: JSON.stringify({
              topic,
              clarifications,
            }),
          },
        ],
      });
    }
  }, [isCompleted, questions, answers, topic, sendMessage]);

  if (questions?.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 mt-10 w-full flex-col items-center mb-16">
      <QuestionForm />
    </div>
  );
};

export default QuestionAnswerBox;
