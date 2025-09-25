"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { useDeepResearchStore } from "@/store/deepResearchStore";
import { Progress } from "../ui/progress";

const formSchema = z.object({
  answer: z.string().min(1, "Answer is required!"),
});

const QuestionForm = () => {
  const {
    questions,
    currentQuestion,
    answers,
    setCurrentQuestion,
    setAnswers,
    isLoading,
    setIsCompleted,
  } = useDeepResearchStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: answers[currentQuestion] || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAns = [...answers];
    newAns[currentQuestion] = values.answer;
    setAnswers(newAns);

    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      form.reset();
    } else {
      setIsCompleted(true);
    }
  }

  if (questions.length === 0) {
  return (
    <Card
      className="w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-[60vw] xl:max-w-[45vw] 
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
    <Card
      className="w-full max-w-[95vw] sm:max-w-[85vw] lg:max-w-[70vw] xl:max-w-[65vw] 
      rounded-xl shadow-md border border-gray-200 bg-white/95 backdrop-blur"
    >
      <CardHeader className="px-6 border-b">
        <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-primary/80">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-6">
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800">
          {questions[currentQuestion]}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type your answer here..."
                      {...field}
                      className="px-3 py-2 text-sm sm:text-base resize-none rounded-lg 
                        border border-gray-300 focus:border-primary focus:ring-2 
                        focus:ring-primary/40 transition-all min-h-[100px] w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-xs sm:text-sm text-gray-500">
                    Keep your response clear and focused.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none cursor-pointer"
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    form.setValue("answer", answers[currentQuestion - 1] || "");
                  }
                }}
              >
                Previous
              </Button>

              <Button
                disabled={isLoading}
                variant="default"
                type="submit"
                className="flex-1 sm:flex-none cursor-pointer"
              >
                {currentQuestion === questions.length - 1
                  ? "Start Research"
                  : "Next"}
              </Button>
            </div>

            <div className="pt-2">
              <Progress
                value={((currentQuestion + 1) / questions.length) * 100}
                className="h-2 w-full transition-all duration-500 ease-in-out"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
