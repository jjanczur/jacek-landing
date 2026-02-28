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

## B) Rebuild Blueprint

### New Nav Structure

**Current (8 items + CTA):** Home · Projects · Writing & Talks · Tools · About · Consulting · Contact · [Book a call]

**Proposed (5 items + CTA):**

| # | Label | Maps to | Rationale |
|---|-------|---------|-----------|
| 1 | **How I Help** | New page (replaces Consulting) | Lead with the offer. Primary conversion path. |
| 2 | **Results** | Replaces Projects — reframed as proof | Buyers want evidence, not a portfolio |
| 3 | **About** | Slimmed About (cut philosophy, cut 60% of timeline) | Background context only |
| 4 | **Writing** | Existing `/en/writing/` minus blockchain talk | Thought leadership, SEO |
| 5 | **Contact** | Existing `/en/contact/` rewritten | Streamlined booking flow |
| CTA | **Book a Call** | Calendly link (keep) | Direct conversion |

**Removed from nav:** Home (logo links home), Tools (move to footer or About), Publications (merged into Writing), Talks (merged into Writing).

**Why:** Hick's Law — fewer choices = faster decisions. Every nav item should either sell or prove. "Tools" and separate "Publications"/"Talks" pages do neither.

---

### New Homepage Section Order

| Order | Section | Purpose | Est. screen height |
|-------|---------|---------|-------------------|
| 1 | **Hero** | One-liner + subheadline + CTA | 100vh |
| 2 | **The Problem** | 3 pain points your buyer feels right now | 30vh |
| 3 | **3 Outcomes** | What changes after working with you | 40vh |
| 4 | **How It Works** | 3–4 step process (Assess → Enable → Secure → Scale) | 40vh |
| 5 | **Proof Bar** | Client logos / named engagements / key metrics | 20vh |
| 6 | **Skeptic Section** | "This is for you if…" / "Not for you if…" disqualifier | 30vh |
| 7 | **CTA** | "Book 30 minutes" with Calendly embed or link | 20vh |

**Removed from homepage:** FAQ, 6-card highlights grid, "Process Intelligence in Action" mixed grid, extreme sports note, dense positioning paragraphs.

---

### New Messaging Hierarchy

#### One-Liner (14 words)
> **"I help engineering teams adopt AI tools safely — and ship 3–5x faster."**

#### 3 Outcome Bullets (buyer-facing)

1. **Your devs actually know how to use AI** — not just "prompt and pray," but structured context management, tool-specific skills, MCP patterns, and secure IDE workflows.
2. **Your AI tools can't break prod** — guardrails, least-privilege tokens, sandboxed agents, approval flows, audit logs, and prompt-injection defenses are in place before rollout.
3. **You get measurable speed without the slop** — target 3–5x throughput improvement with quality maintained via tests, reviews, architecture standards, and cost discipline.

#### 3 "How It Works" Bullets (implementation-forward)

1. **Assess (1–2 days):** I audit your team's current AI usage, security posture, tool stack, and workflow bottlenecks. You get a gap report and a prioritized rollout plan.
2. **Enable + Secure (2–4 weeks):** Hands-on training on prompt engineering, context management, AI IDE mastery (Cursor, Claude Code, Copilot). Simultaneously: guardrail setup — sandboxing, RBAC, audit logging, eval harnesses, data-handling policies.
3. **Scale + Measure (2–4 weeks):** Rollout playbook across teams. Cost discipline (prompt hygiene, caching, retrieval limits, loop budgets). Quality gates. Ongoing metrics to prove ROI.

#### Skeptical-CTO Disqualifier Paragraph

> **"I don't build your product for you.** I enable your engineering team to use AI tools properly, safely, and profitably — then I leave. If you want a contractor to write features, hire a contractor. If you want a keynote speaker to inspire your all-hands, hire a speaker. I work with engineering leaders who have a real team, a real codebase, and a real urgency to adopt AI without the security nightmares and quality collapse that come from unstructured rollouts. Typical engagement: 4–12 weeks. If your team is under 10 engineers or you don't have executive buy-in, we're probably not a fit."

---

### Proof Plan

#### Proof We Have (from knowledge-base.md)

| Proof point | Source | Where to use |
|-------------|--------|-------------|
| Trained Bosch engineering teams on prompt engineering, AI IDEs (Cursor, Claude Code, Copilot), MCP best practices, security standards | knowledge-base.md: "AI Transformation Consulting & Training (2024-2025)" | Homepage proof bar, How I Help page, case study |
| Regular recurring training program for software engineers | knowledge-base.md: same section | How I Help page, offer descriptions |
| ISO 27001 + SOC 2 achieved in ~3 months | knowledge-base.md: Jaden Data section | Trust signal on every page |
| 50+ organizations served via entAIngine | knowledge-base.md: entAIngine section | Proof bar metric |
| €1M+ ARR bootstrapped (no VC) | knowledge-base.md: Company Building | About page credibility |
| 0→10 engineering team scaling | knowledge-base.md | About page credibility |
| RP-Matcher: 60% reduction in offer prep time | knowledge-base.md: RP-Matcher section | Results page case study |
| idealo SSO: 1.4M accounts in 3 months (700% over forecast) | knowledge-base.md: idealo section | Results page (earlier career proof) |
| >1,000 concurrent connections, thousands RPS | knowledge-base.md: entAIngine | Technical credibility signal |
| Dual M.Sc. (TU Berlin + Warsaw) | knowledge-base.md: Education | About page |

#### Proof Missing — NEEDS PROOF

| What's missing | Why it matters | How to get it quickly |
|----------------|---------------|----------------------|
| **Bosch testimonial or quote** | Named enterprise client quoting results is the #1 trust signal for enterprise buyers | Ask your Bosch contact for a 2-sentence quote. Even "Jacek helped our team adopt AI tools securely" is enough. |
| **Before/after throughput metrics from any engagement** | "3–5x faster" claim needs evidence. Without data it's a promise, not proof. | Measure PR velocity, cycle time, or DORA metrics before and after a training engagement. Even 1 team's data suffices. |
| **Number of engineers trained** | Scale signal. "Trained 5 people" vs "trained 200 people" are very different. | Count total engineers across all training engagements (Bosch + others). |
| **Specific guardrails/policies delivered** | Makes the security offer concrete. "We set up guardrails" is vague. "We delivered a 40-page AI governance policy + eval harness" is specific. | Screenshot or anonymized excerpt of a policy doc or eval harness you've delivered. |
| **Client logos permission** | Logo bars are the single fastest trust signal on a consulting site. | Ask Bosch + 2-3 other clients for logo usage permission. Even "Enterprise clients include [Bosch logo]" is transformative. |
| **AI tool adoption rate post-training** | Proves training sticks. "We trained 80 devs and 6 months later 72 still use the tools daily." | Survey or tool-usage analytics from a past client. |
| **Cost savings from prompt hygiene / caching** | Proves cost discipline claim. | Measure token spend before/after implementing caching or prompt optimization for any client. |
| **Recording of a training session or workshop (even partial)** | "See how I teach" is powerful. Removes buyer uncertainty about training quality. | Record 10 minutes of your next workshop (with permission) and post as gated or public content. |

---

## C) Offer Menu

### Offer 1: AI Engineering Enablement Sprint

**Tagline:** *"Get your engineering team from zero to competent with AI tools in 2 weeks."*

**Who it's for:**
- Engineering orgs (10–500 devs) adopting AI coding tools (Cursor, Claude Code, Copilot) for the first time or formalizing ad-hoc usage
- VP/Director of Engineering who has budget for AI tooling but no internal expertise to train the team
- Teams in regulated industries (finance, pharma, manufacturing) where "just try it" is not an option

**Who it's NOT for:**
- Solo developers or teams under 10 (the ROI math doesn't justify an external trainer)
- Organizations that want a motivational keynote, not hands-on skills transfer
- Teams that have already completed structured AI tool training and need advanced agent orchestration (→ see Offer 3)

**Outcomes:**
1. Every participating engineer can use at least one AI coding tool (Cursor, Claude Code, or Copilot) with structured context management — not just "type a prompt and hope"
2. Team has shared prompt engineering standards: how to write instructions, manage context windows, use tools/skills, configure rules/policies
3. Engineers understand MCP patterns and can set up custom skills/servers for their codebase
4. Team has a shared vocabulary and playbook for AI-assisted development that persists after I leave

**Deliverables:**
| # | Artifact | Format |
|---|----------|--------|
| 1 | **AI Tool Training Workshops** (3–5 sessions, 60–90 min each) | Live + recorded, with exercises |
| 2 | **Prompt Engineering Playbook** | Markdown/Notion doc — context management, instruction patterns, tool-specific tips |
| 3 | **AI IDE Configuration Guide** | Per-tool (Cursor rules, Claude Code CLAUDE.md, Copilot instructions) — repo-ready templates |
| 4 | **MCP Pattern Library** | Reference implementations for common MCP servers/skills relevant to your stack |
| 5 | **Skills Assessment** (before/after) | Survey + practical exercise to measure competency improvement |
| 6 | **Team Adoption Dashboard Template** | Simple spreadsheet/doc tracking tool usage, confidence levels, blockers |

**Timeline:** 1–2 weeks (can extend to 3 for large teams requiring multiple cohorts)

**Client inputs required:**
- Access to codebase (read-only is fine) so training examples use real code
- List of participating engineers + their current AI tool experience level
- Preferred AI tool(s) and any existing licenses
- 60–90 min blocks on team calendar for workshops
- A technical point-of-contact who can answer stack/infra questions
- Any existing coding standards, review guidelines, or style guides

**Risks + mitigations:**
| Risk | Mitigation |
|------|-----------|
| Low attendance / engagement | Require management sponsorship + calendar blocks pre-booked before engagement starts |
| Tool not available (license/procurement delays) | Pre-qualify tool availability in scoping call; provide free-tier alternatives for training |
| Training doesn't stick | Deliver playbook + templates that live in the repo; include 2-week async follow-up |
| Team too large for one cohort | Split into 2–3 cohorts; train senior devs first as internal champions |

**Pre-qualification questions:**
1. How many engineers will participate in the training?
2. Which AI coding tools do you currently use (if any)? Are licenses already procured?
3. What is your primary tech stack and language(s)?
4. Do you have existing coding standards, review processes, or style guides?
5. Is there executive sponsorship for this initiative (i.e., will engineers have dedicated time)?
6. Are you in a regulated industry with specific compliance requirements?
7. What does success look like for you 30 days after the training ends?
8. Have any engineers already adopted AI tools informally? What happened?
9. What is your preferred timeline for the engagement?
10. Is there a specific AI-related incident or concern that triggered this initiative?

---

### Offer 2: Secure AI IDE & Agent Rollout

**Tagline:** *"Guardrails so your AI tools can't touch prod, leak data, or run up a $50k bill."*

**Who it's for:**
- Engineering orgs that are already using (or about to use) AI coding tools and need security/governance before scaling
- Security/compliance teams who've been asked "is it safe to use Cursor?" and don't have an answer
- CTOs who had an "oh shit" moment when they discovered what AI agents can do without guardrails

**Who it's NOT for:**
- Teams that don't use AI tools yet (→ start with Offer 1)
- Organizations that want a policy document but won't enforce it (I build enforceable guardrails, not shelf-ware)
- Companies with fewer than 10 engineers (overhead too high relative to risk)

**Outcomes:**
1. AI tools are configured with least-privilege access — no agent can touch prod databases, delete filesystems, or access over-permissioned tokens
2. Sandboxing is in place — AI agent execution happens in isolated environments with resource limits
3. Approval workflows exist for high-risk AI actions (deployments, data access, infrastructure changes)
4. Audit logging captures what AI tools do, what prompts were used, and what code was generated
5. Prompt-injection defenses are implemented for any AI-facing interfaces
6. Data handling rules are documented and enforced (what data can/cannot be sent to AI providers)

**Deliverables:**
| # | Artifact | Format |
|---|----------|--------|
| 1 | **AI Security Policy Document** | Written policy: what's allowed, what's not, escalation paths, incident response |
| 2 | **Guardrail Configuration** | Implemented configs: tool permissions, sandboxing rules, token scoping |
| 3 | **Approval Workflow Design** | Documented + implemented flow for high-risk AI actions |
| 4 | **Audit Log Setup** | Configured logging for AI tool usage with retention + alerting |
| 5 | **Eval Harness / Red-Team Playbook** | Test suite for AI-generated code quality + security; red-team scenarios for agent safety |
| 6 | **Prompt-Injection Defense Guide** | Input validation, output filtering, and testing patterns for AI-facing interfaces |
| 7 | **Data Classification Matrix** | What data can be sent to which AI providers, under what conditions |
| 8 | **Rollout Checklist** | Step-by-step checklist for safely enabling AI tools per team/repo |

**Timeline:** 2–4 weeks (depends on number of tools and complexity of existing infrastructure)

**Client inputs required:**
- Current AI tool inventory (what's being used, by whom, with what permissions)
- Infrastructure access (to audit current permissions, tokens, network configs)
- Security/compliance requirements (ISO 27001, SOC 2, GDPR, industry-specific)
- Existing security policies and incident response procedures
- Access to a security/compliance stakeholder for policy review
- List of "crown jewels" (prod DBs, customer data stores, deployment pipelines) that need protection

**Risks + mitigations:**
| Risk | Mitigation |
|------|-----------|
| Guardrails too restrictive → devs bypass them | Co-design with engineering leads; test with pilot group before org-wide rollout |
| Existing permissions are a mess (hard to audit) | Start with a permissions inventory sprint; prioritize high-risk access first |
| AI provider policies change | Design guardrails as abstractions (not hard-coded to one provider); include review cadence |
| Resistance from "move fast" culture | Frame as enablement, not restriction: "guardrails let you move fast safely" + show throughput data |

**Pre-qualification questions:**
1. Which AI tools are currently in use across your engineering org?
2. Do you have an existing AI usage policy? Is it enforced or aspirational?
3. What are your compliance requirements (ISO 27001, SOC 2, HIPAA, etc.)?
4. Have you had any AI-related security incidents or near-misses?
5. Who owns AI governance in your organization today?
6. What is your current approach to managing API keys/tokens for AI tools?
7. Do AI tools currently have access to production environments or customer data?
8. What is the approval process for new tools in your engineering org?
9. Do you have logging/observability for AI tool usage currently?
10. What is your biggest fear about AI tool adoption at scale?

---

### Offer 3: AI Transformation Program

**Tagline:** *"From ad-hoc AI experiments to org-wide adoption in 8–12 weeks."*

**Who it's for:**
- Engineering organizations (50–500+ devs) that want a structured, multi-wave AI adoption program — not a one-off training
- Companies where the CEO/CTO has mandated "adopt AI" but there's no plan for how
- Organizations that tried Offer 1 or Offer 2-style work internally and want someone to own the whole program

**Who it's NOT for:**
- Small teams (<20 engineers) — the program overhead is too high; start with Offer 1
- Companies without executive sponsorship — this requires org-level commitment
- Organizations that want to outsource engineering to AI (this program enables humans, not replaces them)

**Outcomes:**
1. Phased rollout plan executed across the engineering org (pilot → early adopters → general availability)
2. All engineers trained on AI tools with competency verified
3. Security guardrails and governance in place and enforced
4. Measurable throughput improvement tracked via agreed metrics (PR velocity, cycle time, or custom)
5. Cost discipline: prompt budgets, caching strategies, retrieval limits, loop controls — so AI spend is predictable
6. Quality bar maintained: AI-generated code meets the same test, review, and architecture standards as human-written code
7. Internal champions identified and trained to sustain the program after I leave

**Deliverables:**
| # | Artifact | Format |
|---|----------|--------|
| 1 | **Transformation Roadmap** | Phased plan: pilot → early adopters → GA with milestones and gates |
| 2 | **Full Training Curriculum** (all Offer 1 deliverables) | Workshops, playbooks, IDE configs, MCP patterns |
| 3 | **Full Security Package** (all Offer 2 deliverables) | Policy, guardrails, audit logs, eval harness, red-team playbook |
| 4 | **Cost Model & Budget Framework** | Token budgets per team, caching strategy, retrieval limits, loop budget controls |
| 5 | **Quality Standards Document** | AI code review checklist, test requirements, architecture standards for AI-generated code |
| 6 | **Metrics Dashboard** | Tracking throughput, quality, cost, and adoption across teams |
| 7 | **Champion Training Program** | Internal trainers identified and prepared to sustain the program |
| 8 | **Executive Report** | ROI analysis, adoption metrics, recommendations for next phase |
| 9 | **Repo Templates** | .cursorrules, CLAUDE.md, .github/copilot-instructions.md — configured per-repo |
| 10 | **Runbook: "What to do when AI generates bad code"** | Incident patterns, escalation, and review workflow |

**Timeline:** 8–12 weeks, structured as:
- **Weeks 1–2:** Assessment + roadmap + pilot team selection
- **Weeks 3–6:** Pilot team training + guardrail setup + initial metrics baseline
- **Weeks 7–10:** Rollout to early adopters + security hardening + cost optimization
- **Weeks 11–12:** General availability prep + champion training + executive report

**Client inputs required:**
- Executive sponsor with authority to allocate engineering time
- Engineering org chart and team structure
- Current tool inventory, licenses, and infrastructure access
- Compliance requirements and existing security policies
- Agreed success metrics (e.g., PR velocity, cycle time, defect rate, AI tool adoption rate)
- Dedicated internal project manager or point-of-contact
- Budget for AI tool licenses (if not already procured)

**Risks + mitigations:**
| Risk | Mitigation |
|------|-----------|
| Executive sponsorship weakens mid-program | Weekly executive check-in; early wins in pilot phase to maintain momentum |
| Pilot team isn't representative | Select pilot team jointly; ensure mix of skill levels and team types |
| Metrics gaming ("AI-assisted" PRs that aren't really) | Use multiple metrics; spot-check with code reviews; survey-based qualitative data |
| Cost overruns from AI usage | Implement budget controls in Week 3; alert thresholds; weekly cost reviews |
| Quality regression during ramp-up | Mandatory review for AI-generated code in early phases; gradual autonomy as quality proves out |
| Program stalls after I leave | Champion training is a core deliverable; handoff includes playbooks, templates, and recorded training |

**Pre-qualification questions:**
1. How many engineers are in your organization, and how are they structured (teams, squads, etc.)?
2. What is the executive mandate for AI adoption? Who sponsors it?
3. What AI tools have been tried so far? What worked and what didn't?
4. Do you have existing engineering metrics (DORA, PR velocity, cycle time)?
5. What is your biggest concern about org-wide AI adoption?
6. What is your compliance landscape (regulated industry, certifications, data sovereignty)?
7. Do you have internal training infrastructure (LMS, recorded sessions, onboarding programs)?
8. What is your budget range for this initiative (tools + consulting)?
9. Have any teams already adopted AI tools informally? What has the experience been?
10. What does "done" look like for you — what would make this program a success?
11. Is there internal resistance to AI adoption? From whom and why?
12. What is your timeline pressure — is there a board deadline, competitive threat, or regulatory trigger?

---

## D) Page-by-Page Roast + Fixes

---

### Page 1: `/en/` (Homepage)

**Purpose:** Convert visitors into booked calls by communicating what you do, for whom, and why they should trust you.

**Current message (key lines):**
- Hero: `"AI Architect & CTO"` / `"Transforming operational complexity into competitive advantage"`
- Tagline: `"Co-founder at Jaden Data - building enterprise AI on AWS (and available for consulting)"`
- Section: `"Where Process Intelligence Meets Technical Excellence"` — 6 capability cards
- Section: `"Process Intelligence in Action"` — 4 mixed cards (product, service, project, talk)
- CTA: `"Ready to Transform Your Operations?"`
- FAQ: 9 questions including "Who is Jacek Janczura?"

**Roast:**
- The hero is a job title, not a value proposition. It answers "who are you?" instead of "what do you do for me?"
- "Transforming operational complexity into competitive advantage" — this is the LinkedIn bio equivalent of "synergy." Delete.
- The parenthetical "(and available for consulting)" literally tells the visitor your consulting is secondary.
- Six highlight cards with no hierarchy: Enterprise AI Platforms, AWS Architecture, Industry-Specific Solutions, Security & Compliance, LLMs/RAG, Senior Technical Leadership. This is a skills dump. A CTO reading these sees "generalist."
- The extreme sports note on the homepage is baffling in a professional context.
- The FAQ is self-referential and wastes the highest-value real estate on the page.
- Zero mentions of: training, enablement, Cursor, Claude Code, MCP, guardrails, agent safety, Bosch.
- The two positioning paragraphs are dense walls of text that bury the lede in AWS service names.

**Conversion blockers (ordered):**
1. No clear offer — visitor can't tell what service you're selling
2. No buyer-specific language — nothing speaks to "VP Engineering evaluating AI adoption"
3. No proof — no logos, no testimonials, no named clients
4. Skills dump instead of outcome hierarchy — 6 cards of equal weight
5. FAQ wastes prime CTA real estate
6. Dense paragraphs kill scan-ability

**Actionable fixes (ordered):**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Replace hero title + subtitle + tagline with outcome-driven messaging | S |
| 2 | Replace 6 highlight cards with 3 outcome cards (train / secure / measure) | M |
| 3 | Replace "Process Intelligence in Action" with "How It Works" 4-step process | M |
| 4 | Add proof bar: Bosch logo + "50+ organizations" + "ISO 27001/SOC 2" | M |
| 5 | Delete FAQ section, replace with "Is this for you?" disqualifier | S |
| 6 | Delete extreme sports note from homepage | S |
| 7 | Rewrite CTA section with specific, time-bound language | S |
| 8 | Add Cursor/Claude Code/MCP/guardrails keywords throughout | S |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **Your engineering team is underusing AI. I fix that.** |
| Enterprise | **AI Transformation for Engineering Organizations** |
| Technical | **Train your devs on AI tools. Set up guardrails. Ship 3–5x faster.** |

**Subheadline — 2 options:**

1. *"I help engineering orgs adopt Cursor, Claude Code, and Copilot — with the security guardrails, training, and quality standards that make it stick."*
2. *"Hands-on AI enablement: prompt engineering, context management, secure IDE rollout, and measurable throughput gains. Trained Bosch. Built platforms for 50+ orgs."*

**Primary CTA — 3 options:**

1. `Book 30 Minutes` (direct, low commitment)
2. `See How I Help Engineering Teams` (discovery-oriented, links to How I Help page)
3. `Get an AI Readiness Assessment` (value-first, implies a deliverable)

**Key section rewrite — Before → After:**

**BEFORE (current positioning block):**
> "I'm Jacek, the Co-founder & CTO of Jaden Data. I build process intelligence-AI-native systems that improve how work gets done in real business operations of your company. I start with your workflow and make it faster, safer, and measurable."

**AFTER:**
> "Engineering teams are adopting AI tools without structure — and getting inconsistent code, security blind spots, and zero measurable improvement. I run enablement programs that fix this: hands-on training on Cursor, Claude Code, and Copilot; guardrails so AI agents can't break prod; and rollout playbooks that deliver 3–5x throughput gains without quality collapse. I've trained enterprise teams (including Bosch) and built AI platforms for 50+ organizations."

**IA/UX edits:**

New section order:
1. Hero (headline + subheadline + CTA)
2. "The Problem" (3 pain-point cards: ad-hoc adoption / security gaps / no measurable ROI)
3. "3 Outcomes" (train devs / ship guardrails / measure gains)
4. "How It Works" (Assess → Enable → Secure → Scale)
5. Proof bar (Bosch + 50+ orgs + ISO 27001/SOC 2 + bootstrapped to €1M+)
6. "Is this for you?" (for / not-for disqualifier)
7. CTA ("Book 30 Minutes")

What to remove: FAQ, 6-card highlights, "Process Intelligence in Action," extreme sports, dense positioning paragraphs.

Where proof goes: Proof bar between "How It Works" and disqualifier. Format: horizontal logo bar + 3-4 key metrics in large type.

**Trust signals to add:**
- Bosch logo (with permission) or text: "Trained engineering teams at Bosch"
- "50+ organizations served"
- "ISO 27001 & SOC 2 certified platforms"
- "€1M+ revenue, bootstrapped" (credibility signal — optional)

**SEO:**
- Title: `AI Transformation for Engineering Teams | Jacek Janczura`
- Meta: `Train your engineering team on AI tools (Cursor, Claude Code, Copilot). Guardrails, security, and measurable throughput gains. Trained Bosch. 50+ enterprise clients.`
- Internal links: hero CTA → /en/consulting/ (or new "How I Help"), secondary → /en/projects/ (reframed as Results)

**A11y quick hits:**
1. Hero gradient text needs sufficient contrast — test against WCAG AA (currently using `background-clip: text` which can fail)
2. CTA buttons need visible focus indicators (`:focus-visible` exists in CSS but verify contrast)
3. Add `aria-label` to proof bar metrics if using large-type numbers without surrounding text

**Acceptance criteria:**
- [ ] Hero headline communicates "AI enablement for engineering teams" within 5 seconds
- [ ] Page mentions Cursor, Claude Code, or Copilot at least once above the fold
- [ ] At least one named client (Bosch) or "enterprise clients" reference visible
- [ ] CTA leads directly to Calendly or booking flow
- [ ] FAQ section is removed
- [ ] Extreme sports note is removed from homepage

---

### Page 2: `/en/about/` (About)

**Purpose:** Build credibility and personal trust for visitors who want background before buying.

**Current message (key lines):**
- Hero: `"About"` / `"Process-first AI and cloud architecture"`
- Bio: 3 paragraphs — "I'm Jacek, Co-founder & CTO of Jaden Data..." with bullet list of stats
- Philosophy section: 4 long paragraphs about "Process Intelligence"
- Career Journey: 4 paragraphs covering Jaden Data → idealo → T-Labs → SAS
- Specializations: 6 categories (AI & ML, Cloud, Security, Leadership, Dev, Languages)
- Timeline: 4 career entries
- Awards: Hackathon 2nd place + scholarship

**Roast:**
- "Process-first AI and cloud architecture" as a subtitle — this is your internal mental model, not something a buyer relates to.
- The Philosophy section is 200+ words of self-indulgent prose. It lists every AWS service you've used. Nobody reads this.
- Career Journey repeats the Timeline below it. Two different formats showing the same career — pick one.
- Specializations section lists 36 items across 6 categories. This is a CV skills section, not a consulting About page.
- The "Languages & Certifications" category includes "International Windsurfing Instructor" and "PJ(B) Skydive License" — these are in your specializations grid alongside "ISO 27001/SOC 2."
- The Hackathon award (2nd place, 2020, hate speech detection) has nothing to do with AI transformation.
- Zero mention of the Bosch training engagement anywhere on this page.

**Conversion blockers (ordered):**
1. Philosophy section is unreadable and doesn't advance the sale
2. Duplicate career presentation (Career Journey paragraphs + Timeline)
3. Skills dump (36 specialization items) — no hierarchy, no relevance signal
4. No mention of AI enablement/training/Bosch — the actual service
5. Windsurfing instructor in the specializations grid

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Rewrite hero subtitle to reference AI transformation | S |
| 2 | Kill Philosophy section — replace with 3-sentence credibility statement | S |
| 3 | Remove Career Journey paragraphs — keep Timeline only | S |
| 4 | Collapse Specializations from 6 categories to 3, remove irrelevant items | M |
| 5 | Add Bosch engagement to Timeline as most recent entry | S |
| 6 | Move extreme sports to a single sentence, remove from specializations | S |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **About Jacek** |
| Enterprise | **Background & Credentials** |
| Technical | **CTO turned AI transformation consultant** |

**Subheadline — 2 options:**
1. *"Trained Bosch. Built platforms for 50+ orgs. Now I help engineering teams adopt AI properly."*
2. *"From building enterprise AI platforms to enabling the teams that use them."*

**Primary CTA — 3 options:**
1. `See How I Help` (→ Consulting/How I Help page)
2. `Book a Call` (→ Calendly)
3. `Download CV` (keep existing, but deprioritize)

**Key section rewrite — Before → After:**

**BEFORE (Philosophy section, first paragraph):**
> "I've spent years watching businesses struggle with AI adoption. The problem isn't the technology-it's understanding that AI must serve your processes, not replace them. That's why every solution we build at Jaden Data starts with understanding how work actually gets done."

**AFTER:**
> "I spent 5 years as CTO building AI platforms for 50+ enterprises (ISO 27001, SOC 2, €1M+ bootstrapped). Now I take that experience and apply it to the other side of the problem: helping engineering teams adopt AI tools securely and effectively. I've trained teams at Bosch on prompt engineering, AI IDE usage, MCP patterns, and security standards. That's the work I do now."

**IA/UX edits:**

New section order:
1. Hero (name + subtitle + 3-sentence credibility summary)
2. Timeline (career entries — add Bosch/AI Training as latest, keep 4 total)
3. Key metrics bar (50+ orgs, €1M+ bootstrapped, ISO 27001/SOC 2, 10-person team built)
4. Outside Work (1 sentence — "Certified skydiver, diver, windsurfing instructor.")
5. Downloads (CV PDF)

Remove: Philosophy section, Career Journey paragraphs (redundant with Timeline), Specializations grid, Awards.

**Trust signals to add:**
- Bosch as a named training client (top of timeline)
- Key metrics in large type (visual anchor)

**SEO:**
- Title: `About Jacek Janczura | AI Transformation Consultant`
- Meta: `CTO turned AI transformation consultant. Trained Bosch engineering teams. Built AI platforms for 50+ organizations. ISO 27001/SOC 2. Berlin-based.`

**A11y quick hits:**
1. Timeline entries use `<ul>` inside `<p>` via HTML strings — this produces invalid nesting
2. Employer reference PDF download needs `aria-label` describing the file
3. Gradient text headings need contrast verification

**Acceptance criteria:**
- [ ] Bosch engagement is the most recent entry in the timeline
- [ ] Philosophy section is removed or reduced to 3 sentences
- [ ] Specializations grid is removed or collapsed to 3 focused categories
- [ ] Page clearly positions Jacek as an AI transformation consultant, not just a CTO

---

### Page 3: `/en/projects/` (Projects)

**Purpose:** Demonstrate depth and credibility through past work.

**Current message (key lines):**
- Hero: `"Projects"` / `"Selected work across enterprise AI platforms, ML systems, and privacy-first architectures"`
- Intro: `"Selected projects built at Jaden Data, where I serve as Co-founder & CTO."`
- 7 projects: entAIngine, Prompt Wizard & Testbed, RP-Matcher, Valuation Engine, entAIgent, Flowhive VC, KnowledgeX

**Roast:**
- Every single project is something you *built*. Zero projects demonstrate your *training/enablement* work.
- The Bosch engagement — training engineering teams on AI tools — is not listed. This is your most relevant proof for the positioning you want.
- The intro says "Selected projects built at Jaden Data" — framing everything as in-house product work, not client services.
- KnowledgeX (2021-2022, blockchain) and Flowhive VC (2023, VC tooling) dilute the AI transformation narrative.
- No metrics format — the impact is buried in paragraph text, not scannable.

**Conversion blockers (ordered):**
1. No training/enablement case studies — the core offer has zero proof on this page
2. Framed as "things I built" not "results I delivered for clients"
3. Blockchain project from 2021 confuses the positioning
4. Impact metrics buried in prose, not visually highlighted

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Add Bosch AI Transformation engagement as first project | M |
| 2 | Rename page from "Projects" to "Results" | S |
| 3 | Rewrite intro to frame as client outcomes, not portfolio | S |
| 4 | Add visual metrics callouts (60% faster, 50+ orgs, etc.) | M |
| 5 | Move KnowledgeX to bottom or archive section | S |
| 6 | Add 2-3 micro case study templates for future proof | M |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **Results** |
| Enterprise | **Client Outcomes & Technical Depth** |
| Technical | **What happens when engineering teams adopt AI properly** |

**Subheadline — 2 options:**
1. *"Selected engagements: from training enterprise teams on AI tools to building the platforms they use."*
2. *"Training, guardrails, and platforms — proof that this approach works."*

**Primary CTA — 3 options:**
1. `Start a Conversation` (→ Contact)
2. `Book a Call` (→ Calendly)
3. `See How I Help` (→ Consulting/How I Help)

**Key section rewrite — new Bosch project entry (NEEDS PROOF for specific metrics):**

> ### AI Transformation — Bosch (+ Enterprise Clients)
> **2024–2025 | AI Transformation Lead & Trainer**
>
> Trained engineering teams at Bosch and other enterprise clients on AI-assisted development:
> - **Prompt engineering** techniques and responsible AI usage for software engineers
> - **AI IDE onboarding:** Cursor, Claude Code, and Copilot — with proper context management
> - **MCP best practices** and custom skills setup for internal tooling
> - **Security standards** for enterprise AI tool adoption
> - Established organizational guidelines for responsible, secure AI integration in development workflows
>
> **Impact:** Accelerated AI adoption across multiple enterprise engineering organizations. Enabled teams to integrate AI tools securely into existing workflows. Established repeatable frameworks for enterprise AI governance. *(NEEDS PROOF: specific metrics — engineers trained, throughput improvement, adoption rate)*

**IA/UX edits:**

New section order:
1. Hero + intro (reframed as "Results")
2. AI Transformation engagements (Bosch first)
3. Platform & product depth (entAIngine, Prompt Wizard)
4. ML & data projects (RP-Matcher)
5. Earlier work (Valuation Engine, KnowledgeX — collapsed/archived)

Remove or archive: Flowhive VC, entAIgent (too tangential to AI transformation story).

**Trust signals to add:**
- "Bosch" as a named client
- Visual metric callouts: "50+ organizations," "60% faster offer prep," "99.9% uptime"

**SEO:**
- Title: `Results & Case Studies | Jacek Janczura — AI Transformation`
- Meta: `AI transformation results: trained Bosch engineering teams, built platforms for 50+ orgs. Enterprise AI enablement, guardrails, and measurable throughput gains.`

**A11y quick hits:**
1. Project cards need heading hierarchy (`h2` for project names, not just styled `div`)
2. External links (entAIngine website, KnowledgeX blog) need `rel="noopener noreferrer"` — verify
3. Impact metrics should use `<strong>` or `aria-label` for screen reader emphasis

**Acceptance criteria:**
- [ ] Bosch AI training engagement is visible as the first or second entry
- [ ] Page title/heading says "Results" (not "Projects")
- [ ] At least one metric is visually highlighted per project
- [ ] Intro frames work as client outcomes, not portfolio

---

### Page 4: `/en/writing/` (Writing & Talks)

**Purpose:** Establish thought leadership and drive organic traffic via content.

**Current message (key lines):**
- Hero: `"Writing & Talks"` / `"Technical insights, publications, and practical lessons from enterprise deployments"`
- 3 talks: "AI Architecture Patterns" (2024), "Distributed Systems at Scale" (2023), "Blockchain & Bitcoin" (2022)
- Publications: 2 peer-reviewed papers (Saluki 2018, DeCoCo 2020)
- Articles: 2 Medium posts (NFTs 2023, KnowledgeX 2022)
- Technical Notes: 4 placeholder cards with no linked content

**Roast:**
- The blockchain talk and NFT article actively damage your AI transformation positioning.
- Both peer-reviewed papers are about blockchain/security (2018, 2020) — interesting academically, irrelevant commercially.
- The 4 technical notes are **placeholders with no content**. "Prompt Engineering at Scale" — great topic, but clicking it goes nowhere. This is worse than having nothing.
- No content about AI enablement, team training, guardrails, or the topics your buyers care about.
- The page title "Writing & Talks" is generic. No signal about what kind of writing.

**Conversion blockers (ordered):**
1. Placeholder content with no actual articles — trust killer
2. Blockchain/NFT content dilutes AI positioning
3. No AI enablement or training content
4. No content that matches what your target buyer would search for

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Remove or hide Technical Notes placeholders immediately | S |
| 2 | Push blockchain talk and NFT article to bottom or remove | S |
| 3 | Write 1-2 real articles on AI enablement topics (highest ROI content investment) | L |
| 4 | Record a new talk/video about AI tool training or guardrails | L |
| 5 | Rename page to "Writing & Talks — AI Engineering" | S |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **Writing & Talks** |
| Enterprise | **Insights on AI Transformation** |
| Technical | **Practical lessons from enabling engineering teams with AI** |

**Subheadline — 2 options:**
1. *"Talks, articles, and lessons from training teams and building AI platforms."*
2. *"How engineering teams adopt AI tools — the real-world version."*

**Primary CTA — 3 options:**
1. `Book a Call` (→ Calendly)
2. `See How I Help` (→ How I Help page)
3. `Subscribe for Updates` (if you set up an email list — high ROI)

**IA/UX edits:**

New section order:
1. Hero (reframed for AI transformation)
2. Talks (AI Architecture Patterns first; remove or deprioritize blockchain)
3. Publications (peer-reviewed only — these show academic depth)
4. Articles (remove NFT article; keep KnowledgeX if relevant)

Remove: Technical Notes section entirely (until real content exists), NFT article, blockchain talk (or move to collapsed archive).

**Trust signals to add:**
- "Speaker at IEEE BRAINS 2020" (peer-reviewed conference — legitimate)
- Conference logos if available

**SEO:**
- Title: `AI Engineering Talks & Articles | Jacek Janczura`
- Meta: `Talks and writing on AI transformation, engineering enablement, and enterprise AI platforms. Conference speaker at IEEE BRAINS. Practical lessons from training teams at Bosch and building platforms for 50+ orgs.`

**A11y quick hits:**
1. YouTube embeds need proper `title` attributes (currently using `videoTitle` — verify rendering)
2. Tag chips (`<span class="tag">`) are non-interactive — ensure they don't appear focusable
3. Date strings should use `<time>` elements with `datetime` attributes

**Acceptance criteria:**
- [ ] Technical Notes placeholder section is removed
- [ ] Blockchain talk is deprioritized or removed
- [ ] NFT article is removed
- [ ] Page communicates AI transformation expertise through content selection

---

### Page 5: `/en/consulting/` (Consulting)

**Purpose:** Convert interested visitors into booked calls by explaining the service offering.

**Current message (key lines):**
- Hero: `"Consulting"` / `"Senior engineering leadership for complex systems (AI included, not required)"`
- Intro: `"I help teams ship secure, reliable software"`
- 4 engagement types: Fractional CTO, Architecture Review, Delivery Sprint, Developer Productivity & Safe AI Tooling
- 3 "How I approach delivery" steps
- "Good fit" list: AWS platforms, event-driven systems, multi-tenant SaaS, reliability, AI features
- CTA: `"Want to discuss a project?"` / `"Book a call"`

**Roast:**
- The hero subtitle — "(AI included, not required)" — is the most damaging line on the entire site. It's a hedge that undermines your positioning. You are literally telling AI transformation buyers "I may or may not do what you need."
- "I help teams ship secure, reliable software" — this is indistinguishable from 10,000 other engineering consultants.
- Developer Productivity & Safe AI Tooling — your ACTUAL core offer — is listed LAST of four engagement types. It's buried under Fractional CTO, Architecture Review, and Delivery Sprint.
- The "Good fit" list describes infrastructure buyers, not AI transformation buyers.
- "How I approach delivery" is generic (goals → design → iterate) — could be on any consultant's site.
- The CTA says "Want to discuss a project?" — but you're selling a program, not a project.

**Conversion blockers (ordered):**
1. Hero actively hedges away from AI — the core offer
2. Core AI enablement offer is buried at position #4 of 4
3. "Good fit" criteria don't match AI transformation buyers
4. Generic consulting language throughout — zero differentiation
5. No proof, no case studies, no named clients on this page

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Rewrite hero to lead with AI transformation | S |
| 2 | Move AI enablement to position #1 (or make it the whole page) | M |
| 3 | Restructure around 3 offers from Section C | M |
| 4 | Rewrite "Good fit" for AI transformation buyers | S |
| 5 | Add proof: Bosch reference, metrics, client count | M |
| 6 | Add disqualifier section ("Not for you if…") | S |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **How I Help** |
| Enterprise | **AI Transformation Services** |
| Technical | **Enable your engineering team to use AI properly, safely, and profitably** |

**Subheadline — 2 options:**
1. *"Training, guardrails, and rollout playbooks for engineering organizations adopting AI tools."*
2. *"From ad-hoc AI experiments to structured, secure, measurable adoption."*

**Primary CTA — 3 options:**
1. `Book 30 Minutes` (→ Calendly)
2. `Get an AI Readiness Assessment` (→ Contact with pre-filled context)
3. `See Results` (→ Results/Projects page)

**Key section rewrite — Before → After:**

**BEFORE (current intro):**
> "I help teams ship secure, reliable software-cloud platforms, distributed systems, and AI capabilities (LLM/RAG/evals) when they deliver real business value. My focus is production outcomes: clear architecture decisions, speed of delivery without regressions, cost/performance, security/compliance, and an approach that fits how your organization actually operates."

**AFTER:**
> "Your engineering team is adopting AI tools — or about to. I make sure they do it right. I run enablement programs that train developers on AI best practices (prompt engineering, context management, Cursor/Claude Code/Copilot), set up security guardrails so agents can't break prod, and deliver rollout playbooks that scale across your org. Target outcome: 3–5x throughput improvement with quality maintained. Trained Bosch. Built platforms for 50+ organizations."

**IA/UX edits:**

New section order:
1. Hero (AI transformation headline + subheadline)
2. 3 Offers (Enablement Sprint / Secure Rollout / Full Transformation — from Section C, condensed)
3. "How It Works" (Assess → Enable → Secure → Scale)
4. "This is for you if…" / "Not for you if…"
5. Proof bar (Bosch + metrics)
6. CTA (Book a Call)

Remove: Generic "Fractional CTO" and "Delivery Sprint" as lead offers. If you want to keep them, put them in a "Also available" section below the fold.

**Trust signals to add:**
- "Trained engineering teams at Bosch"
- "ISO 27001 & SOC 2 — I've delivered compliance, not just talked about it"
- Key metric: "50+ organizations"

**SEO:**
- Title: `AI Transformation Consulting | Jacek Janczura`
- Meta: `AI transformation for engineering teams: training on Cursor/Claude Code/Copilot, security guardrails, rollout playbooks. Trained Bosch. 50+ enterprise clients. Book a call.`

**A11y quick hits:**
1. Engagement cards need proper heading levels (currently may be styled divs)
2. "Book a call" CTA link to external Calendly needs `aria-label="Book a 30-minute call via Calendly"`
3. Icon-only elements (if any) need text alternatives

**Acceptance criteria:**
- [ ] Hero does not contain "(AI included, not required)" or any hedging language
- [ ] AI enablement is the primary (first) offer, not the last
- [ ] Bosch is mentioned as a named client
- [ ] "Good fit" criteria describe AI transformation buyers
- [ ] Page mentions Cursor, Claude Code, and/or Copilot

---

### Page 6: `/en/contact/` (Contact)

**Purpose:** Convert intent into a booked call or message.

**Current message (key lines):**
- Hero: `"Contact"` / `"Let's build responsibly-engineered AI"`
- Intro: `"Pick the fastest way below. I'm open to advisory, architecture reviews, and select delivery engagements focused on enterprise AI platforms."`
- Quick options: Book a call, LinkedIn, GitHub
- Message form: email + message fields
- Focus areas: AI Platform Architecture, Technical Leadership, Security & Compliance, System Design

**Roast:**
- "Let's build responsibly-engineered AI" — this is a CSR slogan, not a CTA. A CTO with budget doesn't come to your contact page to "build responsibly." They come to book a call.
- "I'm open to advisory, architecture reviews, and select delivery engagements" — the word "select" is a weird flex for someone who wants more clients.
- Focus areas don't mention training, enablement, guardrails, or AI transformation — the thing you want to sell.
- GitHub link on a consulting contact page is noise. Your buyer is a VP of Engineering, not an open-source contributor evaluating your code.
- The form has no context prompt — it says "Your message" with no guidance on what to include.

**Conversion blockers (ordered):**
1. Hero subtitle is a mood statement, not a call to action
2. Focus areas misaligned with actual offer
3. No urgency or specificity in the CTA
4. GitHub link is irrelevant for the target buyer

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Rewrite hero subtitle to be action-oriented | S |
| 2 | Replace focus areas with AI transformation topics | S |
| 3 | Remove GitHub from quick options (keep on About/footer) | S |
| 4 | Add suggested message template to form | S |
| 5 | Add "What to expect" after booking (sets expectations) | S |

**Paste-ready copy:**

**Hero headline — 3 options:**

| Style | Copy |
|-------|------|
| Direct | **Let's Talk** |
| Enterprise | **Start a Conversation** |
| Technical | **Book 30 minutes — tell me what your team needs** |

**Subheadline — 2 options:**
1. *"The fastest way: book a call. I'll ask about your team, your tools, and your timeline — and tell you honestly if I can help."*
2. *"I respond within 24 hours. Include your team size, current AI tool usage, and what outcome you're looking for."*

**Primary CTA — 3 options:**
1. `Book a 30-Minute Call` (→ Calendly)
2. `Send a Message` (→ form scroll)
3. `Message on LinkedIn` (→ LinkedIn)

**Key section rewrite — Focus Areas Before → After:**

**BEFORE:**
> - AI Platform Architecture
> - Technical Leadership
> - Security & Compliance
> - System Design

**AFTER:**
> - **AI Engineering Enablement** — Train your team on AI tools and best practices
> - **Secure AI Rollout** — Guardrails, policies, and agent safety for your org
> - **AI Transformation Program** — End-to-end enablement for engineering organizations
> - **Architecture & Technical Leadership** — When you also need system design support

**IA/UX edits:**

New section order:
1. Hero (action-oriented headline)
2. Book a Call (Calendly — primary, prominent)
3. "What to expect" (3 bullets: "I'll ask about your team" / "We'll scope the engagement" / "You'll get a proposal within 48 hours")
4. Message form (with suggested template)
5. LinkedIn (secondary contact option)

Remove: GitHub link, current focus areas.

**Trust signals to add:**
- "I respond within 24 hours"
- "Typical first call: 30 minutes, no obligation"

**SEO:**
- Title: `Contact Jacek Janczura | AI Transformation Consulting`
- Meta: `Book a 30-minute call to discuss AI transformation for your engineering team. Training, guardrails, and rollout playbooks. Response within 24 hours.`

**A11y quick hits:**
1. Form fields need visible labels (not just placeholder text)
2. Form submit button needs clear loading/success/error states
3. External links (Calendly, LinkedIn) need indication they open in new tabs

**Acceptance criteria:**
- [ ] Hero subtitle is action-oriented, not a mood statement
- [ ] Focus areas match AI transformation offer
- [ ] GitHub removed from primary contact options
- [ ] "What to expect" section exists to reduce booking friction

---

### Page 7: `/en/publications/` (Publications — orphan page)

**Purpose:** Standalone publications page (content duplicated in `/en/writing/`).

**Current message:** Same content as the publications portion of `/en/writing/`.

**Roast:**
- This page is an orphan — not linked from the nav. It exists but nobody finds it.
- Its content is already aggregated in `/en/writing/`.
- It splits SEO link equity with `/en/writing/`.

**Conversion blockers:**
1. Orphan page — no nav link, no discovery path
2. Duplicate content with `/en/writing/`

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | 301 redirect `/en/publications/` → `/en/writing/` | S |
| 2 | Or: delete the page entirely | S |

**Acceptance criteria:**
- [ ] `/en/publications/` either redirects to `/en/writing/` or is removed

---

### Page 8: `/en/talks/` (Talks — orphan page)

**Purpose:** Standalone talks page (content duplicated in `/en/writing/`).

**Same analysis as Page 7.** Orphan, duplicate content, splits link equity.

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | 301 redirect `/en/talks/` → `/en/writing/` | S |
| 2 | Or: delete the page entirely | S |

**Acceptance criteria:**
- [ ] `/en/talks/` either redirects to `/en/writing/` or is removed

---

### Page 9: `/en/privacy/` (Privacy Policy)

**Purpose:** Legal compliance (GDPR).

**Roast:** This is a privacy policy. It's fine. No roast needed — it's legally functional. Minor points:
- Mentions Google Fonts which may set cookies — verify if self-hosting fonts is possible for cleaner privacy posture.
- Mentions YouTube privacy-enhanced mode — good.

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Consider self-hosting Google Fonts to eliminate that data processor | M |

**Acceptance criteria:**
- [ ] Privacy policy accurately reflects current data processors

---

### Page 10: `/en/imprint/` (Imprint)

**Purpose:** German legal requirement (Impressum).

**Roast:** Legal page. Fine as-is. One note:
- Location says "Poland" but you're Berlin-based according to knowledge-base.md. Verify which is current/correct for legal purposes.

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Verify location accuracy (Poland vs Berlin) | S |

**Acceptance criteria:**
- [ ] Location matches your actual legal address

---

### Page 11: `/tools/` (Tools)

**Purpose:** Utility tools page (language-independent).

**Roast:**
- This page is in the nav but has no obvious connection to your AI transformation positioning.
- It's language-independent (no `/en/` prefix) which breaks the i18n pattern.
- If it's developer tools, it could actually support your positioning — but only if framed correctly.

**Actionable fixes:**

| # | Fix | Effort |
|---|-----|--------|
| 1 | Move to footer or remove from main nav | S |
| 2 | If keeping: add framing that connects it to your AI enablement work | M |

**Acceptance criteria:**
- [ ] Tools page is either reframed to support AI positioning or moved out of primary nav

---

## E) Paste-Ready Blocks

### Block 1: "How I Help Teams Use AI Without Breaking Prod"

*(Guardrails + process — for homepage or "How I Help" page)*

---

**The problem isn't AI tools. It's unstructured AI adoption.**

Your engineers are already using Cursor, Claude Code, and Copilot. Some of them are great at it. Most are prompting and praying. A few are doing things that should terrify your security team.

Here's what goes wrong without structure:

- **AI agents with production access.** An engineer gives their AI IDE a database connection string. The agent runs a DELETE query. On prod. On a Friday.
- **Over-permissioned tokens.** AI tools configured with admin-level API keys because "it was easier." One prompt injection away from data exfiltration.
- **Vibecoded slop.** AI generates code that passes a quick glance but fails under load, skips edge cases, or introduces subtle security vulnerabilities that no one catches because "the AI wrote it."
- **Zero cost discipline.** One engineer's "agent swarm" experiment burns through $3,000 in API tokens over a weekend. Nobody notices until the invoice.
- **No measurement.** You gave everyone AI tools. Are they faster? Shipping more? Shipping better? You have no idea because you never set up metrics.

**What I do about it:**

I run enablement programs for engineering organizations. Not keynotes. Not "AI strategy" decks. Hands-on work:

1. **Train your developers** on how to actually use AI tools: context management, prompt engineering, tool-specific skills (Cursor rules, CLAUDE.md configs, MCP servers), and secure workflows.
2. **Set up guardrails** that are enforced, not aspirational: least-privilege tokens, sandboxed execution, approval flows for high-risk actions, audit logs, and prompt-injection defenses.
3. **Build a rollout playbook** that scales: pilot team → early adopters → general availability, with quality gates, cost controls, and metrics at every stage.
4. **Maintain the quality bar:** AI-generated code meets the same test, review, and architecture standards as human-written code. No exceptions. No "AI slop."

**The result:** Your team ships 3–5x faster. Your security posture improves. Your AI spend is predictable. And when I leave, the playbooks, templates, and trained champions stay.

---

### Block 2: "Enablement Curriculum" (modules, 60–90 min each)

*(For "How I Help" page or Offer 1 detail page)*

---

**Module 1: Foundations — How AI Coding Tools Actually Work** *(60 min)*

- What LLMs can and can't do — setting realistic expectations
- Context windows: what they are, why they matter, how to manage them
- The difference between prompting and context engineering
- Hands-on: each participant solves a real task from your codebase with their AI tool
- Takeaway: "What changed in my workflow today" exercise

**Module 2: Prompt Engineering for Software Engineers** *(90 min)*

- Writing instructions that work: specificity, constraints, examples, chain-of-thought
- Context management strategies: what to include, what to exclude, when to start fresh
- Working with rules/policies: `.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`
- Multi-step prompting: breaking complex tasks into reliable sequences
- Hands-on: rewrite a bad prompt from your actual codebase into a good one
- Takeaway: prompt engineering cheat sheet (repo-ready)

**Module 3: AI IDE Mastery — Cursor, Claude Code, Copilot** *(90 min)*

- Tool-specific deep dives: each tool's strengths, weaknesses, and ideal use cases
- Cursor: rules, composer, context providers, codebase indexing
- Claude Code: CLAUDE.md, slash commands, MCP integration, hooks
- Copilot: suggestions, chat, workspace context, instruction files
- Hands-on: configure your AI tool for your specific repo
- Takeaway: per-repo configuration files committed to your codebase

**Module 4: MCP Patterns and Custom Skills** *(60 min)*

- What MCP (Model Context Protocol) is and why it matters
- Setting up MCP servers for your stack: database access, API integration, documentation
- Building custom skills/tools that your AI IDE can use
- Security implications: what MCP servers should and shouldn't have access to
- Hands-on: build one MCP server relevant to your team's workflow
- Takeaway: MCP server template + integration guide

**Module 5: Quality, Testing, and Review for AI-Generated Code** *(60 min)*

- The "AI slop" problem: why AI code passes a quick glance but fails in production
- Review workflow: what to look for in AI-generated PRs
- Testing requirements: unit, integration, edge cases — no exceptions for AI code
- Architecture standards: keeping AI-generated code consistent with your system design
- Hands-on: review 3 AI-generated PRs and identify issues
- Takeaway: AI code review checklist (repo-ready)

**Module 6: Cost Discipline and Operational Awareness** *(60 min)*

- Understanding AI tool costs: tokens, API calls, model selection
- Prompt hygiene: reducing unnecessary context, avoiding retrieval bloat
- Caching strategies: when and how to cache AI responses
- Loop budgets: preventing runaway agent loops ("Ralph loops") that burn money
- Agent swarms: when they're justified vs. when they're expensive theater
- Hands-on: audit one week of your team's AI tool usage and identify waste
- Takeaway: cost monitoring setup + budget alert template

---

### Block 3: "Security & Governance"

*(For Offer 2 detail page or standalone "Guardrails" section)*

---

**AI tools are powerful. Unguarded AI tools are a liability.**

Here's what a proper AI security and governance framework looks like — and what I deliver:

**Least Privilege**
Every AI tool gets the minimum permissions required for its task. No admin tokens. No production database access. No filesystem write permissions unless explicitly needed and sandboxed.

- Token scoping: per-tool, per-environment, per-team
- Permission matrices: what each tool can access, documented and enforced
- Regular access reviews: quarterly audit of AI tool permissions

**Sandboxing**
AI agent execution happens in isolated environments. If an agent goes rogue, the blast radius is contained.

- Container-based isolation for agent workloads
- Network segmentation: AI tools can't reach production services
- Resource limits: CPU, memory, and API call caps per agent session
- Filesystem isolation: agents operate in temp directories, not your codebase root

**Approval Workflows**
High-risk AI actions require human approval before execution.

- Defined risk categories: what counts as "high risk" (deployments, data access, infra changes, external API calls)
- Approval gates: PR review required for AI-generated code touching critical paths
- Escalation paths: what happens when an AI tool tries to do something it shouldn't

**Audit Logs**
Everything the AI tools do is logged, searchable, and retained.

- What prompt was sent, what response was received, what code was generated
- Which engineer initiated the action, which tool was used, what permissions were active
- Retention policy: how long logs are kept, who can access them
- Alerting: automated flags for unusual patterns (bulk data access, prod queries, etc.)

**Evals and Red Teaming**
You test your AI systems the same way you test your software.

- Eval harness: automated test suites for AI-generated code quality and security
- Red-team scenarios: "what happens if the AI is tricked into X?"
- Prompt injection testing: input validation and output filtering for AI-facing interfaces
- Regression testing: does this week's AI output maintain last week's quality?

**Data Handling Rules**
What data can be sent to which AI providers, under what conditions.

- Data classification: public, internal, confidential, restricted
- Provider-specific rules: what data can go to OpenAI, Anthropic, Azure, etc.
- On-prem vs. cloud: when data must stay in your infrastructure
- PII handling: automatic detection and redaction before AI processing

---

### Block 4: "Quality Bar: No AI Slop"

*(For homepage section or Offer 1/3 detail page)*

---

**The dirty secret of AI-assisted development: most of it produces worse code.**

Not because the tools are bad. Because teams use them without standards. Here's what "AI slop" looks like:

- Code that passes a quick glance but has subtle bugs, missing edge cases, and implicit assumptions
- Functions that "work" but violate your architecture (wrong layer, wrong patterns, wrong abstractions)
- Tests that test the happy path and nothing else — because the AI only generates what you ask for
- Copy-paste code across files because the AI doesn't understand your DRY conventions
- Security vulnerabilities: unvalidated input, SQL injection, XSS — generated by an AI that doesn't know your threat model

**How I maintain the quality bar:**

**1. AI code gets the same review standard as human code.**
No "the AI wrote it" exemption. Every PR goes through the same review process. Reviewers are trained on what to look for in AI-generated code specifically.

**2. Tests are mandatory.**
AI-generated code ships with tests. Unit tests, integration tests, edge cases. The AI can help write them, but a human verifies coverage. No test, no merge.

**3. Architecture standards are documented and enforced.**
Before the AI writes code, it has context: your architecture decisions, your patterns, your conventions. This is what `.cursorrules`, `CLAUDE.md`, and `copilot-instructions.md` are for — and I help you write them.

**4. Cost discipline prevents wasteful loops.**
When an AI agent loops 47 times to solve a problem that should take 3 steps, something is wrong. We set loop budgets, monitor iteration counts, and flag runaway processes.

**5. Metrics prove it.**
We track: PR velocity, defect rate, review cycle time, test coverage, and AI tool adoption. If AI tools are making your team faster without making them sloppier, the numbers show it. If not, we adjust.

---

### Block 5: Micro Case-Study Templates

*(5 templates — use ONLY proof from knowledge-base.md; label gaps)*

---

#### Case Study 1: Bosch — AI Engineering Enablement

**Problem:** Enterprise engineering teams needed to adopt AI-assisted development tools (Cursor, Claude Code, Copilot) but lacked structured training, security standards, and organizational guidelines for responsible usage.

**Constraints:** Enterprise environment with strict security requirements. Multiple engineering teams with varying skill levels. Need for standardized approach across the organization.

**Approach:**
- Trained engineering teams on prompt engineering techniques and responsible AI usage
- Onboarded teams to AI-assisted development tools (Cursor, Claude Code, Copilot)
- Established security standards and best practices for enterprise AI tool adoption
- Set up MCP best practices and custom skills for internal tooling
- Designed organizational guidelines for secure AI integration in development workflows

**Outcome:** Accelerated AI adoption across multiple enterprise engineering organizations. Enabled teams to integrate AI tools securely into existing workflows. Established repeatable frameworks for enterprise AI governance and training.

*NEEDS REAL EXAMPLE: Specific metrics — number of engineers trained, throughput improvement percentage, adoption rate 30/60/90 days post-training, specific security incidents prevented.*

---

#### Case Study 2: entAIngine — Enterprise AI Platform

**Problem:** Enterprises in manufacturing, pharma, and financial services needed AI-powered process automation (document workflows, knowledge-aware assistants) but couldn't trust systems that lacked security certification and high-availability guarantees.

**Constraints:** ISO 27001 and SOC 2 compliance required. Multi-tenant architecture needed for 50+ organizations. High throughput (>1,000 concurrent connections, thousands RPS). Data sovereignty as first-class requirement.

**Approach:**
- Designed multi-tenant SaaS platform on AWS with event-driven microservices (Lambda, ECS/Fargate, SNS/SQS)
- Integrated multi-model LLM stack (OpenAI, Azure OpenAI, Bedrock, Mistral)
- Built RAG pipelines with automated vector database creation (Pinecone, pgvector, Milvus)
- Delivered ISO 27001 and SOC 2 certification within ~3 months
- Designed and implemented RAG pipeline testing framework (Testbed) and Prompt Wizard for prompt optimization

**Outcome:** Serving 50+ organizations with 99.9% uptime. ISO 27001/SOC 2 certified. Production-grade reliability enabling faster AI adoption across enterprise workflows.

---

#### Case Study 3: RP Group — ML Product Matching

**Problem:** Emergency lighting manufacturer needed to match customer inquiries (P93 files) with appropriate product offers (P94 files) — a process that required scarce domain experts and took significant time per offer.

**Constraints:** Specialized domain (emergency lighting). Limited training data (96 document pairs initially). Need for interpretable, deployable model — not a black box.

**Approach:**
- Built LLM-assisted data extraction pipeline using entAIngine API
- Engineered 25+ domain-specific features (difference, ratio, compatibility features)
- Benchmarked 5 ML models with hyperparameter optimization (GridSearchCV)
- Selected tuned Random Forest for interpretability and strong ranking quality

**Outcome:** 60% reduction in offer preparation time. 70.7% Top-1 accuracy (MRR 0.835, AUC-ROC 0.923). Eliminated dependency on human expertise for product selection, enabling the company to scale operations.

---

#### Case Study 4: idealo — International Login Rollout

**Problem:** Germany's largest price comparison portal (18M monthly active users) needed to internationalize its Single Sign-On system across 6 European countries to drive customer acquisition.

**Constraints:** 18M monthly users — zero-downtime rollout required. Multiple countries with different regulatory requirements. High-performance real-time systems (Kafka, NoSQL, WebSockets).

**Approach:**
- Contributed to multi-country login rollout architecture
- Built real-time systems and enterprise microservices (Java/Kotlin, Spring Boot)
- Ran A/B tests to validate rollout impact
- Participated in on-prem → AWS migration

**Outcome:** 1.4M new accounts created in 3 months (700% over forecast). 300%+ increase in customer acquisition from SSO internationalization.

---

#### Case Study 5: [AI Guardrails Implementation] — NEEDS REAL EXAMPLE

**Problem:** *NEEDS REAL EXAMPLE: Engineering organization using AI tools without security standards, experiencing [specific incidents or risks].*

**Constraints:** *NEEDS REAL EXAMPLE: Regulated industry, existing compliance requirements, team size, tool inventory.*

**Approach:**
- *NEEDS REAL EXAMPLE: Specific guardrails implemented — token scoping, sandboxing, approval workflows, audit logging.*
- *NEEDS REAL EXAMPLE: Policy documents delivered, eval harness built, red-team scenarios tested.*

**Outcome:** *NEEDS REAL EXAMPLE: Measurable improvements — security incidents prevented, compliance audit passed, cost savings from prompt optimization, adoption rate with guardrails in place.*

*To fill this template: Document your next guardrails engagement in real-time. Capture before/after states, specific configurations deployed, and any metrics available (even qualitative feedback counts).*

---

## F) Implementation Backlog

Top 20 tasks, prioritized. P0 = do this week. P1 = do this month. P2 = do when P0/P1 are done.

| # | Priority | Owner | Effort | Page/Section/Component | What to Change | Acceptance Criteria |
|---|----------|-------|--------|----------------------|----------------|-------------------|
| 1 | **P0** | Copy | S | Homepage hero (`index.json:hero`) | Replace `"AI Architect & CTO"` / `"Transforming operational complexity..."` / `"Co-founder at Jaden Data..."` with AI transformation messaging. Use one of the 3 hero options from Section D. | Hero communicates "AI enablement for engineering teams" in 5 seconds. No mention of "process intelligence." |
| 2 | **P0** | Copy | S | Consulting hero (`consulting.json:hero`) | Replace `"Senior engineering leadership for complex systems (AI included, not required)"` with AI transformation headline. Kill the hedge. | Hero says AI transformation / enablement clearly. No parenthetical hedging. |
| 3 | **P0** | Copy | S | Consulting engagements (`consulting.json:engagements`) | Move "Developer Productivity & Safe AI Tooling" from position #4 to position #1. Rename to "AI Engineering Enablement." Remove "(optionally)" from the description. | AI enablement is the first offer listed. No "optionally" language. |
| 4 | **P0** | Copy | S | Homepage FAQ (`index.json:faq`) | Delete the entire FAQ section. Replace with "Is this for you?" disqualifier block (from Section B messaging hierarchy). | FAQ section is gone. Disqualifier section exists with for/not-for criteria. |
| 5 | **P0** | Copy | S | Homepage highlights note (`index.json:highlights.note`) | Delete the extreme sports note from homepage. | No extreme sports content on homepage. |
| 6 | **P0** | Copy | M | Homepage highlights (`index.json:highlights`) | Replace 6 generic capability cards with 3 outcome-focused cards: (1) Train your devs on AI best practices, (2) Ship guardrails so AI agents can't break prod, (3) Measure the gains, kill the slop. | 3 cards, each with outcome headline + 1-sentence description. Cards mention Cursor/Claude Code/MCP/guardrails. |
| 7 | **P0** | Copy | S | NavBar brand (`NavBar.astro:213`) | Change `"AI Architect & Consultant"` to `"AI Transformation for Engineering Teams"` | Brand subtitle says "AI Transformation for Engineering Teams" on every page. |
| 8 | **P0** | Copy | S | Homepage positioning (`index.json:positioning`) | Replace dense paragraphs with the "AFTER" version from Section D homepage rewrite. Mention Cursor, Claude Code, Bosch, guardrails. | Positioning block is scannable (under 60 words), mentions AI tools by name, references Bosch. |
| 9 | **P1** | Copy | M | Homepage featured (`index.json:featured`) | Replace "Process Intelligence in Action" section with "How It Works" 4-step process (Assess → Enable → Secure → Scale). | 4 sequential steps, each with 1-sentence description. Section title is "How It Works." |
| 10 | **P1** | Copy/Design | M | Homepage (new section) | Add proof bar section: Bosch logo/name + "50+ organizations" + "ISO 27001/SOC 2" + optional "€1M+ bootstrapped." | Proof bar exists between "How It Works" and disqualifier. At least 3 metrics visible. |
| 11 | **P1** | Copy | M | Projects page (`projects.json`) | Add Bosch AI Transformation engagement as first project entry. Use the case study template from Section E. | Bosch is listed as the first or second project. Describes AI training/enablement work. |
| 12 | **P1** | Copy | S | Projects hero (`projects.json:hero`) | Rename page from "Projects" to "Results." Update hero subtitle to reference AI transformation outcomes. | Page title says "Results." Subtitle references client outcomes, not portfolio. |
| 13 | **P1** | Copy | S | Contact focus areas (`contact.json:focus`) | Replace 4 focus areas with AI transformation topics (AI Engineering Enablement, Secure AI Rollout, AI Transformation Program, Architecture & Technical Leadership). | Focus areas match the 3 offers from Section C + architecture catch-all. |
| 14 | **P1** | Copy | S | Contact hero (`contact.json:hero`) | Replace `"Let's build responsibly-engineered AI"` with action-oriented subtitle. | Subtitle is a call to action, not a mood statement. |
| 15 | **P1** | Copy | S | Consulting good fit (`consulting.json:goodFit`) | Rewrite "Good fit" list for AI transformation buyers (per Section D consulting rewrite). | "Good fit" criteria reference engineering team size, AI tool adoption stage, regulated industries. |
| 16 | **P1** | Dev | S | Writing page / publications | Remove Technical Notes placeholder section (4 cards with no linked content). | No placeholder cards visible on `/en/writing/`. |
| 17 | **P1** | Dev | S | Orphan pages | Set up 301 redirects: `/en/publications/` → `/en/writing/` and `/en/talks/` → `/en/writing/`. | Both URLs redirect. No duplicate content. |
| 18 | **P1** | Copy | S | About philosophy (`about.json:philosophy`) | Replace 4-paragraph philosophy section with 3-sentence credibility statement (from Section D about page rewrite). | Philosophy section is max 3 sentences. Mentions Bosch, 50+ orgs, AI enablement. |
| 19 | **P2** | Copy | L | Writing page | Write 1-2 real articles on AI enablement topics (e.g., "How to Roll Out Cursor Securely" or "What Engineering Leaders Get Wrong About AI Adoption"). | At least 1 new article published that targets AI transformation keywords. |
| 20 | **P2** | Copy/Design | M | Nav structure (`NavBar.astro:navLinks`) | Reduce nav from 7 items to 5: How I Help (replace Consulting), Results (replace Projects), About, Writing, Contact. Remove Tools from main nav (move to footer). | Nav has 5 items + Book a Call CTA. No "Tools" in main nav. |

---

### Priority Summary

| Priority | Count | Theme |
|----------|-------|-------|
| **P0** | 8 | Core messaging — hero copy, positioning, nav brand. Can be done in 1 day. |
| **P1** | 9 | Structural changes — new sections, page renames, proof bar, redirects. 1–2 weeks. |
| **P2** | 3 | Content creation and nav restructure. 2–4 weeks. |

**Total estimated effort to transform the EN site messaging:**
- P0 (8 tasks, mostly S): **1–2 days** of focused copy work
- P0 + P1 (17 tasks): **1–2 weeks** with copy + light dev work
- All 20 tasks: **3–4 weeks** including content creation

---

## End of Report

**Summary:** Your site is a CTO's portfolio pretending to be a consulting offer. The fix is straightforward: replace "AI Architect & CTO" positioning with "AI Transformation for Engineering Teams," surface the Bosch proof, add AI tool terminology (Cursor, Claude Code, MCP, guardrails), restructure around 3 productized offers, and delete everything that dilutes the story (Process Intelligence, FAQ, extreme sports, blockchain content).

The 8 P0 tasks can be done in a day. They will transform how your site reads. Do those first. Everything else follows.

---

*Report generated from repository source code analysis. All quotes reference `src/i18n/en/*.json` files and `src/components/*.astro` components. Knowledge-base claims sourced from `docs/knowledge-base.md`. Items marked "NEEDS PROOF" require real data before publishing.*
