import React, { useState } from 'react';
import { Sparkles, FileText, Compass, AlertCircle } from 'lucide-react';

export default function InputSection({ onSubmit, loading }) {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'topic'
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInputValue('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError(activeTab === 'notes' ? 'Please enter some notes to study.' : 'Please enter a study topic.');
      return;
    }

    if (activeTab === 'notes' && trimmed.length < 50) {
      setError('Please provide at least 50 characters of notes for better study quality.');
      return;
    }

    if (activeTab === 'topic' && trimmed.length < 3) {
      setError('Please enter a specific topic (at least 3 characters).');
      return;
    }

    onSubmit({ mode: activeTab, content: trimmed });
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-obsidian-800 bg-obsidian-900/30 p-6 backdrop-blur-xl md:p-8 animate-scale-in">
      {/* Tabs */}
      <div className="flex border-b border-obsidian-800 pb-4">
        <button
          type="button"
          onClick={() => handleTabChange('notes')}
          className={`flex items-center space-x-2 border-b-2 px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'notes'
              ? 'border-accent-violet text-white font-semibold'
              : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
          }`}
          disabled={loading}
        >
          <FileText className="h-4 w-4" />
          <span>Paste Notes</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('topic')}
          className={`flex items-center space-x-2 border-b-2 px-4 py-2 text-sm font-medium transition-all ${
            activeTab === 'topic'
              ? 'border-accent-cyan text-white font-semibold'
              : 'border-transparent text-obsidian-400 hover:text-obsidian-200'
          }`}
          disabled={loading}
        >
          <Compass className="h-4 w-4" />
          <span>Enter Topic</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
        {/* Description Label */}
        <label htmlFor="study-input" className="text-left text-xs font-semibold uppercase tracking-wider text-obsidian-400">
          {activeTab === 'notes' ? 'Your Notes (raw text, lectures, copy-paste)' : 'What topic do you want to learn?'}
        </label>

        {/* Input fields */}
        {activeTab === 'notes' ? (
          <textarea
            id="study-input"
            rows="6"
            className="w-full rounded-xl border border-obsidian-800 bg-obsidian-950/60 p-4 text-sm text-white placeholder-obsidian-500 outline-none transition-all focus:border-accent-violet/50 focus:ring-1 focus:ring-accent-violet/50 resize-y"
            placeholder="Paste your course notes, transcript extracts, or textbook paragraphs here (minimum 50 characters)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
        ) : (
          <input
            id="study-input"
            type="text"
            className="w-full rounded-xl border border-obsidian-800 bg-obsidian-950/60 p-4 text-sm text-white placeholder-obsidian-500 outline-none transition-all focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50"
            placeholder="e.g., Photosynthesis, Newton's Laws, JavaScript Closures..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
        )}

        {/* Error messaging */}
        {error && (
          <div className="flex items-center space-x-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="text-left">{error}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          className={`group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 ${
            loading 
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-accent-violet/20 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]'
          }`}
          disabled={loading}
        >
          <Sparkles className={`h-5 w-5 ${loading ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
          <span>{loading ? 'Synthesizing Study Materials...' : 'Generate Study Kit'}</span>
        </button>
      </form>
    </div>
  );
}
