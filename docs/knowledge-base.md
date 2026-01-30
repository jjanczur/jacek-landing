# Jacek Janczura - Professional Knowledge Base

This knowledge base consolidates information from multiple CV versions and personal website for use in CV generation.

---

## Personal Information

- **Full Name:** Jacek Janczura
- **Current Role:** CTO & Co-Founder @ Jaden Data / entAIngine
- **Location:** Berlin, Germany
- **Email:** in .env file
- **LinkedIn:** https://www.linkedin.com/in/jacekjanczura
- **GitHub:** https://github.com/jjanczur
- **Personal Website:** https://janczura.com
- **ResearchGate:** https://www.researchgate.net/profile/Jacek_Janczura

---

## Professional Summary

Experienced AI engineer, Cloud Architect, and CTO with a passion for distributed systems, real-time data processing, and serverless architectures. Co-founder and lead architect at Jaden Data and JadenX GmbH, where he designed and deployed scalable AI platforms, integrating models from AWS, Azure, and OpenAI. Specialized in microservices, Retrieval-Augmented Generation (RAG) services, and optimizing cost and performance for high-throughput systems.

A strong proponent of SOLID principles and TDD, led teams, automated processes for industries like insurance, banking, and automotive, and ensured compliance with ISO27001 and SOC2. Skilled in bridging technical and business needs to deliver innovative, robust solutions.

### Philosophy: Process Intelligence

> "AI must serve your processes, not replace them."

Every solution starts with understanding how work actually gets done. Technical capability is the foundation, but real value comes from transforming operations: turning hours of manual work into minutes of automated intelligence.

---

## Work Experience

### Co-founder & CTO | Jaden Data GmbH
**Berlin, Germany | March 2021 - Present**

**Company Building:**
- Played a pivotal role in transforming an idea into a fully profitable company with annual revenues exceeding €1M
- Scaled the engineering team from 0 to 10 developers, building a high-performance technical organization
- Led the company through ISO27001 and SOC2 security, compliance and audits, achieving certifications within a tight 3-month deadline

**Technical Leadership:**
- Architected and led the implementation of an advanced, multi-tenant AI platform integrating with AI/ML models from AWS Bedrock, AWS SageMaker, Azure ML Studio, OpenAI, and Mistral, delivering seamless connectivity and enabling cross-platform collaboration
- Designed and deployed an event-driven microservices architecture for AI process automation, leveraging AWS technologies such as Fargate (ECS, ECR), Lambda, SNS, SQS, and CloudWatch, alongside EC2 and S3 for storage and computation
- Auditing AWS infrastructure and made sure it follows AWS Well-Architected Framework
- Optimized for cost-efficiency and serverless autoscaling, the platform successfully managed over 1,000 concurrent connections and processed thousands of requests per second
- Pioneered the development of a state-of-the-art Retrieval-Augmented Generation (RAG) service, automating the creation of vector databases from client files using Pinecone, pgvector, and Milvus for advanced document retrieval and contextual data augmentation
- Designed and implemented a robust AI process and RAG pipeline testing framework (Testbed), enabling quantitative and qualitative assessment of AI pipelines through deterministic test cases
- Developed "Prompt Wizard," a sophisticated tool that automates the optimization of LLM prompts, significantly enhancing prompt engineering workflows for enterprise users
- Delivered custom AI solutions across insurance, legal, automotive, and property industries

**Management & Strategy:**
- Team Management: Oversaw multiple development teams, ensuring seamless collaboration and fostering an environment of innovation and excellence
- Architecture Design: Spearheaded the design and implementation of sophisticated architectures tailored to client needs
- Quality Assurance: Implemented stringent quality control measures, ensuring all delivered solutions met and exceeded industry standards
- Strategic Leadership: Formulated and executed technology strategies that align with the company's objectives
- Innovation and R&D: Cultivated an atmosphere of constant learning and innovation
- Stakeholder Communication: Fostered strong relationships with clients, shareholders, and partners
- Resource Allocation & Budgeting: Managed the company's technical budget, ensuring optimized resource allocation
- Risk Management: Proactively identified, evaluated, and mitigated risks associated with technical operations
- Mentorship & Training: Initiated mentorship programs, continuously uplifting the skills and knowledge of team members

**Key Projects at Jaden Data:**

#### entAIngine (2022 - Present)
CTO of a SaaS platform for AI process automation. Transforms mission-critical back office operations through intelligent automation, knowledge-aware chatbots, and sophisticated document workflows. Built for businesses that demand the highest standards of security, compliance, and performance-ISO 27001 and SOC2 Type 2 certified with complete data sovereignty. Serving 50+ organizations with 99.9% uptime.

**Industries:** Production & Manufacturing, Pharmaceutical, Financial Services, Enterprise Operations
**Tech:** AWS Lambda, ECS/Fargate, SNS/SQS, OpenAI, Azure, Bedrock, Mistral, RAG, RBAC

#### entAIgent (2023)
No-Code AI Agent Platform. Empowers operations teams, customer service, and HR departments to create sophisticated multi-agent AI systems without technical expertise. Through intuitive drag-and-drop design, teams build coordinated AI agents specialized for specific roles.

**Tech:** AI Agents, No-Code, Visual Workflows, Multi-Agent Orchestration, Evals

#### Flowhive AI (2022-2023)
All-in-One AI Workspace. Unified access to leading AI models (GPT, Claude, Gemini, Llama, Mistral) in a single collaborative workspace. Deep research capabilities including internet-scanning AI agents, agentic workflows, and knowledge management.

**Tech:** Multi-Model Access, Side-by-Side Comparison, AI Agents, Knowledge Management, Team Collaboration

#### Flowhive VC (2023)
AI for Venture Capital. Portfolio management meets process intelligence. Pre-configured agents for company due diligence and competitive analysis, portfolio intelligence tracking, deal flow automation, and market mapping.

**Tech:** AI Agents, Due Diligence Automation, Portfolio Intelligence, Market Mapping, Deal Flow Systems

#### Valuation Engine (2022)
AI-Powered Property Valuation. Specialized AI platform for real estate appraisers and valuers. Save 2+ hours per appraisal with AI-driven research. Generates appraisal-ready reports in 2-3 minutes per property.

**Tech:** Real Estate AI, Location Analysis, Market Intelligence, Report Generation, Multi-Source Data Integration

--- Other projects under Jaden Data ---

 #### RP-Matcher: ML Product Matching System for RP Group (2025-2026) <!-- Note: Project done as part of Jaden Data-->
**Role: ML Engineer & Data Scientist | Project Lead**

**Client:** RP Group (Emergency Lighting Solutions)

**Project Goal:**
Automatically match customer inquiries (P93 files) with appropriate product offers (P94 files) from product catalog for emergency lighting solutions, eliminating manual product selection by domain experts.

**Business Impact:**
- **60% reduction** in offer preparation time
- **Eliminated dependency** on human expertise for product selection
- Company can now scale operations without proportional increase in expert staff
- **Saved countless hours** of manual product matching work

**ML Architecture & Models:**
Developed and benchmarked **5 different machine learning models** with hyperparameter optimization (GridSearchCV):

1. **Random Forest (Tuned)** - 🏆 Best Model
   - 70.7% Top-1 Accuracy
   - Ensemble of decision trees with voting mechanism
   - Excels at capturing complex feature interactions

2. **Extra Trees (Tuned)**
   - 69.5% Top-1 Accuracy
   - Extremely Randomized Trees with random splits
   - Faster training, handles noisy features well

3. **Gradient Boosting (Tuned)**
   - 67.1% Top-1 Accuracy
   - Sequential tree building with error correction
   - Powerful for matching complex relationships

4. **Voting Ensemble**
   - 69.5% Top-1 Accuracy
   - Combines Random Forest, Extra Trees, and Gradient Boosting
   - Leverages strengths of each base model

5. **Stacking Ensemble**
   - 70.7% Top-1 Accuracy
   - Meta-learner (Logistic Regression) on top of base models
   - Trained on out-of-fold predictions

**Model Performance:**
- **Best Model:** Random Forest (Tuned)
- **Top-1 Accuracy:** 70.7% (correct product in first position)
- **Mean Reciprocal Rank (MRR):** 0.835 (correct match usually in top 2)
- **AUC-ROC:** 0.923

**Feature Engineering:**
- **25+ engineered features** including:
  - Difference features (diff_*)
  - Ratio features (ratio_*)
  - Compatibility features (compat_*)
- Domain-specific symbolic logic rules for feature enhancement
- Automatic product type detection (e.g., Rettungszeichenleuchte)
- Mounting method recognition
- Numerical normalization

**Data Pipeline:**
- **LLM-assisted extraction** using entAIngine API
- Processed **96 document pairs** (P93/P94)
- Generated **369 positive matches** (571% increase from initial 55)
- Balanced dataset with 5.4:1 negative-to-positive ratio
- Same-document negatives for correct task formulation

**Technical Innovations:**
- **Robust data cleaning:** Handled infinity values and extreme outliers with 99.9th percentile clipping
- **Feature consistency:** Ensured uniform feature columns across all dataset variants
- **Deep learning exploration:** Tested bi-encoder approach (paused due to data limitations - needs 5-10x more data)

**Expected Scaling:**
- Current (96 pairs): 70.7% accuracy
- Target (150 pairs): 75-80% accuracy
- Ideal (200+ pairs): 80-85% accuracy
- Rule of thumb: +5% accuracy per 50 additional document pairs

**Technologies:** Python, Scikit-Learn, Random Forest, Extra Trees, Gradient Boosting, Ensemble Methods, Pandas, NumPy, GridSearchCV, LLM Integration (entAIngine API), Feature Engineering, Hyperparameter Optimization

#### KnowledgeX (2021-2022) - EU Horizon 2020 Funded <!-- Note: Project done as part of Jaden Data-->
**Role: CTO, Tech Lead & Lead Architect | Designed and Led Implementation of Marketplace**

**Project Overview:**
KnowledgeX is a platform combining blockchain technology and confidential computing (TEEs) to enable secure inter-organizational data processing. Received initial funding from the European Union's Horizon 2020 research and innovation programme (Grant No. 957338) within NGI ONTOCHAIN.

**My Contributions:**
- **Designed and led implementation** of the KnowledgeX Data Science Marketplace - enabling freelance data scientists to build models on private data without controlling access to it
- Architected the end-to-end secure data processing workflow: preparation → agreement → execution → evaluation phases
- Designed the modular microservices architecture including: Agreement Service, Execution Service, User Management, Matchmaking Engine, Audit Service, and Payment Service
- Implemented smart contracts on Ethereum for authorization, data processing agreements, and tamper-proof audit trails
- Integrated iExec decentralized cloud computing framework for TEE-based confidential computing
- Built support for multiple interaction patterns: 1-to-1, 1-to-n, n-to-1, and n-to-m data processing workflows
- Implemented AES-256 encryption for data at rest with secure key management via Secret Management System (SMS) running in TEEs
- Enabled "bring the code to the data" processing pattern for maximum data sovereignty

**Key Technical Achievements:**
- Multi-party data processing without data leakage using Intel SGX trusted execution environments
- Blockchain-based immutable audit trail of all data processing tasks, inputs, and outputs
- Integration with IPFS and AWS S3 for encrypted data storage
- OpenID Connect integration for federated identity management

**Publication:** "KnowledgeX: Trusted Inter-organizational Data Processing" - Co-authored whitepaper

**Tech Stack:** Ethereum, Solidity, Smart Contracts, iExec, Intel SGX (TEE), Confidential Computing, Node.js, Python, IPFS, AWS S3, AES-256, OpenID Connect, Microservices

**Website:** https://www.knowledgex.eu

---

#### Holoni (2021-2022) - EU AI4Cities Horizon 2020 Project <!-- Note: Project done as part of Jaden Data-->
**Role: Lead Backend Engineer & Blockchain Architecture Designer**

**Project Overview:**
HOLONI is a European digital cleantech startup developed through the EU AI4Cities program (Horizon 2020, Grant No. 871914). The platform enables municipalities, sustainable brands, and energy retailers to assess solar potential across cities and automate reward schemes for urban solar prosumers. Piloted in **Copenhagen, Denmark**.

**My Contributions:**
- **Led the backend implementation** of the HOLONI platform
- **Designed the blockchain architecture** for DLT-based reward and incentive schemes for solar prosumers
- Integrated AI solar surplus prediction with blockchain-based result verification
- Implemented integration with ORIGIN (Energinet's prototype for hourly electricity origin verification)
- Built secure APIs connecting AI prediction models with blockchain reward distribution
- Designed smart contracts for automated compensation based on verified solar contribution

**Project Impact:**
- Acts as a catalytic tool towards positive energy districts and renewable energy communities
- Enables local energy markets and democratizes asset ownership and financing
- Accelerates deployment of shared Distributed Energy Resources (DER)

**Consortium Partners:**
- Alpha Venturi (Norwegian venture studio) - Project incubator
- Energinet (Danish Transmission System Operator) - ORIGIN integration
- University of Oslo Blockchain Research Lab - Security and privacy R&D

**Tech Stack:** Blockchain, DLT, Smart Contracts, AI/ML (Solar Prediction), Python, Node.js, REST APIs, IoT Integration

**More Info:** https://ai4cities.eu/pilots/energy-holoni

---

#### Project CBDC (Central Bank Digital Currency) <!-- Note: Project done as part of Jaden Data-->
**Role: Technical Lead**
**Timeframe: 2022-2023**

Implementation of a cross-ledger bridge between IOTA and Ethereum for central bank digital currencies with **Norges Bank** (Central Bank of Norway). Explored programmable money and cross-chain interoperability for sovereign digital currencies.

**Tech:** IOTA, Ethereum, Cross-Ledger Bridge, Smart Contracts, Central Bank Integration

#### Project DiLLaS (2021-2022) <!-- Note: Project done as part of Jaden Data-->
**Role: Technical Project Lead Blockchain**
**Timeframe: 2021**

Technical project lead blockchain for supply chain management using Ethereum and Hyperledger Fabric. Backend in Java. Development services for the Dutch company InnoTractor. Current users include Poste Italiane (Italian state-owned post), Schiphol Container Services (Amsterdam Airport).

**Tech:** Ethereum, Hyperledger Fabric, Java, Supply Chain, Package Tracking

---

### Software Engineer | idealo internet GmbH
**Berlin, Germany | April 2020 - June 2021**
**Department:** Product & Technology

**Company Context:**
idealo internet GmbH (subsidiary of Axel Springer SE) is Germany's most popular and successful price comparison portal with up to **18 million monthly active users**. Since 2000, the company has supported customers in making the right purchase decisions across several European countries. With **1,000+ employees** and different international teams, idealo is located in the heart of Berlin.

**Key Responsibilities:**
- **Cross-team software development** facilitating the whole software development lifecycle
- **Software architecture** including definition of data flows, data structures and application of common architectural patterns
- **Analysis, creation and maintenance of infrastructure** in container-based ecosystems
- **Education of engineers** in team-local and company-wide context
- **Close cooperation with UX/UI designers**
- **Creation, executing and analysis of A/B tests**
- **Analysis of customer inside lounges**

**Major Achievements:**
- **Internationalization of SSO Systems:** Significantly contributed to the internationalization of idealo's Single Sign-On (SSO) systems, which led to an **increase of more than 300% in customer acquisition**
- **Multi-country Login Rollout:** Enabled login at idealo in 6 countries, resulting in **1.4M new accounts created in 3 months (700% over the forecast)**
- Built production-ready products from ideation, product discovery, architecture, until releasing client-facing features

**Technical Implementation:**
- Development of **real-time high-performance solutions** based on Kafka, NoSQL, WebSockets
- Implementation of **enterprise, production-ready microservices** and REST APIs in Java and Kotlin with Spring Boot, Spring Security, Hibernate, relational and NoSQL databases
- A/B testing of new features with metrics and results analysis using SiteSpect and Google Analytics
- Implementation of frontend features in cooperation with UX designers
- **On-call duty** - ensuring idealo applications work flawlessly 24/7
- Participated in the **migration of idealo from on-premise to AWS**

**Employer Recognition** (Official Employer Reference, June 2021):
- **Specialist Knowledge:** "Possesses excellent specialist knowledge extending far beyond the mainstream, applied to business processes in a most effective and beneficial manner"
- **Learning & Adaptation:** "Continuously and very successfully expanded and updated extensive specialist knowledge by regularly attending events to further his education"
- **Analytical Ability:** "Due to exacting analytical ability, was always able to understand complex situations immediately and find good solutions right away"
- **Work Ethic:** "Huge level of dedication and motivation. Absolutely reliable, circumspect, and diligent work ethics could be relied on at all times and even in the most difficult situations"
- **Autonomy:** "Completed all tasks completely autonomously, with diligence and according to a well thought-out plan"
- **Quality:** "Worked serenely, thoughtfully, target-oriented and highly precisely. Absolute and unrestricted reliability and honesty are particularly worthy of emphasis"
- **Problem Solving:** "Even when faced with complex problems, found very effective solutions which he was able to implement successfully and thus always achieved good work results"
- **Performance:** "Always and in every respect earned our full recognition"
- **Personal Conduct:** "Consistently friendly and well-balanced demeanour. Always helpful, courteous, and put the interests of others before his own. Personal conduct with superiors, colleagues and clients was always exemplary and loyal"

**Departure:** Left on own accord (30 June 2021) to pursue founding Jaden Data GmbH. idealo expressed sincere regret at losing "a very capable employee" with "consistently very good performance."

---

### Blockchain Engineer | TU Berlin - Deutsche Telekom Innovation Laboratories (T-Labs)
**Berlin, Germany | May 2019 - April 2020**

- Development of the system architecture for blockchain-based package tracking
- Implementation and deployment of a distributed Hyperledger blockchain network
- Implementation of the chaincode (smart contracts) for the package tracking system
- Dockerization of blockchain network and multiple microservices
- Implementation of the secured REST API for interaction with Hyperledger fabric network
- Implementation of the proxy micro-service to allow mobile application and ERP system interaction with the blockchain
- Implementation of an authentication micro-service for blockchain, mobile app, and other services

**Technologies:** Hyperledger Composer, Hyperledger Fabric, Node.js, JavaScript (ES6), Express.js, Docker/Docker-Compose, JWT, PostgreSQL

---

### Associate Technical Consultant | SAS Institute
**Warsaw, Poland | September 2016 - September 2018**
**Industry Focus:** Banking & Financial Services

**Selection Process:**
- Selected as **one of the best students** for the prestigious **SAS Institute Academy of Youth Talents** program
- Completed **2 weeks of intensive training** in advanced SAS technologies (Data Processing, Macro Language, Data Integration Studio)
- Successfully passed **8-hour on-site technical assignment** as top candidate
- Received **job offer as one of the top 2 candidates** from the academy cohort
- This selection process granted access to comprehensive SAS certifications and advanced training

**Client Engagement - ING Bank & ING Group:**
- **International consulting** assignments in **Madrid (Spain)** and **Amsterdam (Netherlands)**
- Worked directly with ING Bank and ING Group on cutting-edge analytics solutions

**Major Project: "Model Bank" - Real-Time Behavioral Marketing Platform**
e
**Project Significance:**
One of the **first real-time user behavior analysis implementations in the world** for the banking sector.

**Project Scope & Innovation:**
- **Real-time data processing** analyzing **thousands of actions per second** including:
  - Card payments (online and offline)
  - Online banking portal logins
  - Transaction patterns
  - User interaction behaviors
- **Behavioral pattern detection** to identify when users were most receptive to product offerings
- **Personalized marketing engine** serving dynamically rendered advertisements:
  - Same product, different presentation
  - Customized wording and colors based on user profile and personality
  - Real-time adaptation to user behavior signals

**Role & Contributions:**
- **Founding team member** - participated in the entire project lifecycle:
  - Initial ideation and solution design
  - Proof of concept development
  - Customer demonstrations
  - **Winning the competitive project bid**
  - Implementation of the production system
- **Data orchestration and analysis specialist**
- Designed and implemented real-time data pipelines handling thousands of events per second

**Technical Architecture:**
- **Stream Processing:** Apache Kafka, Apache Flink, Apache Camel
- **SAS Technologies:** SAS Real-Time Decision Manager (RTDM), SAS Event Stream Processing (ESP)
- **Historic Achievement:** Delivered one of the **first SAS ESP implementations in the European Union** for this customer

**Additional Contributions:**
- Implemented a **GDPR lineage plugin** for SAS Data Integration (DI) Studio that presented ETLs and data lineage for compliance
- The plugin was adopted by **data analysts across the entire ING Group internationally**
- Conducted performance tests of business applications
- Developed real-time decision software used in the biggest banks in Poland
- Optimized database queries for high-throughput analytical systems

**Technologies:** Java, Spring Boot, Apache Kafka, Apache Flink, Apache Camel, Cassandra, SAS Real-Time Decision Manager, SAS Event Stream Processing, SAS Data Integration Studio, 4GL, Git, WebServices, Python, Groovy, PL/SQL, Powershell, Bash

**Certification:** SAS Certified Base Programmer for SAS 9

---

### Trainee, Embedded Systems Department | Impact Clean Power Technology S.A.
**Warsaw, Poland | June 2016 - September 2016**

- Implementation of a tester used for a Solaris bus battery management system and for a bus battery itself
- **Key Project**: Implementation of an asymmetrically encrypted communication between the components in an electronic circuit used for house electricity measurements by electricity provider **RWE** (currently Innogy). This was a client project for Impact Clean Power, showcasing work with major energy providers on secure IoT/embedded systems.

**Technologies:** C, CANFestival, Vector CANalyzer + CANoe, LDRA Testbed - Static and Dynamic Analysis, I2C, CAN, 1-Wire, SPI

**Industries:** Energy & Utilities, Automotive (Electric Buses), Industrial IoT

---

## Blockchain & DLT Experience Summary

Extensive blockchain experience across multiple domains, from EU-funded research projects to enterprise implementations:

| Project | Role | Domain | Key Technologies |
|---------|------|--------|------------------|
| **KnowledgeX** | Lead Architect & CTO | Data Science Marketplace | Ethereum, iExec, Intel SGX TEE, Smart Contracts |
| **Holoni** | Lead Backend & Blockchain Design | Clean Energy/Prosumers | DLT, Smart Contracts, AI Integration |
| **CBDC** | Technical Lead | Central Bank Digital Currency | IOTA, Ethereum, Cross-Ledger Bridge |
| **DiLLaS** | Technical Project Lead | Supply Chain | Ethereum, Hyperledger Fabric, Java |
| **T-Labs Package Tracking** | Blockchain Engineer | Logistics/IoT | Hyperledger Fabric, Node.js |

**Blockchain Specializations:**
- **Privacy-Preserving Systems:** Confidential computing with TEEs, secure multi-party data processing
- **DeFi & Tokenization:** Smart contracts for compensation, reward schemes, programmable money
- **Enterprise Blockchain:** Hyperledger Fabric for permissioned networks, supply chain traceability
- **Cross-Chain Solutions:** IOTA ↔ Ethereum bridges for CBDC applications
- **Blockchain + AI:** Integration of ML models with blockchain verification and audit trails

**EU Funded Projects:**
- NGI ONTOCHAIN (Horizon 2020, Grant No. 957338) - KnowledgeX
- AI4Cities (Horizon 2020, Grant No. 871914) - Holoni

---

## Education

### M.Sc. Computer Science | Technische Universität Berlin
**October 2017 - September 2020 | Berlin, Germany | Grade: 1.3 (A)**
- Focus: Distributed Systems, Security, Machine Learning
- Thesis: Blockchain-based solutions for digital content monetization

### M.Sc. Computer Science | Warsaw University of Technology
**October 2017 - September 2020 | Warsaw, Poland | Grade: 1.0 (A) - The Honors Diploma**
- Double-degree program with TU Berlin
- Top of class performance
- Focus: Software Engineering, Data Engineering

### Exchange Semester | Technische Universität Hamburg-Harburg
**October 2015 - March 2016 | Hamburg, Germany | Computer Science**
- International exchange program
- Focus: Embedded Systems, Communications

### B.Sc. Electronics and Computer Engineering | Warsaw University of Technology
**October 2013 - June 2017 | Warsaw, Poland | Grade: 1.0 (A)**
- Foundation in electronics, programming, computer architecture
- Strong emphasis on practical engineering skills

---

## Technical Skills

### AI & Machine Learning
- **LLM Platforms:** OpenAI GPT-4/4o/4o-mini, DALL-E 3, LLAMA 3.1, Mistral models, Claude, Gemini
- **RAG & Vector Databases:** Pinecone, pgvector, Milvus
- **AI Frameworks:** LangChain, TensorFlow, Keras, Scikit-Learn, Scipy, Pandas
- **ML Models:** Random Forest, Extra Trees, Gradient Boosting, XGBoost, Ensemble Methods (Voting, Stacking)
- **ML Techniques:** Hyperparameter Optimization (GridSearchCV), Feature Engineering, Cross-Validation
- **Prompt Engineering & Optimization**
- **Multi-Model Integration (OpenAI, Azure, Bedrock, Mistral)**
- **AI Pipeline Design & Testing**
- **LLM-Assisted Data Extraction & Processing**

### Cloud & Infrastructure
- **AWS:** Lambda, ECS/Fargate, ECR, Bedrock, SageMaker, SNS, SQS, CloudWatch, EC2, S3, API Gateway, Beanstalk, IAM, CDK
- **Azure:** Kubernetes, EntraID, Azure Functions, Storage Accounts, Azure ML Studio
- **Event-Driven Microservices Architecture**
- **Serverless Architecture**
- **Infrastructure as Code (IaC) using AWS CDK**
- **AWS Well-Architected Framework**

### Backend Development
- **Languages:** Java, Kotlin, Python, JavaScript (ES6)
- **Frameworks:** Spring (Boot, Security, Cloud), Hibernate, FastAPI, Express.js
- **APIs:** REST, WebSockets, gRPC

### Blockchain & Distributed Ledger Technology
- **Platforms:** Ethereum (Solidity), Quorum, Hyperledger Fabric, Hyperledger Composer, IOTA
- **Smart Contracts & dApps Development**
- **Cross-Ledger Bridges** (IOTA ↔ Ethereum)
- **Confidential Computing & TEEs** (Intel SGX)
- **Decentralized Cloud Computing** (iExec)
- **Privacy-Preserving Computation**
- **DLT for Energy Trading & Prosumer Rewards**
- **Blockchain-based Audit Trails**
- **Central Bank Digital Currencies (CBDC)**

### Data & Streaming
- **Stream Processing:** Apache Kafka, Apache Flink, Apache Camel
- **Real-Time Analytics:** SAS Real-Time Decision Manager (RTDM), SAS Event Stream Processing (ESP)
- **Databases (SQL):** PostgreSQL, MySQL, MariaDB, H2
- **Databases (NoSQL):** MongoDB, Cassandra
- **Event-Driven Architectures:** Thousands of events per second processing

### DevOps & Testing
- **Containers:** Docker, Kubernetes
- **CI/CD:** Bitbucket Pipelines, Jenkins, CircleCI
- **Testing:** TDD/BDD, Mockito, JUnit 5, Test Containers
- **Monitoring:** ELK Stack (Elasticsearch, Logstash, Kibana), CloudWatch

### Security & Compliance
- **Certifications:** ISO 27001, SOC 2 Type 2
- **Multi-Tenant Security & RBAC**
- **GDPR & Data Privacy**
- **Security Audits & Risk Assessment**

---

## Languages

| Language | Proficiency |
|----------|-------------|
| Polish | Native |
| English | Professional/Fluent (IELTS Certified) |
| German | Limited Working/Conversational |

---

## Certifications

- **IELTS** - International English Language Testing System
- **SAS Certified Base Programmer for SAS 9** - Earned through SAS Academy of Youth Talents (Top 2 candidate selection)
- **International Windsurfing Instructor**
- **PJ(B)** - Skydive License (Certified Skydiver)
- **Advanced Open Water Diver**

---

## Awards & Honors

### 2nd Place - Berlin Legal Tech Hackathon 2020
**Hate Speech Online | February 2020**
Led a team to develop an innovative solution for detecting and moderating online hate speech. The platform combined natural language processing with real-time content analysis.

### University President's Undergraduate Scholarship
**Warsaw University of Technology | 2014, 2015, 2016, 2017**
Awarded 4 years in the row for exceptional academic performance in computer science studies. Most prestigious undergraduate scholarship based on academic merit.

---

## Publications & Conference Speaking

### Publications
- **DeCoCo: Blockchain-based Decentralized Compensation of Digital Content Purchases** 2020, Paris, France
- **Saluki: Finding Taint-style Vulnerabilities with Static Property Checking** 2018 Berlin
- **KnowledgeX: Trusted Inter-organizational Data Processing** 2022 Berlin

### Conference Talks
- **Speaker @ idealo Tech Talks** - "Blockchain and Bitcoin" | May 2021, Berlin
  - Video: https://youtu.be/6WzFtN3xWF4
- **Speaker @ 2nd Conference on Blockchain Research & Applications for Innovative Networks and Services (BRAINS 2020)** | September 2020, Paris
  - Video: https://youtu.be/6hEcL2zx64M

---

## Personal Interests & Soft Skills

### Extreme Sports & Outdoor Activities
- Certified skydiver (PJ(B) license)
- Advanced Open Water diver
- International Windsurfing Instructor
- Avid snowboarder

These experiences build essential skills: **risk management, clear instruction and teaching, calm under pressure, and disciplined preparation**-all of which translate directly to technical leadership, team mentoring, and crisis handling in high-stakes enterprise environments.

### Transferable Skills from Activities
- Risk assessment and management
- Clear communication and instruction
- Performance under pressure
- Disciplined preparation and planning
- Team mentoring and teaching

---

## Key Achievements Summary

| Achievement | Impact |
|-------------|--------|
| Company Revenue | Built company from 0 to €1M+ annual revenue |
| Team Scaling | Grew engineering team from 0 to 10 developers |
| Compliance | Achieved ISO 27001 & SOC 2 in ~3 months |
| Platform Scale | >1,000 concurrent connections, thousands RPS |
| idealo SSO Internationalization | 300%+ increase in customer acquisition |
| idealo Multi-Country Login | 1.4M new accounts in 3 months (700% over forecast) |
| RP-Matcher ML System | 60% reduction in offer prep time, 70.7% Top-1 accuracy |
| ING Bank Model Bank | One of first real-time behavioral marketing platforms in the world |
| SAS ESP Implementation | One of first SAS Event Stream Processing implementations in EU |
| Client Base | 50+ organizations served |
| Uptime | 99.9% platform availability |

---

## Industries Served

- **Financial Services & Banking** (ING Bank, Venture Capital, Norges Bank CBDC)
- **Production & Manufacturing** (RP Group - Emergency Lighting)
- **Pharmaceutical**
- **Insurance**
- **Legal Tech**
- **Automotive**
- **Real Estate**
- **E-commerce** (idealo)
- **Telecommunications** (Deutsche Telekom)
- **Energy & Clean Tech** (RWE/Innogy, Holoni/AI4Cities, Energinet Denmark)
- **Smart Cities** (Copenhagen Municipality via AI4Cities)
- **Logistics & Supply Chain** (Poste Italiane, Schiphol)
