import React from 'react';
import { Volume2, VolumeX, RotateCcw, Undo2, Sparkles } from 'lucide-react';

interface HeaderHUDProps {
  score: number;
  bestScore: number;
  canUndo: boolean;
  isMuted: boolean;
  onRestart: () => void;
  onUndo: () => void;
  onToggleSound: () => void;
  onOpenInfo?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  score,
  bestScore,
  canUndo,
  isMuted,
  onRestart,
  onUndo,
  onToggleSound,
  onOpenInfo,
}) => {
  return (
    <header className="w-full max-w-[480px] sm:max-w-[500px] mx-auto mb-5 sm:mb-7 flex flex-col gap-4">
      {/* Top zone: Brand & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.35)]">
            <div className="w-full h-full bg-[#0d0f15] rounded-[11px] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-cyan-300">2K</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Lumina <span className="text-zinc-500 font-medium text-base">2048</span>
            </h1>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {onOpenInfo && (
            <button
              onClick={onOpenInfo}
              className="w-9 h-9 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all active:scale-95"
              title="Spielanleitung"
              aria-label="Spielanleitung"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onToggleSound}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
              isMuted
                ? 'bg-zinc-900/60 border-white/5 text-zinc-500'
                : 'bg-zinc-900/80 border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
            }`}
            title={isMuted ? 'Ton aktivieren' : 'Ton stummschalten'}
            aria-label={isMuted ? 'Ton aktivieren' : 'Ton stummschalten'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
              canUndo
                ? 'bg-zinc-900/80 border-white/10 hover:border-white/25 text-zinc-200 hover:text-white'
                : 'bg-zinc-900/30 border-white/5 text-zinc-600 cursor-not-allowed opacity-40'
            }`}
            title="Schritt zurücknehmen"
            aria-label="Schritt zurücknehmen"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            onClick={onRestart}
            className="w-9 h-9 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
            title="Neues Spiel"
            aria-label="Neues Spiel starten"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Score and Highscore Glass Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Current Score */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0f1118]/80 border border-white/[0.07] backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-0.5">
            Punkte
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
            {score.toLocaleString('de-DE')}
          </span>
        </div>

        {/* Best Score */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0f1118]/80 border border-white/[0.07] backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-amber-400/80 mb-0.5 flex items-center gap-1">
            Rekord
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 tabular-nums tracking-tight">
            {bestScore.toLocaleString('de-DE')}
          </span>
        </div>
      </div>
    </header>
  );
};
