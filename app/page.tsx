"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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


type Point3 = { x: number; y: number; z: number };
function AgentUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 600, height = 560, frame = 0, visible = true, time = 0;
    let targetX = 0, targetY = 0, cameraX = 0, cameraY = 0;
    const points: Point3[] = Array.from({ length: 460 }, (_, i) => {
      const y = 1 - (i / 459) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(angle) * radius * 118, y: y * 118, z: Math.sin(angle) * radius * 118 };
    });
    const stars = Array.from({ length: 55 }, (_, i) => ({ x: ((i * 73 + 19) % 997) / 997, y: ((i * 139 + 71) % 991) / 991, radius: i % 3 === 0 ? 1.4 : .65 }));
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(canvas);
    const pointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * .65;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * .45;
    };
    const reset = () => { targetX = 0; targetY = 0; };
    canvas.addEventListener("pointermove", pointer); canvas.addEventListener("pointerleave", reset);
    const draw = () => {
      if (!visible || document.hidden) { frame = requestAnimationFrame(draw); return; }
      if (!reducedMotion.matches) time += .004;
      cameraX += (targetX - cameraX) * .045; cameraY += (targetY - cameraY) * .045;
      context.clearRect(0, 0, width, height);
      const size = Math.min(width / 530, height / 530);
      const cx = width * .5, cy = height * .46;
      const project = (point: Point3) => {
        const angle = time + cameraX;
        const x = point.x * Math.cos(angle) + point.z * Math.sin(angle);
        const z = -point.x * Math.sin(angle) + point.z * Math.cos(angle);
        const y = point.y * Math.cos(cameraY + .2) - z * Math.sin(cameraY + .2);
        const depth = point.y * Math.sin(cameraY + .2) + z * Math.cos(cameraY + .2);
        const perspective = 500 / (500 + depth);
        return { x: cx + x * perspective * size, y: cy + y * perspective * size, depth, scale: perspective };
      };
      for (const star of stars) {
        context.fillStyle = "rgba(170,219,224,.35)"; context.beginPath(); context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2); context.fill();
      }
      const halo = context.createRadialGradient(cx, cy, 20, cx, cy, 235 * size);
      halo.addColorStop(0, "rgba(84,218,209,.22)"); halo.addColorStop(.45, "rgba(65,100,209,.12)"); halo.addColorStop(1, "rgba(4,13,22,0)");
      context.fillStyle = halo; context.fillRect(0, 0, width, height);
      for (let ring = 0; ring < 3; ring++) {
        context.beginPath();
        for (let i = 0; i <= 150; i++) {
          const a = i / 150 * Math.PI * 2, r = 175 + ring * 23;
          const p = project({ x: Math.cos(a) * r, y: Math.sin(a) * r * Math.cos(.7 + ring * .7), z: Math.sin(a) * r * Math.sin(.7 + ring * .7) });
          if (i === 0) context.moveTo(p.x,p.y); else context.lineTo(p.x,p.y);
        }
        context.strokeStyle = ring === 1 ? "rgba(159,135,255,.35)" : "rgba(125,235,224,.26)"; context.lineWidth = 1; context.stroke();
      }
      const projected = points.map(project);
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        for (const offset of [13,21]) {
          const q = projected[(i + offset) % projected.length];
          if (Math.hypot(p.x-q.x,p.y-q.y) > 33 * size) continue;
          context.strokeStyle = `rgba(133,231,223,${p.depth < 0 ? .19 : .045})`; context.beginPath(); context.moveTo(p.x,p.y); context.lineTo(q.x,q.y); context.stroke();
        }
        context.fillStyle = `rgba(${p.depth < 0 ? "183,255,229" : "91,152,193"},${p.depth < 0 ? .85 : .25})`;
        context.beginPath(); context.arc(p.x,p.y,Math.max(.65,1.35 * p.scale * size),0,Math.PI*2); context.fill();
      }
      const nodes = ["AGENTS", "TOOLS", "MEMORY", "EVALS"];
      nodes.forEach((label,i) => {
        const a = time * .75 + i * Math.PI / 2;
        const p = project({ x: Math.cos(a) * 202, y: Math.sin(a) * 120, z: Math.sin(a) * 142 });
        context.beginPath(); context.moveTo(cx,cy); context.lineTo(p.x,p.y); context.strokeStyle="rgba(151,221,209,.13)"; context.stroke();
        const side = 17 * size * p.scale;
        context.fillStyle = "rgba(15,39,47,.94)"; context.strokeStyle="rgba(165,242,221,.7)"; context.lineWidth=1;
        context.beginPath(); context.moveTo(p.x,p.y-side); context.lineTo(p.x+side,p.y); context.lineTo(p.x,p.y+side); context.lineTo(p.x-side,p.y); context.closePath(); context.fill(); context.stroke();
        context.fillStyle="#cdfbe7"; context.beginPath(); context.arc(p.x,p.y,2,0,Math.PI*2); context.fill();
        context.font="9px Arial"; context.textAlign="center"; context.fillStyle="#a8c8cb"; context.fillText(label,p.x,p.y+side+19);
      });
      frame = requestAnimationFrame(draw);
    };
    resize(); draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); canvas.removeEventListener("pointermove",pointer); canvas.removeEventListener("pointerleave",reset); };
  }, []);
  return <div className="agent-universe" aria-hidden="true"><canvas ref={canvasRef} /><span className="universe-coordinate">N / 24.8607° · E / 67.0011°</span><span className="universe-label">CONNECTED INTELLIGENCE</span><div className="universe-floor" /></div>;
}
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="portfolio" onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>(".project-card, .service-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
      card.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      card.style.setProperty("--shine-x", `${(event.clientX - rect.left) / rect.width * 100}%`);
      card.style.setProperty("--shine-y", `${(event.clientY - rect.top) / rect.height * 100}%`);
    }} onPointerOut={event => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(".project-card, .service-card");
      if (card && !card.contains(event.relatedTarget as Node | null)) { card.style.setProperty("--tilt-x", "0deg"); card.style.setProperty("--tilt-y", "0deg"); }
    }}>
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
            <AgentUniverse />
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
