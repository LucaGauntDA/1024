import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface WinModalProps {
  score: number;
  onContinue: () => void;
  onRestart: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ score, onContinue, onRestart }) => {
  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#fbbf24', '#f43f5e', '#a855f7'],
      });
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#12141f] border border-amber-500/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(251,191,36,0.25)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Radiant solar ambient glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(251,191,36,0.5)]">
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">
          2048 Erreicht!
        </h2>
        <p className="text-xs text-zinc-400 mb-6 max-w-xs">
          Du hast den legendären Lumina-Kern gemeistert. Du kannst jetzt weiterspielen und nach 4096 streben!
        </p>

        {/* Current score */}
        <div className="w-full mb-6 p-3.5 rounded-2xl bg-[#181b26] border border-white/[0.08] flex flex-col items-center">
          <span className="text-[10px] uppercase font-semibold text-zinc-400">Aktueller Punktestand</span>
          <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
            {score.toLocaleString('de-DE')}
          </span>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Weiterspielen</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 px-5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-200 font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Neues Spiel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
