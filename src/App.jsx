import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InputSection from './components/InputSection';
import SummarySection from './components/SummarySection';
import FlashcardSection from './components/FlashcardSection';
import QuizSection from './components/QuizSection';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';

function App() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSubmission, setLastSubmission] = useState(null); // Stores { mode, content } for retry functionality

  // Ref to track the active AbortController to prevent stale request race conditions
  const abortControllerRef = useRef(null);

  const handleStudySubmit = async ({ mode, content }) => {
    // Abort any existing active request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Initialize new controller for this request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setStudyData(null);
    setLastSubmission({ mode, content });

    try {
      const response = await axios.post(
        'http://localhost:3001/api/generate',
        { mode, content },
        { signal: controller.signal }
      );
      
      const data = response.data;
      
      // Strict JSON structure validations
      if (!data || typeof data !== 'object') {
        throw new Error('Received an empty or invalid structure from the generation engine.');
      }
      if (!data.title || !Array.isArray(data.summary) || !Array.isArray(data.flashcards) || !Array.isArray(data.quiz)) {
        throw new Error('AI response structure was incomplete. Missing required study elements.');
      }
      
      setStudyData(data);
    } catch (err) {
      // If the request was cancelled, ignore error updates for the UI
      if (axios.isCancel(err)) {
        console.log('Stale request cancelled successfully:', content);
        return;
      }
      
      console.error('Generation Error details:', err);
      const msg = err.response?.data?.message || err.message || 'An error occurred while communicating with the AI server.';
      setError(msg);
    } finally {
      // Only set loading to false if this request wasn't replaced by a newer controller
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const handleRetry = () => {
    if (lastSubmission) {
      handleStudySubmit(lastSubmission);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-obsidian-950 text-obsidian-100 selection:bg-accent-violet/30 selection:text-white">
      {/* Sticky Glassmorphic Header */}
      <Navbar />

      {/* Main Study Workspace Area */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Decorative branding header */}
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

        {/* State Conditional Rendering (Loading, Error, Empty, and Success States) */}
        {loading && <LoadingState />}

        {error && !loading && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {!studyData && !loading && !error && <EmptyState />}

        {studyData && !loading && !error && (
          <div className="w-full flex flex-col items-center animate-slide-up">
            {/* Core Summary Overview Section */}
            <SummarySection title={studyData.title} summary={studyData.summary} />
            
            {/* Interactive Flashcard Stack */}
            {studyData.flashcards && studyData.flashcards.length > 0 && (
              <FlashcardSection flashcards={studyData.flashcards} />
            )}

            {/* Interactive Knowledge Quiz */}
            {studyData.quiz && studyData.quiz.length > 0 && (
              <QuizSection quiz={studyData.quiz} />
            )}
            
            {/* Structured JSON State Output preview */}
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
