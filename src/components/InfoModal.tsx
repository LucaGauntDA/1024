import React from 'react';
import { X, Touchpad, Keyboard, Sparkles } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#11131c] border border-white/10 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Spielanleitung</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          <div className="p-3.5 rounded-2xl bg-[#181a24] border border-white/[0.05]">
            <p className="font-semibold text-white mb-1">Ziel des Spiels</p>
            <p className="text-zinc-400">
              Kombiniere gleiche Steine durch Verschieben. Erreiche den Wert <span className="text-amber-300 font-bold">2048</span> und erziele einen neuen Highscore!
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#181a24] border border-white/[0.05] flex items-start gap-3">
            <Touchpad className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-0.5">Wischen & Ziehen</p>
              <p className="text-zinc-400">
                Wische auf Touchscreens oder ziehe mit der Maus in jede der 4 Richtungen.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#181a24] border border-white/[0.05] flex items-start gap-3">
            <Keyboard className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-0.5">Tastatursteuerung</p>
              <p className="text-zinc-400">
                Nutze die <kbd className="px-1 py-0.5 bg-zinc-800 border border-white/10 rounded font-mono text-[11px]">Pfeiltasten</kbd> oder <kbd className="px-1 py-0.5 bg-zinc-800 border border-white/10 rounded font-mono text-[11px]">W / A / S / D</kbd>.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs tracking-wide transition-all active:scale-[0.98]"
        >
          Verstanden
        </button>
      </div>
    </div>
  );
};
