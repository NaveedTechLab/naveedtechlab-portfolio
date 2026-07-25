"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is Naveed working on now?",
  "What are his top skills?",
  "Show me his best projects",
  "How can I contact him?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "👋 Hi! I'm NaveedBot — ask me anything about Muhammad Naveed's experience, skills, or projects.",
};

export default function ChatBot({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data?.reply || "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach the server. You can email Naveed directly at qureshinaveed21@hotmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const panelBg = dark ? "bg-[#111111] border-white/10" : "bg-white border-slate-200";
  const botBubble = dark ? "bg-white/8 text-slate-100" : "bg-slate-100 text-slate-800";
  const inputBg = dark
    ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400";

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat"
        className="fixed bottom-24 right-5 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-lime-500 to-green-500 text-black shadow-2xl shadow-lime-500/30 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`fixed bottom-40 right-5 z-[60] w-[calc(100vw-2.5rem)] sm:w-96 h-[68vh] sm:h-[500px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-fade-up ${panelBg}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-lime-500 to-green-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-black/15 flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="leading-tight">
              <p className="text-black font-bold text-sm">NaveedBot</p>
              <p className="text-black/70 text-xs">AI assistant · usually instant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-sm leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                  m.role === "user"
                    ? "self-end bg-gradient-to-r from-lime-500 to-green-500 text-black rounded-br-sm"
                    : `self-start rounded-bl-sm ${botBubble}`
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className={`self-start rounded-2xl rounded-bl-sm px-4 py-3 ${botBubble}`}>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            )}

            {/* Suggestions (only before the first user turn) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 mt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-lime-400 hover:text-lime-400 ${
                      dark ? "border-white/15 text-slate-300" : "border-slate-300 text-slate-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className={`flex items-center gap-2 p-3 border-t flex-shrink-0 ${
              dark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Naveed…"
              className={`flex-1 text-sm rounded-full border px-4 py-2.5 outline-none focus:border-lime-400 transition-colors ${inputBg}`}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-500 text-black flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
