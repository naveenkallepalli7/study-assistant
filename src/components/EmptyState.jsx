import React from 'react';
import { Sparkles, FileText, CheckSquare, GraduationCap } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-obsidian-850 bg-obsidian-900/10 p-8 backdrop-blur-md text-center animate-scale-in mt-4">
      <div className="max-w-md mx-auto">
        {/* Decorative Badge Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan border border-accent-cyan/30 shadow-inner">
          <GraduationCap className="h-7 w-7 text-accent-cyan animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-white mt-6 tracking-tight">
          Ready to study smarter?
        </h3>
        
        <p className="mt-2 text-sm text-obsidian-400 leading-relaxed">
          Input your lecture notes or search for a specific topic above to generate a fully interactive study dashboard instantly.
        </p>

        {/* Feature Grid preview */}
        <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-obsidian-900 bg-obsidian-950/45 p-4 flex flex-col space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Concept Summary</h4>
            <p className="text-xs text-obsidian-450 leading-relaxed">
              Consolidate paragraphs into structured takeaway bulletins.
            </p>
          </div>

          <div className="rounded-xl border border-obsidian-900 bg-obsidian-950/45 p-4 flex flex-col space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-violet/10 text-accent-violet">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">3D Flashcards</h4>
            <p className="text-xs text-obsidian-450 leading-relaxed">
              Test term definitions with interactive flipping animation decks.
            </p>
          </div>

          <div className="rounded-xl border border-obsidian-900 bg-obsidian-950/45 p-4 flex flex-col space-y-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-fuchsia/10 text-accent-fuchsia">
              <CheckSquare className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Interactive Quiz</h4>
            <p className="text-xs text-obsidian-450 leading-relaxed">
              Answer multiple-choice questions and view scoring review logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
