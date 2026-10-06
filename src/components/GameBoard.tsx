import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Direction, Tile } from '../types/game';
import { TileView } from './TileView';
import { ParticleSystem } from '../utils/particles';
import { getTileTheme } from '../utils/tileThemes';

interface GameBoardProps {
  tiles: Tile[];
  size: number;
  onMove: (dir: Direction) => void;
  disabled?: boolean;
  scoreBonus?: { id: number; value: number } | null;
  mergedPositions?: Array<{ row: number; col: number; value: number }>;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  size,
  onMove,
  disabled = false,
  scoreBonus,
  mergedPositions,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSysRef = useRef<ParticleSystem | null>(null);

  // Swipe gesture state
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const mouseStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [boardNudge, setBoardNudge] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Init canvas particle system
  useEffect(() => {
    if (!canvasRef.current) return;
    const sys = new ParticleSystem();
    sys.init(canvasRef.current);
    particleSysRef.current = sys;

    const handleResize = () => sys.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sys.destroy();
    };
  }, []);

  // Trigger particles when merges happen
  useEffect(() => {
    if (!mergedPositions || mergedPositions.length === 0 || !boardRef.current || !particleSysRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const cellWidth = rect.width / size;
    const cellHeight = rect.height / size;

    mergedPositions.forEach(({ row, col, value }) => {
      const x = (col + 0.5) * cellWidth;
      const y = (row + 0.5) * cellHeight;
      const theme = getTileTheme(value);
      particleSysRef.current?.emit(x, y, theme.particleColor, value >= 128 ? 24 : 16);
    });
  }, [mergedPositions, size]);

  // Execute directional move with subtle board spring nudge
  const triggerMove = useCallback(
    (dir: Direction) => {
      if (disabled) return;

      // Subtle tactile nudge
      const nudgeMap: Record<Direction, { x: number; y: number }> = {
        UP: { x: 0, y: -4 },
        DOWN: { x: 0, y: 4 },
        LEFT: { x: -4, y: 0 },
        RIGHT: { x: 4, y: 0 },
      };

      setBoardNudge(nudgeMap[dir]);
      setTimeout(() => setBoardNudge({ x: 0, y: 0 }), 140);

      onMove(dir);
    },
    [disabled, onMove]
  );

  // Touch event handlers with smooth swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const minDistance = 24; // Threshold in pixels

    if (Math.max(absDx, absDy) < minDistance || dt > 1000) {
      return;
    }

    if (absDx > absDy) {
      triggerMove(dx > 0 ? 'RIGHT' : 'LEFT');
    } else {
      triggerMove(dy > 0 ? 'DOWN' : 'UP');
    }
  };

  // Mouse drag support for desktop testing and smooth desktop experience
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || e.button !== 0) return;
    mouseStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (disabled || !mouseStartRef.current) return;
    const dx = e.clientX - mouseStartRef.current.x;
    const dy = e.clientY - mouseStartRef.current.y;
    const dt = Date.now() - mouseStartRef.current.time;
    mouseStartRef.current = null;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const minDistance = 28;

    if (Math.max(absDx, absDy) < minDistance || dt > 1200) {
      return;
    }

    if (absDx > absDy) {
      triggerMove(dx > 0 ? 'RIGHT' : 'LEFT');
    } else {
      triggerMove(dy > 0 ? 'DOWN' : 'UP');
    }
  };

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      // Prevent scrolling the page when using arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          triggerMove('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          triggerMove('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          triggerMove('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          triggerMove('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, triggerMove]);

  // Generate empty background grid cells
  const emptyCells = Array.from({ length: size * size }, (_, index) => {
    const r = Math.floor(index / size);
    const c = index % size;
    return (
      <div key={`cell-${r}-${c}`} className="p-1.5 sm:p-2">
        <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-[#141721]/80 border border-white/[0.04] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-colors duration-200" />
      </div>
    );
  });

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[500px] aspect-square mx-auto touch-none select-none">
      {/* Score gain floating pill */}
      {scoreBonus && (
        <div
          key={scoreBonus.id}
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-score-float font-mono font-bold text-emerald-400 text-lg tracking-wider"
          style={{ textShadow: '0 0 12px rgba(52, 211, 153, 0.6)' }}
        >
          +{scoreBonus.value}
        </div>
      )}

      {/* Main Board Container */}
      <div
        ref={boardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          mouseStartRef.current = null;
        }}
        className="relative w-full h-full p-2 sm:p-3 rounded-3xl bg-[#0e1017] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate3d(${boardNudge.x}px, ${boardNudge.y}px, 0)`,
        }}
        aria-label="2048 Spielfeld"
        role="grid"
      >
        {/* Background grid cells */}
        <div
          className="grid w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
          }}
        >
          {emptyCells}
        </div>

        {/* Active Animated Tiles Overlay */}
        <div className="absolute inset-2 sm:inset-3 pointer-events-none">
          {tiles.map(tile => (
            <TileView key={tile.id} tile={tile} size={size} />
          ))}
        </div>

        {/* Canvas for neon particle bursts */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-3xl"
        />
      </div>
    </div>
  );
};
