# Roast + Rebuild Report (EN) — janczura.com

**Date:** 2026-02-28
**Auditor perspective:** Skeptical CTO, 60 seconds, low patience
**Scope:** English version only (janczura.com/en and all EN pages)
**Source:** Repository source code (Astro + i18n JSON) + `docs/knowledge-base.md`

---

## Table of Contents

- [A) Executive Roast](#a-executive-roast)
  - [5-Second Test Verdict](#5-second-test-verdict)
  - [Top 7 Conversion Blockers](#top-7-conversion-blockers)
  - [Top 10 Consultant-Speak Bingo Lines](#top-10-consultant-speak-bingo-lines)
  - [15+ Hard Truths](#15-hard-truths)
  - [What to Delete or Merge](#what-to-delete-or-merge)
- [B) Rebuild Blueprint](#b-rebuild-blueprint)
  - [New Nav Structure](#new-nav-structure)
  - [New Homepage Section Order](#new-homepage-section-order)
  - [New Messaging Hierarchy](#new-messaging-hierarchy)
  - [Proof Plan](#proof-plan)
- [C) Offer Menu](#c-offer-menu)
- [D) Page-by-Page Roast + Fixes](#d-page-by-page-roast--fixes)
- [E) Paste-Ready Blocks](#e-paste-ready-blocks)
- [F) Implementation Backlog](#f-implementation-backlog)

---

## Site Technical Overview

| Attribute | Value |
|-----------|-------|
| **Framework** | Astro (SSG) |
| **Content source** | JSON i18n files in `src/i18n/{en,pl,de}/` |
| **Routing** | Dynamic `[lang]` param — `src/pages/[lang]/*.astro` |
| **i18n languages** | EN, PL, DE |
| **Hosting** | GitHub Pages |
| **Contact form** | Formspree |
| **Scheduling** | Calendly (30-min slot) |

### All English Routes

| # | Route | Nav label | i18n file |
|---|-------|-----------|-----------|
| 1 | `/en/` | Home | `index.json` |
| 2 | `/en/projects/` | Projects | `projects.json` |
| 3 | `/en/writing/` | Writing & Talks | `publications.json` + `talks.json` |
| 4 | `/en/about/` | About | `about.json` |
| 5 | `/en/consulting/` | Consulting | `consulting.json` |
| 6 | `/en/contact/` | Contact | `contact.json` |
| 7 | `/en/publications/` | *(no nav link)* | `publications.json` |
| 8 | `/en/talks/` | *(no nav link)* | `talks.json` |
| 9 | `/en/privacy/` | *(footer only)* | `privacy.json` |
| 10 | `/en/imprint/` | *(footer only)* | `imprint.json` |
| 11 | `/tools/` | Tools | *(standalone page)* |

---

## A) Executive Roast

### 5-Second Test Verdict

**What the site makes me think you do:** You are the CTO of an AI SaaS company called Jaden Data that builds enterprise platforms on AWS. You are "available for consulting" as a side gig. You build things. You are a generalist engineer who happens to know AI.

**What you should sell:** You transform how engineering teams use AI — training, guardrails, rollout playbooks, and measurable throughput gains — so companies ship faster without breaking prod or leaking data.

**The gap is enormous.** Your current site is a CTO's personal portfolio masquerading as a consulting offer. A VP of Engineering lands on your page and thinks "cool resume, but what does he do *for me*?" There is no clear service, no clear buyer, no clear outcome. The word "transformation" appears once in a vague tagline. The words "training," "guardrails," "rollout," "enablement," and "agent safety" appear exactly zero times on the homepage.

You have buried the single most compelling proof point you own — **you trained Bosch's engineering teams on AI IDE adoption, MCP patterns, and security standards** — somewhere in a knowledge-base doc that never appears on the site at all.

---

### Top 7 Conversion Blockers

**1. Identity crisis: portfolio site vs. consulting offer**
The homepage reads like a CV. Hero says "AI Architect & CTO," not "I help your engineering team do X." A skeptical CTO thinks: "This person already has a job. Why would I hire them?"

**2. No AI transformation messaging anywhere**
The words "enablement," "training," "guardrails," "rollout," "agent," "Cursor," "Claude Code," "MCP" do not appear on any page a visitor would see. The Bosch engagement — your strongest proof — is invisible.

**3. "Process Intelligence" is a made-up category nobody searches for**
The phrase "Process Intelligence" appears 6+ times. Zero CTOs wake up thinking "I need process intelligence." It sounds like a vendor buzzword for BPM software. It actively confuses the positioning.

**4. Seven nav items + Tools = decision paralysis (Hick's Law)**
Home, Projects, Writing & Talks, Tools, About, Consulting, Contact — plus a "Book a call" button. That is 8 clickable items. A CTO scanning your nav has no idea where to go to understand what you sell.

**5. Zero social proof on any page**
No client logos, no testimonials, no named case studies (Bosch is in the knowledge base but not on the site), no "as seen at" bar, no metrics with client attribution. The site asks visitors to trust claims on faith.

**6. Two orphan pages (`/publications/`, `/talks/`) duplicate `/writing/`**
`/en/publications/` and `/en/talks/` exist as standalone pages but their content is already aggregated in `/en/writing/`. This splits link equity and confuses crawlers.

**7. The Consulting page buries the lead and hedges everything**
The consulting hero says "Senior engineering leadership for complex systems (AI included, not required)." That parenthetical — "(AI included, not required)" — is the opposite of confident positioning. It says "I do AI but also I don't, whatever you need." A buyer who specifically wants AI transformation reads this and bounces.

---

### Top 10 Consultant-Speak Bingo Lines

| # | Exact quote | Source | Why it fails | Replacement |
|---|-------------|--------|-------------|-------------|
| 1 | *"Transforming operational complexity into competitive advantage"* | Homepage hero subtitle | Means nothing. Every McKinsey slide deck says this. Zero specificity about what you actually do. | **"I help engineering teams adopt AI tools safely — and ship 3–5x faster without the quality collapse."** |
| 2 | *"Where Process Intelligence Meets Technical Excellence"* | Homepage highlights title | Two abstract nouns colliding. "Process Intelligence" is not a recognized discipline. "Technical Excellence" is table stakes. | **"What changes when your team actually knows how to use AI"** |
| 3 | *"Process-first AI and cloud architecture"* | About hero subtitle | "Process-first" is your internal mental model, not a buyer benefit. Nobody searches for this. | **"AI transformation lead. Trained Bosch. Built platforms for 50+ orgs."** |
| 4 | *"Senior engineering leadership for complex systems (AI included, not required)"* | Consulting hero subtitle | Hedging your positioning in your own headline. This is the equivalent of a restaurant sign saying "Food served (taste included, not guaranteed)." | **"AI enablement for engineering teams: training, guardrails, and rollout that sticks"** |
| 5 | *"I help teams ship secure, reliable software"* | Consulting intro | Every engineering consultant says this. Zero differentiation. Could be copy-pasted from any Toptal profile. | **"I train your engineers to use AI coding tools without shipping insecure code, and I set up the guardrails to prove it."** |
| 6 | *"My focus is production outcomes"* | Consulting intro | Vague to the point of meaninglessness. What outcomes? For whom? | **"My focus: your team ships 3–5x faster with AI tools, without regressions, data leaks, or 'vibecoded' slop."** |
| 7 | *"AI must serve your processes, not replace them."* | About philosophy quote | Philosophical and defensive. A CTO doesn't need a philosophy lesson — they need to know if you can train their 40 engineers next quarter. | **"AI tools are powerful but dangerous without structure. I give your team the structure."** |
| 8 | *"Transforming mission-critical back office operations through intelligent automation"* | Projects (entAIngine) | Dense, jargon-heavy, and describes the product — not the buyer's problem or outcome. | **"AI platform automating document workflows for 50+ regulated enterprises (ISO 27001, SOC 2)."** |
| 9 | *"Let's build responsibly-engineered AI"* | Contact hero subtitle | Sounds like a CSR tagline, not a call to action. A CTO with budget doesn't want to "build responsibly" — they want to ship faster without getting fired. | **"Book 30 minutes. Tell me what your team is struggling with."** |
| 10 | *"Ready to Transform Your Operations?"* | Homepage CTA section | Generic SaaS CTA. "Transform your operations" could be on any enterprise software landing page from 2019. | **"Want your engineers using AI tools properly by next quarter? Let's talk."** |

---

### 15+ Hard Truths

#### Hard Truth #1
**Quote:** `"AI Architect & CTO"` (Homepage hero title, `index.json:7`)
**Why it fails:** This is a job title, not a value proposition. It tells me what you *are*, not what you *do for me*. Principle: the hero headline is the single highest-value piece of real estate on the site. Using it for a title is like putting "Human Being" on a business card.
**Fix:** Replace with outcome-driven headline:
> **"Your engineering team is underusing AI. I fix that."**

#### Hard Truth #2
**Quote:** `"Co-founder at Jaden Data - building enterprise AI on AWS (and available for consulting)"` (Homepage hero tagline, `index.json:9`)
**Why it fails:** The parenthetical "(and available for consulting)" signals that consulting is an afterthought. It literally de-prioritizes the thing you want people to buy. Also, leading with your company name assumes the visitor knows or cares about Jaden Data. They don't.
**Fix:**
> **"I train engineering orgs to adopt AI tools securely and ship 3–5x faster. Trained Bosch. Built platforms for 50+ companies."**

#### Hard Truth #3
**Quote:** `"I'm Jacek, the Co-founder & CTO of Jaden Data. I build process intelligence-AI-native systems that improve how work gets done in real business operations of your company."` (Homepage positioning, `index.json:16`)
**Why it fails:** 39 words before you say anything about the buyer's problem. "Process intelligence-AI-native systems" is a compound modifier that means nothing to anyone outside your head. "Real business operations of your company" is padding.
**Fix:**
> **"I help engineering teams adopt AI coding tools (Cursor, Claude Code, Copilot) without the security nightmares, and I set up the guardrails so it stays safe at scale."**

#### Hard Truth #4
**Quote:** The entire "highlights" section with 6 cards: "Enterprise AI Platforms," "AWS Architecture," "Industry-Specific Solutions," "Security & Compliance," "LLMs, RAG, and Evaluations," "Senior Technical Leadership" (`index.json:19–46`)
**Why it fails:** Six capability cards with no hierarchy. This is a skills dump, not a value proposition. Hick's Law: more choices = slower decisions = higher bounce. A CTO scanning these cards cannot tell which one is your core offer vs. a nice-to-have. They all blur into "senior engineer who does everything."
**Fix:** Replace with 3 outcome-focused cards aligned to the AI transformation story:
> 1. **"Train your devs on AI best practices"** — Context management, prompt engineering, secure AI IDE usage, MCP patterns
> 2. **"Ship guardrails so AI agents can't break prod"** — Least privilege, sandboxing, approval flows, audit logs, injection defenses
> 3. **"Measure the gains, kill the slop"** — Evals, test coverage, review standards, cost discipline — target 3–5x throughput without quality collapse

#### Hard Truth #5
**Quote:** `"Certified skydiver and diver; wind/kitesurf instructor; snowboarder. These experiences build risk management, clear instruction, calm under pressure..."` (Homepage highlights note, `index.json:47`)
**Why it fails:** On the *homepage*. Below your service cards. A CTO evaluating whether to spend $30k+ on your services does not care that you skydive. The "risk management" stretch is the kind of thing interviewers politely nod at but nobody buys. This is resume filler masquerading as a trust signal.
**Fix:** Delete from homepage entirely. Move to About page at most, and even there, keep it to one sentence.

#### Hard Truth #6
**Quote:** `"Process Intelligence in Action"` — featured section with entAIngine, Architecture Reviews, ML Systems (RP-Matcher), AI Architecture Patterns (`index.json:49–74`)
**Why it fails:** This section mixes your SaaS product (entAIngine), a consulting service (Architecture Reviews), a client project (RP-Matcher), and a talk (AI Architecture Patterns) into one grid. The visitor cannot distinguish what's for sale. Is entAIngine something I can buy? Is RP-Matcher a case study? Are you selling architecture reviews or AI transformation? Mixed intent = confusion = bounce.
**Fix:** Replace with a single "How I Work" section:
> **Step 1: Assess** — I audit your team's current AI tool usage, security posture, and workflow gaps (1–2 days)
> **Step 2: Enable** — Hands-on training: prompt engineering, context management, AI IDE mastery, MCP patterns (1–2 weeks)
> **Step 3: Secure** — Guardrails, policies, sandboxing, audit logs, eval harnesses — so AI agents can't do unsafe things (1–2 weeks)
> **Step 4: Scale** — Rollout playbook, cost discipline, quality standards, ongoing support (2–4 weeks)

#### Hard Truth #7
**Quote:** `"FAQ"` section with 9 questions including `"Who is Jacek Janczura?"` and `"What is 'process intelligence'?"` (`index.json:81–131`)
**Why it fails:** An FAQ on a personal consulting site is weird. Nobody arrives at janczura.com with "frequently asked questions." The first FAQ — "Who is Jacek Janczura?" — is embarrassing. You are not famous enough for people to be asking this. The second FAQ tries to define "process intelligence," which proves the term needs explaining, which proves it shouldn't be your positioning.
**Fix:** Delete the FAQ section entirely. Replace with a "Not sure if this is right for you?" section that pre-qualifies:
> **This is for you if:**
> - Your engineers are using AI tools ad-hoc with no standards
> - You're worried about security (prod DB access, data exfiltration, over-permissioned tokens)
> - You want measurable throughput gains, not "vibecoded" experiments
>
> **This is NOT for you if:**
> - You want me to build your product for you (I enable your team, I don't replace them)
> - You need a 2-hour keynote speaker (I do hands-on transformation, not stage performance)

#### Hard Truth #8
**Quote:** The entire About page `philosophy` section — 4 paragraphs of dense text starting with `"I've spent years watching businesses struggle with AI adoption..."` (`about.json:29–35`)
**Why it fails:** This is a 200+ word essay that nobody will read. It lists every AWS service you've touched (Lambda, ECS/Fargate, ECR, SNS, SQS, CloudWatch — that's the infrastructure page of an AWS certification exam, not a philosophy). You mention "Prompt Wizard" — a tool nobody outside your company has heard of — as if it's a selling point.
**Fix:** Kill this section. Replace with a 3-sentence version:
> **"I've trained enterprise engineering teams (including Bosch) to adopt AI tools securely. I've built AI platforms serving 50+ organizations with ISO 27001/SOC 2 compliance. Now I help companies do both: adopt AI fast, and keep it safe."**

#### Hard Truth #9
**Quote:** `"Developer Productivity & Safe AI Tooling — Make your engineering org faster without sacrificing quality"` (Consulting page, `consulting.json:47–53`)
**Why it fails:** This is the closest thing on your entire site to your actual new positioning — and it's the *fourth* of four engagement types, buried below "Fractional CTO," "Architecture Review," and "Delivery Sprint." You have literally deprioritized your core offer to last place. Also, the description says "(optionally) AI coding tools like Cursor/Claude Code" — the word "optionally" in your core offer description is sabotage.
**Fix:** Make this the *first* and *primary* engagement type. Remove "optionally." Rename to:
> **"AI Engineering Enablement — Train your team on AI tools, set up guardrails, measure the impact"**

#### Hard Truth #10
**Quote:** `"Good fit if you're building… AWS-based platforms... Event-driven systems... Multi-tenant SaaS..."` (Consulting page, `consulting.json:75–83`)
**Why it fails:** This "good fit" section describes infrastructure projects, not the AI transformation buyer. A VP of Engineering who wants to roll out Cursor to 200 developers reads "event-driven systems and real-time pipelines (Kafka/Flink-style problems)" and thinks "wrong guy."
**Fix:** Rewrite to match AI transformation buyers:
> **Good fit if:**
> - Your engineering team is 10–500 devs and you want them using AI tools properly
> - You're in a regulated industry and need security guardrails before rollout
> - You tried ad-hoc AI adoption and got inconsistent results (or scary security gaps)
> - You want measurable throughput improvement, not just "we gave everyone Copilot licenses"

#### Hard Truth #11
**Quote:** The Projects page lists 7 projects: entAIngine, Prompt Wizard & Testbed, RP-Matcher, Valuation Engine, entAIgent, Flowhive VC, KnowledgeX (`projects.json`)
**Why it fails:** This is a portfolio page for a software agency, not a consulting practice. None of these projects demonstrate the AI transformation / team enablement service. The Bosch training engagement — the single most relevant proof point — is not listed as a project. A CTO looking for "help my team adopt AI" sees a list of products you built for yourself and thinks "he builds products, not services."
**Fix:** Add the Bosch engagement as the first project. Reframe existing projects as *proof of depth* ("I've built the platforms, now I teach teams how to work with them"). Add a section header: "Why this matters: I've been on both sides — building AI systems AND enabling teams to use them."

#### Hard Truth #12
**Quote:** `"Blockchain & Bitcoin"` talk prominently featured on Writing & Talks page (`talks.json:36–43`)
**Why it fails:** A blockchain talk from 2022 on your site in 2026 actively damages your AI transformation positioning. It signals that you're a generalist who chases trends. The KnowledgeX and blockchain projects reinforce this — they're from a different era and a different career chapter. A CTO hiring for AI enablement sees "blockchain" and thinks "this person pivots every 2 years."
**Fix:** Either remove the blockchain talk entirely or push it to the bottom with minimal visibility. Lead with AI-related content only. Better yet: record a new talk about AI enablement / team training / guardrails — that would be your highest-ROI content investment.

#### Hard Truth #13
**Quote:** The nav brand subtitle says `"AI Architect & Consultant"` (NavBar.astro:213)
**Why it fails:** This is your persistent brand label visible on every page. "AI Architect & Consultant" is generic and fails to differentiate. There are 50,000 people on LinkedIn with this title. It doesn't hint at your specialization (team enablement, guardrails, transformation).
**Fix:**
> **"AI Transformation for Engineering Teams"**

#### Hard Truth #14
**Quote:** `"Technical Notes"` section on publications page with 4 items like "Prompt Engineering at Scale" and "Security for AI Platforms" — but they have no actual content, just excerpts (`publications.json:77–105`)
**Why it fails:** These are placeholder cards with teasers but no linked articles. They look like content that was promised but never delivered. Clicking them goes nowhere. This is worse than having no content — it signals abandonment and reduces trust.
**Fix:** Either write the actual articles (high ROI if they target AI transformation topics) or remove the placeholder cards immediately. Half-built content sections are a trust killer.

#### Hard Truth #15
**Quote:** `"I take on freelance work such as architecture reviews (AWS/cloud, LLM/RAG, security, scalability/cost), prompt engineering and evals, hands-on AI delivery, and interim technical leadership / team support."` (Homepage FAQ, `index.json:122`)
**Why it fails:** The word "freelance" positions you as a contractor, not a transformation consultant. Freelancers bill hourly. Transformation consultants sell outcomes. The laundry list of services (architecture reviews + prompt engineering + AI delivery + interim leadership) triggers the "jack of all trades" alarm. A buyer who needs AI enablement for 100 engineers doesn't hire "freelancers."
**Fix:**
> **"I run AI transformation programs for engineering organizations — training, guardrails, rollout playbooks, and measurable quality standards. Typical engagement: 4–12 weeks."**

#### Hard Truth #16
**Quote:** Contact page focus areas: "AI Platform Architecture," "Technical Leadership," "Security & Compliance," "System Design" (`contact.json:46–64`)
**Why it fails:** These four focus areas don't mention training, enablement, guardrails, or AI tool adoption — the core of your new positioning. A visitor who navigated to Contact expecting to discuss AI transformation for their team sees generic architecture topics and wonders if they're in the right place.
**Fix:** Replace with:
> 1. **AI Engineering Enablement** — Training your team on AI tools and best practices
> 2. **Secure AI Rollout** — Guardrails, policies, and agent safety
> 3. **AI Transformation Program** — End-to-end enablement + implementation
> 4. **Architecture & Technical Leadership** — For teams that also need system design support

#### Hard Truth #17
**Quote:** The entire site has zero mentions of: Cursor, Claude Code, Copilot, MCP, agent safety, prompt injection, sandboxing, least privilege, audit logs, eval harness, red teaming, data exfiltration prevention
**Why it fails:** These are the exact terms your buyers are searching for. A VP of Engineering googling "how to roll out Cursor securely" or "AI coding tool guardrails" will never find your site. You have the experience (Bosch engagement, knowledge base proves it) but you've hidden it completely. This is like a plumber whose website only talks about fluid dynamics.
**Fix:** These terms need to appear on the homepage, consulting page, and in dedicated content. They should be in your meta descriptions, section headings, and FAQ-replacement section.

---

### What to Delete or Merge

| Action | Item | Reason |
|--------|------|--------|
| **DELETE** | "Process Intelligence" terminology (everywhere) | Made-up category. Replace with "AI Transformation" |
| **DELETE** | FAQ section on homepage | Awkward, self-referential, wastes prime real estate |
| **DELETE** | Skydiving/extreme sports from homepage | Not a trust signal for enterprise buyers |
| **DELETE** | Technical Notes placeholders (publications page) | Empty content = broken promise |
| **MERGE** | `/en/publications/` and `/en/talks/` into `/en/writing/` only | Orphan pages split link equity |
| **MERGE** | Consulting + About into a single narrative | About is a long CV; Consulting buries the offer. Combine into one "How I Help" page |
| **DEPRIORITIZE** | Blockchain projects/talks | Different era. Push to bottom or archive |
| **DEPRIORITIZE** | entAIngine/Flowhive/Valuation Engine on Projects | These are products, not consulting proof. Keep but reframe as "depth" evidence |
| **ADD** | Bosch case study (prominent) | Your #1 proof point is invisible |
| **ADD** | AI enablement terminology everywhere | Cursor, Claude Code, MCP, guardrails, agent safety — the words buyers search for |

---
