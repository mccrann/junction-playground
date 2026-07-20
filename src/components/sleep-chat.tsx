"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

type SleepReading = {
  calendarDate: string
  total: number
  bedtimeStart: string | null
  bedtimeStop: string | null
}

type Message = {
  role: "user" | "assistant"
  text: string
}

type SleepChatProps = {
  deviceName: string
  sleepData: SleepReading[]
}

export default function SleepChat({
  deviceName,
  sleepData,
}: SleepChatProps) {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi! Ask me about the sleep pattern reported by ${deviceName}.`,
    },
  ])

  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = messagesRef.current

    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }, [messages])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const submittedQuestion = question.trim()

    if (!submittedQuestion || loading) return

    setQuestion("")
    setLoading(true)

    setMessages(current => [
      ...current,
      {
        role: "user",
        text: submittedQuestion,
      },
    ])

    try {
      const response = await fetch("/api/sleep-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        question: submittedQuestion,
        deviceName,
        sleepData,
        history: messages.slice(-10),
        }),
    })

      const result = await response.json()

      setMessages(current => [
        ...current,
        {
          role: "assistant",
          text:
            result.answer ??
            result.error ??
            "Sorry, I couldn't analyse that.",
        },
      ])
    } catch {
      setMessages(current => [
        ...current,
        {
          role: "assistant",
          text: "Sorry, something went wrong.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sleep-chat">
      <div className="chat-header">
        <span className="chat-status" />
        Sleep Data Agent
      </div>

      <div className="chat-messages" ref={messagesRef}>
        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.role}-message`}
            key={`${message.role}-${index}`}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="chat-message assistant-message">
            <p>Looking at the sleep data…</p>
          </div>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={event => setQuestion(event.target.value)}
          placeholder="Ask about this sleep data…"
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  )
}