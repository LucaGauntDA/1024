import { Direction, Tile } from '../types/game';

let nextTileId = 1;

export function getUniqueId(): string {
  return `tile-${nextTileId++}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function createInitialTiles(size = 4): Tile[] {
  const tiles: Tile[] = [];
  const first = spawnRandomTile(tiles, size);
  if (first) tiles.push(first);
  const second = spawnRandomTile(tiles, size);
  if (second) tiles.push(second);
  return tiles;
}

export function spawnRandomTile(existingTiles: Tile[], size = 4): Tile | null {
  const occupied = new Set(existingTiles.map(t => `${t.row},${t.col}`));
  const emptyCells: { row: number; col: number }[] = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!occupied.has(`${r},${c}`)) {
        emptyCells.push({ row: r, col: c });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  return {
    id: getUniqueId(),
    value,
    row: cell.row,
    col: cell.col,
    isNew: true,
  };
}

export interface MoveOutcome {
  tiles: Tile[];
  scoreGained: number;
  moved: boolean;
  mergedPositions: Array<{ row: number; col: number; value: number }>;
}

export function moveBoard(tiles: Tile[], direction: Direction, size = 4): MoveOutcome {
  // Create 2D board lookup
  const board: (Tile | null)[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );

  tiles.forEach(tile => {
    board[tile.row][tile.col] = { ...tile, isNew: false, isMerged: false };
  });

  let moved = false;
  let scoreGained = 0;
  const mergedPositions: Array<{ row: number; col: number; value: number }> = [];
  const newTilesMap = new Map<string, Tile>();

  // Helper vectors for movement
  const isHorizontal = direction === 'LEFT' || direction === 'RIGHT';
  const isForward = direction === 'RIGHT' || direction === 'DOWN';

  for (let lineIndex = 0; lineIndex < size; lineIndex++) {
    // Extract line of tiles
    const lineTiles: (Tile | null)[] = [];
    for (let pos = 0; pos < size; pos++) {
      const r = isHorizontal ? lineIndex : pos;
      const c = isHorizontal ? pos : lineIndex;
      lineTiles.push(board[r][c]);
    }

    // Filter out non-null tiles in line
    const nonNullTiles = lineTiles.filter((t): t is Tile => t !== null);
    if (isForward) {
      nonNullTiles.reverse();
    }

    const processedTiles: Tile[] = [];
    let i = 0;

    while (i < nonNullTiles.length) {
      const current = nonNullTiles[i];
      const next = nonNullTiles[i + 1];

      if (next && current.value === next.value) {
        // Merge!
        const mergedValue = current.value * 2;
        const targetTargetIndex = processedTiles.length;
        const actualPos = isForward ? size - 1 - targetTargetIndex : targetTargetIndex;
        const targetRow = isHorizontal ? lineIndex : actualPos;
        const targetCol = isHorizontal ? actualPos : lineIndex;

        const mergedTile: Tile = {
          id: getUniqueId(),
          value: mergedValue,
          row: targetRow,
          col: targetCol,
          prevRow: current.row,
          prevCol: current.col,
          isMerged: true,
        };

        processedTiles.push(mergedTile);
        scoreGained += mergedValue;
        mergedPositions.push({ row: targetRow, col: targetCol, value: mergedValue });
        moved = true;
        i += 2;
      } else {
        // Slide without merge
        const targetTargetIndex = processedTiles.length;
        const actualPos = isForward ? size - 1 - targetTargetIndex : targetTargetIndex;
        const targetRow = isHorizontal ? lineIndex : actualPos;
        const targetCol = isHorizontal ? actualPos : lineIndex;

        if (current.row !== targetRow || current.col !== targetCol) {
          moved = true;
        }

        processedTiles.push({
          ...current,
          prevRow: current.row,
          prevCol: current.col,
          row: targetRow,
          col: targetCol,
        });
        i += 1;
      }
    }

    // Add all processed tiles to map
    processedTiles.forEach(t => {
      newTilesMap.set(t.id, t);
    });
  }

  const finalTiles = Array.from(newTilesMap.values());

  return {
    tiles: finalTiles,
    scoreGained,
    moved,
    mergedPositions,
  };
}

export function isGameOver(tiles: Tile[], size = 4): boolean {
  if (tiles.length < size * size) {
    return false; // Still empty spaces
  }

  // Create grid lookup
  const grid: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  tiles.forEach(t => {
    grid[t.row][t.col] = t.value;
  });

  // Check for any horizontal or vertical adjacent match
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = grid[r][c];
      if (val === 0) return false;

      // Check right
      if (c < size - 1 && grid[r][c + 1] === val) {
        return false;
      }
      // Check down
      if (r < size - 1 && grid[r + 1][c] === val) {
        return false;
      }
    }
  }

  return true;
}

export function getHighestTileValue(tiles: Tile[]): number {
  return tiles.reduce((max, t) => Math.max(max, t.value), 0);
}
