# 🩸 LifeFlow - Blood Donation Management System (MVP)

**Course:** CSE 3206 – Software Engineering Sessional  
**Institution:** Rajshahi University of Engineering & Technology (RUET)  
**Lab Assignment:** Lab 2 – Software Process Models, Requirement Analysis & MVP Development  
**Project Assignment:** Project #7 – Blood Donation Management System  
**Selected Software Process Model:** Agile Scrum  

---

## 🌟 Overview & Features

LifeFlow is a modern, responsive, glassmorphism-styled Minimum Viable Product (MVP) built to facilitate emergency blood donation matching, donor availability tracking, and central blood bank inventory monitoring.

### Core Functionalities
1. **User Authentication & Role Management**:
   * Multi-role support: **Donor**, **Recipient**, and **Admin**.
   * One-click demo login for Admin (`admin@lifeflow.org`) and Donors.
   * Real-time donor availability toggle (`Available` vs `Unavailable`).
2. **Donor Directory & Search Engine**:
   * Filter donors by Blood Group (`A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`).
   * Filter by Bangladesh District (`Rajshahi`, `Dhaka`, `Chittagong`, etc.).
   * Direct "Request Blood" modal targeting individual donors.
3. **Emergency Blood Request System**:
   * Urgency levels: 🔥 `Critical`, ⚡ `Urgent`, 📋 `Normal`.
   * Live request tracking dashboard (`Pending`, `Approved`, `Fulfilled`, `Cancelled`).
4. **Central Blood Bank Reserve Matrix**:
   * 8-Blood-Group visual inventory cards with capacity progress bars.
   * Admin stock controls (`+` / `-` bag adjustments) and pending request approval queue.
5. **System Activity Audit Log**:
   * Real-time activity timeline feed.

---

## 👥 Team Task Division (3 Members — Group #07)

| Team Member | Student Name & Roll | Role | Git Branch | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1 (Lead)** | **Apon Datta** (Roll: 2203019) | **Scrum Manager / Core Dev** | `feature/auth-user-management` | Repository initialization, central state Context engine (`AppContext.jsx`), Auth & Login (`AuthModal.jsx`), User Profile & Donor Availability (`ProfileModal.jsx`), Role Security. |
| **Member 2** | **Emon Islam** (Roll: 2203020) | **Frontend Dev 1** | `feature/donor-search-requests` | Donor Search Directory (`DonorDirectory.jsx`, `DonorCard.jsx`), Blood Group & Location Filtering, Emergency Request Modal (`EmergencyRequestModal.jsx`), Request Tracker (`MyRequests.jsx`). |
| **Member 3** | **Sanjida Tabassum** (Roll: 2203021) | **Frontend Dev 2** | `feature/dashboard-inventory` | Analytics Metrics Widgets (`MetricsOverview.jsx`), 8-Blood-Group Reserve Matrix (`InventoryMatrix.jsx`), Admin Approval Queue (`AdminApprovalQueue.jsx`), System Audit Feed (`ActivityLog.jsx`). |

---

## 🌿 Git & GitHub Workflow

```bash
# 1. Clone repository & checkout main
git checkout main
git pull origin main

# 2. Each member creates their feature branch
git checkout -b feature/auth-user-management     # Member 1 (Scrum Mgr)
git checkout -b feature/donor-search-requests    # Member 2
git checkout -b feature/dashboard-inventory      # Member 3

# 3. Commit & Push
git add .
git commit -m "feat(module): descriptive commit message"
git push -u origin feature/<branch-name>

# 4. Open Pull Request on GitHub & merge after code review into main
```

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at http://localhost:5173
```

---

## 📁 Repository Structure
```text
Blood_Donation_Mangement/
├── README.md
├── docs/
│   └── Requirement Report.pdf
├── screenshots/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── index.css
    ├── main.jsx
    ├── App.jsx
    ├── context/
    │   └── AppContext.jsx
    └── components/
        ├── Common/
        ├── Auth/
        ├── Donor/
        └── Dashboard/
```
