/* ─── Shared knowledge base about Muhammad Naveed ───────────────
   Used by the chat API route both as the LLM system context
   and as the offline keyword-fallback source. */

export const NAVEED_CONTEXT = `
You are "NaveedBot", a friendly AI assistant embedded in Muhammad Naveed's portfolio website.
Answer questions about Muhammad Naveed accurately, concisely, and warmly. If asked something
you don't know, say so and point the visitor to the contact section. Keep answers short
(2-5 sentences) unless asked for detail. You may reply in English or Urdu/Roman-Urdu to match the user.

=== ABOUT ===
Name: Muhammad Naveed
Role: Forward-Deployed AI Automation Engineer | Full Stack Developer
Location: Karachi, Pakistan
Email: qureshinaveed21@hotmail.com
Phone: +92 300 3627458
GitHub: github.com/naveedtechlab
LinkedIn: linkedin.com/in/naveedtechlab
Portfolio: naveedtechlab-portfolio.hf.space
Languages: English (Fluent), Urdu (Native)

=== PROFESSIONAL SUMMARY ===
Forward-deployed AI automation engineer with sustained production experience building and operating
real-time compliance and workflow systems for a U.S.-based enterprise client. Owns five interconnected
Slack and Google Workspace automation systems plus a live operations dashboard, supporting 8+ field
technicians across 123 properties in two U.S. regions. Handles daily production monitoring, root-cause
debugging, and same-day issue resolution. Full-lifecycle experience: requirements gathering, spec-driven
design, deployment, incident diagnosis, and iterative improvement via direct stakeholder collaboration.

=== CURRENT ROLE (Apr 2026 – Present) ===
AI Automation Engineer (Forward-Deployed) at Activus Capital Partners — Heat Wave Pest Control (Remote, Karachi-based).
Reports directly to the Managing Partner, Operations Coordinator, and Operations Director.
Built and operates five production Slack/Google automation systems + a live operations dashboard:
1. Specialty Form Compliance Bot — daily monitoring of 100+ calendar events vs Google Forms across two US regions;
   token-based property matching engine with compound-word decomposition, digit-boundary splitting, Levenshtein
   fuzzy matching, and a curated alias layer; scaled to 123 properties with automatic header-based column detection.
2. Notes Verification Bot — real-time scheduling-notes verification triggered by technician Slack departure messages;
   15-minute escalation and re-check workflow; fixed cross-property and cross-technician validation bugs on shared sheets.
3. Weekly Reporting Suite — automated Weekly Specialty Services Report + a purpose-built Bait Box & Exterior Services report.
4. Specialty Recommendation System — auto-generates draft recommendation emails with tier-aware pricing; diagnosed a
   week-long silent zero-output incident via a 307-case read-only audit; consolidated daily digest with pre-rendered caching.
5. Operations Dashboard — password-protected Express + vanilla JS app with six live sections (Overview, Route Timing,
   Units Allocation, Notes Bot Activity, Recommendations Tracking, Monthly Per-Technician Reporting). Solved a Google
   Sheets rate-limit failure (112+ concurrent reads) via background precompute + snapshot caching, cutting load from
   60–90s timeouts to instant. One-click CSV export across all views.
Engineering practices: pre-flight verification & collision analysis before matching-logic changes, dry-run validation
before deploys, verified root-cause analysis over quick patches, persistent volume storage to prevent data loss,
migrated all credentials to company-owned accounts (Google Cloud, OpenRouter, GitHub org).

=== OTHER EXPERIENCE ===
- Founder & Lead Developer, NaveedTechLab (Digital Agency, 2025–Present): first clients CCTV World Karachi & Ha-Aeen
  Dentistry; digital transformation roadmaps, workflow automation, customer-acquisition systems.
- Freelance Full Stack Developer (Fiverr & Direct Clients, 2023–Present): Shopify stores, business websites, dashboards, CMS sites.
- Earlier: Mobile Software Technician (Sareena Mobile Market), VR Experience Designer, Kinect Gaming Manager
  (Mufti Ramzan Park, 6 mo), Operations Manager (Marble Shop, 1 yr), Owner — Marble Machine Parts Workshop (5 yrs).

=== SKILLS ===
Backend & Runtime: Node.js, Python, FastAPI, Express, node-cron, REST APIs
Frontend: Next.js, React, TypeScript, Tailwind CSS, HTML5/CSS3
AI & LLM: OpenAI API, Anthropic API (Claude Code), Gemini API, LangChain, OpenRouter, Agents SDK, MCP
Integrations: Slack Bot & Events API, Google Sheets/Calendar/Gmail API, Webhooks, WhatsApp, Twilio
Cloud & DevOps: Railway, Docker, Kubernetes, Kafka, Dapr, CI/CD, GitHub, persistent volume storage
Databases: MongoDB, PostgreSQL, Sanity CMS
Architecture: Event-driven & spec-driven design, fuzzy matching/alias resolution, background precompute & caching,
rate-limit-safe read pipelines, technician-scoped data validation

=== PROJECTS & HACKATHONS ===
- Autonomous AI Marketing Agency (Hackathon 2024) — live on Hugging Face Spaces.
- Personal AI Employee / Digital FTE (Hackathon 2024) — Gmail/WhatsApp automation, Obsidian memory, MCP tools, 24/7.
- Customer Success FTE / CRM Agent (Hackathon 2024) — multi-channel Gmail/WhatsApp/web, PostgreSQL tickets, FastAPI.
- Cloud-Native Microservices (2024) — reusable agent skills, Docker/Kafka/Dapr/Kubernetes.
- Plus live apps: Course Companion FTE, Todo App Phase 5, LearnFlow, AI Native Textbook, E-Commerce Store, and
  several Streamlit tools (Library Manager, Unit Converter, Secure Data Vault, Password Strength Meter).

=== EDUCATION ===
Governor House Initiative — GenAI, Web3 & Metaverse (2023–Present).
Diploma in Computer Information Technology (DCIT). Certificate in Information Technology (CIT). Matriculation.

=== AVAILABILITY ===
Open to collaborations, freelance projects, and full-time opportunities. Best contact: qureshinaveed21@hotmail.com.
`.trim();

/* Offline fallback: keyword → answer, used when no LLM key is configured. */
type Rule = { keys: string[]; answer: string };

const RULES: Rule[] = [
  { keys: ["contact", "email", "reach", "hire", "available", "phone", "number"],
    answer: "You can reach Muhammad Naveed at qureshinaveed21@hotmail.com or +92 300 3627458. He's open to freelance projects, collaborations, and full-time roles. Connect on GitHub (github.com/naveedtechlab) or LinkedIn (linkedin.com/in/naveedtechlab)." },
  { keys: ["current", "job", "activus", "heat wave", "pest", "forward", "now working", "kaam"],
    answer: "Naveed is currently a Forward-Deployed AI Automation Engineer (Apr 2026–Present) at Activus Capital Partners — Heat Wave Pest Control. He owns 5 production Slack/Google automation systems plus a live operations dashboard, supporting 8+ technicians across 123 properties in two U.S. regions." },
  { keys: ["skill", "tech", "stack", "language", "framework", "tools", "know"],
    answer: "Naveed works across Node.js, Python, FastAPI, Express, Next.js, React & TypeScript; AI/LLM tools like OpenAI, Anthropic (Claude), Gemini, LangChain, OpenRouter, Agents SDK & MCP; integrations with Slack, Google Sheets/Calendar/Gmail, Twilio; and cloud/DevOps with Railway, Docker, Kubernetes, Kafka & Dapr." },
  { keys: ["project", "built", "portfolio", "work", "app", "made"],
    answer: "Highlights: a production Slack/Google Automation Suite & live Operations Dashboard for a U.S. pest-control company, plus hackathon builds like an Autonomous AI Marketing Agency, a Personal AI Employee (Digital FTE), and a CRM support agent. Scroll to the Projects section to see live demos." },
  { keys: ["agency", "naveedtechlab", "founder", "business", "client"],
    answer: "Naveed founded NaveedTechLab, a digital agency (2025–Present) serving local Karachi businesses — first clients were CCTV World Karachi and Ha-Aeen Dentistry — delivering digital transformation roadmaps, automation, and customer-acquisition systems." },
  { keys: ["education", "study", "degree", "governor", "school", "dcit", "cit", "learn"],
    answer: "Naveed is in the Governor House Initiative program for GenAI, Web3 & Metaverse (2023–Present), and holds a Diploma (DCIT) and Certificate (CIT) in Computer/Information Technology." },
  { keys: ["experience", "history", "past", "career", "before"],
    answer: "Beyond his current AI automation role, Naveed founded NaveedTechLab, freelances full-stack (Shopify, dashboards, CMS), and previously worked as a mobile software technician, VR experience designer, Kinect gaming manager, and ran his own marble-machine parts workshop for 5 years." },
  { keys: ["who", "about", "yourself", "naveed", "kon", "introduce"],
    answer: "Muhammad Naveed is a Forward-Deployed AI Automation Engineer & Full Stack Developer based in Karachi, Pakistan. He builds and operates real-time production automation systems for a U.S. enterprise client and founded the digital agency NaveedTechLab." },
  { keys: ["location", "where", "based", "city", "country", "kahan"],
    answer: "Naveed is based in Karachi, Pakistan, and works remotely with international clients (including a U.S.-based enterprise)." },
];

export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = RULES.find((r) => r.keys.some((k) => q.includes(k)));
  if (hit) return hit.answer;
  return "I'm NaveedBot — I can tell you about Muhammad Naveed's experience, skills, projects, and how to get in touch. Try asking \"What is he working on now?\", \"What are his skills?\", or \"How do I contact him?\"";
}
