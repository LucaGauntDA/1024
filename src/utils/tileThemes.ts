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
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    glow: 'rgba(34, 211, 238, 0.25)',
    shadow: '0 0 16px rgba(34, 211, 238, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    particleColor: '#22d3ee',
  },
  4: {
    bg: 'bg-teal-950/45',
    text: 'text-teal-300',
    border: 'border-teal-400/45',
    glow: 'rgba(45, 212, 191, 0.28)',
    shadow: '0 0 18px rgba(45, 212, 191, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
    particleColor: '#2dd4bf',
  },
  8: {
    bg: 'bg-emerald-950/50',
    text: 'text-emerald-300',
    border: 'border-emerald-400/50',
    glow: 'rgba(52, 211, 153, 0.32)',
    shadow: '0 0 20px rgba(52, 211, 153, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
    particleColor: '#34d399',
  },
  16: {
    bg: 'bg-amber-950/50',
    text: 'text-amber-300',
    border: 'border-amber-400/55',
    glow: 'rgba(251, 191, 36, 0.35)',
    shadow: '0 0 22px rgba(251, 191, 36, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.18)',
    particleColor: '#fbbf24',
  },
  32: {
    bg: 'bg-orange-950/55',
    text: 'text-orange-300',
    border: 'border-orange-400/60',
    glow: 'rgba(251, 146, 60, 0.38)',
    shadow: '0 0 24px rgba(251, 146, 60, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    particleColor: '#fb923c',
  },
  64: {
    bg: 'bg-rose-950/60',
    text: 'text-rose-300',
    border: 'border-rose-400/65',
    glow: 'rgba(251, 113, 133, 0.42)',
    shadow: '0 0 26px rgba(251, 113, 133, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    particleColor: '#fb7185',
  },
  128: {
    bg: 'bg-fuchsia-950/65',
    text: 'text-fuchsia-300',
    border: 'border-fuchsia-400/70',
    glow: 'rgba(232, 121, 249, 0.45)',
    shadow: '0 0 28px rgba(232, 121, 249, 0.38), inset 0 1px 2px rgba(255, 255, 255, 0.22)',
    particleColor: '#e879f9',
  },
  256: {
    bg: 'bg-purple-950/70',
    text: 'text-purple-200',
    border: 'border-purple-400/75',
    glow: 'rgba(192, 132, 252, 0.5)',
    shadow: '0 0 32px rgba(192, 132, 252, 0.42), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
    particleColor: '#c084fc',
  },
  512: {
    bg: 'bg-indigo-950/75',
    text: 'text-indigo-200',
    border: 'border-indigo-400/80',
    glow: 'rgba(129, 140, 248, 0.55)',
    shadow: '0 0 36px rgba(129, 140, 248, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.28)',
    particleColor: '#818cf8',
  },
  1024: {
    bg: 'bg-blue-950/80',
    text: 'text-sky-200',
    border: 'border-sky-300/85',
    glow: 'rgba(56, 189, 248, 0.6)',
    shadow: '0 0 40px rgba(56, 189, 248, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
    particleColor: '#38bdf8',
  },
  2048: {
    bg: 'bg-amber-900/85',
    text: 'text-amber-100',
    border: 'border-amber-300',
    glow: 'rgba(251, 191, 36, 0.85)',
    shadow: '0 0 48px rgba(251, 191, 36, 0.7), 0 0 15px rgba(255, 255, 255, 0.4), inset 0 1px 4px rgba(255, 255, 255, 0.4)',
    particleColor: '#facc15',
  },
};

export function getTileTheme(value: number): TileTheme {
  if (TILE_THEMES[value]) {
    return TILE_THEMES[value];
  }

  // Beyond 2048: Supernova Aurora theme
  return {
    bg: 'bg-violet-950/90',
    text: 'text-white',
    border: 'border-pink-400',
    glow: 'rgba(244, 114, 182, 0.9)',
    shadow: '0 0 52px rgba(244, 114, 182, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
    particleColor: '#f472b6',
  };
}
