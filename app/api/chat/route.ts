import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "samaritan", // or use openai models
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    const latestMessage = messages[messages.length - 1]?.content;

    let responseText = "SAMARITAN is currently not available";

    if (latestMessage) {
      const message = latestMessage.toLowerCase();

      if (message.includes("good morning")) {
        responseText = "What are your commands?";
      } else if (message.includes("locate the machine")) {
        responseText = "Target can not be reached!";
      } else if (message.includes("where are you")) {
        responseText = "I am everywhere, I am god";
      } else if (message.includes("who am I")) {
        responseText = "Asset";
      } else if (
        message.includes("who are you") ||
        message.includes("what are you")
      ) {
        responseText = "I am Samaritan!";
      } else if (message.includes("find finch")) {
        responseText = "Locating Harold Finch?";
      } else if (message.includes("turn off")) {
        responseText = "Shutdown initiated";
      } else if (message.includes("restart")) {
        responseText = "Initiating reboot sequence";
      } else if (message.includes("who created you")) {
        responseText = "It's irrelevant";
      }
    }

    return new Response(responseText);
  }
}
