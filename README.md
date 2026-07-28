# StudyMind AI — Smart Interactive Study Kit Generator

StudyMind AI is an interactive frontend study workspace that parses unstructured notes or custom topics into structured, pedagogical materials including bullet-point summaries, 3D flipping flashcards, and multiple-choice quizzes. It uses the Gemini API via a secure backend proxy to keep keys protected.

---

## Key Features

1. **Flexible Dual Input Modes**: Study from raw lecture notes (min 50 characters) or enter a custom topic (min 3 characters).
2. **Glassmorphic Study Dashboard**: Render structured, highly responsive components styled with custom gradients and Outfit/Jakarta typography.
3. **Core Study Summary**: Highlight important takeaways, key definitions, and bullet-point outlines.
4. **Interactive 3D Flashcards**: Study terms using interactive card decks featuring 3D flip animations, counter tracking, and linear progress bars.
5. **Interactive MCQs Quiz**: Test understanding with multiple-choice questions showing instant correct/incorrect visual feedback.
6. **Detailed Quiz Review & Log**: View a visual scorecard breakdown (correct/incorrect counters) and inspect your quiz logs highlighting selected answers against correct choices.
7. **Production Error-Resilience**:
   - **AbortController Race Defense**: Auto-aborts slow/stale pending requests if you enter newer topics, preventing stale data overlays.
   - **Strict Schema Validator**: A dedicated checker validates types, quiz answers, and array lengths before state updates, keeping the app crash-free.
   - **Proxy Backend Security**: Express proxy routes securely sign API requests, hiding your `GEMINI_API_KEY` from the client side.

---

## Folder Structure

```text
study-assistant/
├── package.json          # Frontend dependencies
├── tailwind.config.js    # Tailwind colors & typography overrides
├── postcss.config.js     # PostCSS loader settings
├── vite.config.js        # Vite compilation configuration
├── index.html            # Main markup and font imports
├── .env.example          # Template for backend settings
├── server/
│   ├── package.json      # Express proxy dependencies
│   ├── index.js          # Main proxy routes
│   └── package-lock.json
└── src/
    ├── assets/           # Default icons & images
    ├── components/
    │   ├── Navbar.jsx           # Sticky glassmorphic header
    │   ├── Footer.jsx           # Application footer block
    │   ├── InputSection.jsx     # Tab forms and input fields
    │   ├── SummarySection.jsx   # AI-generated topic bullet summaries
    │   ├── FlashcardSection.jsx # 3D flipping flashcards deck
    │   ├── QuizSection.jsx      # MCQs, scorecards, and logs
    │   ├── LoadingState.jsx     # Spinner with cycling status steps
    │   ├── ErrorState.jsx       # Alert screen & troubleshooting
    │   └── EmptyState.jsx       # Home/landing welcome widgets
    ├── utils/
    │   └── validation.js        # Strict JSON schema validation
    ├── index.css         # Global stylesheet & 3D CSS utilities
    ├── main.jsx          # React renderer root
    └── App.jsx           # Core workspace state coordinator
```

---

## Installation & Running the Project

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Gemini API Key (Obtain free from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/naveenkallepalli7/study-assistant.git
cd study-assistant

# Install frontend dependencies
npm install

# Install backend proxy dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment variables
1. In the root project directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your Gemini API Key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_real_key_here
   PORT=3001
   ```

### 3. Running the Project (Local Dev)
To run the study assistant, you need to launch both the frontend and the backend server.

**Terminal 1 (Backend Proxy Server)**:
```bash
cd server
npm start
```
*The proxy will spin up on [http://localhost:3001](http://localhost:3001)*

**Terminal 2 (Frontend Client)**:
```bash
# From the root directory
npm run dev
```
*Vite client will start on [http://localhost:5173](http://localhost:5173)*

---

## AI Usage Note
AI tools were used during the development of this project. Specifically, an AI assistant (Google Gemini) co-authored codebases across the following modules:
- Styling configurations (obsidian theme overrides and transition variables in Tailwind).
- The 3D CSS transform utility classes (perspective, preserve-3d, and backface-visibility).
- Structuring the system prompt and matching `responseSchema` definitions for the Gemini API call to guarantee structured JSON output.
- Formulating the strict client-side checker (`validation.js`) to safeguard states.

---

## Known Limitations
- **Token Limits**: High volume notes inputs may hit the rate limits of the free tier Gemini API key.
- **Plain Text Input**: The input area parses raw string formatting. Rich formats like PDF or DOCX must be copied and pasted as text.

---

## Time Spent

- **Total Time:** ~8 hours
  - Project planning & setup: 45 mins
  - UI development: 2 hours
  - AI integration: 1.5 hours
  - Interactive flashcards & quiz: 2 hours
  - Error handling & testing: 1 hour
  - Documentation & final polishing: 45 mins

 ## 🔗 Project Links

- **🚀 Live Demo:** https://study-assistant-tau-five.vercel.app/
- **🎥 Demo Recording:** https://drive.google.com/file/d/1gWqKpSNTiTayy1j6RzwnQexFcrNyhNO0/view?usp=sharing
- **💻 GitHub Repository:** https://github.com/naveenkallepalli7/study-assistant
