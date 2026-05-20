import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import profileImg from "/images/profile.jpg?url";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Adithya Sai Muthavarapu — AI & Cloud Engineer Portfolio" },
      {
        name: "description",
        content:
          "Premium portfolio of Adithya Sai Muthavarapu — CS undergrad building AI, GNN & RL systems on Azure and AWS.",
      },
      { property: "og:title", content: "Adithya Sai Muthavarapu — Portfolio" },
      {
        property: "og:description",
        content: "AI-driven systems, Graph Neural Networks, Cloud Engineering.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    // ---------- Loader ----------
    const loader = document.getElementById("loader");
    const hide = () => loader?.classList.add("loader--hidden");
    if (document.readyState === "complete") setTimeout(hide, 600);
    else window.addEventListener("load", () => setTimeout(hide, 600));

    // ---------- Scroll progress + back-to-top + navbar ----------
    const bar = document.getElementById("progress-bar");
    const toTop = document.getElementById("to-top");
    const nav = document.getElementById("nav");
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
      if (toTop) toTop.classList.toggle("show", h.scrollTop > 500);
      if (nav) nav.classList.toggle("nav--scrolled", h.scrollTop > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop?.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );

    // ---------- Mobile menu ----------
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    burger?.addEventListener("click", () => {
      menu?.classList.toggle("menu--open");
      burger.classList.toggle("burger--open");
    });
    menu?.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("menu--open");
        burger?.classList.remove("burger--open");
      })
    );

    // ---------- Theme toggle ----------
    const themeBtn = document.getElementById("theme-toggle");
    const stored = localStorage.getItem("theme");
    if (stored === "light") document.body.classList.add("light");
    themeBtn?.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
      );
    });

    // ---------- Typing ----------
    const typeEl = document.getElementById("typed");
    const phrases = [
      "AI & ML Engineer",
      "Cloud Developer",
      "Graph Neural Networks",
      "Full-Stack Builder",
    ];
    let pi = 0,
      ci = 0,
      del = false;
    const tick = () => {
      if (!typeEl) return;
      const p = phrases[pi];
      typeEl.textContent = p.slice(0, ci);
      if (!del && ci < p.length) ci++;
      else if (del && ci > 0) ci--;
      else if (!del) {
        del = true;
        setTimeout(tick, 1400);
        return;
      } else {
        del = false;
        pi = (pi + 1) % phrases.length;
      }
      setTimeout(tick, del ? 40 : 80);
    };
    tick();

    // ---------- Reveal on scroll ----------
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // ---------- Counters ----------
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = +(el.dataset.count || "0");
        let v = 0;
        const step = Math.max(1, target / 60);
        const t = setInterval(() => {
          v += step;
          if (v >= target) {
            v = target;
            clearInterval(t);
          }
          el.textContent = Math.floor(v).toString();
        }, 16);
        cIo.unobserve(el);
      });
    });
    document.querySelectorAll<HTMLElement>(".count").forEach((el) => cIo.observe(el));

    // ---------- Particles canvas ----------
    const canvas = document.getElementById("bg-canvas") as HTMLCanvasElement | null;
    let raf = 0;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      const N = window.innerWidth < 700 ? 40 : 90;
      const dots = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4,
      }));
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
          if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(125, 211, 252, 0.6)";
          ctx.fill();
          for (let j = i + 1; j < dots.length; j++) {
            const d2 = dots[j];
            const dx = d.x - d2.x;
            const dy = d.y - d2.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(d2.x, d2.y);
              ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 120)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    // ---------- Cursor glow ----------
    const cursor = document.getElementById("cursor");
    const move = (e: MouseEvent) => {
      if (!cursor) return;
      cursor.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", move);

    // ---------- Project filters ----------
    const chips = document.querySelectorAll<HTMLElement>(".chip");
    const cards = document.querySelectorAll<HTMLElement>(".project");
    chips.forEach((c) =>
      c.addEventListener("click", () => {
        chips.forEach((x) => x.classList.remove("chip--active"));
        c.classList.add("chip--active");
        const f = c.dataset.filter;
        cards.forEach((card) => {
          const cat = card.dataset.category || "";
          card.style.display = f === "all" || cat.includes(f!) ? "" : "none";
        });
      })
    );

    // ---------- Project modal ----------
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    document.querySelectorAll<HTMLElement>(".project .more").forEach((btn) =>
      btn.addEventListener("click", () => {
        const card = btn.closest(".project") as HTMLElement;
        if (!modal || !modalBody || !card) return;
        modalBody.innerHTML =
          card.querySelector(".project-detail")?.innerHTML || "";
        modal.classList.add("modal--open");
      })
    );
    modal?.addEventListener("click", (e) => {
      if (e.target === modal || (e.target as HTMLElement).classList.contains("modal-close"))
        modal.classList.remove("modal--open");
    });

    // ---------- Contact form ----------
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const toast = document.getElementById("toast");
      toast?.classList.add("toast--show");
      form.reset();
      setTimeout(() => toast?.classList.remove("toast--show"), 2800);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div id="loader" className="loader">
        <div className="loader__ring" />
        <div className="loader__text">ADITHYA</div>
      </div>

      <div id="cursor" className="cursor" />
      <div id="progress-bar" className="progress-bar" />
      <canvas id="bg-canvas" className="bg-canvas" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />

      <nav id="nav" className="nav">
        <a href="#home" className="brand">
          <span className="brand__mark">A</span>
          <span className="brand__name">dithya<span className="dot">.</span></span>
        </a>
        <ul id="menu" className="menu">
          {["About","Skills","Experience","Projects","Certifications","Education","Contact"].map((s)=>(
            <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
          ))}
        </ul>
        <div className="nav__actions">
          <button id="theme-toggle" className="icon-btn" aria-label="Toggle theme">◐</button>
          <button id="burger" className="burger" aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <span className="tag reveal">// Available for full-time opportunities</span>
            <h1 className="reveal">
              Hi, I'm <span className="grad">Adithya Sai</span>
              <br/>
              <span id="typed" className="typed"/>
              <span className="caret">|</span>
            </h1>
            <p className="lead reveal">
              CS undergrad crafting AI-driven systems with Graph Neural Networks,
              Reinforcement Learning, and cloud-native engineering on Azure & AWS.
            </p>
            <div className="hero__cta reveal">
              <a className="btn btn--primary" href="#projects">View Projects →</a>
              <a className="btn btn--ghost" href="#contact">Get in Touch</a>
              <a className="btn btn--ghost" href="/certificates/resume.pdf" target="_blank" rel="noreferrer">View Resume</a>
            </div>
            <div className="hero__stats reveal">
              <div><span className="count" data-count="4">0</span><small>Projects</small></div>
              <div><span className="count" data-count="5">0</span><small>Certifications</small></div>
              <div><span className="count" data-count="90">0</span>%<small>GNN Accuracy</small></div>
            </div>
          </div>
          <div className="hero__art reveal">
            <div className="orbit"><div className="orbit__ring"/><div className="orbit__ring orbit__ring--2"/></div>
            <div className="avatar">
              <img src={profileImg} alt="Adithya Sai" width={420} height={420}/>
              <div className="avatar__glow"/>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-ind" aria-label="Scroll">
          <span/>
        </a>
      </header>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">01</span>About Me</h2>
          <div className="about">
            <div className="glass reveal">
              <p>
                I'm a Computer Science undergraduate at <b>VIT Amaravati</b> (CGPA 8.31)
                obsessed with the intersection of <b>AI</b>, <b>graphs</b>, and <b>cloud</b>.
                I build systems that reason about complex networks — from predicting
                multi-stage cyber attacks with GNNs to designing explainable clinical
                decision support with knowledge graphs + RAG.
              </p>
              <p>
                When I'm not training models, I'm shipping full-stack apps with
                React, Node and deploying on Azure / AWS.
              </p>
            </div>
            <div className="about__grid">
              {[
                {h:"AI Research", t:"GNN • PPO • CNN • RAG"},
                {h:"Cloud", t:"Azure AI • AWS • CI/CD"},
                {h:"Full-Stack", t:"React • Node • REST"},
                {h:"Foundations", t:"DSA • OS • DBMS • Networks"},
              ].map((c)=>(
                <div key={c.h} className="glass tilt reveal">
                  <h3>{c.h}</h3><p>{c.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">02</span>Skills</h2>
          <div className="skills">
            {[
              {n:"Python",l:92},{n:"Java",l:85},{n:"JavaScript",l:82},
              {n:"React.js",l:80},{n:"Node.js",l:75},{n:"SQL / MySQL",l:80},
              {n:"Azure",l:85},{n:"AWS",l:78},{n:"PyTorch / TF",l:80},
              {n:"Graph Neural Nets",l:88},{n:"Reinforcement Learning",l:78},{n:"Git / CI/CD",l:82},
            ].map((s)=>(
              <div key={s.n} className="skill glass reveal">
                <div className="skill__head"><span>{s.n}</span><span className="skill__pct">{s.l}%</span></div>
                <div className="skill__bar"><i style={{width:s.l+"%"}}/></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">03</span>Projects and Timeline</h2>
          <div className="timeline">
            {[
              {d:"Nov 2025",t:"GNN-Guided Cyber Defense Framework",p:"Hybrid GNN + PPO system predicting multi-stage DDoS attacks with 90%+ accuracy."},
              {d:"2026",t:"PharmaVision-AI",p:"Clinical decision support combining Knowledge Graphs and RAG for explainable drug interactions."},
              {d:"May 2025",t:"Portfolio Deployment on Azure",p:"Shipped a responsive portfolio with CI/CD on Microsoft Azure."},
              {d:"Sep 2024",t:"Age & Gender Detection (CNN)",p:"End-to-end multi-task CNN pipeline with real-time inference."},
            ].map((e,i)=>(
              <div key={i} className={"tl reveal "+(i%2?"tl--right":"tl--left")}>
                <div className="tl__dot"/>
                <div className="glass tl__card">
                  <span className="tl__date">{e.d}</span>
                  <h3>{e.t}</h3><p>{e.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">04</span>Featured Projects</h2>
          <div className="chips reveal">
            {[
              ["all","All"],["ai","AI / ML"],["cloud","Cloud"],["web","Web"]
            ].map(([f,l],i)=>(
              <button key={f} className={"chip "+(i===0?"chip--active":"")} data-filter={f}>{l}</button>
            ))}
          </div>
          <div className="projects">
            {[
              {
                t:"GNN-Guided Attack Prediction & RL Defense",
                cat:"ai",
                tag:"AI · Security",
                d:"Hybrid GNN + PPO framework predicting multi-stage DDoS and autonomously selecting protections.",
                tech:["Python","PyTorch","GAT","PPO","CIC-IDS"],
                detail:"<h3>GNN-Guided Cyber Defense</h3><p>Constructed dynamic attack graphs by fusing CVSS vulnerability data with CIC-IDS 2017 traffic. A custom GAT/GCN/GraphSAGE hybrid hit 90%+ accuracy and 89% Top-3 target prediction. A PPO agent reduced compromised nodes by up to 65%.</p><ul><li>Accuracy, Precision, Recall, F1, MAE</li><li>Cumulative reward & protection effectiveness</li></ul>"
              },
              {
                t:"PharmaVision-AI",
                cat:"ai",
                tag:"AI · Healthcare",
                d:"KG + RAG clinical decision support detecting drug-drug interactions with explainable, hallucination-free output.",
                tech:["FastAPI","NetworkX","RAG","TF-IDF"],
                detail:"<h3>PharmaVision-AI</h3><p>Hybrid Knowledge Graph + RAG architecture, symptom-aware patient-specific risk, Max-Cut optimization for multi-drug analysis. F1 0.91, sub-second latency.</p>"
              },
              {
                t:"Age & Gender Detection",
                cat:"ai",
                tag:"Computer Vision",
                d:"Multi-task CNN on UTKFace with real-time inference pipeline.",
                tech:["TensorFlow","Keras","OpenCV"],
                detail:"<h3>Age & Gender Detection</h3><p>End-to-end pipeline: preprocessing, training, evaluation and real-time inference. High classification accuracy with low MAE.</p>"
              },
              {
                t:"Personal Portfolio on Azure",
                cat:"web cloud",
                tag:"Web · Cloud",
                d:"Responsive mobile-first portfolio deployed on Azure with secure, scalable hosting.",
                tech:["HTML","CSS","JS","Azure"],
                detail:"<h3>Portfolio on Azure</h3><p>Git-versioned, CI/CD deployed, cross-browser optimized.</p>"
              },
            ].map((p)=>(
              <article key={p.t} className="project glass reveal" data-category={p.cat}>
                <div className="project__head">
                  <span className="project__tag">{p.tag}</span>
                  <div className="project__links">
                    <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">◯</a>
                    <a href="#" aria-label="Live">↗</a>
                  </div>
                </div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <div className="project__tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
                <button className="more">View details →</button>
                <div className="project-detail" style={{display:"none"}} dangerouslySetInnerHTML={{__html:p.detail}}/>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">05</span>Certifications</h2>
          <div className="certs">
            {[
              ["Microsoft Azure AI Fundamentals","Microsoft · 2025"],
              ["Microsoft Azure AI Engineer Associate","Microsoft · 2025"],
              ["AWS Certified Cloud Practitioner","AWS · 2025–2028"],
              ["Full Stack MERN","Blackbuck · 2025"],
              ["PCAP: Python Essentials","Python Institute · 2024"],
            ].map(([t,s])=> (
              <div key={t} className="cert glass reveal">
                <div className="cert__badge">✦</div>
                <div><h3>{t}</h3><small>{s}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">06</span>Education</h2>
          <div className="edu">
            {[
              ["VIT Amaravati","B.Tech CSE","Oct 2022 – Present · CGPA 8.31"],
              ["Narayana Junior College","Intermediate (MPC)","2020 – 2022 · 77.4%"],
              ["Narayana EM School","10th Grade","2019 – 2020 · 89%"],
            ].map(([s,d,m])=>(
              <div key={s} className="edu__item glass reveal">
                <h3>{s}</h3><p>{d}</p><small>{m}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="section">
        <div className="container">
          <h2 className="section__title reveal"><span className="num">07</span>Achievements</h2>
          <div className="ach">
            {[
              ["90%+","GNN model accuracy on attack prediction"],
              ["F1 0.91","PharmaVision-AI interaction detection"],
              ["65%","Compromised nodes reduced via PPO agent"],
              ["5+","Industry certifications earned"],
            ].map(([k,v])=>(
              <div key={k} className="ach__item glass reveal">
                <h3 className="grad">{k}</h3><p>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container contact">
          <div className="reveal">
            <h2 className="section__title"><span className="num">09</span>Let's build something</h2>
            <p className="lead">Open to internships, research collaborations, and ambitious side projects.</p>
            <ul className="contact__list">
              <li>✉ muttvarapuadithyasai@gmail.com</li>
              <li>☎ +91 7207126668</li>
              <li>⌖ Andhra Pradesh, India</li>
            </ul>
            <div className="socials">
              {[
                {
                  href: "https://github.com/Adithya1910-hub",
                  label: "GitHub",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.112.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.091-.746.083-.731.083-.731 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.292-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.804 5.625-5.475 5.92.43.37.81 1.10.81 2.22 0 1.61-.015 2.91-.015 3.31 0 .32.21.694.825.576C20.565 21.795 24 17.297 24 12 24 5.37 18.63 0 12 0Z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/adithya-sai-muthavarapu-948777255/",
                  label: "LinkedIn",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.038-1.852-3.038-1.853 0-2.136 1.447-2.136 2.943v5.664H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.268 2.371 4.268 5.456v6.287zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.07 0-1.144.926-2.07 2.07-2.07s2.07.926 2.07 2.07c0 1.142-.926 2.07-2.07 2.07zm1.777 13.02H3.56V9h3.553v11.453zM22.225 0H1.771C.792 0 0 .773 0 1.72v20.559C0 23.227.792 24 1.771 24h20.451C23.205 24 24 23.227 24 22.279V1.72C24 .773 23.205 0 22.225 0z"/>
                    </svg>
                  ),
                },
                {
                  href: "mailto:muttvarapuadithyasai@gmail.com",
                  label: "Email",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <a key={item.label} href={item.href} className="social" target="_blank" rel="noreferrer">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <form id="contact-form" className="glass form reveal">
            <label>Name<input required type="text" placeholder="Your name"/></label>
            <label>Email<input required type="email" placeholder="you@email.com"/></label>
            <label>Message<textarea required rows={5} placeholder="Tell me about your project..."/></label>
            <button className="btn btn--primary" type="submit">Send Message →</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Adithya Sai Muthavarapu</span>
          <span>Crafted with HTML · CSS · JS</span>
        </div>
      </footer>

      <button id="to-top" className="to-top" aria-label="Back to top">↑</button>

      <div id="modal" className="modal">
        <div className="modal__inner glass">
          <button className="modal-close" aria-label="Close">✕</button>
          <div id="modal-body"/>
        </div>
      </div>

      <div id="toast" className="toast">Message sent ✓</div>
    </>
  );
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#06070d; --bg2:#0b0d1a; --fg:#e6eaf2; --muted:#8a93a8;
  --primary:#7dd3fc; --accent:#a78bfa; --accent2:#f472b6;
  --glass:rgba(255,255,255,.05); --border:rgba(255,255,255,.1);
  --grad:linear-gradient(135deg,#7dd3fc 0%,#a78bfa 50%,#f472b6 100%);
}
body.light{
  --bg:#f7f8fc; --bg2:#eef1f8; --fg:#0b0d1a; --muted:#5a6478;
  --glass:rgba(255,255,255,.6); --border:rgba(10,12,28,.08);
}
html{scroll-behavior:smooth}
body{
  font-family:'Inter',ui-sans-serif,system-ui,sans-serif;
  background:radial-gradient(1200px 600px at 10% -10%,rgba(125,211,252,.15),transparent 60%),
             radial-gradient(900px 500px at 90% 10%,rgba(167,139,250,.18),transparent 60%),
             var(--bg);
  color:var(--fg); overflow-x:hidden; min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer;background:none;border:none;color:inherit}

.container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
.section{padding:6rem 0;position:relative}
.section__title{
  font-size:clamp(1.6rem,3vw,2.4rem); font-weight:800; letter-spacing:-.02em;
  margin-bottom:2.5rem; display:flex; align-items:center; gap:1rem;
}
.section__title .num{
  font-size:.9rem; padding:.35rem .7rem; border:1px solid var(--border);
  border-radius:999px; color:var(--primary); background:var(--glass); backdrop-filter:blur(10px);
}
.grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}

/* Loader */
.loader{position:fixed;inset:0;z-index:100;background:var(--bg);display:grid;place-items:center;gap:1rem;
  transition:opacity .6s,visibility .6s}
.loader--hidden{opacity:0;visibility:hidden;pointer-events:none}
.loader__ring{width:54px;height:54px;border-radius:50%;
  border:3px solid transparent;border-top-color:var(--primary);border-right-color:var(--accent);
  animation:spin 1s linear infinite}
.loader__text{font-weight:800;letter-spacing:.5em;color:var(--muted);font-size:.8rem}
@keyframes spin{to{transform:rotate(360deg)}}

/* Background */
.bg-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.6}
.bg-orb{position:fixed;border-radius:50%;filter:blur(80px);opacity:.35;z-index:0;pointer-events:none;animation:float 14s ease-in-out infinite}
.bg-orb--1{width:380px;height:380px;background:#7dd3fc;top:-100px;left:-100px}
.bg-orb--2{width:320px;height:320px;background:#a78bfa;bottom:10%;right:-80px;animation-delay:-4s}
.bg-orb--3{width:260px;height:260px;background:#f472b6;top:50%;left:40%;animation-delay:-8s;opacity:.22}
@keyframes float{50%{transform:translate(40px,-30px) scale(1.1)}}

.cursor{position:fixed;width:300px;height:300px;border-radius:50%;pointer-events:none;z-index:1;
  background:radial-gradient(circle,rgba(125,211,252,.18),transparent 60%);
  transition:transform .12s ease-out;mix-blend-mode:screen}
@media (max-width:900px){.cursor{display:none}}

.progress-bar{position:fixed;top:0;left:0;height:3px;width:0;z-index:99;background:var(--grad)}

/* Nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;padding:1rem 1.5rem;
  display:flex;align-items:center;justify-content:space-between;
  transition:all .3s}
.nav--scrolled{background:rgba(6,7,13,.6);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);padding:.7rem 1.5rem}
body.light .nav--scrolled{background:rgba(247,248,252,.7)}
.brand{display:flex;align-items:center;gap:.5rem;font-weight:800}
.brand__mark{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:var(--grad);color:#0b0d1a}
.dot{color:var(--accent2)}
.menu{display:flex;gap:.4rem;list-style:none;background:var(--glass);
  border:1px solid var(--border);padding:.4rem;border-radius:999px;backdrop-filter:blur(20px)}
.menu a{padding:.55rem 1rem;border-radius:999px;font-size:.88rem;color:var(--muted);transition:all .25s}
.menu a:hover{color:var(--fg);background:var(--glass)}
.nav__actions{display:flex;gap:.5rem;align-items:center}
.icon-btn{width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(10px)}
.burger{display:none;width:38px;height:38px;border-radius:10px;border:1px solid var(--border);background:var(--glass);
  flex-direction:column;justify-content:center;align-items:center;gap:4px}
.burger span{width:18px;height:2px;background:var(--fg);transition:.3s}
.burger--open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.burger--open span:nth-child(2){opacity:0}
.burger--open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
@media (max-width:860px){
  .menu{position:fixed;top:70px;left:1rem;right:1rem;flex-direction:column;border-radius:20px;
    padding:1rem;opacity:0;transform:translateY(-10px);pointer-events:none;transition:.3s}
  .menu--open{opacity:1;transform:none;pointer-events:auto}
  .burger{display:flex}
}

/* Hero */
.hero{min-height:100vh;display:grid;place-items:center;position:relative;padding:7rem 1.5rem 4rem;z-index:2}
.hero__inner{max-width:1200px;width:100%;display:grid;grid-template-columns:1.2fr .8fr;gap:3rem;align-items:center}
.tag{display:inline-block;padding:.35rem .8rem;border:1px solid var(--border);border-radius:999px;
  background:var(--glass);font-size:.8rem;color:var(--primary);backdrop-filter:blur(10px);margin-bottom:1.2rem}
.hero h1{font-size:clamp(2.2rem,5.5vw,4.5rem);font-weight:800;letter-spacing:-.03em;line-height:1.05;margin-bottom:1.2rem}
.typed{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.caret{color:var(--primary);animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.lead{color:var(--muted);font-size:clamp(1rem,1.3vw,1.15rem);line-height:1.7;max-width:560px;margin-bottom:2rem}
.hero__cta{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:2.5rem}
.btn{padding:.9rem 1.6rem;border-radius:12px;font-weight:600;font-size:.95rem;transition:all .3s;display:inline-block;border:1px solid transparent}
.btn--primary{background:var(--grad);color:#0b0d1a;box-shadow:0 10px 40px -10px rgba(167,139,250,.6)}
.btn--primary:hover{transform:translateY(-2px);box-shadow:0 16px 50px -10px rgba(167,139,250,.8)}
.btn--ghost{border-color:var(--border);background:var(--glass);backdrop-filter:blur(10px)}
.btn--ghost:hover{border-color:var(--primary);color:var(--primary)}
.hero__stats{display:flex;gap:2rem}
.hero__stats>div{font-size:2rem;font-weight:800;background:var(--grad);-webkit-background-clip:text;color:transparent}
.hero__stats small{display:block;font-size:.75rem;color:var(--muted);font-weight:500;-webkit-text-fill-color:var(--muted);margin-top:.25rem;letter-spacing:.1em;text-transform:uppercase}
.hero__art{position:relative;display:grid;place-items:center;aspect-ratio:1}
.orbit,.orbit__ring{position:absolute;inset:0;border-radius:50%}
.orbit__ring{border:1px dashed var(--border);animation:spin 30s linear infinite}
.orbit__ring--2{inset:30px;animation-duration:20s;animation-direction:reverse;border-color:rgba(167,139,250,.3)}
.avatar{position:relative;width:78%;aspect-ratio:1;border-radius:50%;overflow:hidden;
  border:1px solid var(--border);box-shadow:0 30px 80px -20px rgba(125,211,252,.4)}
.avatar img{width:100%;height:100%;object-fit:cover}
.avatar__glow{position:absolute;inset:-10%;background:var(--grad);filter:blur(40px);opacity:.4;z-index:-1;animation:float 8s ease-in-out infinite}
@media (max-width:860px){.hero__inner{grid-template-columns:1fr;text-align:center}.hero__art{max-width:300px;margin:auto}.lead{margin:0 auto 2rem}.hero__cta,.hero__stats{justify-content:center}}

.scroll-ind{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
  width:24px;height:40px;border:2px solid var(--border);border-radius:14px;display:grid;place-items:start center;padding-top:6px}
.scroll-ind span{width:3px;height:8px;background:var(--primary);border-radius:2px;animation:scroll 1.6s ease-in-out infinite}
@keyframes scroll{50%{transform:translateY(12px);opacity:.3}}

/* Glass + reveal */
.glass{background:var(--glass);border:1px solid var(--border);border-radius:20px;
  backdrop-filter:blur(20px);padding:1.6rem;transition:all .4s}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .8s,transform .8s}
.reveal.in{opacity:1;transform:none}
.tilt:hover{transform:translateY(-6px);border-color:var(--primary);box-shadow:0 20px 50px -20px rgba(125,211,252,.4)}

/* About */
.about{display:grid;grid-template-columns:1.1fr .9fr;gap:1.5rem;align-items:start}
.about p{color:var(--muted);line-height:1.8;margin-bottom:1rem}
.about__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.about__grid h3{margin-bottom:.4rem;font-size:1rem}
.about__grid p{font-size:.85rem;color:var(--muted)}
@media (max-width:860px){.about{grid-template-columns:1fr}}

/* Skills */
.skills{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem}
.skill__head{display:flex;justify-content:space-between;font-weight:600;margin-bottom:.6rem}
.skill__pct{color:var(--primary);font-size:.85rem}
.skill__bar{height:6px;border-radius:6px;background:rgba(255,255,255,.07);overflow:hidden}
.skill__bar i{display:block;height:100%;background:var(--grad);border-radius:6px;
  box-shadow:0 0 12px rgba(167,139,250,.6);animation:shimmer 2s ease-in-out infinite alternate}
@keyframes shimmer{to{filter:brightness(1.2)}}
.skill:hover{transform:translateY(-4px)}

/* Timeline */
.timeline{position:relative;padding:1rem 0}
.timeline::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,var(--accent),transparent)}
.tl{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:2rem;position:relative;align-items:center}
.tl--right .tl__card{grid-column:2}
.tl--left .tl__card{grid-column:1}
.tl__dot{position:absolute;left:50%;top:24px;transform:translateX(-50%);width:14px;height:14px;border-radius:50%;background:var(--grad);box-shadow:0 0 20px var(--accent)}
.tl__date{font-size:.78rem;color:var(--primary);letter-spacing:.1em;text-transform:uppercase}
.tl__card h3{margin:.4rem 0 .5rem;font-size:1.1rem}
.tl__card p{color:var(--muted);font-size:.92rem;line-height:1.6}
@media (max-width:760px){.timeline::before{left:14px}.tl{grid-template-columns:1fr;padding-left:40px}.tl__dot{left:14px}.tl--right .tl__card,.tl--left .tl__card{grid-column:1}}

/* Projects */
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem}
.chip{padding:.55rem 1.1rem;border-radius:999px;border:1px solid var(--border);background:var(--glass);
  font-size:.85rem;color:var(--muted);transition:.3s;backdrop-filter:blur(10px)}
.chip:hover{color:var(--fg);border-color:var(--primary)}
.chip--active{background:var(--grad);color:#0b0d1a;border-color:transparent;font-weight:600}
.projects{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:1.2rem}
.project{position:relative;overflow:hidden}
.project::before{content:"";position:absolute;inset:-1px;border-radius:20px;padding:1px;
  background:var(--grad);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:.4s;pointer-events:none}
.project:hover{transform:translateY(-6px)}
.project:hover::before{opacity:1}
.project__head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem}
.project__tag{font-size:.72rem;letter-spacing:.15em;text-transform:uppercase;color:var(--primary)}
.project__links{display:flex;gap:.4rem}
.project__links a{width:32px;height:32px;display:grid;place-items:center;border-radius:8px;border:1px solid var(--border);transition:.3s}
.project__links a:hover{background:var(--grad);color:#0b0d1a;border-color:transparent}
.project h3{font-size:1.15rem;margin-bottom:.5rem}
.project p{color:var(--muted);font-size:.9rem;line-height:1.6;margin-bottom:1rem}
.project__tech{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1rem}
.project__tech span{font-size:.7rem;padding:.25rem .55rem;border-radius:6px;background:rgba(125,211,252,.1);color:var(--primary);border:1px solid rgba(125,211,252,.2)}
.more{color:var(--primary);font-weight:600;font-size:.88rem}
.more:hover{letter-spacing:.05em}

/* Certs */
.certs{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
.cert{display:flex;gap:1rem;align-items:center}
.cert:hover{transform:translateY(-4px);border-color:var(--accent)}
.cert__badge{width:44px;height:44px;display:grid;place-items:center;border-radius:12px;background:var(--grad);color:#0b0d1a;font-size:1.4rem;flex-shrink:0}
.cert h3{font-size:.95rem;margin-bottom:.2rem}
.cert small{color:var(--muted);font-size:.78rem}

/* Edu */
.edu{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem}
.edu__item h3{font-size:1rem;margin-bottom:.3rem}
.edu__item p{color:var(--primary);font-size:.88rem;margin-bottom:.3rem}
.edu__item small{color:var(--muted)}
.edu__item:hover{transform:translateY(-4px)}

/* Achievements */
.ach{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}
.ach__item{text-align:center}
.ach__item h3{font-size:2.2rem;margin-bottom:.4rem}
.ach__item p{color:var(--muted);font-size:.9rem}
.ach__item:hover{transform:translateY(-4px);border-color:var(--accent2)}

/* Tests */
.tests{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
.test p{color:var(--fg);line-height:1.7;margin-bottom:.8rem;font-style:italic}
.test small{color:var(--primary);letter-spacing:.05em}

/* Contact */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
.contact__list{list-style:none;margin:1.5rem 0;display:grid;gap:.6rem;color:var(--muted)}
.socials{display:flex;gap:.5rem;flex-wrap:wrap}
.social{display:inline-flex;align-items:center;gap:.55rem;padding:.55rem 1rem;border:1px solid var(--border);border-radius:999px;background:var(--glass);font-size:.85rem;transition:.3s}
.social svg{width:1rem;height:1rem;display:block}
.social:hover{background:var(--grad);color:#0b0d1a;border-color:transparent;transform:translateY(-2px)}
.form{display:grid;gap:1rem}
.form label{display:grid;gap:.4rem;font-size:.85rem;color:var(--muted)}
.form input,.form textarea{padding:.85rem 1rem;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:12px;
  color:var(--fg);font:inherit;transition:.3s;resize:vertical}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--primary);background:rgba(125,211,252,.06)}
@media (max-width:860px){.contact{grid-template-columns:1fr}}

/* Footer */
.footer{padding:2rem 0;border-top:1px solid var(--border);margin-top:4rem;position:relative;z-index:2}
.footer__inner{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;color:var(--muted);font-size:.85rem}

/* To top */
.to-top{position:fixed;bottom:1.5rem;right:1.5rem;width:46px;height:46px;border-radius:50%;
  background:var(--grad);color:#0b0d1a;font-size:1.2rem;font-weight:700;z-index:40;
  opacity:0;transform:translateY(20px);transition:.3s;box-shadow:0 10px 30px -10px rgba(167,139,250,.6)}
.to-top.show{opacity:1;transform:none}
.to-top:hover{transform:translateY(-4px)}

/* Modal */
.modal{position:fixed;inset:0;background:rgba(6,7,13,.8);backdrop-filter:blur(10px);z-index:80;
  display:grid;place-items:center;padding:1.5rem;opacity:0;pointer-events:none;transition:.3s}
.modal--open{opacity:1;pointer-events:auto}
.modal__inner{max-width:600px;width:100%;max-height:80vh;overflow:auto;position:relative;padding:2rem}
.modal-close{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--glass)}
.modal__inner h3{margin-bottom:1rem;font-size:1.4rem}
.modal__inner p{color:var(--muted);line-height:1.7;margin-bottom:1rem}
.modal__inner ul{padding-left:1.2rem;color:var(--muted);line-height:1.8}

/* Toast */
.toast{position:fixed;bottom:5rem;left:50%;transform:translate(-50%,20px);background:var(--grad);color:#0b0d1a;
  padding:.8rem 1.4rem;border-radius:999px;font-weight:600;z-index:90;opacity:0;transition:.3s;box-shadow:0 10px 30px -10px rgba(167,139,250,.6)}
.toast--show{opacity:1;transform:translate(-50%,0)}

/* Section position above bg */
.section{position:relative;z-index:2}
`;
