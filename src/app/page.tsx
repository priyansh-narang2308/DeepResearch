import QuestionAnswerBox from "@/components/deep-research/question-answer-box";
import UserInput from "@/components/deep-research/user-input";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-16">
      <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-dancing-script italic bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight">
          Deep Research
        </h1>

        <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Enter a topic, answer a few guided questions, and instantly generate a
          detailed, well-structured research report with{" "}
          <span className="font-semibold text-primary">Deep Research</span>.
        </p>
      </div>

      <UserInput />
      <QuestionAnswerBox/>
    </main>
  );
}
