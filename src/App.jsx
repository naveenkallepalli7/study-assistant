import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InputSection from './components/InputSection';

function App() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStudySubmit = async ({ mode, content }) => {
    setLoading(true);
    setError(null);
    setStudyData(null);

    try {
      const response = await axios.post('http://localhost:3001/api/generate', {
        mode,
        content
      });
      setStudyData(response.data);
    } catch (err) {
      console.error('API Error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to connect to the generator server.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-obsidian-950 text-obsidian-100 selection:bg-accent-violet/30 selection:text-white">
      {/* Sticky Glassmorphic Header */}
      <Navbar />

      {/* Main Study Workspace Area */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full text-center mt-6 mb-10">
          <h1 className="bg-gradient-to-r from-white via-obsidian-100 to-obsidian-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Transform Notes into <br />
            <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia bg-clip-text text-transparent">
              Interactive Study Kits
            </span>
          </h1>
          <p className="mt-4 text-base text-obsidian-400 sm:text-lg max-w-2xl mx-auto">
            Paste your raw notes or enter a study topic. Our AI generates customized summaries, flashcards, and quizzes instantly to accelerate your learning.
          </p>
        </div>

        {/* Study Notes Input Form */}
        <InputSection onSubmit={handleStudySubmit} loading={loading} />

        {/* Error reporting area */}
        {error && (
          <div className="mt-8 w-full max-w-3xl rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-left animate-slide-up">
            <h3 className="text-lg font-bold text-red-400 mb-2">Generation Error</h3>
            <p className="text-sm text-obsidian-300">{error}</p>
            <div className="mt-4 text-xs text-obsidian-500 font-mono">
              Tip: Make sure you copied `.env.example` to `.env` in the root and defined a valid `GEMINI_API_KEY`, and that the backend server is running.
            </div>
          </div>
        )}

        {/* Temporary visualizer for live studyData state */}
        {studyData && (
          <div className="mt-8 w-full max-w-3xl rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 p-6 text-left animate-slide-up">
            <h3 className="text-lg font-bold text-accent-cyan mb-2">✓ Live AI Integration Verification</h3>
            <p className="text-sm text-obsidian-300">
              Successfully received structured data from Gemini! Live payload preview:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-obsidian-900 p-4 text-xs font-mono text-obsidian-400">
              {JSON.stringify(studyData, null, 2)}
            </pre>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}

export default App;
