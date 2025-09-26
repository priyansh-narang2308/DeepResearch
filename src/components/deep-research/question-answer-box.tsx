"use client";

import { useDeepResearchStore } from "@/store/deepResearchStore";
import React, { useEffect } from "react";
import QuestionForm from "./question-form";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent } from "@/components/ui/card";

const QuestionAnswerBox = () => {
  const { questions, isCompleted, topic, answers } = useDeepResearchStore();

  const { sendMessage ,messages} = useChat({
    transport: new DefaultChatTransport({
      api: "/api/deep-research",
    }),
  });

  console.log("Messages: ",messages)

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

  if (questions.length === 0) {
    return (
      <Card
        className="w-full max-w-[95vw] sm:max-w-[80vw] mt-10 lg:max-w-[60vw] xl:max-w-[45vw] 
      rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-r from-primary/20 to-primary/20
      flex items-center justify-center text-center py-12 hover:scale-105 transition-all"
      >
        <CardContent className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            No topic entered yet
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Please enter a topic to start your deep research.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex gap-4 mt-10 w-full flex-col items-center mb-16">
      <QuestionForm />
    </div>
  );
};

export default QuestionAnswerBox;
