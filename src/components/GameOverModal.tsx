import React from 'react';
import { RotateCcw, Trophy, Award, Undo2 } from 'lucide-react';
import { getTileTheme } from '../utils/tileThemes';

interface GameOverModalProps {
  score: number;
  bestScore: number;
  highestTile: number;
  moves: number;
  isNewHighscore: boolean;
  canUndo: boolean;
  onRestart: () => void;
  onUndo: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  bestScore,
  highestTile,
  moves,
  isNewHighscore,
  canUndo,
  onRestart,
  onUndo,
}) => {
  const highestTheme = getTileTheme(highestTile);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#060608] border border-white/10 p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />

        {/* Title */}
        <div className="w-12 h-12 rounded-2xl bg-[#0e0e12] border border-white/10 flex items-center justify-center mb-4 shadow-lg">
          <Trophy className="w-6 h-6 text-zinc-400" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
          Keine Züge mehr
        </h2>
        <p className="text-xs text-zinc-400 mb-6">
          Das Spielfeld ist voll. Tolle Runde!
        </p>

        {/* New highscore banner */}
        {isNewHighscore && (
          <div className="w-full mb-4 py-2 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center gap-2 text-amber-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Neuer persönlicher Rekord!</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-[#0d0d12] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">Punkte</span>
            <span className="font-mono text-xl font-bold text-white tabular-nums">
              {score.toLocaleString('de-DE')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#0d0d12] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-amber-400/80">Rekord</span>
            <span className="font-mono text-xl font-bold text-amber-300 tabular-nums">
              {bestScore.toLocaleString('de-DE')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#0d0d12] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">Höchster Stein</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`font-mono text-lg font-bold ${highestTheme.text}`}
                style={{ textShadow: `0 0 10px ${highestTheme.glow}` }}
              >
                {highestTile}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0d0d12] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400">Züge</span>
            <span className="font-mono text-xl font-bold text-zinc-300 tabular-nums">
              {moves}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={onRestart}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Erneut spielen</span>
          </button>

          {canUndo && (
            <button
              onClick={onUndo}
              className="w-full py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Undo2 className="w-4 h-4" />
              <span>Letzten Zug rückgängig machen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
