# Khushi Mehta — Professional Full-Stack Developer Portfolio

A premium, recruiter-ready developer portfolio for **Khushi Mehta**, specifically tailored for the **Vedas Tech Full-Stack Developer Internship** in Anand, Gujarat.

Built with an editorial aesthetic, accessible semantics, responsive layouts, verified project links, and an interactive browser-based mini-game demo (**CodeQuest: Bug Hunt**).

---

## 👤 Candidate Profile

- **Name:** Khushi Mehta
- **Location:** Nadiad, Gujarat, India (Adjacent to Anand / CVM University)
- **Academic Status:** Final-Year B.Tech Information Technology Student
- **Institution:** Madhuben & Bhanubhai Patel Institute of Technology (MBIT), CVM University
- **Current CGPA:** **8.03** (through 5th semester)
- **Secondary Schooling:**
  - Class 12: A.J. High School, Vaso — 56.5%
  - Class 10: Bhakti Vedant High School, Deva — 79.8%
- **Professional Headline:** *Full-Stack Developer | Python & Django | React | AI-Assisted Development*
- **Availability:** Immediate availability for internship in Anand / hybrid

---

## 🚀 Key Highlights & Projects

### 1. NeoBank Learning Simulator
- **Overview:** Full-stack banking learning simulator engineered for educational exploration of banking workflows, financial literacy, and fintech architecture (*educational simulation, not a real banking entity*).
- **Frontend Stack:** React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Recharts, Framer Motion, Socket.IO.
- **Backend Stack:** Node.js, Express.js, SQLite, JWT, bcrypt, Nodemailer, Helmet, rate limiting, CORS, dotenv.
- **Core Implemented Features:**
  - Dynamic balance and ledger simulation with SQLite transactions
  - Secure transfer pipeline with authentication validation
  - Analytics and budgeting dashboard with Recharts visualizations
  - Gamified fraud awareness and scam challenges
  - Socket.IO real-time event updates
- **GitHub Repository:** [https://github.com/khushimehta-09/neobank-simulator](https://github.com/khushimehta-09/neobank-simulator)
- **Live Backend API:** [https://neobank-simulator.onrender.com/api](https://neobank-simulator.onrender.com/api)

### 2. SecureAuth — Distributor Management Portal
- **Overview:** Complete Django authentication and distributor management portal engineered during a 15-day internship at BrainyBeam Info-Tech Pvt. Ltd. (May 2026).
- **Technologies:** Python, Django 5, HTML5, CSS3, Bootstrap 5, SQLite, Render.
- **Core Implemented Features:**
  - Dual-role custom user models (Admin & Distributor)
  - Distributor approval lifecycle workflow: `Pending` ➔ `Approved` / `Rejected` / `Blocked`
  - Cryptographic 6-digit email OTP password recovery with 5-minute timeout window
  - Brute-force lockout protection (10-minute access lockout after 5 failed attempts)
  - Activity audit logging capturing IP addresses, user agents, and security events
  - Distributor support ticket desk with admin response tracking
- **Live Deployed App:** [https://secure-auth-system-bib3.onrender.com](https://secure-auth-system-bib3.onrender.com)
- **GitHub Repository:** [https://github.com/khushimehta-09/secure-auth-system](https://github.com/khushimehta-09/secure-auth-system)

### 3. Interactive Mini-Game: “CodeQuest: Bug Hunt”
- **Purpose:** Built to fulfill the Vedas Tech internship requirement for a complete, fully playable interactive demo or game.
- **Objective:** Patch incoming server anomalies (`NullPointer`, `SyntaxError`, `SQLInjection`, `MemoryLeak`, `RaceCondition`) before system stability reaches 0% or the 45-second timer expires.
- **Control System:**
  - Direct mouse click or touch tap on bug entities
  - Keyboard lane shortcuts (`[1]`, `[2]`, `[3]`, `[4]`, `[5]`) for rapid keyboard patching
  - `[Space]` key to trigger the full-screen **Hotfix Overdrive** when meter reaches 100%
- **Technical Implementation:**
  - 100% vanilla JavaScript, DOM animations, and CSS custom properties
  - Zero external game libraries or heavy physics engines
  - Zero paid APIs or backend credentials
  - Procedural sound synthesis powered by the **Web Audio API** with a persistent Mute toggle
  - High score tracking stored in browser `localStorage`

---

## 🛠️ Technical Skills

- **Programming Languages:** Python, JavaScript (ES6+), C, C++
- **Frontend Development:** HTML5, CSS3, Modern CSS (Flexbox, CSS Grid), Responsive Web Design, React, Tailwind CSS, Bootstrap 5
- **Backend Architecture:** Python, Django, Node.js, Express.js, RESTful API design, JWT authentication, Session security, Role-Based Access Control (RBAC)
- **Databases & Storage:** SQLite, Relational database modeling, SQL fundamentals, Django ORM
- **Developer Tools:** Git, GitHub, VS Code, Vite, npm, pip
- **Cloud & Deployment:** Render (Production web service deployments), Vercel (Edge static hosting)
- **AI-Assisted Engineering:** ChatGPT, Gemini, GitHub Copilot, Antigravity (Prompt engineering, rapid debugging, unit test creation)

---

## 📂 Project Structure

```text
PORTFOLIO/
├── index.html                     # Semantic, accessible HTML5 layout
├── style.css                      # Premium editorial design system & CodeQuest arcade styles
├── script.js                      # UI logic, CodeQuest game engine & Web Audio synthesizer
├── server.js                      # Express static server for local preview
├── package.json                   # Project scripts and dependencies
├── vercel.json                    # Vercel deployment configuration
├── Khushi_Mehta_Resume.pdf        # Verified resume document
├── profile.jpg                    # Authentic profile image
├── neobank-preview.png            # Asset preview for NeoBank Simulator
├── security-project-preview.png   # Asset preview for SecureAuth Django portal
└── README.md                      # Comprehensive developer & recruiter documentation
```

---

## 💻 Local Development

1. **Clone or navigate to the folder:**
   ```bash
   cd PORTFOLIO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run validation tests:**
   ```bash
   npm test
   ```

4. **Start local development server:**
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🌐 Deployment to Vercel

The portfolio is pre-configured for seamless deployment to Vercel:

### Option A: Via GitHub (Recommended)
1. Commit and push this directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio redesign with CodeQuest Bug Hunt game"
   git remote add origin https://github.com/khushimehta-09/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your [Vercel Dashboard](https://vercel.com):
   - Click **Add New Project** ➔ Import your repository.
   - Framework Preset: **Other** (or Leave default).
   - Click **Deploy**. Vercel will deploy immediately using `vercel.json` with zero build configuration required.

### Option B: Via Vercel CLI
```bash
npx vercel --prod
```

---

## 📬 Contact Information

- **Email:** [khushimehta1409@gmail.com](mailto:khushimehta1409@gmail.com)
- **LinkedIn:** [https://www.linkedin.com/in/khushi-mehta09/](https://www.linkedin.com/in/khushi-mehta09/)
- **GitHub:** [https://github.com/khushimehta-09](https://github.com/khushimehta-09)
- **Live Portfolio:** [https://portfolio-p65p.vercel.app](https://portfolio-p65p.vercel.app)
