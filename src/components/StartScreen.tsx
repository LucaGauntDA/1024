import React from 'react';
import { Play, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface StartScreenProps {
  onStart: (gridSize: number) => void;
  bestScore: number;
  selectedSize: number;
  onSelectSize: (size: number) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  bestScore,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="w-full max-w-[460px] mx-auto flex flex-col items-center text-center px-4 py-8 sm:py-12 animate-fade-in">
      {/* Visual glowing icon hero badge */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-70 animate-pulse" />
        <div className="relative w-24 h-24 rounded-3xl bg-[#0e111a] border border-white/10 p-3 shadow-2xl flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1.5 w-full h-full">
            <div className="rounded-xl bg-cyan-950/70 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-xs text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              2
            </div>
            <div className="rounded-xl bg-amber-950/70 border border-amber-400/50 flex items-center justify-center font-mono font-bold text-xs text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              4
            </div>
            <div className="rounded-xl bg-rose-950/70 border border-rose-400/50 flex items-center justify-center font-mono font-bold text-xs text-rose-300 shadow-[0_0_10px_rgba(251,113,133,0.3)]">
              8
            </div>
            <div className="rounded-xl bg-amber-900/90 border border-amber-300 flex items-center justify-center font-mono font-bold text-[10px] text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              2K
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
        Lumina <span className="text-cyan-400">2048</span>
      </h1>
      <p className="text-sm sm:text-base text-zinc-400 max-w-sm mb-8 leading-relaxed font-normal">
        Verschiebe und kombiniere leuchtende Steine. Erreiche den legendären 2048-Kern.
      </p>

      {/* Grid Size Segmented Picker */}
      <div className="w-full mb-8 bg-[#11131b] p-1.5 rounded-2xl border border-white/[0.08] flex items-center gap-1 shadow-inner">
        {[
          { size: 3, label: '3×3', desc: 'Kompakt' },
          { size: 4, label: '4×4', desc: 'Klassisch' },
          { size: 5, label: '5×5', desc: 'Weit' },
        ].map(item => {
          const isActive = selectedSize === item.size;
          return (
            <button
              key={item.size}
              onClick={() => onSelectSize(item.size)}
              className={`flex-1 py-2 px-3 rounded-xl transition-all duration-200 flex flex-col items-center justify-center ${
                isActive
                  ? 'bg-zinc-800/90 text-white shadow-md border border-white/10'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
              }`}
            >
              <span className="font-mono text-sm font-bold">{item.label}</span>
              <span className="text-[10px] opacity-75">{item.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Start Button */}
      <button
        onClick={() => onStart(selectedSize)}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all duration-200 active:scale-[0.98] mb-6 cursor-pointer"
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Spiel starten</span>
        <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
      </button>

      {/* Highscore & Instruction Card */}
      <div className="w-full grid grid-cols-2 gap-3 text-left">
        <div className="p-3.5 rounded-2xl bg-[#0f1118]/70 border border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
              Rekord
            </div>
            <div className="font-mono font-bold text-base text-zinc-100 tabular-nums">
              {bestScore.toLocaleString('de-DE')}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0f1118]/70 border border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">
              Steuerung
            </div>
            <div className="text-xs text-zinc-300 font-medium">
              Wischen / Pfeiltasten
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
