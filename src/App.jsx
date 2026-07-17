import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home","About","Services","Portfolio","Skills","Testimonials","Pricing","Contact"];

const SERVICES = [
  { icon: "💻", title: "Web Development", color: "#00ff88", items: ["Business Websites","Landing Pages","Portfolio Sites","E-commerce"], price: "Starting at $299" },
  { icon: "📱", title: "Social Media Mgmt", color: "#ff6ef7", items: ["Instagram Growth","Content Strategy","Brand Management","Ad Creatives"], price: "Starting at $199/mo" },
  { icon: "🎬", title: "Video Editing", color: "#ffcc00", items: ["Reels Editing","YouTube Videos","Promo Videos","Motion Graphics"], price: "Starting at $149" },
];

const PROJECTS = [
  { cat: "web", title: "SaaS Dashboard", tags: ["React","Tailwind"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", desc: "Full-stack analytics dashboard with real-time data visualization." },
  { cat: "web", title: "E-commerce Store", tags: ["Next.js","Stripe"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", desc: "High-converting online store with seamless checkout experience." },
  { cat: "social", title: "Brand Identity Kit", tags: ["Canva","Illustrator"], img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", desc: "Complete brand kit for a lifestyle startup — 200K reach in 30 days." },
  { cat: "social", title: "Instagram Campaign", tags: ["Meta Ads","Reels"], img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80", desc: "Viral campaign reaching 500K+ organic impressions." },
  { cat: "video", title: "Product Launch Reel", tags: ["Premiere Pro","AE"], img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", desc: "Cinematic product reveal reel with motion graphics." },
  { cat: "video", title: "YouTube Series", tags: ["DaVinci","Color Grade"], img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&q=80", desc: "10-episode documentary series — 50K subscribers gained." },
];

const SKILLS = [
  { name: "HTML / CSS", pct: 98, col: "#00ff88" },
  { name: "JavaScript", pct: 92, col: "#00ff88" },
  { name: "React / Next.js", pct: 88, col: "#00ff88" },
  { name: "Tailwind CSS", pct: 95, col: "#00ff88" },
  { name: "UI/UX Design", pct: 82, col: "#ff6ef7" },
  { name: "Adobe Premiere Pro", pct: 90, col: "#ffcc00" },
  { name: "After Effects", pct: 78, col: "#ffcc00" },
  { name: "Canva / Figma", pct: 93, col: "#ff6ef7" },
  { name: "Social Media Mktg", pct: 91, col: "#ff6ef7" },
  { name: "SEO & Analytics", pct: 80, col: "#00ff88" },
];

const STATS = [
  { val: 120, label: "Projects Completed", suf: "+" },
  { val: 85, label: "Happy Clients", suf: "+" },
  { val: 4, label: "Years Experience", suf: "+" },
  { val: 300, label: "Videos Edited", suf: "+" },
  { val: 50, label: "Campaigns Managed", suf: "+" },
];

const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "CEO, BrightBrand", stars: 5, text: "Working with Alex transformed our digital presence. Our website conversions tripled in the first month. Absolutely brilliant work!", avatar: "SM" },
  { name: "Raj Patel", role: "Founder, TechLaunch", stars: 5, text: "The video editing quality is next level. Our product launch reel went viral — couldn't ask for better results.", avatar: "RP" },
  { name: "Leila Hassan", role: "Marketing Dir.", stars: 5, text: "Our Instagram went from 2K to 45K followers in 3 months. The content strategy and reels are just phenomenal.", avatar: "LH" },
  { name: "David Chen", role: "E-commerce Owner", stars: 5, text: "Beautiful, fast website that actually sells. Revenue up 180% after the redesign. Worth every penny!", avatar: "DC" },
];

const PRICING = [
  {
    title: "Starter Web", price: "$299", color: "#00ff88",
    features: ["5-Page Website","Responsive Design","Basic SEO","Contact Form","2 Revisions","1 Month Support"],
  },
  {
    title: "Social Pro", price: "$399/mo", color: "#ff6ef7", popular: true,
    features: ["30 Posts/Month","Story Templates","Ad Creatives","Monthly Analytics","Community Mgmt","Strategy Calls"],
  },
  {
    title: "Video Elite", price: "$499", color: "#ffcc00",
    features: ["Up to 10min Video","Color Grading","Motion Graphics","Background Music","3 Revisions","Fast Delivery"],
  },
];

const PROCESS = [
  { step: "01", title: "Consultation", desc: "We dive deep into your goals, vision, and project requirements.", icon: "🎯" },
  { step: "02", title: "Planning", desc: "A detailed roadmap and timeline tailored to your project.", icon: "📋" },
  { step: "03", title: "Design & Build", desc: "Crafting your project with precision and creative excellence.", icon: "⚡" },
  { step: "04", title: "Revisions", desc: "Your feedback loop — we refine until it's exactly right.", icon: "🔄" },
  { step: "05", title: "Final Delivery", desc: "Launch-ready assets delivered clean, packaged, and perfect.", icon: "🚀" },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === word.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) { setDisplay(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === word.length) setDeleting(true);
      else if (deleting && charIdx > 0) { setDisplay(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = Math.ceil(target / (duration / 16));
    s = setInterval(() => {
      setCount(c => { if (c + step >= target) { clearInterval(s); return target; } return c + step; });
    }, 16);
    return () => clearInterval(s);
  }, [target, duration, start]);
  return count;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const scroll = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? (darkMode ? "rgba(5,5,10,0.95)" : "rgba(255,255,255,0.95)") : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${darkMode ? "#ffffff18" : "#00000015"}` : "none",
      transition: "all .3s ease", padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "#00ff88", letterSpacing: "-0.5px" }}>
          &lt;Alex.<span style={{ color: darkMode ? "#fff" : "#111" }}>dev/&gt;</span>
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, "@media(maxWidth:768px)": { display: "none" } }} className="nav-links">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scroll(l)} style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500,
                color: darkMode ? "#aaa" : "#555", transition: "color .2s", fontFamily: "inherit",
              }}
                onMouseEnter={e => e.target.style.color = "#00ff88"}
                onMouseLeave={e => e.target.style.color = darkMode ? "#aaa" : "#555"}
              >{l}</button>
            ))}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: darkMode ? "#ffffff15" : "#00000010", border: "none", borderRadius: 20, padding: "6px 14px",
            cursor: "pointer", fontSize: 16, color: darkMode ? "#fff" : "#333", transition: "all .2s",
          }}>{darkMode ? "☀️" : "🌙"}</button>
          <button onClick={() => scroll("Contact")} style={{
            background: "linear-gradient(135deg, #00ff88, #00cc6a)", color: "#000", border: "none",
            borderRadius: 8, padding: "8px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "inherit", letterSpacing: "0.5px",
          }}>Hire Me</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ darkMode }) {
  const typed = useTypewriter(["Web Developer", "Social Media Manager", "Video Editor", "Creative Freelancer"]);
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: darkMode
        ? "radial-gradient(ellipse at 20% 50%, #00ff8808 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #ff6ef708 0%, transparent 50%), #050508"
        : "radial-gradient(ellipse at 20% 50%, #00ff8812 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #ff6ef712 0%, transparent 50%), #f8f9fa",
      paddingTop: 80,
    }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${darkMode ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? "#fff" : "#000"} 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #00ff8818 0%, transparent 70%)", top: "10%", left: "-10%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #ff6ef718 0%, transparent 70%)", bottom: "5%", right: "-5%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "#00ff8815",
            border: "1px solid #00ff8840", borderRadius: 20, padding: "6px 16px", marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 13, color: "#00ff88", fontWeight: 600, letterSpacing: "0.5px" }}>Available for Freelance Work</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(42px,6vw,72px)", fontWeight: 800,
            lineHeight: 1.05, color: darkMode ? "#fff" : "#0a0a0a", marginBottom: 16, letterSpacing: "-2px",
          }}>
            Hi, I'm <span style={{ color: "#00ff88" }}>Alex</span><br />
            <span style={{ color: darkMode ? "#666" : "#999" }}>Rivera</span>
          </h1>

          <div style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 600, marginBottom: 24, minHeight: 40, color: darkMode ? "#ccc" : "#333" }}>
            <span style={{ color: "#ff6ef7" }}>{typed}</span>
            <span style={{ color: "#00ff88", animation: "blink 1s step-end infinite" }}>|</span>
          </div>

          <p style={{ fontSize: 17, color: darkMode ? "#888" : "#666", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
            I craft <strong style={{ color: darkMode ? "#fff" : "#111" }}>pixel-perfect websites</strong>, grow brands on social media, and produce <strong style={{ color: darkMode ? "#fff" : "#111" }}>cinematic videos</strong> that convert. Let's build something remarkable together.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { label: "🚀 Hire Me", bg: "linear-gradient(135deg,#00ff88,#00cc6a)", color: "#000", target: "contact" },
              { label: "🎨 View Projects", bg: "transparent", color: "#00ff88", border: "2px solid #00ff8860", target: "portfolio" },
              { label: "📩 Contact Me", bg: "transparent", color: darkMode ? "#aaa" : "#555", border: "2px solid #ffffff20", target: "contact" },
            ].map(b => (
              <button key={b.label} onClick={() => document.getElementById(b.target)?.scrollIntoView({ behavior: "smooth" })} style={{
                background: b.bg, color: b.color, border: b.border || "none", borderRadius: 10,
                padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                transition: "transform .2s, box-shadow .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 30px #00ff8830"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >{b.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: `1px solid ${darkMode ? "#ffffff15" : "#00000010"}` }}>
            {[["120+", "Projects"], ["85+", "Clients"], ["4+", "Years"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, color: "#00ff88" }}>{n}</div>
                <div style={{ fontSize: 13, color: darkMode ? "#666" : "#999", fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar card */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 320, height: 380, borderRadius: 24,
            background: darkMode ? "linear-gradient(135deg,#1a1a2e,#16213e)" : "linear-gradient(135deg,#f0f0ff,#e8f4ff)",
            border: `2px solid ${darkMode ? "#00ff8830" : "#00ff8820"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            boxShadow: "0 30px 80px #00ff8820",
          }}>
            <div style={{ fontSize: 120, filter: "drop-shadow(0 0 30px #00ff8860)" }}>👨‍💻</div>
            {/* Floating badges */}
            {[
              { label: "React Expert", icon: "⚛️", top: 20, left: -20, color: "#00ff88" },
              { label: "Video Pro", icon: "🎬", bottom: 60, right: -25, color: "#ffcc00" },
              { label: "Meta Certified", icon: "📱", bottom: 20, left: -15, color: "#ff6ef7" },
            ].map(b => (
              <div key={b.label} style={{
                position: "absolute", top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                background: darkMode ? "#0f0f1a" : "#fff",
                border: `1px solid ${b.color}40`, borderRadius: 10, padding: "8px 14px",
                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                boxShadow: `0 8px 24px ${b.color}20`,
              }}>
                <span>{b.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ darkMode }) {
  return (
    <section id="about" style={{ padding: "100px 2rem", background: darkMode ? "#07070d" : "#f4f4f8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <SectionTag>About Me</SectionTag>
          <h2 style={h2Style(darkMode)}>Turning Ideas into<br /><span style={{ color: "#00ff88" }}>Digital Reality</span></h2>
          <p style={{ color: darkMode ? "#888" : "#666", lineHeight: 1.8, marginBottom: 20, fontSize: 16 }}>
            I'm a passionate multi-disciplinary freelancer with 4+ years of experience building digital solutions that don't just look good — they <em>perform</em>. From sleek websites to viral social campaigns and cinematic videos.
          </p>
          <p style={{ color: darkMode ? "#888" : "#666", lineHeight: 1.8, marginBottom: 36, fontSize: 16 }}>
            My mission is simple: <strong style={{ color: darkMode ? "#fff" : "#111" }}>help businesses grow online</strong> through design-driven web development, strategic social media, and compelling video storytelling.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => window.open("#")} style={{
              background: "#00ff88", color: "#000", border: "none", borderRadius: 8,
              padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit",
            }}>📄 Download Resume</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: "transparent", color: "#00ff88", border: "2px solid #00ff8850", borderRadius: 8,
              padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "inherit",
            }}>Let's Talk →</button>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 280, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { icon: "🌍", title: "Remote-First", desc: "Working with clients globally, timezone-flexible" },
            { icon: "⚡", title: "Fast Delivery", desc: "Projects delivered on time, every time" },
            { icon: "🔄", title: "Revisions Included", desc: "Iterate until you're 100% satisfied" },
            { icon: "🔒", title: "NDA Friendly", desc: "Your IP and data are always protected" },
          ].map(c => (
            <div key={c.title} style={{
              background: darkMode ? "#0f0f1a" : "#fff",
              border: `1px solid ${darkMode ? "#ffffff10" : "#00000010"}`,
              borderRadius: 14, padding: "20px", transition: "border-color .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff8840"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "#ffffff10" : "#00000010"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: darkMode ? "#fff" : "#111", marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: darkMode ? "#666" : "#888", lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ darkMode }) {
  return (
    <section id="services" style={{ padding: "100px 2rem", background: darkMode ? "#050508" : "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>What I Do</SectionTag>
          <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>Services Built to <span style={{ color: "#00ff88" }}>Scale You</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
          {SERVICES.map(s => (
            <div key={s.title} style={{
              background: darkMode ? "#0a0a14" : "#f8f9ff",
              border: `1px solid ${darkMode ? "#ffffff0f" : "#00000008"}`,
              borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden",
              transition: "transform .3s, border-color .3s, box-shadow .3s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = s.color + "60";
                e.currentTarget.style.boxShadow = `0 20px 60px ${s.color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = darkMode ? "#ffffff0f" : "#00000008";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, borderRadius: "0 0 0 150px", background: s.color + "08", pointerEvents: "none" }} />
              <div style={{ fontSize: 44, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: darkMode ? "#fff" : "#111", marginBottom: 8 }}>{s.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {s.items.map(i => (
                  <li key={i} style={{ fontSize: 14, color: darkMode ? "#777" : "#666", padding: "4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: s.color, fontSize: 10 }}>◆</span> {i}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.price}</span>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
                  background: s.color, color: "#000", border: "none", borderRadius: 8,
                  padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                }}>Get Service</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection({ darkMode }) {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const cats = [["all", "All Work"], ["web", "Web Dev"], ["social", "Social Media"], ["video", "Video Editing"]];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <section id="portfolio" style={{ padding: "100px 2rem", background: darkMode ? "#07070d" : "#f4f4f8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionTag>My Work</SectionTag>
          <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>Recent <span style={{ color: "#00ff88" }}>Projects</span></h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 48, flexWrap: "wrap" }}>
          {cats.map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{
              background: filter === val ? "#00ff88" : (darkMode ? "#ffffff10" : "#00000008"),
              color: filter === val ? "#000" : (darkMode ? "#888" : "#555"),
              border: "none", borderRadius: 20, padding: "8px 22px",
              fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 24 }}>
          {filtered.map((p, i) => (
            <div key={i} onClick={() => setModal(p)} style={{
              borderRadius: 16, overflow: "hidden", cursor: "pointer",
              border: `1px solid ${darkMode ? "#ffffff0f" : "#00000008"}`,
              transition: "transform .3s, box-shadow .3s", background: darkMode ? "#0a0a14" : "#fff",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 50px #00ff8815"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "none"}
                />
                <div style={{ position: "absolute", top: 12, left: 12, background: "#00ff88", color: "#000", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>
                  {p.cat === "web" ? "Web" : p.cat === "social" ? "Social" : "Video"}
                </div>
              </div>
              <div style={{ padding: "20px 22px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: darkMode ? "#fff" : "#111", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: darkMode ? "#777" : "#888", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, color: "#00ff88", background: "#00ff8815", border: "1px solid #00ff8830", borderRadius: 4, padding: "3px 10px", fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position: "fixed", inset: 0, background: "#000000cc", zIndex: 9999, display: "flex",
          alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: darkMode ? "#0f0f1a" : "#fff", borderRadius: 20, overflow: "hidden",
            maxWidth: 600, width: "100%", border: `1px solid #00ff8840`,
            boxShadow: "0 30px 100px #00ff8825",
          }}>
            <img src={modal.img} alt={modal.title} style={{ width: "100%", height: 250, objectFit: "cover" }} />
            <div style={{ padding: 32 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: darkMode ? "#fff" : "#111", marginBottom: 12 }}>{modal.title}</h3>
              <p style={{ color: darkMode ? "#888" : "#666", lineHeight: 1.7, marginBottom: 20 }}>{modal.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {modal.tags.map(t => <span key={t} style={{ fontSize: 12, color: "#00ff88", background: "#00ff8818", border: "1px solid #00ff8830", borderRadius: 4, padding: "4px 12px", fontWeight: 600 }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ background: "#00ff88", color: "#000", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>🔗 Live Preview</button>
                <button onClick={() => setModal(null)} style={{ background: "transparent", color: darkMode ? "#888" : "#555", border: `1px solid ${darkMode ? "#ffffff20" : "#00000015"}`, borderRadius: 8, padding: "10px 24px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SkillsSection({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="skills" style={{ padding: "100px 2rem", background: darkMode ? "#050508" : "#fff" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>My Expertise</SectionTag>
          <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>Skills & <span style={{ color: "#00ff88" }}>Technologies</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 20 }}>
          {SKILLS.map(s => (
            <div key={s.name} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: darkMode ? "#ccc" : "#333" }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.col }}>{s.pct}%</span>
              </div>
              <div style={{ height: 6, background: darkMode ? "#ffffff10" : "#00000008", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${s.col}, ${s.col}cc)`,
                  width: inView ? `${s.pct}%` : "0%", transition: "width 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s",
                  boxShadow: `0 0 10px ${s.col}80`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section style={{ padding: "80px 2rem", background: darkMode ? "linear-gradient(135deg, #030308, #07070e)" : "linear-gradient(135deg, #0a0a14, #131325)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 32 }}>
        {STATS.map(s => <StatCounter key={s.label} {...s} start={inView} />)}
      </div>
    </section>
  );
}

function StatCounter({ val, label, suf, start }) {
  const count = useCountUp(val, 2000, start);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 900, color: "#00ff88", lineHeight: 1 }}>{count}{suf}</div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 8, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function TestimonialsSection({ darkMode }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 4000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section id="testimonials" style={{ padding: "100px 2rem", background: darkMode ? "#07070d" : "#f4f4f8" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <SectionTag>Client Love</SectionTag>
        <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>What Clients <span style={{ color: "#00ff88" }}>Say</span></h2>
        <div style={{
          background: darkMode ? "#0a0a14" : "#fff", border: `1px solid ${darkMode ? "#00ff8830" : "#00ff8820"}`,
          borderRadius: 24, padding: "48px 48px 40px", marginTop: 40, position: "relative",
          transition: "all .4s", minHeight: 220,
        }}>
          <div style={{ fontSize: 60, color: "#00ff8840", position: "absolute", top: 24, left: 32, fontFamily: "serif", lineHeight: 1 }}>"</div>
          <div style={{ fontSize: 24, marginBottom: 16, color: "#ffcc00" }}>{"★".repeat(t.stars)}</div>
          <p style={{ fontSize: 18, color: darkMode ? "#ccc" : "#444", lineHeight: 1.7, fontStyle: "italic", marginBottom: 28 }}>"{t.text}"</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#00ff88,#00cc6a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000" }}>{t.avatar}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: darkMode ? "#fff" : "#111" }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#00ff88" }}>{t.role}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 28 : 8, height: 8, borderRadius: 4, border: "none",
              background: i === idx ? "#00ff88" : (darkMode ? "#ffffff20" : "#00000015"),
              cursor: "pointer", transition: "all .3s", padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ darkMode }) {
  return (
    <section style={{ padding: "100px 2rem", background: darkMode ? "#050508" : "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>How It Works</SectionTag>
          <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>My <span style={{ color: "#00ff88" }}>Process</span></h2>
        </div>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
          {PROCESS.map((p, i) => (
            <div key={p.step} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                textAlign: "center", padding: "28px 24px",
                background: darkMode ? "#0a0a14" : "#f8f9ff",
                border: `1px solid ${darkMode ? "#ffffff0f" : "#00000008"}`,
                borderRadius: 16, minWidth: 160, maxWidth: 190,
                transition: "transform .2s, border-color .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "#00ff8850"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = darkMode ? "#ffffff0f" : "#00000008"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#00ff88", letterSpacing: 2, marginBottom: 8 }}>STEP {p.step}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: darkMode ? "#fff" : "#111", marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: darkMode ? "#666" : "#888", lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              {i < PROCESS.length - 1 && (
                <div style={{ fontSize: 20, color: "#00ff8840", padding: "0 8px", display: "flex" }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ darkMode }) {
  return (
    <section id="pricing" style={{ padding: "100px 2rem", background: darkMode ? "#07070d" : "#f4f4f8" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionTag>Investment</SectionTag>
          <h2 style={{ ...h2Style(darkMode), textAlign: "center" }}>Transparent <span style={{ color: "#00ff88" }}>Pricing</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: 24 }}>
          {PRICING.map(p => (
            <div key={p.title} style={{
              background: darkMode ? "#0a0a14" : "#fff",
              border: `2px solid ${p.popular ? p.color : (darkMode ? "#ffffff0f" : "#00000008")}`,
              borderRadius: 20, padding: "36px 32px", position: "relative", transition: "transform .3s, box-shadow .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {p.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#000", fontSize: 11, fontWeight: 800, padding: "5px 20px", borderRadius: 20, letterSpacing: 1 }}>MOST POPULAR</div>}
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: darkMode ? "#fff" : "#111", marginBottom: 4 }}>{p.title}</h3>
              <div style={{ fontSize: 38, fontWeight: 900, color: p.color, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 24 }}>{p.price}</div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 32 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: darkMode ? "#888" : "#666", padding: "7px 0", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${darkMode ? "#ffffff08" : "#00000006"}` }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
                width: "100%", background: p.popular ? p.color : "transparent", color: p.popular ? "#000" : p.color,
                border: `2px solid ${p.color}`, borderRadius: 10, padding: "13px", fontWeight: 700,
                fontSize: 15, cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = p.popular ? p.color : "transparent"; e.currentTarget.style.color = p.popular ? "#000" : p.color; }}
              >Get Started →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <section id="contact" style={{ padding: "100px 2rem", background: darkMode ? "#050508" : "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, flexWrap: "wrap" }} className="contact-grid">
        <div>
          <SectionTag>Get In Touch</SectionTag>
          <h2 style={h2Style(darkMode)}>Let's Build Something <span style={{ color: "#00ff88" }}>Amazing</span></h2>
          <p style={{ color: darkMode ? "#888" : "#666", lineHeight: 1.8, marginBottom: 40, fontSize: 16 }}>Ready to take your digital presence to the next level? I'm just a message away. Let's discuss your project!</p>
          {[
            { icon: "📧", label: "Email", val: "hello@alexrivera.dev", href: "mailto:hello@alexrivera.dev" },
            { icon: "💬", label: "WhatsApp", val: "+1 (555) 123-4567", href: "https://wa.me/15551234567" },
            { icon: "💼", label: "LinkedIn", val: "@alexrivera-dev", href: "#" },
            { icon: "📷", label: "Instagram", val: "@alexrivera.creates", href: "#" },
            { icon: "🛒", label: "Fiverr", val: "fiverr.com/alexrivera", href: "#" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 14, marginBottom: 16, textDecoration: "none",
              padding: "14px 18px",
              background: darkMode ? "#0a0a14" : "#f8f9ff",
              border: `1px solid ${darkMode ? "#ffffff0f" : "#00000008"}`,
              borderRadius: 12, transition: "border-color .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff8840"; e.currentTarget.style.transform = "translateX(5px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? "#ffffff0f" : "#00000008"; e.currentTarget.style.transform = "none"; }}
            >
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#00ff88", fontWeight: 700, letterSpacing: 1 }}>{c.label.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: darkMode ? "#ccc" : "#444", fontWeight: 500 }}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>

        <form onSubmit={handle} style={{
          background: darkMode ? "#0a0a14" : "#f8f9ff",
          border: `1px solid ${darkMode ? "#ffffff0f" : "#00000008"}`,
          borderRadius: 20, padding: "40px",
        }}>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: darkMode ? "#fff" : "#111", marginBottom: 28 }}>Send a Message</h3>
          {[
            { name: "name", placeholder: "Your Full Name", type: "text" },
            { name: "email", placeholder: "Your Email Address", type: "email" },
          ].map(f => (
            <input key={f.name} type={f.type} placeholder={f.placeholder} required value={form[f.name]}
              onChange={e => setForm({ ...form, [f.name]: e.target.value })}
              style={{
                width: "100%", padding: "14px 16px", marginBottom: 16, background: darkMode ? "#050508" : "#fff",
                border: `1px solid ${darkMode ? "#ffffff15" : "#00000012"}`, borderRadius: 10,
                color: darkMode ? "#fff" : "#111", fontSize: 14, fontFamily: "inherit",
                outline: "none", boxSizing: "border-box", transition: "border-color .2s",
              }}
              onFocus={e => e.target.style.borderColor = "#00ff8860"}
              onBlur={e => e.target.style.borderColor = darkMode ? "#ffffff15" : "#00000012"}
            />
          ))}
          <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{
            width: "100%", padding: "14px 16px", marginBottom: 16, background: darkMode ? "#050508" : "#fff",
            border: `1px solid ${darkMode ? "#ffffff15" : "#00000012"}`, borderRadius: 10,
            color: form.service ? (darkMode ? "#fff" : "#111") : "#888", fontSize: 14, fontFamily: "inherit",
            outline: "none", boxSizing: "border-box",
          }}>
            <option value="">Select a Service</option>
            <option>Web Development</option>
            <option>Social Media Management</option>
            <option>Video Editing</option>
            <option>Multiple Services</option>
          </select>
          <textarea placeholder="Tell me about your project..." value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
            style={{
              width: "100%", padding: "14px 16px", marginBottom: 24, background: darkMode ? "#050508" : "#fff",
              border: `1px solid ${darkMode ? "#ffffff15" : "#00000012"}`, borderRadius: 10,
              color: darkMode ? "#fff" : "#111", fontSize: 14, fontFamily: "inherit",
              outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color .2s",
            }}
            onFocus={e => e.target.style.borderColor = "#00ff8860"}
            onBlur={e => e.target.style.borderColor = darkMode ? "#ffffff15" : "#00000012"}
          />
          <button type="submit" style={{
            width: "100%", background: sent ? "#00cc6a" : "linear-gradient(135deg,#00ff88,#00cc6a)",
            color: "#000", border: "none", borderRadius: 10, padding: "15px",
            fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            letterSpacing: "0.5px",
          }}>{sent ? "✓ Message Sent!" : "🚀 Send Message"}</button>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#25d366", color: "#fff", borderRadius: 10, padding: "12px",
              textDecoration: "none", fontWeight: 700, fontSize: 14, transition: "opacity .2s",
            }}>💬 WhatsApp</a>
            <a href="#" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "#006BFF", color: "#fff", borderRadius: 10, padding: "12px",
              textDecoration: "none", fontWeight: 700, fontSize: 14, transition: "opacity .2s",
            }}>📅 Book a Call</a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer({ darkMode }) {
  return (
    <footer style={{ background: darkMode ? "#030305" : "#0a0a0f", padding: "48px 2rem 24px", color: "#666" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, paddingBottom: 32, borderBottom: "1px solid #ffffff10" }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "#00ff88" }}>
            &lt;Alex.<span style={{ color: "#fff" }}>dev/&gt;</span>
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 13, fontFamily: "inherit", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#00ff88"}
                onMouseLeave={e => e.target.style.color = "#666"}
              >{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 24 }}>
          <span style={{ fontSize: 13 }}>© 2024 Alex Rivera. Crafted with ❤️ & ☕</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
            background: "#00ff8820", border: "1px solid #00ff8840", color: "#00ff88",
            borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit",
          }}>↑ Back to Top</button>
        </div>
      </div>
    </footer>
  );
}

// ─── UTIL COMPONENTS ────────────────────────────────────────────────────────

function SectionTag({ children }) {
  return (
    <div style={{
      display: "inline-block", fontSize: 12, fontWeight: 800, letterSpacing: 3,
      color: "#00ff88", background: "#00ff8815", border: "1px solid #00ff8830",
      borderRadius: 20, padding: "5px 16px", marginBottom: 20, textTransform: "uppercase",
    }}>{children}</div>
  );
}

function h2Style(darkMode) {
  return {
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: "clamp(32px,4vw,48px)", fontWeight: 800,
    color: darkMode ? "#fff" : "#0a0a0a", lineHeight: 1.15,
    letterSpacing: "-1px", marginBottom: 20,
  };
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, #root { background: ${darkMode ? "#050508" : "#fff"}; font-family: 'Inter', sans-serif; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        section { transition: background .3s; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #00ff8840; border-radius: 2px; }
        .nav-links { display: flex; }
        @media(max-width:768px){ .nav-links{ display:none!important; } }
        @media(max-width:900px){ .contact-grid{ grid-template-columns:1fr!important; } }
      `}</style>

      <div style={{ background: darkMode ? "#050508" : "#f8f9fa", minHeight: "100vh", transition: "background .3s" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
        <ServicesSection darkMode={darkMode} />
        <PortfolioSection darkMode={darkMode} />
        <SkillsSection darkMode={darkMode} />
        <StatsSection darkMode={darkMode} />
        <TestimonialsSection darkMode={darkMode} />
        <ProcessSection darkMode={darkMode} />
        <PricingSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
        <Footer darkMode={darkMode} />

        {/* Floating WhatsApp */}
        <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" style={{
          position: "fixed", bottom: 28, right: 28, width: 56, height: 56, borderRadius: "50%",
          background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, zIndex: 999, textDecoration: "none", boxShadow: "0 8px 24px #25d36640",
          animation: "float 3s ease-in-out infinite",
        }}>💬</a>
      </div>
    </>
  );
}