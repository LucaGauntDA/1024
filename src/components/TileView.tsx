import React, { memo } from 'react';
import { Tile } from '../types/game';
import { getTileTheme } from '../utils/tileThemes';

interface TileViewProps {
  tile: Tile;
  size: number;
}

export const TileView: React.FC<TileViewProps> = memo(({ tile, size }) => {
  const theme = getTileTheme(tile.value);

  // Calculate layout percentages
  // For 4x4 with 12px gap:
  // We can calculate position as percentage:
  // cellSizePercent = (100 - (size - 1) * gapPercent) / size
  // Or even simpler: step = 100% / size, with inner padding/margin!
  // If we give each cell width: `${100 / size}%` and padding: `4px` or `6px`,
  // then translation is simply `col * 100%` and `row * 100%`!
  const stepPercent = 100 / size;
  const transformStyle = {
    transform: `translate3d(${tile.col * 100}%, ${tile.row * 100}%, 0)`,
    width: `${stepPercent}%`,
    height: `${stepPercent}%`,
  };

  // Font sizing based on number of digits
  const getFontSize = (val: number) => {
    if (val < 100) return 'text-3xl sm:text-4xl md:text-5xl';
    if (val < 1000) return 'text-2xl sm:text-3xl md:text-4xl';
    if (val < 10000) return 'text-xl sm:text-2xl md:text-3xl';
    return 'text-lg sm:text-xl md:text-2xl';
  };

  return (
    <div
      className="absolute top-0 left-0 p-1.5 sm:p-2 will-change-transform transition-transform duration-150 ease-[cubic-bezier(0.18,0.89,0.32,1.15)]"
      style={transformStyle}
      data-testid={`tile-${tile.row}-${tile.col}`}
    >
      <div
        className={`w-full h-full rounded-2xl sm:rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md transition-all duration-200 select-none ${theme.bg} ${theme.text} ${theme.border} ${
          tile.isNew ? 'animate-tile-pop' : ''
        } ${tile.isMerged ? 'animate-tile-merge' : ''}`}
        style={{
          boxShadow: theme.shadow,
        }}
      >
        {/* Subtle top glare / Apple-esque specularity */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />

        {/* Ambient center radial glow */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${theme.glow} 0%, transparent 75%)`,
          }}
        />

        {/* Tile Value */}
        <span
          className={`font-mono font-bold tracking-tight z-10 tabular-nums ${getFontSize(
            tile.value
          )}`}
          style={{
            textShadow: `0 0 14px ${theme.glow}`,
          }}
        >
          {tile.value}
        </span>

        {/* Crown indicator for legendary 2048+ tiles */}
        {tile.value >= 2048 && (
          <span className="absolute bottom-1.5 text-[9px] uppercase tracking-widest font-semibold opacity-80 text-amber-200">
            ★ LUMINA
          </span>
        )}
      </div>
    </div>
  );
});

TileView.displayName = 'TileView';
