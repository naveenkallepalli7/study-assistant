import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-obsidian-900 bg-obsidian-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo & Credits */}
          <div className="flex items-center space-x-2 text-obsidian-400">
            <GraduationCap className="h-5 w-5 text-accent-cyan" />
            <span className="text-sm font-medium">
              StudyMind AI — Smart Learning Companion
            </span>
          </div>

          {/* Links & Disclaimer */}
          <div className="text-center sm:text-right">
            <p className="text-xs text-obsidian-500">
              © {new Date().getFullYear()} StudyMind. Developed for Frontend Internship.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
