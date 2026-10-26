import { useEffect, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Trash2,
  LoaderCircle,
  Sparkles,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestions = [
  "Explain JavaScript arrays",
  "Help me understand React hooks",
  "Explain cybersecurity basics",
  "Help me prepare a lesson",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your AI Learning Assistant. Ask me about programming, courses, or any learning topic.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(text = message) {
    const question = text.trim();

    if (!question || loading) return;

    const updatedMessages = [...messages, { role: "user", content: question }];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      // Connect to your secure API endpoint here.
      // Do not put your OpenAI API key in this component.
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add your existing authentication header here
          // if your API uses Bearer tokens.
        },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to get an AI response.");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI service. Please check your API connection and try again.",
        },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content: "Hello! What would you like to learn today?",
      },
    ]);
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          className="fixed bottom-20 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 lg:bottom-6"
        >
          <Bot className="size-6" />
        </button>
      )}

      {isOpen && (
        <section className="fixed bottom-4 right-4 z-100 flex h-[min(650px,85dvh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">AI Learning Assistant</h2>
                <p className="text-xs opacity-80">Your course companion</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                title="Clear chat"
                aria-label="Clear chat"
                className="rounded-lg p-2 transition hover:bg-white/15"
              >
                <Trash2 className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="rounded-lg p-2 transition hover:bg-white/15"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Try asking:</p>

                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSend(item)}
                    disabled={loading}
                    className="block w-full rounded-xl border border-border p-3 text-left text-sm transition hover:bg-muted disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={`${index}-${item.role}`}
                className={`flex items-start gap-2 ${
                  item.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {item.role === "assistant" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    item.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {item.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none wrap-break-word">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap wrap-break-word">
                      {item.content}
                    </p>
                  )}
                </div>

                {item.role === "user" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                AI is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2 border-t border-border p-3"
          >
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about learning..."
              rows={1}
              disabled={loading}
              className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!message.trim() || loading}
              aria-label="Send message"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <Send className="size-5" />
              )}
            </button>
          </form>
        </section>
      )}
    </>
  );
}
