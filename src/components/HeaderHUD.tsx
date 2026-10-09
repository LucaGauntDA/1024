import React from 'react';
import { Volume2, VolumeX, RotateCcw, Undo2 } from 'lucide-react';
import { Logo1024 } from './Logo1024';

interface HeaderHUDProps {
  score: number;
  bestScore: number;
  canUndo: boolean;
  isMuted: boolean;
  gridSize: number;
  onSelectSize: (size: number) => void;
  onRestart: () => void;
  onUndo: () => void;
  onToggleSound: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  score,
  bestScore,
  canUndo,
  isMuted,
  gridSize,
  onSelectSize,
  onRestart,
  onUndo,
  onToggleSound,
}) => {
  return (
    <header className="w-full max-w-[440px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[620px] mx-auto mb-3.5 sm:mb-5 flex flex-col gap-3">
      {/* Top zone: Brand & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo1024 className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl shadow-[0_0_20px_rgba(30,111,232,0.25)] border border-white/10" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
            1024
          </h1>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
              isMuted
                ? 'bg-[#0a0a0c] border-white/5 text-zinc-600'
                : 'bg-[#0e0e12] border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
            }`}
            title={isMuted ? 'Ton aktivieren' : 'Ton stummschalten'}
            aria-label={isMuted ? 'Ton aktivieren' : 'Ton stummschalten'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
          </button>

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
              canUndo
                ? 'bg-[#0e0e12] border-white/10 hover:border-white/25 text-zinc-200 hover:text-white cursor-pointer'
                : 'bg-[#070709] border-white/5 text-zinc-700 cursor-not-allowed opacity-35'
            }`}
            title="Schritt zurücknehmen"
            aria-label="Schritt zurücknehmen"
          >
            <Undo2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          <button
            onClick={onRestart}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0e0e12] border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Neues Spiel"
            aria-label="Neues Spiel starten"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>

      {/* Score and Highscore Cards + Size Switcher */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Current Score */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#08080a] border border-white/[0.08] backdrop-blur-md flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-0.5">
            Punkte
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
            {score.toLocaleString('de-DE')}
          </span>
        </div>

        {/* Best Score */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#08080a] border border-white/[0.08] backdrop-blur-md flex flex-col items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-amber-400/80 mb-0.5">
            Rekord
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300 tabular-nums tracking-tight">
            {bestScore.toLocaleString('de-DE')}
          </span>
        </div>
      </div>

      {/* Minimalist Grid Size Selector */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] text-zinc-500 font-medium">Raster</span>
        <div className="bg-[#0a0a0d] p-0.5 rounded-xl border border-white/[0.06] flex items-center gap-1 shadow-inner">
          {[
            { size: 3, label: '3×3' },
            { size: 4, label: '4×4' },
            { size: 5, label: '5×5' },
          ].map(item => {
            const isActive = gridSize === item.size;
            return (
              <button
                key={item.size}
                onClick={() => onSelectSize(item.size)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
                aria-label={`Rastergröße ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
