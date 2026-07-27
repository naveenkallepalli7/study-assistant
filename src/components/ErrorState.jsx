import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-red-500/25 bg-red-500/5 p-8 backdrop-blur-xl flex flex-col items-center justify-center text-center animate-scale-in mt-8 shadow-lg shadow-red-950/10">
      {/* Icon frame */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <h3 className="text-xl font-bold text-white mt-5 tracking-tight">
        Study Kit Generation Failed
      </h3>
      
      <p className="mt-2 text-sm text-red-300 max-w-lg leading-relaxed">
        {message || 'An unexpected error occurred while contacting the AI synthesis server. Please check your connections.'}
      </p>

      {/* Recommended checks */}
      <div className="mt-6 rounded-lg bg-obsidian-950/50 border border-obsidian-900 p-4 text-xs text-obsidian-450 text-left max-w-md w-full space-y-1">
        <p className="font-semibold text-obsidian-300">Recommended Troubleshooting:</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li>Confirm that your backend proxy server is running.</li>
          <li>Check that you created a `.env` file containing your `GEMINI_API_KEY`.</li>
          <li>Verify your internet connection and prompt length.</li>
        </ul>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 flex items-center space-x-2 rounded-xl bg-red-500 hover:bg-red-400 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-red-500/15"
        >
          <RefreshCcw className="h-4 w-4" />
          <span>Retry Generation</span>
        </button>
      )}
    </div>
  );
}
