import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Layers } from 'lucide-react';

export default function FlashcardSection({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-obsidian-800 bg-obsidian-900/30 p-6 backdrop-blur-xl md:p-8 animate-scale-in mt-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet to-accent-fuchsia text-white shadow-md shadow-accent-violet/10">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight md:text-2xl">
            Interactive Flashcards
          </h2>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-accent-violet bg-accent-violet/10 border border-accent-violet/25 px-2.5 py-1 rounded-full">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div className="perspective-1000 w-full h-72 md:h-80 cursor-pointer" onClick={handleFlip}>
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front Side */}
          <div className="absolute inset-0 w-full h-full rounded-2xl border border-obsidian-800 bg-obsidian-900/70 p-6 flex flex-col justify-between backface-hidden shadow-xl hover:border-accent-violet/30 transition-all select-none">
            <div className="text-xs font-semibold uppercase tracking-wider text-obsidian-500">Question</div>
            <div className="flex-grow flex items-center justify-center text-center px-4">
              <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
                {currentCard.front}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-xs text-accent-violet font-semibold uppercase tracking-wider">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Click to Reveal Answer</span>
            </div>
          </div>

          {/* Card Back Side */}
          <div className="absolute inset-0 w-full h-full rounded-2xl border border-accent-violet/30 bg-gradient-to-br from-obsidian-900 to-accent-violet/10 p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-xl shadow-accent-violet/5 select-none">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-violet">Answer</div>
            <div className="flex-grow flex items-center justify-center text-center px-4">
              <p className="text-base md:text-lg font-medium text-obsidian-200 leading-relaxed">
                {currentCard.back}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1.5 text-xs text-obsidian-500 font-semibold uppercase tracking-wider">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Click to See Question</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Progress Bar */}
      <div className="w-full bg-obsidian-950 h-1.5 rounded-full mt-6 overflow-hidden border border-obsidian-900">
        <div
          className="bg-gradient-to-r from-accent-violet to-accent-fuchsia h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="flex items-center space-x-2 rounded-xl border border-obsidian-800 bg-obsidian-900 px-4 py-2.5 text-sm font-semibold text-obsidian-300 transition-all hover:bg-obsidian-800 hover:text-white active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Prev</span>
        </button>
        
        <div className="text-xs text-obsidian-500 font-medium">
          Tip: Tap spacebar or click the card to flip
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="flex items-center space-x-2 rounded-xl border border-obsidian-800 bg-obsidian-900 px-4 py-2.5 text-sm font-semibold text-obsidian-300 transition-all hover:bg-obsidian-800 hover:text-white active:scale-95"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
