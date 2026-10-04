"use client";

import Image from "next/image";
import { useState } from "react";
import ChatBot from "./components/ChatBot";
import WhatsApp from "./components/WhatsApp";
import { projects as allProjects, experience, skills } from "./lib/portfolio-data";

const projectRepositories: Record<string, string> = {
  "Course Companion FTE": "https://github.com/NaveedTechLab/Hackathon-4-Course-Companion-FTE-",
  "Todo App Phase 5": "https://github.com/NaveedTechLab/hackathon-2-todo",
  "Personal AI Employee": "https://github.com/NaveedTechLab/Personal-AI-Employee-hackathon-0-",
};
const projects = allProjects.map(project => ({
  ...project,
  live: ["CRM Digital FTE", "Course Companion FTE", "Todo App Phase 5"].includes(project.title) ? null : project.live,
  repository: projectRepositories[project.title] ?? null,
}));
const openSource = [
  { name: "AI Skills Library", repo: "skills-library", label: "FLAGSHIP COLLECTION", text: "A reusable collection of 104+ AI skills covering agents, cloud infrastructure, full-stack development, automation, education and testing.", tags: ["104+ skills", "MCP", "Automation", "Full stack"] },
  { name: "Naveed-Tech-Lab Skills", repo: "Naveed-Tech-Lab_Skills", label: "CUSTOM ENGINEERING SKILLS", text: "Packaged skills for FastAPI backends, Next.js interfaces, Kubernetes deployment, event-driven architecture and MCP-powered todo agents.", tags: ["FastAPI", "Next.js", "Kubernetes", "MCP"] },
  { name: "SpecKit+ Development Guide", repo: "Spec-Kit-Plus-Driven-Development--SpecKit", label: "DEVELOPER RESOURCE", text: "A practical guide to specification-first AI development using SpecifyPlus, AI coding tools and MCP workflows.", tags: ["Spec-driven development", "MCP", "Documentation"] },
];

const tracks = [
  { name: "Loop Engineering", count: 12, repo: "Loop-Engineering-Projects", text: "Scheduled autonomy, stopping conditions, maker-checker verification and self-healing loops." },
  { name: "Harness Engineering", count: 8, repo: "Harness-Engineering-Projects", text: "Permission guardrails, typed outputs, hooks and prompt-injection defense." },
  { name: "Graph Engineering", count: 8, repo: "Graph-Engineering-Projects", text: "Shared agent memory, typed claims, provenance and grounded fact-checking." },
  { name: "Trusting the Checker", count: 8, repo: "Trusting-the-Checker-Projects", text: "Golden-set testing, judge calibration, regression gates and adversarial evaluations." },
  { name: "Leaving the Laptop", count: 8, repo: "Leaving-the-Laptop-Projects", text: "Headless deployment, unattended scheduling, portability and credential hardening." },
];
const links = ["About", "Expertise", "Projects", "Skills Library", "Experience", "Credentials"];
function Arrow() { return <span aria-hidden="true">↗</span>; }


export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#" aria-label="NaveedTechLab home"><span className="brand-mark">n<span>.</span></span><span>NAVEED<span className="brand-light">TECHLAB</span></span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close ✕" : "Menu ☰"}</button>
        <nav id="navigation" className={menuOpen ? "navigation open" : "navigation"} aria-label="Main navigation">
          {links.map(link => <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`} onClick={() => setMenuOpen(false)}>{link}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <Arrow /></a>
        </nav>
      </header>
      <main id="main">
        <section className="hero container" id="about">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> AI AGENT ENGINEER · KARACHI, PAKISTAN</p>
            <h1>Intelligent systems.<br /><span>Real-world impact.</span></h1>
            <p className="hero-description">I&apos;m Muhammad Naveed. I build reliable AI agents, production automations and full-stack applications that turn complex workflows into work that gets done.</p>
            <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <Arrow /></a><a className="button secondary" href="/Muhammad_Naveed_CV_AI_Agent_Engineer.pdf" download>Download CV <span aria-hidden="true">↓</span></a></div>
            <div className="hero-note"><span className="status-dot" /> Open to remote roles, relocation &amp; collaborations</div>
          </div>
          <div className="hero-visual">

            <div className="portrait-frame"><Image src="/muhammad-naveed.jpeg" alt="Muhammad Naveed wearing a navy suit" width={1122} height={1402} priority sizes="(max-width: 760px) 90vw, 440px" /><div className="portrait-caption"><span>MUHAMMAD NAVEED</span><small>AI Agent Engineer &amp; Full Stack Developer</small></div></div>
            <div className="floating-label"><span className="status-dot" /><span>Built for production.<br /><strong>Designed for reliability.</strong></span></div>
            <span className="visual-index">01 / HUMAN BEHIND THE SYSTEMS</span>
          </div>
        </section>
        <div className="stats container">{[["5", "Production automation systems"], ["123", "Properties supported"], ["8+", "Field technicians"], ["44", "Agent engineering practice projects"]].map(([value,label]) => <div key={label}><strong>{value}<span> /</span></strong><p>{label}</p></div>)}</div>
        <div className="stack-strip"><div className="container"><span>THE TOOLS BEHIND THE WORK</span><p>Claude <i>✳</i> OpenAI <i>✳</i> Python <i>✳</i> Node.js <i>✳</i> Next.js <i>✳</i> MCP</p></div></div>
        <section className="section container" id="expertise">
          <div className="section-heading"><div><p className="eyebrow">01 / WHAT I DO</p><h2>From an idea.<br />To a working system.</h2></div><p>I work across agents, integrations and interfaces, with the engineering discipline to keep them running after deployment.</p></div>
          <div className="services-grid">{[
            ["01", "AI agents & reliable autonomy", "Agents that plan, use tools and act within clear boundaries. Built with stopping conditions, shared memory, guardrails and meaningful evaluations.", ["Claude", "OpenAI", "Agents SDK", "MCP"]],
            ["02", "Workflow automation", "Connected Slack and Google Workspace systems for compliance, reporting, real-time verification and operational decision-making.", ["Slack API", "Google Workspace", "Node.js", "Webhooks"]],
            ["03", "Full-stack development", "Responsive websites, operations dashboards and API-backed applications, from requirements and architecture through deployment.", ["Next.js", "React", "FastAPI", "PostgreSQL"]],
          ].map(([number,title,text,tags]) => <article className="service-card" key={String(title)}><div className="card-top"><span>{number}</span><Arrow /></div><h3>{title}</h3><p>{text}</p><div className="tags">{(tags as string[]).map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
          <details className="tech-details"><summary>Explore my full technical toolkit <span>+</span></summary><div className="toolkit">{skills.map(skill => <div key={skill.label}><h3>{skill.label}</h3><p>{skill.tags.join(" · ")}</p></div>)}</div></details>
        </section>
        <section className="projects-section" id="projects"><div className="container section">
          <div className="section-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Built to solve.<br /><span>Not just to showcase.</span></h2></div><a className="text-link" href="https://github.com/naveedtechlab" target="_blank" rel="noopener noreferrer">Explore GitHub <Arrow /></a></div>
          <div className="project-grid">{(showAll ? projects : projects.slice(0,7)).map((project,index) => <article className={`project-card project-${index % 3}`} key={project.title}><div className="project-art" aria-hidden="true"><div className="diagram"><span>{index < 2 ? "WORKFLOW" : "INPUT"}</span><b>↓</b><strong>{index < 2 ? "AUTOMATION ENGINE" : "AI AGENT"}</strong><b>↓</b><div><span>TOOLS</span><span>MEMORY</span><span>OUTPUT</span></div></div><span className="art-number">{String(index+1).padStart(2,"0")}</span></div><div className="project-body"><p className="eyebrow">{project.subtitle}</p><h3>{project.title}</h3><p>{project.desc}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.live && <a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer">Visit live project <Arrow /></a>}{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">View GitHub repository <Arrow /></a>}{!project.live && !project.repository && <span className="private-note">{index < 2 ? "Client production system · private access" : "Project details available on request"}</span>}</div></article>)}</div>
          <button className="button secondary all-projects" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>{showAll ? "Show selected projects −" : `View all ${projects.length} projects +`}</button>
        </div></section>
        <section className="section container" id="skills-library">
          <div className="section-heading"><div><p className="eyebrow">OPEN SOURCE / REUSABLE INTELLIGENCE</p><h2>Build once.<br /><span>Put the knowledge to work.</span></h2></div><p>Reusable skills and developer resources from my GitHub. Explore the instructions, supporting code and workflows behind the systems.</p></div>
          <div className="project-grid">{openSource.map(item => <article className="project-card" key={item.repo}><div className="project-body"><p className="eyebrow">{item.label}</p><h3>{item.name}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="text-link" href={`https://github.com/NaveedTechLab/${item.repo}`} target="_blank" rel="noopener noreferrer">Explore repository <Arrow /></a></div></article>)}</div>
        </section>
        <section className="section container" id="engineering"><div className="section-heading"><div><p className="eyebrow">03 / AGENT ENGINEERING LAB</p><h2>Reliability is<br />an engineering practice.</h2></div><p>44 self-built, self-tested practice projects across five public repositories. Part of the GIAIC Final Marathon agentic AI engineering track at Panaversity.</p></div><div className="track-list">{tracks.map((track,index) => <a key={track.name} href={`https://github.com/NaveedTechLab/${track.repo}`} target="_blank" rel="noopener noreferrer"><span className="track-index">0{index+1}</span><h3>{track.name}</h3><p>{track.text}</p><span className="track-count">{track.count} projects</span><Arrow /></a>)}</div></section>
        <section className="section container experience-section" id="experience"><div className="section-heading"><div><p className="eyebrow">04 / THE JOURNEY</p><h2>Experience that<br />ships into production.</h2></div><p>Direct stakeholder collaboration, hands-on debugging and ownership from the first requirement to daily operations.</p></div><div className="experience-list">{experience.slice(0,3).map(item => <article key={item.title}><div><p className="eyebrow">{item.period}</p><span>{item.org}</span></div><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div><details className="tech-details"><summary>Earlier professional experience <span>+</span></summary><div className="toolkit">{experience.slice(3).map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.org} · {item.period}</p><p>{item.desc}</p></div>)}</div></details></section>
        <section className="section container" id="credentials"><div className="section-heading"><div><p className="eyebrow">05 / ALWAYS LEARNING</p><h2>A foundation.<br />And a forward direction.</h2></div><p>Continuous learning in generative AI, modern web development and the disciplines behind dependable agent systems.</p></div><div className="credentials-grid"><article className="certificate-card"><div className="card-top"><span>ANTHROPIC / 2026</span><span aria-hidden="true">✳</span></div><div><p>CERTIFICATE OF COMPLETION</p><h3>Claude 101</h3><span>Muhammad Naveed</span></div><a className="text-link" href="/Claude_101_Certificate.pdf" target="_blank" rel="noopener noreferrer">View original certificate <Arrow /></a></article><div className="education-list"><article><span>2023 — PRESENT</span><h3>Governor House Initiative</h3><p>Generative AI, Web3 &amp; Metaverse</p></article><article><span>IN PROGRESS / 2026</span><h3>GIAIC Final Marathon · Panaversity</h3><p>Agentic AI Engineering Track</p></article><article><span>FOUNDATIONAL EDUCATION</span><h3>Computer &amp; Information Technology</h3><p>Diploma in Computer IT (DCIT) · Certificate in IT (CIT)</p></article></div></div><div className="cv-panel"><div><p className="eyebrow">THE FULL PICTURE</p><h3>Explore my experience and engineering work.</h3></div><div><a className="button secondary" href="/Muhammad_Naveed_CV_AI_Agent_Engineer.pdf" download>AI Agent Engineer CV ↓</a></div></div></section>
        <section className="contact-section" id="contact"><div className="container"><p className="eyebrow"><span className="status-dot" /> LET&apos;S BUILD SOMETHING USEFUL</p><h2>Your next challenge.<br /><span>Our next conversation.</span></h2><a className="contact-email" href="mailto:qureshinaveed21@hotmail.com">qureshinaveed21@hotmail.com <Arrow /></a><div className="contact-bottom"><p>Karachi, Pakistan · Remote worldwide<br />English (fluent) · Urdu (native)</p><div><a href="https://wa.me/923003627458" target="_blank" rel="noopener noreferrer">WhatsApp <Arrow /></a><a href="https://linkedin.com/in/naveedtechlab" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/naveedtechlab" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a></div></div><p className="alternate-email">Alternate email: <a href="mailto:qureshinaveed21@gmail.com">qureshinaveed21@gmail.com</a></p></div></section>
      </main>
      <footer className="container footer"><a className="brand" href="#">NAVEEDTECHLAB<span className="accent">.</span></a><span>© {new Date().getFullYear()} Muhammad Naveed</span><a href="#about">Back to top ↑</a></footer>
      <ChatBot dark={true} /><WhatsApp />
    </div>
  );
}
