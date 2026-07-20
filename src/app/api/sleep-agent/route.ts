import { run } from "@openai/agents"
import { sleepAgent } from "../../agent/sleep-agent"

export async function POST(request: Request) {
  try {
 const {
  question,
  deviceName,
  sleepData,
  history = [],
} = await request.json()

const conversationHistory = history
  .map(
    (message: { role: string; text: string }) =>
      `${message.role}: ${message.text}`
  )
  .join("\n\n")

const result = await run(
  sleepAgent,
  `
    Device/source: ${deviceName}

    Sleep records:
    ${JSON.stringify(sleepData, null, 2)}

    Conversation so far:
    ${conversationHistory || "No previous messages."}

    Current user question:
    ${question}

    Respond to the current question in the context of the
    preceding conversation. Short replies such as "yes" refer
    to the assistant's immediately preceding suggestion.
  `
)
    return Response.json({
      answer:
        result.finalOutput ??
        "I couldn't produce an analysis.",
    })
  } catch (error) {
    console.error("Sleep agent failed:", error)

    return Response.json(
      { error: "The sleep agent could not respond." },
      { status: 500 }
    )
  }
}