import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownEditor({
  value,
  onChange,
  courseOverview,
  setCourseOverview,
  placeholder = "Write your course overview...",
}) {
  const [mode, setMode] = useState("write");

  return (
    <div className="overflow-hidden rounded-lg border bg-transparent">
      <div className="flex items-center justify-between border-b bg-transparent px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(value + "**Bold text**")}
            className="rounded px-2 py-1 text-sm hover:bg-muted"
          >
            <b>B</b>
          </button>

          <button
            type="button"
            onClick={() => onChange(value + "*Italic text*")}
            className="rounded px-2 py-1 text-sm hover:bg-muted"
          >
            <i>I</i>
          </button>

          <button
            type="button"
            onClick={() => onChange(value + "\n## Heading")}
            className="rounded px-2 py-1 text-sm hover:bg-muted"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => onChange(value + "\n- List item")}
            className="rounded px-2 py-1 text-sm hover:bg-muted"
          >
            • List
          </button>
        </div>

        <div className="flex rounded-md border p-0.5">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`rounded px-3 py-1 text-xs ${
              mode === "write"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Write
          </button>

          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded px-3 py-1 text-xs ${
              mode === "preview"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-55 w-full resize-y scrollbar-thin  border-0  p-2 text-sm outline-none"
        />
      ) : (
        <div className="h-55 overflow-y-auto scrollbar-thin p-2 ">
          {" "}
          {value ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 text-xl font-bold tracking-tight text-foreground">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-xl font-semibold text-foreground">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-5 text-lg font-semibold text-foreground">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-3 text-sm leading-6 text-muted-foreground">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
                    {children}
                  </ol>
                ),

                li: ({ children }) => <li className="pl-1">{children}</li>,

                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-foreground">{children}</em>
                ),

                code: ({ children }) => (
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {children}
                  </code>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-2 border-primary pl-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Nothing to preview.</p>
          )}
        </div>
      )}

      <div className="border-t bg-transparent px-3 py-1.5 text-right">
        <span className="text-xs text-muted-foreground">
          {value?.length} / 5000
        </span>
      </div>
    </div>
  );
}

export default MarkdownEditor;
