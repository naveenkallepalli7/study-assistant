import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InputSection from './components/InputSection';
import SummarySection from './components/SummarySection';
import FlashcardSection from './components/FlashcardSection';

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
      
      const data = response.data;
      
      if (!data || typeof data !== 'object') {
        throw new Error('Malformed response. The server did not return a valid study kit object.');
      }
      
      setStudyData(data);
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

        {/* Render study kit sections if loaded */}
        {studyData && (
          <div className="w-full flex flex-col items-center animate-slide-up">
            {/* Core Summary Overview Section */}
            <SummarySection title={studyData.title} summary={studyData.summary} />
            
            {/* Interactive Flashcard Stack */}
            {studyData.flashcards && studyData.flashcards.length > 0 && (
              <FlashcardSection flashcards={studyData.flashcards} />
            )}
            
            {/* Debugging Payload Preview */}
            <div className="mt-8 w-full max-w-3xl rounded-xl border border-obsidian-850 bg-obsidian-900/10 p-6 text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-obsidian-400 mb-2">
                Structured JSON State Output
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-obsidian-950 p-4 text-xs font-mono text-obsidian-400 border border-obsidian-900">
                {JSON.stringify(studyData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}

export default App;
