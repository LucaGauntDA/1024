export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  prevRow?: number;
  prevCol?: number;
  isNew?: boolean;
  isMerged?: boolean;
}

export type GameStatus = 'MENU' | 'PLAYING' | 'WON' | 'GAME_OVER';

export interface BoardHistory {
  tiles: Tile[];
  score: number;
  moves: number;
}

export interface GameStats {
  score: number;
  bestScore: number;
  moves: number;
  startTime: number;
  elapsedSeconds: number;
  highestTile: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  glow: number;
}
