"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */

const skills = [
  {
    label: "Frontend",
    color: "from-blue-500 to-cyan-400",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    label: "Backend",
    color: "from-violet-500 to-purple-400",
    tags: ["Python", "FastAPI", "Node.js", "REST APIs", "Authentication"],
  },
  {
    label: "AI & Agents",
    color: "from-amber-500 to-orange-400",
    tags: ["OpenAI API", "Gemini API", "LangChain", "Claude Code", "Agents SDK", "MCP"],
  },
  {
    label: "Automation",
    color: "from-green-500 to-emerald-400",
    tags: ["Gmail API", "WhatsApp/Twilio", "Webhooks", "Watchers", "BG Workers"],
  },
  {
    label: "Cloud & DevOps",
    color: "from-sky-500 to-blue-400",
    tags: ["Docker", "Kubernetes", "Kafka", "Dapr", "CI/CD", "GitHub"],
  },
  {
    label: "Database",
    color: "from-rose-500 to-pink-400",
    tags: ["MongoDB", "PostgreSQL", "Sanity CMS"],
  },
  {
    label: "Architecture",
    color: "from-teal-500 to-cyan-400",
    tags: ["Spec-Driven Dev", "Event-Driven", "Agent Skills Design"],
  },
];

const projects = [
  {
    title: "Personal AI Employee",
    subtitle: "Digital FTE · Hackathon",
    desc: "Autonomous AI employee with Gmail/WhatsApp automation, Obsidian memory system, and MCP tools — running 24/7 without human intervention.",
    tags: ["OpenAI SDK", "MCP", "Gmail API", "WhatsApp", "Python"],
    icon: "🤖",
    accent: "from-amber-500 to-orange-500",
    live: null,
  },
  {
    title: "CRM Digital FTE",
    subtitle: "CRM Agent · Hugging Face",
    desc: "Multi-channel customer support agent handling Gmail, WhatsApp, and Web forms with a PostgreSQL ticket system and FastAPI backend. Live on Hugging Face Spaces.",
    tags: ["FastAPI", "PostgreSQL", "LangChain", "Twilio", "Python"],
    icon: "🎯",
    accent: "from-blue-500 to-cyan-500",
    live: "https://huggingface.co/spaces/Naveedtechlab/crm-digital-fte",
  },
  {
    title: "Course Companion FTE",
    subtitle: "AI Tutor · Hugging Face",
    desc: "AI-powered tutoring assistant with deterministic backend logic, skills-based agent architecture, and an interactive learning interface.",
    tags: ["Python", "OpenAI API", "FastAPI", "Streamlit"],
    icon: "📚",
    accent: "from-violet-500 to-purple-500",
    live: "https://huggingface.co/spaces/Naveedtechlab/course-companion-fte",
  },
  {
    title: "Todo App Phase 5",
    subtitle: "Full Stack · Hugging Face",
    desc: "Spec-driven todo application evolved from a console app to a full-stack web app with an AI chatbot, cloud-native deployment, and OpenAI Agents SDK integration.",
    tags: ["Next.js", "FastAPI", "OpenAI SDK", "Docker"],
    icon: "✅",
    accent: "from-green-500 to-emerald-500",
    live: "https://huggingface.co/spaces/Naveedtechlab/todo-app-phase5",
  },
  {
    title: "LearnFlow",
    subtitle: "Learning Platform · Hugging Face",
    desc: "Interactive learning flow platform with AI-assisted content delivery, structured modules, and an intuitive UI for seamless education experiences.",
    tags: ["Python", "AI", "Streamlit", "OpenAI API"],
    icon: "🎓",
    accent: "from-sky-500 to-blue-500",
    live: "https://huggingface.co/spaces/Naveedtechlab/learnflow",
  },
  {
    title: "AI Native Textbook",
    subtitle: "EdTech · Vercel",
    desc: "AI-native digital textbook application that delivers interactive, intelligent content — blending traditional learning with generative AI capabilities.",
    tags: ["Next.js", "OpenAI API", "Vercel", "TypeScript"],
    icon: "📖",
    accent: "from-indigo-500 to-violet-500",
    live: "https://ai-native-textbook1.vercel.app/",
  },
  {
    title: "E-Commerce Store",
    subtitle: "Freelance · Vercel",
    desc: "Modern full-featured e-commerce web application with product listings, cart functionality, and a clean responsive UI — deployed on Vercel.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    icon: "🛍️",
    accent: "from-rose-500 to-pink-500",
    live: "https://e-comm-naveed.vercel.app/",
  },
  {
    title: "Library Manager",
    subtitle: "Utility App · Streamlit",
    desc: "A smart library management system to add, search, and manage books with an intuitive Streamlit interface and persistent data storage.",
    tags: ["Python", "Streamlit", "Pandas"],
    icon: "📕",
    accent: "from-orange-500 to-amber-500",
    live: "https://naveed247365-library-manager-library-manager-iykdx8.streamlit.app/",
  },
  {
    title: "Number Guessing Game",
    subtitle: "Fun App · Streamlit",
    desc: "Interactive browser-based number guessing game with difficulty levels, score tracking, and a fun UI built with Python and Streamlit.",
    tags: ["Python", "Streamlit", "Game Logic"],
    icon: "🎮",
    accent: "from-teal-500 to-cyan-500",
    live: "https://naveed247365-number-guessing-game-guessing-game-kfloll.streamlit.app/",
  },
  {
    title: "Password Strength Meter",
    subtitle: "Security Tool · Streamlit",
    desc: "Real-time password strength analyzer with visual feedback, entropy scoring, and security suggestions — helping users create stronger passwords.",
    tags: ["Python", "Streamlit", "Security", "GUI"],
    icon: "🔐",
    accent: "from-red-500 to-rose-500",
    live: "https://password-strength-meter-with-a-gui.streamlit.app/",
  },
  {
    title: "Secure Data Vault",
    subtitle: "Encryption App · Streamlit",
    desc: "End-to-end data encryption system that lets users securely store and retrieve sensitive information using modern cryptographic algorithms.",
    tags: ["Python", "Cryptography", "Streamlit", "Security"],
    icon: "🔒",
    accent: "from-slate-500 to-gray-600",
    live: "https://naveed247365-secure-data-encryption-system--secure-vault-sbgxir.streamlit.app/",
  },
  {
    title: "Unit Converter",
    subtitle: "Utility Tool · Streamlit",
    desc: "Comprehensive unit conversion tool supporting length, weight, temperature, speed, and more — with a clean, fast Streamlit interface.",
    tags: ["Python", "Streamlit", "Math"],
    icon: "📐",
    accent: "from-lime-500 to-green-500",
    live: "https://naveed247365-unit-converter-unit-converter-cycms9.streamlit.app/",
  },
  {
    title: "Streamlit Web App",
    subtitle: "Web App · Streamlit",
    desc: "A dynamic multi-feature web application built with Streamlit showcasing Python-powered interactivity, data visualization, and UI components.",
    tags: ["Python", "Streamlit", "Data Viz"],
    icon: "🌐",
    accent: "from-fuchsia-500 to-pink-500",
    live: "https://naveed247365-web-app-with-streamlit-app-hnkir1.streamlit.app/",
  },
  {
    title: "E-Commerce (Fiverr)",
    subtitle: "Freelance · Client Projects",
    desc: "Shopify stores, custom dashboards, CMS-based websites, and full automation workflows for clients — from design to deployment.",
    tags: ["Shopify", "React", "Sanity CMS", "Node.js"],
    icon: "💼",
    accent: "from-yellow-500 to-orange-400",
    live: null,
  },
];

const navLinks = ["About", "Skills", "Projects", "Education", "Contact"];

/* ─── COMPONENT ─────────────────────────────────────────────── */

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#060d1f] text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-2xl shadow-black/40" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-amber-400 font-bold text-lg tracking-wider">
            MN<span className="text-white">.</span>
          </span>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    active === l ? "text-amber-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>

          <a
            href="/Muhammad_Naveed_CV.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            ↓ Download CV
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-left text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
              >
                {l}
              </button>
            ))}
            <a
              href="/Muhammad_Naveed_CV.pdf"
              download
              className="bg-amber-500 text-black text-sm font-bold px-4 py-2 rounded-full text-center"
            >
              ↓ Download CV
            </a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO / ABOUT
      ══════════════════════════════════════════ */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center relative pt-24 pb-16 px-6 overflow-hidden"
      >
        {/* BG blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-left">
            <span className="inline-block bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Available for Work
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent animate-gradient">
                Muhammad
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Naveed
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              <span className="text-white font-semibold">AI Automation Engineer</span> &amp;{" "}
              <span className="text-white font-semibold">Full Stack Developer</span> building
              autonomous <span className="text-amber-400 font-semibold">Digital FTE</span> systems,
              intelligent agents, and cloud-native applications that run 24/7 — from Karachi, Pakistan.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo("Projects")}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/25"
              >
                View Projects →
              </button>
              <button
                onClick={() => scrollTo("Contact")}
                className="glass border border-white/20 hover:border-amber-400/50 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
              >
                Contact Me
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[
                { label: "GitHub",    href: "https://github.com/naveedtechlab",            icon: "⌨️" },
                { label: "LinkedIn",  href: "https://linkedin.com/in/naveedtechlab",        icon: "💼" },
                { label: "YouTube",   href: "https://youtube.com/@naveedtechlab",           icon: "▶️" },
                { label: "Instagram", href: "https://instagram.com/naveedtechlab",          icon: "📸" },
                { label: "X",         href: "https://x.com/naveedtechlab",                  icon: "𝕏" },
                { label: "Facebook",  href: "https://facebook.com/naveedtechlab",           icon: "📘" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-400 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center animate-fade-right">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-amber-400/30 animate-spin-slow" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-blue-600/20 blur-2xl animate-pulse" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-amber-400 animate-pulse-ring animate-float shadow-2xl shadow-amber-500/20">
                <Image
                  src="/profile.jpg"
                  alt="Muhammad Naveed"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-4 glass border border-white/10 rounded-2xl px-3 py-2 text-xs font-bold text-amber-400 shadow-xl animate-fade-up delay-300">
                🤖 AI Engineer
              </div>
              <div className="absolute -bottom-2 -left-4 glass border border-white/10 rounded-2xl px-3 py-2 text-xs font-bold text-cyan-400 shadow-xl animate-fade-up delay-500">
                ⚡ 5+ AI Systems
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════ */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What I work with"
            title="Technical Skills"
            sub="Full-spectrum expertise from frontend to AI agent orchestration"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {skills.map((s, i) => (
              <div
                key={s.label}
                className="glass border border-white/8 rounded-2xl p-5 card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`inline-block bg-gradient-to-r ${s.color} text-transparent bg-clip-text font-bold text-sm tracking-wider uppercase mb-3`}>
                  {s.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full hover:border-amber-400/40 hover:text-amber-300 transition-colors duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════ */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What I&apos;ve built"
            title="Projects & Experience"
            sub="Production-grade AI systems, hackathon wins, live apps & client projects"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={p.title}
                className="glass border border-white/8 rounded-2xl p-6 card-hover flex flex-col gap-4 animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${p.accent} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {p.icon}
                  </div>
                  <span className="text-xs text-slate-500 font-medium bg-white/5 px-3 py-1 rounded-full text-right">
                    {p.subtitle}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${p.accent} opacity-80 text-white border border-white/10`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {"live" in p && p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-1 flex items-center justify-center gap-2 bg-gradient-to-r ${p.accent} text-white text-xs font-bold py-2 px-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg`}
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EDUCATION
      ══════════════════════════════════════════ */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="My background"
            title="Education"
            sub="Continuous learning in cutting-edge technologies"
          />
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            {[
              {
                icon: "🎓",
                degree: "Governor House Initiative",
                field: "GenAI, Web3 & Metaverse",
                year: "2023 – Present",
                desc: "Intensive government-backed program covering Generative AI, Web3 technologies, Metaverse development, and modern engineering practices.",
                accent: "from-amber-500 to-orange-500",
              },
              {
                icon: "📚",
                degree: "Crescent Grammar School",
                field: "Matriculation",
                year: "Completed",
                desc: "Foundation education building analytical thinking and problem-solving skills.",
                accent: "from-blue-500 to-cyan-500",
              },
            ].map((e, i) => (
              <div
                key={e.degree}
                className="glass border border-white/8 rounded-2xl p-6 card-hover flex gap-5 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${e.accent} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                  {e.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                    <h3 className="text-white font-bold text-base">{e.degree}</h3>
                    <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 rounded-full">
                      {e.year}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${e.accent} bg-clip-text text-transparent mb-2`}>
                    {e.field}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Let&apos;s connect"
            title="Get In Touch"
            sub="Open to collaborations, freelance projects, and full-time opportunities"
          />
          <div className="max-w-2xl mx-auto">
            <div className="glass border border-white/8 rounded-3xl p-8 md:p-12 text-center animate-fade-up">
              <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-lg mx-auto">
                Whether you need an{" "}
                <span className="text-amber-400 font-semibold">AI automation system</span>,
                a full-stack web app, or a custom agent — I&apos;m ready to build it.
                Let&apos;s make something great together.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: "✉️", label: "Email",     value: "qureshinaveed21@hotmail.com",        href: "mailto:qureshinaveed21@hotmail.com" },
                  { icon: "⌨️", label: "GitHub",    value: "naveedtechlab",                      href: "https://github.com/naveedtechlab" },
                  { icon: "💼", label: "LinkedIn",  value: "naveedtechlab",                      href: "https://linkedin.com/in/naveedtechlab" },
                  { icon: "▶️", label: "YouTube",   value: "@naveedtechlab",                     href: "https://youtube.com/@naveedtechlab" },
                  { icon: "📸", label: "Instagram", value: "@naveedtechlab",                     href: "https://instagram.com/naveedtechlab" },
                  { icon: "𝕏",  label: "X",         value: "@naveedtechlab",                     href: "https://x.com/naveedtechlab" },
                  { icon: "📘", label: "Facebook",  value: "naveedtechlab",                      href: "https://facebook.com/naveedtechlab" },
                  { icon: "📍", label: "Location",  value: "Karachi, Pakistan",                  href: "#" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 group"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest">{c.label}</span>
                    <span className="text-sm text-white font-medium group-hover:text-amber-400 transition-colors text-center break-all">
                      {c.value}
                    </span>
                  </a>
                ))}
              </div>

              <a
                href="mailto:qureshinaveed21@hotmail.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-xl shadow-amber-500/25 text-base"
              >
                ✉️ Send Me an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-slate-500 text-sm">
          © 2026{" "}
          <span className="text-amber-400 font-semibold">Muhammad Naveed</span>
          {" "}· Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center mb-14 animate-fade-up">
      <span
        className="inline-block text-amber-400 text-xs font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-4"
        dangerouslySetInnerHTML={{ __html: eyebrow }}
      />
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{title}</h2>
      <p className="text-slate-400 text-base max-w-xl mx-auto">{sub}</p>
    </div>
  );
}
