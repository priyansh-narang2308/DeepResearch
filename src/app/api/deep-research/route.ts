import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { ResearchState } from "./types";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];
    const lastPart = lastMessage.parts?.[0];
    const lastMessageContent = lastPart?.text;

    if (!lastMessageContent) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No text content found in last message.",
        }),
        { status: 400 }
      );
    }

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(lastMessageContent);
    } catch {
      parsedMessage = lastMessageContent;
    }

    const topic = parsedMessage?.topic;
    const clarifications = parsedMessage?.clarifications;

    // console.log("Parsed message:", parsedMessage);

    return createUIMessageStreamResponse({
      stream: createUIMessageStream({
        execute: ({ writer }) => {
          // writer.write({
          //   type: "text-delta",
          //   delta: "Hello",
          //   id: "1",
          // });

          const researchState: ResearchState = {
            topic: topic,
            completedSteps: 0,
            tokenUsed: 0,
            findings: [],
            processedUrl: new Set(), //prevents the duplications of the URL
            clarificationsText: JSON.stringify(clarifications),
          };
        },
      }),
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "Invalid message format!",
      }),
      { status: 500 }
    );
  }
}
