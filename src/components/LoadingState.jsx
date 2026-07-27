import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const LOADING_STEPS = [
  'Reading study material...',
  'Extracting core definitions...',
  'Synthesizing summaries...',
  'Drafting flashcards...',
  'Structuring multiple-choice questions...',
  'Assembling your personalized study kit...'
];

export default function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-obsidian-800 bg-obsidian-900/30 p-12 backdrop-blur-xl flex flex-col items-center justify-center text-center animate-scale-in mt-8">
      {/* Animated Loading Rings */}
      <div className="relative flex items-center justify-center h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-accent-violet/10" />
        <div className="absolute inset-0 rounded-full border-4 border-t-accent-violet border-r-accent-cyan animate-spin" />
        <Loader2 className="h-8 w-8 text-accent-cyan animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-white mt-8 tracking-tight">
        Generating Study Kit
      </h3>
      
      {/* Cycling Status Text */}
      <p className="mt-2 text-sm text-accent-cyan font-semibold transition-all duration-300">
        {LOADING_STEPS[stepIndex]}
      </p>

      <p className="mt-4 text-xs text-obsidian-550 max-w-sm leading-relaxed">
        This can take a few seconds as the AI reads your inputs, extracts concepts, and structures the interactive app components.
      </p>
    </div>
  );
}
