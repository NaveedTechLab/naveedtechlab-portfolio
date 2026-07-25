"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ChatBot from "./components/ChatBot";
import WhatsApp from "./components/WhatsApp";

/* ─── DATA ─────────────────────────────────────────────────── */

const skills = [
  { label: "Backend & Runtime", color: "from-violet-500 to-purple-400", tags: ["Node.js", "Python", "FastAPI", "Express", "node-cron", "REST APIs"] },
  { label: "Frontend",     color: "from-blue-500 to-cyan-400",    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5/CSS3"] },
  { label: "AI & LLM",     color: "from-lime-500 to-green-400", tags: ["OpenAI API", "Anthropic API (Claude)", "Gemini API", "LangChain", "OpenRouter", "Agents SDK", "MCP"] },
  { label: "Integrations", color: "from-green-500 to-emerald-400", tags: ["Slack Bot & Events API", "Google Sheets", "Google Calendar", "Gmail API", "Webhooks", "WhatsApp", "Twilio"] },
  { label: "Cloud & DevOps", color: "from-sky-500 to-blue-400",   tags: ["Railway", "Docker", "Kubernetes", "Kafka", "Dapr", "CI/CD", "GitHub"] },
  { label: "Database",     color: "from-rose-500 to-pink-400",    tags: ["MongoDB", "PostgreSQL", "Sanity CMS"] },
  { label: "Architecture", color: "from-teal-500 to-cyan-400",    tags: ["Event-Driven", "Spec-Driven", "Fuzzy Matching / Alias Resolution", "BG Precompute & Caching", "Rate-Limit-Safe Pipelines"] },
];

const projects = [
  {
    title: "Slack/Google Automation Suite",
    subtitle: "Production · Heat Wave Pest Control",
    desc: "Five interconnected production automation systems for a U.S. multi-region pest-control operation: a Specialty Form Compliance Bot (token-based property matching with Levenshtein fuzzy matching + alias layer across 123 properties), a real-time Notes Verification Bot with 15-min escalation, an automated Weekly Reporting Suite, and a Specialty Recommendation engine with tier-aware pricing.",
    tags: ["Node.js", "Slack API", "Google Sheets", "OpenRouter", "Railway"],
    icon: "🛰️", accent: "from-lime-500 to-green-500", live: null,
  },
  {
    title: "Live Operations Dashboard",
    subtitle: "Production · Web App",
    desc: "Password-protected ops dashboard (Express + vanilla JS) with six live sections — Overview, Route Timing, Units Allocation, Notes Bot Activity, Recommendations Tracking & Monthly Per-Technician Reporting. Slack-history route-timing engine, background precompute + snapshot caching (cut load from 60–90s timeouts to instant), and one-click CSV export.",
    tags: ["Express", "JavaScript", "Slack API", "BG Precompute", "Caching"],
    icon: "📊", accent: "from-sky-500 to-blue-500", live: null,
  },
  {
    title: "Autonomous AI Marketing Agency",
    subtitle: "Hackathon 2024 · Hugging Face",
    desc: "Fully autonomous AI marketing agency that handles campaign strategy, content generation, and client outreach — built as a live startup and deployed on Hugging Face Spaces.",
    tags: ["Python", "AI Agents", "FastAPI", "OpenAI API", "Automation"],
    icon: "📣", accent: "from-lime-500 to-yellow-500",
    live: "https://naveedtechlab-autonomous-ai-marketing-agency.hf.space/",
  },
  {
    title: "Personal AI Employee",
    subtitle: "Hackathon 2024 · Digital FTE",
    desc: "Autonomous AI employee with Gmail/WhatsApp automation, Obsidian memory system, and MCP tools — running 24/7 without human intervention.",
    tags: ["OpenAI SDK", "MCP", "Gmail API", "WhatsApp", "Python"],
    icon: "🤖", accent: "from-lime-500 to-green-500", live: null,
  },
  {
    title: "CRM Digital FTE",
    subtitle: "CRM Agent · Hugging Face",
    desc: "Multi-channel customer support agent handling Gmail, WhatsApp, and Web forms with a PostgreSQL ticket system and FastAPI backend.",
    tags: ["FastAPI", "PostgreSQL", "LangChain", "Twilio", "Python"],
    icon: "🎯", accent: "from-blue-500 to-cyan-500",
    live: "https://naveedtechlab-crm-digital-fte.hf.space",
  },
  {
    title: "Course Companion FTE",
    subtitle: "AI Tutor · Hugging Face",
    desc: "AI-powered tutoring assistant with deterministic backend logic, skills-based agent architecture, and an interactive learning interface.",
    tags: ["Python", "OpenAI API", "FastAPI", "Streamlit"],
    icon: "📚", accent: "from-violet-500 to-purple-500",
    live: "https://naveedtechlab-course-companion-fte.hf.space",
  },
  {
    title: "Todo App Phase 5",
    subtitle: "Full Stack · Hugging Face",
    desc: "Spec-driven todo app evolved from console to full-stack with AI chatbot, cloud-native deployment, and OpenAI Agents SDK integration.",
    tags: ["Next.js", "FastAPI", "OpenAI SDK", "Docker"],
    icon: "✅", accent: "from-green-500 to-emerald-500",
    live: "https://naveedtechlab-todo-app-phase5.hf.space",
  },
  {
    title: "LearnFlow",
    subtitle: "Learning Platform · Hugging Face",
    desc: "Interactive AI-assisted learning flow platform with structured modules and an intuitive UI for seamless education experiences.",
    tags: ["Python", "AI", "Streamlit", "OpenAI API"],
    icon: "🎓", accent: "from-sky-500 to-blue-500",
    live: "https://naveedtechlab-learnflow.hf.space",
  },
  {
    title: "AI Native Textbook",
    subtitle: "EdTech · Vercel",
    desc: "AI-native digital textbook delivering interactive, intelligent content — blending traditional learning with generative AI capabilities.",
    tags: ["Next.js", "OpenAI API", "Vercel", "TypeScript"],
    icon: "📖", accent: "from-indigo-500 to-violet-500",
    live: "https://ai-native-textbook1.vercel.app/",
  },
  {
    title: "E-Commerce Store",
    subtitle: "Freelance · Vercel",
    desc: "Modern full-featured e-commerce web app with product listings, cart functionality, and a clean responsive UI — deployed on Vercel.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    icon: "🛍️", accent: "from-rose-500 to-pink-500",
    live: "https://e-comm-naveed.vercel.app/",
  },
  {
    title: "Library Manager",
    subtitle: "Utility App · Streamlit",
    desc: "Smart library management system to add, search, and manage books with an intuitive Streamlit interface and persistent data storage.",
    tags: ["Python", "Streamlit", "Pandas"],
    icon: "📕", accent: "from-green-500 to-lime-500",
    live: "https://naveed247365-library-manager-library-manager-iykdx8.streamlit.app/",
  },
  {
    title: "Number Guessing Game",
    subtitle: "Fun App · Streamlit",
    desc: "Interactive browser-based number guessing game with difficulty levels and score tracking built with Python and Streamlit.",
    tags: ["Python", "Streamlit", "Game Logic"],
    icon: "🎮", accent: "from-teal-500 to-cyan-500",
    live: "https://naveed247365-number-guessing-game-guessing-game-kfloll.streamlit.app/",
  },
  {
    title: "Password Strength Meter",
    subtitle: "Security Tool · Streamlit",
    desc: "Real-time password strength analyzer with visual feedback, entropy scoring, and security suggestions.",
    tags: ["Python", "Streamlit", "Security", "GUI"],
    icon: "🔐", accent: "from-red-500 to-rose-500",
    live: "https://password-strength-meter-with-a-gui.streamlit.app/",
  },
  {
    title: "Secure Data Vault",
    subtitle: "Encryption App · Streamlit",
    desc: "End-to-end data encryption system to securely store and retrieve sensitive information using modern cryptographic algorithms.",
    tags: ["Python", "Cryptography", "Streamlit", "Security"],
    icon: "🔒", accent: "from-slate-500 to-gray-600",
    live: "https://naveed247365-secure-data-encryption-system--secure-vault-sbgxir.streamlit.app/",
  },
  {
    title: "Unit Converter",
    subtitle: "Utility Tool · Streamlit",
    desc: "Comprehensive unit conversion tool supporting length, weight, temperature, speed, and more — with a fast Streamlit interface.",
    tags: ["Python", "Streamlit", "Math"],
    icon: "📐", accent: "from-lime-500 to-green-500",
    live: "https://naveed247365-unit-converter-unit-converter-cycms9.streamlit.app/",
  },
  {
    title: "Streamlit Web App",
    subtitle: "Web App · Streamlit",
    desc: "Dynamic multi-feature web application showcasing Python-powered interactivity, data visualization, and UI components.",
    tags: ["Python", "Streamlit", "Data Viz"],
    icon: "🌐", accent: "from-fuchsia-500 to-pink-500",
    live: "https://naveed247365-web-app-with-streamlit-app-hnkir1.streamlit.app/",
  },
  {
    title: "Fiverr Freelance Work",
    subtitle: "Freelance · Client Projects",
    desc: "Shopify stores, custom dashboards, CMS-based websites, and automation workflows for clients — from design to deployment.",
    tags: ["Shopify", "React", "Sanity CMS", "Node.js"],
    icon: "💼", accent: "from-yellow-500 to-green-400", live: null,
  },
];

const experience = [
  {
    icon: "🛰️", title: "AI Automation Engineer (Forward-Deployed)",
    org: "Activus Capital Partners — Heat Wave Pest Control", period: "Apr 2026 – Present",
    accent: "from-lime-500 to-green-500",
    desc: "Own and operate five production Slack/Google Workspace automation systems plus a live operations dashboard for a U.S. multi-region pest-control company — supporting 8+ field technicians across 123 properties. Compliance bots, notes verification, weekly reporting, a recommendation engine, and a route-timing dashboard, with daily production monitoring, root-cause debugging, and same-day fixes. Report directly to the Managing Partner, Operations Coordinator & Director.",
    live: null,
  },
  {
    icon: "🏢", title: "Founder & Lead Developer",
    org: "NaveedTechLab · Digital Agency", period: "2025 – Present",
    accent: "from-violet-500 to-purple-500",
    desc: "Built a digital agency targeting local Karachi businesses — secured first two clients (CCTV World Karachi & Ha-Aeen Dentistry). Produced 6-month digital transformation roadmaps, partner agreements, and pricing strategy; delivered digital footprint setup, customer-acquisition systems, and workflow automation.",
    live: null,
  },
  {
    icon: "💻", title: "Freelance Full Stack Developer",
    org: "Fiverr & Direct Clients · Remote", period: "2023 – Present",
    accent: "from-blue-500 to-cyan-500",
    desc: "Delivered Shopify stores, business websites, custom dashboards, CMS-based sites, and automation workflows end-to-end — from requirements through design, development, and deployment.",
    live: null,
  },
  {
    icon: "📱", title: "Mobile Software Technician",
    org: "Sareena Mobile Market", period: "Past Experience",
    accent: "from-blue-500 to-cyan-500",
    desc: "Performed mobile software flashing, firmware updates, and software recovery for a wide range of Android and feature phones in a high-volume repair environment.",
    live: null,
  },
  {
    icon: "🥽", title: "VR Experience Designer",
    org: "Freelance / Event-Based", period: "Past Experience",
    accent: "from-violet-500 to-purple-500",
    desc: "Designed and set up immersive VR sitting and riding simulation experiences for events, including hardware configuration and user experience flow.",
    live: null,
  },
  {
    icon: "🎮", title: "Kinect Gaming Manager",
    org: "Mufti Ramzan Park · Xbox 360 Kinect", period: "6 Months",
    accent: "from-green-500 to-emerald-500",
    desc: "Designed and managed a large-scale Kinect-based interactive gaming setup on a 12-foot screen at Mufti Ramzan Park. Handled installation, daily operations, and visitor engagement.",
    live: null,
  },
  {
    icon: "🏢", title: "Operations Manager",
    org: "Marble Shop", period: "1 Year",
    accent: "from-sky-500 to-blue-500",
    desc: "Managed day-to-day operations of a marble retail business — overseeing inventory, vendor relations, staff coordination, and customer sales.",
    live: null,
  },
  {
    icon: "🔧", title: "Owner – Marble Machine Parts Workshop",
    org: "Self-Employed Business", period: "5 Years",
    accent: "from-rose-500 to-pink-500",
    desc: "Ran an independent workshop manufacturing and supplying spare parts for marble cutting and polishing machinery. Managed production, client orders, and business operations end-to-end.",
    live: null,
  },
];

const navLinks = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

/* ─── MAIN ─────────────────────────────────────────────────── */

export default function Portfolio() {
  const [active, setActive]     = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark]         = useState(true);

  /* persist theme */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  /* ── theme tokens ── */
  const bg      = dark ? "bg-[#0a0a0a]"   : "bg-slate-50";
  const surface = dark ? "bg-[#111111]"   : "bg-white";
  const card    = dark ? "bg-white/5 border-white/8"  : "bg-white border-slate-200";
  const txt     = dark ? "text-white"      : "text-slate-900";
  const muted   = dark ? "text-slate-400"  : "text-slate-500";
  const navBg   = scrolled
    ? dark ? "bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5"
           : "bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200"
    : "bg-transparent";

  return (
    <div className={`${bg} ${txt} min-h-screen overflow-x-hidden transition-colors duration-300`}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <span className="text-lime-400 font-bold text-lg tracking-wider flex-shrink-0">MN<span className={txt}>.</span></span>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((l) => (
              <li key={l}>
                <button onClick={() => scrollTo(l)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    active === l ? "text-lime-400" : `${muted} hover:${txt}`}`}>
                  {l}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                dark ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"}`}
              title="Toggle theme"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <a href="/Muhammad_Naveed_CV.pdf" download
              className="hidden sm:inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-400 text-black text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 flex-shrink-0">
              ↓ CV
            </a>

            {/* Mobile hamburger */}
            <button className={`md:hidden text-xl ${txt}`} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 ${
            dark ? "bg-[#111111] border-white/10" : "bg-white border-slate-200"}`}>
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}
                className={`text-left text-sm font-medium transition-colors ${muted} hover:text-lime-400`}>
                {l}
              </button>
            ))}
            <a href="/Muhammad_Naveed_CV.pdf" download
              className="bg-lime-500 text-black text-sm font-bold px-4 py-2 rounded-full text-center">
              ↓ Download CV
            </a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section id="about" className="min-h-screen flex items-center justify-center relative pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
        {/* blobs */}
        <div className="absolute top-20 left-0 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center">

          {/* Text */}
          <div className="animate-fade-left order-2 md:order-1 text-center md:text-left">
            {/* Terminal window */}
            <div className={`inline-block text-left rounded-xl border font-mono text-xs mb-5 overflow-hidden shadow-xl ${
              dark ? "bg-black/60 border-white/10" : "bg-slate-900 border-slate-700"}`}>
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-slate-400 text-[10px]">naveedtechlab ~ portfolio</span>
              </div>
              <div className="px-3.5 py-2.5">
                <span className="text-slate-500">$ </span>
                <span className="text-lime-400">claude code</span>
                <span className="text-slate-300"> --deploy --spec-first</span>
                <span className="text-lime-400 animate-blink">█</span>
              </div>
            </div>

            <span className="flex items-center gap-2 justify-center md:justify-start bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 w-fit mx-auto md:mx-0">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" /> Available for Work
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-lime-400 via-green-400 to-lime-300 bg-clip-text text-transparent animate-gradient">
                Muhammad
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Naveed
              </span>
            </h1>

            <p className={`${muted} text-sm sm:text-base lg:text-lg leading-relaxed mb-7 max-w-lg mx-auto md:mx-0`}>
              <span className={`${txt} font-semibold`}>Forward-Deployed AI Automation Engineer</span> &amp;{" "}
              <span className={`${txt} font-semibold`}>Full Stack Developer</span> — building &amp; operating{" "}
              <span className="text-lime-400 font-semibold">production automation systems</span> for a U.S. enterprise client, from Karachi, Pakistan.
            </p>

            <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
              <button onClick={() => scrollTo("Projects")}
                className="bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-400 hover:to-green-400 text-black font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-lime-500/25 text-sm sm:text-base">
                View Projects →
              </button>
              <button onClick={() => scrollTo("Contact")}
                className={`border font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 hover:scale-105 text-sm sm:text-base ${
                  dark ? "border-white/20 hover:border-lime-400/50 text-white" : "border-slate-300 hover:border-lime-400 text-slate-700"}`}>
                Contact Me
              </button>
            </div>

            {/* Socials */}
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {[
                { label: "WhatsApp",  href: "https://wa.me/923003627458",               icon: "🟢" },
                { label: "GitHub",    href: "https://github.com/naveedtechlab",        icon: "⌨️" },
                { label: "LinkedIn",  href: "https://linkedin.com/in/naveedtechlab",    icon: "💼" },
                { label: "YouTube",   href: "https://youtube.com/@naveedtechlab",       icon: "▶️" },
                { label: "Instagram", href: "https://instagram.com/naveedtechlab",      icon: "📸" },
                { label: "X",         href: "https://x.com/naveedtechlab",              icon: "𝕏"  },
                { label: "Facebook",  href: "https://facebook.com/naveedtechlab",       icon: "📘" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`border text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 hover:text-lime-400 hover:border-lime-400/40 ${
                    dark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-600"}`}>
                  <span>{s.icon}</span>{s.label}
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 max-w-md mx-auto md:mx-0">
              {[
                { n: "5", l: "Production Systems" },
                { n: "123", l: "Properties Served" },
                { n: "15+", l: "Projects Shipped" },
              ].map((st) => (
                <div key={st.l} className={`rounded-xl border px-2 py-3 text-center ${
                  dark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}>
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-lime-400">{st.n}</div>
                  <div className={`text-[10px] sm:text-xs mt-0.5 leading-tight ${muted}`}>{st.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center animate-fade-right order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed border-lime-400/30 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-400/20 to-blue-600/20 blur-2xl animate-pulse" />
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-lime-400 animate-pulse-ring animate-float shadow-2xl shadow-lime-500/20">
                <Image src="/profile.jpg" alt="Muhammad Naveed" fill className="object-cover object-top" priority />
              </div>
              <div className={`absolute -top-1 -right-3 sm:-top-2 sm:-right-4 border rounded-2xl px-2.5 py-1.5 text-xs font-bold text-lime-400 shadow-xl animate-fade-up delay-300 ${
                dark ? "bg-white/5 backdrop-blur-lg border-white/10" : "bg-white border-slate-200"}`}>
                🤖 AI Engineer
              </div>
              <div className={`absolute -bottom-1 -left-3 sm:-bottom-2 sm:-left-4 border rounded-2xl px-2.5 py-1.5 text-xs font-bold text-cyan-400 shadow-xl animate-fade-up delay-500 ${
                dark ? "bg-white/5 backdrop-blur-lg border-white/10" : "bg-white border-slate-200"}`}>
                ⚡ 5 Production Systems
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════
          SKILLS
      ══════════════════════════════════ */}
      <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        {dark && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />}
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="What I work with" title="Technical Skills"
            sub="Full-spectrum expertise from frontend to AI agent orchestration" dark={dark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {skills.map((s, i) => (
              <div key={s.label}
                className={`border rounded-2xl p-4 sm:p-5 card-hover animate-fade-up ${card}`}
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`inline-block bg-gradient-to-r ${s.color} text-transparent bg-clip-text font-bold text-xs sm:text-sm tracking-wider uppercase mb-3`}>
                  {s.label}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {s.tags.map((t) => (
                    <span key={t}
                      className={`text-xs px-2.5 sm:px-3 py-1 rounded-full border transition-colors duration-200 cursor-default hover:text-lime-400 hover:border-lime-400/40 ${
                        dark ? "bg-white/5 border-white/10 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PROJECTS
      ══════════════════════════════════ */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        {dark && <>
          <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-lime-500/8 rounded-full blur-3xl pointer-events-none" />
        </>}
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="What I've built" title="Projects & Experience"
            sub="Production-grade AI systems, hackathon wins, live apps & client projects" dark={dark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p, i) => (
              <div key={p.title}
                className={`border rounded-2xl p-4 sm:p-6 card-hover flex flex-col gap-3 sm:gap-4 animate-fade-up ${card}`}
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${p.accent} rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                    {p.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full text-right ${
                    dark ? "text-slate-500 bg-white/5" : "text-slate-400 bg-slate-100"}`}>
                    {p.subtitle}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold text-sm sm:text-base mb-1.5 sm:mb-2 ${txt}`}>{p.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${muted}`}>{p.desc}</p>
                </div>

                <div className={`flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t ${dark ? "border-white/5" : "border-slate-100"}`}>
                  {p.tags.map((t) => (
                    <span key={t}
                      className={`text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r ${p.accent} text-white border border-white/10 opacity-80`}>
                      {t}
                    </span>
                  ))}
                </div>

                {"live" in p && p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 bg-gradient-to-r ${p.accent} text-white text-xs font-bold py-2 px-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-md`}>
                    🚀 Live Demo
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════ */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        {dark && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/15 to-transparent pointer-events-none" />}
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="My journey" title="Work Experience"
            sub="From forward-deployed AI automation for a U.S. enterprise to founding my own agency" dark={dark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {experience.map((e, i) => (
              <div key={e.title}
                className={`border rounded-2xl p-4 sm:p-6 card-hover flex flex-col gap-3 sm:gap-4 animate-fade-up ${card}`}
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${e.accent} rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                    {e.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full text-right ${
                    dark ? "text-slate-500 bg-white/5" : "text-slate-400 bg-slate-100"}`}>
                    {e.period}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-sm sm:text-base mb-0.5 ${dark ? "text-white" : "text-slate-900"}`}>{e.title}</h3>
                  <p className={`text-xs font-semibold bg-gradient-to-r ${e.accent} bg-clip-text text-transparent mb-2`}>{e.org}</p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${muted}`}>{e.desc}</p>
                </div>
                {e.live && (
                  <a href={e.live} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 bg-gradient-to-r ${e.accent} text-white text-xs font-bold py-2 px-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-md`}>
                    🚀 Live Demo
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          EDUCATION
      ══════════════════════════════════ */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="My background" title="Education"
            sub="Continuous learning in cutting-edge technologies" dark={dark} />
          <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-5">
            {[
              {
                icon: "🎓", degree: "Governor House Initiative", field: "GenAI, Web3 & Metaverse",
                year: "2023 – Present", accent: "from-lime-500 to-green-500",
                desc: "Intensive government-backed program covering Generative AI, Web3 technologies, Metaverse development, and modern engineering practices.",
              },
              {
                icon: "💻", degree: "DCIT – Diploma in Computer IT", field: "Diploma in Computer Information Technology",
                year: "Completed", accent: "from-violet-500 to-purple-500",
                desc: "Comprehensive diploma covering computer fundamentals, software applications, networking basics, and information technology principles.",
              },
              {
                icon: "🖥️", degree: "CIT – Certificate in IT", field: "Certificate in Information Technology",
                year: "Completed", accent: "from-green-500 to-emerald-500",
                desc: "Foundational certificate program in computer operations, office software, and basic IT skills.",
              },
              {
                icon: "📚", degree: "Crescent Grammar School", field: "Matriculation",
                year: "Completed", accent: "from-blue-500 to-cyan-500",
                desc: "Foundation education building analytical thinking and problem-solving skills.",
              },
            ].map((e, i) => (
              <div key={e.degree}
                className={`border rounded-2xl p-4 sm:p-6 card-hover flex gap-4 sm:gap-5 animate-fade-up ${card}`}
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${e.accent} rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-lg`}>
                  {e.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                    <h3 className={`font-bold text-sm sm:text-base ${txt}`}>{e.degree}</h3>
                    <span className="text-xs text-lime-400 font-semibold bg-lime-500/10 border border-lime-500/20 px-2.5 py-0.5 rounded-full flex-shrink-0">
                      {e.year}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold bg-gradient-to-r ${e.accent} bg-clip-text text-transparent mb-1.5`}>{e.field}</p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${muted}`}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT
      ══════════════════════════════════ */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        {dark && <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent pointer-events-none" />}
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Let's connect" title="Get In Touch"
            sub="Open to collaborations, freelance projects, and full-time opportunities" dark={dark} />
          <div className="max-w-2xl mx-auto">
            <div className={`border rounded-3xl p-6 sm:p-8 md:p-12 text-center animate-fade-up ${card}`}>
              <p className={`text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto ${muted}`}>
                Whether you need an <span className="text-lime-400 font-semibold">AI automation system</span>,
                a full-stack web app, or a custom agent — I&apos;m ready to build it.
                <br className="hidden sm:block" />
                <span className="text-xs font-mono text-lime-400/80">// for Pakistan / UAE — WhatsApp preferred ⚡</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {[
                  { icon: "✉️", label: "Email",     value: "qureshinaveed21@hotmail.com",        href: "mailto:qureshinaveed21@hotmail.com" },
                  { icon: "🟢", label: "WhatsApp",  value: "+92 300 3627458",                    href: "https://wa.me/923003627458" },
                  { icon: "⌨️", label: "GitHub",    value: "naveedtechlab",                      href: "https://github.com/naveedtechlab" },
                  { icon: "💼", label: "LinkedIn",  value: "naveedtechlab",                      href: "https://linkedin.com/in/naveedtechlab" },
                  { icon: "▶️", label: "YouTube",   value: "@naveedtechlab",                     href: "https://youtube.com/@naveedtechlab" },
                  { icon: "📸", label: "Instagram", value: "@naveedtechlab",                     href: "https://instagram.com/naveedtechlab" },
                  { icon: "𝕏",  label: "X",         value: "@naveedtechlab",                     href: "https://x.com/naveedtechlab" },
                  { icon: "📘", label: "Facebook",  value: "naveedtechlab",                      href: "https://facebook.com/naveedtechlab" },
                  { icon: "📍", label: "Location",  value: "Karachi, Pakistan",                  href: "#" },
                ].map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                    className={`border rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-200 hover:scale-105 group hover:border-lime-400/40 ${
                      dark ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-lime-50"}`}>
                    <span className="text-xl sm:text-2xl">{c.icon}</span>
                    <span className={`text-xs uppercase tracking-widest ${muted}`}>{c.label}</span>
                    <span className={`text-xs font-medium group-hover:text-lime-400 transition-colors text-center break-all leading-tight ${txt}`}>
                      {c.value}
                    </span>
                  </a>
                ))}
              </div>

              <a href="mailto:qureshinaveed21@hotmail.com"
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-400 hover:to-green-400 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-xl shadow-lime-500/25 text-sm sm:text-base">
                ✉️ Send Me an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-6 sm:py-8 px-4 sm:px-6 text-center ${dark ? "border-white/5" : "border-slate-200"}`}>
        <p className={`text-xs sm:text-sm font-mono ${muted}`}>
          <span className="text-lime-500/60">$ </span>
          © 2026 <span className="text-lime-400 font-semibold">Muhammad Naveed</span> · built with Next.js &amp; Tailwind CSS
        </p>
      </footer>

      {/* FLOATING BUTTONS */}
      <ChatBot dark={dark} />
      <WhatsApp />
    </div>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, sub, dark }: {
  eyebrow: string; title: string; sub: string; dark: boolean;
}) {
  return (
    <div className="text-center mb-10 sm:mb-14 animate-fade-up">
      <span className="inline-block font-mono text-lime-400 text-sm mb-3">
        <span className="text-slate-500">// </span>{title.toLowerCase().replace(/\s+/g, "-")}
      </span>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      <p className={`text-sm sm:text-base max-w-xl mx-auto font-mono ${dark ? "text-slate-500" : "text-slate-500"}`}>
        <span className="text-lime-500/60">{"> "}</span>{sub}
      </p>
    </div>
  );
}
