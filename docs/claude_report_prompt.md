# Master Prompt & Context Guide: Project Design Report Generation

> **Instructions for User:** Copy and paste the entire contents of this Markdown document directly into Claude (or any LLM of your choice). It contains all raw technical context, lab rubrics, team details, functional specifications, system architecture, and section guidelines required to produce a 100% compliant, publication-grade Software Engineering Project Design Report.

---

```markdown
# PROMPT FOR CLAUDE: Generate Software Engineering Project Design Report (Lab 2)

Act as a Principal Software Architect and Academic Technical Writer. Generate a comprehensive, beautifully formatted, professional **Project Design Report** in GitHub-Flavored Markdown according to the exact rubrics and specifications detailed below.

---

## 1. ACADEMIC & TEAM METADATA
* **Institution:** Rajshahi University of Engineering & Technology (RUET), Rajshahi-6204, Bangladesh
* **Department:** Department of Computer Science & Engineering (CSE)
* **Course Code & Name:** CSE 3206 — Software Engineering Sessional
* **Lab Milestone:** Lab 2 — Software Process Models, Requirement Analysis & MVP Development
* **Marks Weightage:** 10 Marks
* **Motto:** Heaven's light is our guide
* **Project # & Title:** Project #7 — Blood Donation Management System (System Name: **LifeFlow**)
* **Selected Software Process Model:** Agile Scrum
* **Team Information (Group #07, Section A):**
  1. **Apon Datta** (Roll: `2203019`) — **Scrum Manager / Lead Developer** (Assigned Module: Base React Architecture, `AppContext.jsx` State Engine, Authentication `AuthModal.jsx`, Profile & Availability `ProfileModal.jsx`, RBAC Security)
  2. **Emon Islam** (Roll: `2203020`) — **Frontend Feature Developer 1** (Assigned Module: Donor Search Directory `DonorDirectory.jsx`, Donor Cards `DonorCard.jsx`, Emergency Request Form `EmergencyRequestModal.jsx`, Request Tracker `MyRequests.jsx`)
  3. **Sanjida Tabassum** (Roll: `2203021`) — **Frontend Feature Developer 2** (Assigned Module: Analytics Widgets `MetricsOverview.jsx`, 8-Blood-Group Reserve Matrix `InventoryMatrix.jsx`, Admin Approval Queue `AdminApprovalQueue.jsx`, Audit Log `ActivityLog.jsx`)

---

## 2. TECHNICAL & ARCHITECTURAL STACK CONTEXT
* **Frontend Framework:** React 18 + Vite
* **Styling & Aesthetics:** Tailwind CSS with custom Glassmorphism overlays (`#0B0F19` dark obsidian background, `#E11D48` crimson gradient accents, `#1E293B` slate card surfaces, Google Fonts `Plus Jakarta Sans` & `Inter`)
* **Iconography:** Lucide React (`lucide-react`)
* **State & Persistence Engine:** Reactive React Context API (`src/context/AppContext.jsx`) with browser `localStorage` synchronization for session, requests, and inventory.
* **Layout Specifications:** Responsive container width up to `1536px` (`max-w-[1536px]`), enforcing `whitespace-nowrap` on badges/buttons and `shrink-0` on Lucide icons to prevent line breaks or border clipping.
* **Access Control Security (RBAC):**
  * `Donor` Role: Can toggle availability (`Available` vs `Unavailable`) and view donation history.
  * `Recipient` Role: Quick submission of emergency requests and personal request tracking.
  * `Admin` Role: Unlocks Admin Approval Queue for pending requests, blood unit allocation, and inventory stock adjustment (`+` / `-`).
  * `canManageRequest` Guard: Strictly restricts request cancellation and fulfillment to the request creator or an Admin (`View Only` mode for non-owners).

---

## 3. REQUIRED REPORT STRUCTURE (16 MANDATORY SECTIONS)

Please generate the report adhering to the following 16 sections:

### Section 1: Cover Page
* Title, Course details, RUET Department information, submission date (August 15, 2026).

### Section 2: Team Information Table
* Complete table listing Apon Datta (2203019), Emon Islam (2203020), and Sanjida Tabassum (2203021), their roles, git branches, and exact module responsibilities.

### Section 3: Project Title & Overview
* High-level executive summary of LifeFlow as a real-time blood donation matching and central reserve monitoring platform across Bangladesh.

### Section 4: Problem Statement
* Detailed analysis of blood donation friction in Bangladesh (unavailability of rare blood groups `O-`/`AB-`, opaque hospital reserve stock, public phone privacy risks, social media broadcasting delays).

### Section 5: Project Objectives
* Quantifiable objectives (reducing response time, visual reserve matrix, emergency urgency classification, RBAC security, Agile Scrum execution).

### Section 6: Stakeholder Analysis
* Analysis of Donors, Patients/Requesters, Blood Bank Authorities, and System Admins.

### Section 7: Functional Requirements (Provide at least 12 detailed specifications)
* Detailed functional requirements covering User Registration (FR-01), Authentication (FR-02), Role Adaptation (FR-03), Donor Listing (FR-04), Multi-Criteria Filtering (FR-05), Emergency Request Submission (FR-06), Targeted Requests (FR-07), Request Status Tracking (FR-08), Personal vs System View Toggle (FR-09), Access Control Security (FR-10), Inventory Matrix (FR-11), Admin Stock Controls (FR-12).

### Section 8: Non-Functional Requirements (Provide at least 10 quantitative specifications)
* Quantified targets for Performance (<50ms filter latency), Usability (Google Fonts, glassmorphism), Responsiveness (360px–1536px), Persistence (`localStorage`), Security (RBAC), Reliability, Modularity, Visual Layout Integrity (`whitespace-nowrap`), Scalability, Portability.

### Section 9: User Stories & Use Cases (Provide at least 6 User Stories with Gherkin Acceptance Criteria)
* User Story 1: Emergency Blood Search (Recipient)
* User Story 2: Donor Availability Toggle (Donor)
* User Story 3: Emergency Request Broadcast (Requester)
* User Story 4: Request Access Control & Fulfillment (Request Owner)
* User Story 5: Admin Blood Bag Allocation (Admin)
* User Story 6: Stock Matrix Monitoring (Public/Admin)
* Include `Given / When / Then` acceptance criteria for each story.

### Section 10: Selected Software Process Model: Agile Scrum
* Overview of Agile Scrum, Sprint cycle, and Sprint Backlog breakdown:
  * **Sprint 1:** Core Store & Auth Module (Apon Datta)
  * **Sprint 2:** Donor Directory & Emergency Requests (Emon Islam)
  * **Sprint 3:** Dashboard & Inventory Matrix (Sanjida Tabassum)
* Include a Mermaid process flowchart (`graph TD`).

### Section 11: Justification of Selected Process Model
* Detailed rationale explaining why Agile Scrum fits high-fluidity lab projects, rapid MVP prototyping, parallel team collaboration, and continuous verification.

### Section 12: Comparison with Alternative Process Models
* Detailed markdown comparison table evaluating Agile Scrum vs Waterfall vs Spiral vs RAD across 5 metrics.
* Specific architectural explanation of why Waterfall and Spiral were less suitable for this MVP.

### Section 13: MVP Design & System Architecture
* Detailed UI component breakdown, React Context data architecture, and a Mermaid component hierarchy diagram (`graph TD`).

### Section 14: GitHub Collaboration Evidence
* Directory structure layout required by Lab 2 (`README.md`, `docs/`, `screenshots/`, `assets/`, `src/`).
* Branching strategy breakdown (`main`, `feature/auth-user-management`, `feature/donor-search-requests`, `feature/dashboard-inventory`).
* Pull Request (PR) review protocol and conventional commit standards.

### Section 15: Challenges Encountered & Engineering Mitigations
* Challenge 1: Layout Overflow & Badge Icon Clipping (Mitigation: `max-w-[1536px]`, `whitespace-nowrap`, `shrink-0`).
* Challenge 2: Unauthorized Request Modification (Mitigation: `canManageRequest` RBAC guard).
* Challenge 3: Admin Approval Queue Visibility (Mitigation: `if (!isAdmin || pendingRequests.length === 0) return null;` guard).

### Section 16: Conclusion & Future Roadmap
* Summary of Lab 2 deliverables and semester-long roadmap (Lab 3 Design Patterns, Lab 4 Testing/Jest, Lab 5 Deployment/CI-CD).

---

## 4. FORMATTING & TONE GUIDELINES
* **Tone:** Professional, formal academic software engineering report.
* **Markdown Elements:** Use GitHub alerts (`> [!NOTE]`, `> [!IMPORTANT]`), clean data tables, inline code formatting, bold headers, and valid Mermaid diagram syntax.
* **Depth:** Thorough, rigorous, and detailed without omitting technical specifics.
```
