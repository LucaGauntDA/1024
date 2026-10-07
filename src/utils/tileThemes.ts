export interface TileTheme {
  bg: string;
  text: string;
  border: string;
  glow: string;
  shadow: string;
  particleColor: string;
}

export const TILE_THEMES: Record<number, TileTheme> = {
  2: {
    bg: 'bg-[#090b10]',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    glow: 'rgba(34, 211, 238, 0.25)',
    shadow: '0 0 16px rgba(34, 211, 238, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    particleColor: '#22d3ee',
  },
  4: {
    bg: 'bg-[#070e0f]',
    text: 'text-teal-300',
    border: 'border-teal-400/45',
    glow: 'rgba(45, 212, 191, 0.28)',
    shadow: '0 0 18px rgba(45, 212, 191, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
    particleColor: '#2dd4bf',
  },
  8: {
    bg: 'bg-[#060f09]',
    text: 'text-emerald-300',
    border: 'border-emerald-400/50',
    glow: 'rgba(52, 211, 153, 0.32)',
    shadow: '0 0 20px rgba(52, 211, 153, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
    particleColor: '#34d399',
  },
  16: {
    bg: 'bg-[#100d05]',
    text: 'text-amber-300',
    border: 'border-amber-400/55',
    glow: 'rgba(251, 191, 36, 0.35)',
    shadow: '0 0 22px rgba(251, 191, 36, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.18)',
    particleColor: '#fbbf24',
  },
  32: {
    bg: 'bg-[#120a04]',
    text: 'text-orange-300',
    border: 'border-orange-400/60',
    glow: 'rgba(251, 146, 60, 0.38)',
    shadow: '0 0 24px rgba(251, 146, 60, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    particleColor: '#fb923c',
  },
  64: {
    bg: 'bg-[#120608]',
    text: 'text-rose-300',
    border: 'border-rose-400/65',
    glow: 'rgba(251, 113, 133, 0.42)',
    shadow: '0 0 26px rgba(251, 113, 133, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    particleColor: '#fb7185',
  },
  128: {
    bg: 'bg-[#100404]',
    text: 'text-red-400',
    border: 'border-red-500/70',
    glow: 'rgba(248, 113, 113, 0.45)',
    shadow: '0 0 28px rgba(248, 113, 113, 0.38), inset 0 1px 2px rgba(255, 255, 255, 0.22)',
    particleColor: '#f87171',
  },
  256: {
    bg: 'bg-[#03070d]',
    text: 'text-sky-300',
    border: 'border-sky-400/80',
    glow: 'rgba(56, 189, 248, 0.55)',
    shadow: '0 0 32px rgba(56, 189, 248, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
    particleColor: '#38bdf8',
  },
  512: {
    bg: 'bg-[#020a06]',
    text: 'text-emerald-200',
    border: 'border-emerald-300/85',
    glow: 'rgba(52, 211, 153, 0.65)',
    shadow: '0 0 36px rgba(52, 211, 153, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.28)',
    particleColor: '#34d399',
  },
  1024: {
    bg: 'bg-[#0a0700]',
    text: 'text-amber-200',
    border: 'border-amber-300',
    glow: 'rgba(251, 191, 36, 0.85)',
    shadow: '0 0 44px rgba(251, 191, 36, 0.7), 0 0 16px rgba(255, 255, 255, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.35)',
    particleColor: '#facc15',
  },
  2048: {
    bg: 'bg-[#000000]',
    text: 'text-white',
    border: 'border-white',
    glow: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 0 50px rgba(255, 255, 255, 0.8), 0 0 20px rgba(251, 191, 36, 0.5), inset 0 1px 4px rgba(255, 255, 255, 0.5)',
    particleColor: '#ffffff',
  },
};

export function getTileTheme(value: number): TileTheme {
  if (TILE_THEMES[value]) {
    return TILE_THEMES[value];
  }

  // Beyond 2048: Deep piano black with radiant white/cyan aura
  return {
    bg: 'bg-[#000000]',
    text: 'text-white',
    border: 'border-cyan-300',
    glow: 'rgba(34, 211, 238, 0.9)',
    shadow: '0 0 52px rgba(34, 211, 238, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
    particleColor: '#22d3ee',
  };
}
