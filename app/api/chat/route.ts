import { NAVEED_CONTEXT, localAnswer } from "@/app/lib/naveed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

/**
 * POST /api/chat  { messages: ChatMessage[] }
 * Uses OpenRouter when OPENROUTER_API_KEY is set; otherwise returns a
 * built-in knowledge-base answer so the widget always works.
 */
export async function POST(req: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ reply: "Sorry, I couldn't read that message." }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const apiKey = process.env.OPENROUTER_API_KEY;

  // No key configured → offline keyword fallback.
  if (!apiKey) {
    return Response.json({ reply: localAnswer(lastUser), mode: "offline" });
  }

  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-haiku";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://naveedtechlab-portfolio.hf.space",
        "X-Title": "Muhammad Naveed Portfolio",
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        temperature: 0.5,
        messages: [
          { role: "system", content: NAVEED_CONTEXT },
          ...messages.slice(-8).map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: String(m.content).slice(0, 2000),
          })),
        ],
      }),
    });

    if (!res.ok) {
      // LLM failed → degrade gracefully to the local answer.
      return Response.json({ reply: localAnswer(lastUser), mode: "fallback" });
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() || localAnswer(lastUser);
    return Response.json({ reply, mode: "llm" });
  } catch {
    return Response.json({ reply: localAnswer(lastUser), mode: "fallback" });
  }
}
