import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus, Tile, Direction, BoardHistory } from './types/game';
import {
  createInitialTiles,
  moveBoard,
  spawnRandomTile,
  isGameOver,
  getHighestTileValue,
} from './utils/gameLogic';
import { soundEngine } from './utils/audio';
import { GameBoard } from './components/GameBoard';
import { HeaderHUD } from './components/HeaderHUD';
import { GameOverModal } from './components/GameOverModal';
import { WinModal } from './components/WinModal';
import { InfoModal } from './components/InfoModal';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [gridSize, setGridSize] = useState<number>(4);
  const [status, setStatus] = useState<GameStatus>('PLAYING');
  const [tiles, setTiles] = useState<Tile[]>(() => createInitialTiles(4));
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [history, setHistory] = useState<BoardHistory[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [hasWonThisSession, setHasWonThisSession] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [scoreBonus, setScoreBonus] = useState<{ id: number; value: number } | null>(null);
  const [mergedPositions, setMergedPositions] = useState<
    Array<{ row: number; col: number; value: number }>
  >([]);

  const highestTile = getHighestTileValue(tiles);
  const bonusTimerRef = useRef<number | null>(null);

  // Load highscore and sound preference from localStorage
  useEffect(() => {
    try {
      const savedHighscore = localStorage.getItem(`lumina_highscore_${gridSize}`);
      if (savedHighscore) {
        setBestScore(parseInt(savedHighscore, 10) || 0);
      } else {
        setBestScore(0);
      }
      setIsMuted(soundEngine.getMuted());
    } catch {}
  }, [gridSize]);

  // Update best score whenever current score exceeds it
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem(`lumina_highscore_${gridSize}`, String(score));
      } catch {}
    }
  }, [score, bestScore, gridSize]);

  // Start new game
  const startGame = useCallback((size: number = gridSize) => {
    soundEngine.playClick();
    const initialTiles = createInitialTiles(size);
    setGridSize(size);
    setTiles(initialTiles);
    setScore(0);
    setMoves(0);
    setHistory([]);
    setHasWonThisSession(false);
    setScoreBonus(null);
    setMergedPositions([]);
    setStatus('PLAYING');
  }, [gridSize]);

  // Restart current board
  const handleRestart = useCallback(() => {
    startGame(gridSize);
  }, [startGame, gridSize]);

  // Change grid size and start fresh board
  const handleSelectSize = useCallback(
    (newSize: number) => {
      if (newSize === gridSize) return;
      startGame(newSize);
    },
    [gridSize, startGame]
  );

  // Undo move
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    soundEngine.playClick();

    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, prev.length - 1));
    setTiles(previous.tiles);
    setScore(previous.score);
    setMoves(previous.moves);
    setMergedPositions([]);
    if (status === 'GAME_OVER') {
      setStatus('PLAYING');
    }
  }, [history, status]);

  // Toggle sound
  const handleToggleSound = useCallback(() => {
    const newMute = soundEngine.toggleMute();
    setIsMuted(newMute);
  }, []);

  // Main directional movement handler
  const handleMove = useCallback(
    (direction: Direction) => {
      if (status !== 'PLAYING') return;

      const outcome = moveBoard(tiles, direction, gridSize);

      if (!outcome.moved) {
        return; // No valid moves in this direction
      }

      // Save to undo history before applying change (keep up to 12 steps)
      setHistory(prev => [
        ...prev.slice(-11),
        {
          tiles: tiles.map(t => ({ ...t })),
          score,
          moves,
        },
      ]);

      // Spawn a new tile into empty space
      const newTile = spawnRandomTile(outcome.tiles, gridSize);
      const nextTiles = newTile ? [...outcome.tiles, newTile] : outcome.tiles;

      // Audio and haptic feedback
      if (outcome.mergedPositions.length > 0) {
        // Find highest merged value for musical chime
        const maxMerged = Math.max(...outcome.mergedPositions.map(p => p.value));
        soundEngine.playMerge(maxMerged);

        // Show floating score indicator
        if (bonusTimerRef.current) clearTimeout(bonusTimerRef.current);
        setScoreBonus({ id: Date.now(), value: outcome.scoreGained });
        bonusTimerRef.current = window.setTimeout(() => setScoreBonus(null), 700);
      } else {
        soundEngine.playSlide();
      }

      // Update state
      setTiles(nextTiles);
      setScore(prev => prev + outcome.scoreGained);
      setMoves(prev => prev + 1);
      setMergedPositions(outcome.mergedPositions);

      // Check for win condition (2048)
      const has2048 = nextTiles.some(t => t.value >= 2048);
      if (has2048 && !hasWonThisSession) {
        setHasWonThisSession(true);
        setStatus('WON');
        soundEngine.playWin();
        return;
      }

      // Check for game over
      if (isGameOver(nextTiles, gridSize)) {
        setStatus('GAME_OVER');
        soundEngine.playGameOver();
      }
    },
    [status, tiles, gridSize, score, moves, hasWonThisSession]
  );

  return (
    <main className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col justify-between p-3.5 sm:p-6 md:p-8 relative overflow-hidden select-none">
      {/* Ambient background glows for high-end Apple dark mode aesthetic */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-600/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-600/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full flex flex-col items-center animate-fade-in">
          {/* Header HUD with score and controls */}
          <HeaderHUD
            score={score}
            bestScore={bestScore}
            canUndo={history.length > 0}
            isMuted={isMuted}
            gridSize={gridSize}
            onSelectSize={handleSelectSize}
            onRestart={handleRestart}
            onUndo={handleUndo}
            onToggleSound={handleToggleSound}
            onOpenInfo={() => setShowInfo(true)}
          />

          {/* The 2048 Game Board */}
          <GameBoard
            tiles={tiles}
            size={gridSize}
            onMove={handleMove}
            disabled={status !== 'PLAYING'}
            scoreBonus={scoreBonus}
            mergedPositions={mergedPositions}
          />

          {/* Directional buttons for tablet / accessibility affordance */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleMove('UP')}
              className="w-10 h-8 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Nach oben verschieben"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleMove('LEFT')}
                className="w-10 h-8 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Nach links verschieben"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMove('DOWN')}
                className="w-10 h-8 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Nach unten verschieben"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMove('RIGHT')}
                className="w-10 h-8 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-white/20 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Nach rechts verschieben"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle minimalist footer */}
      <footer className="w-full max-w-xl mx-auto pt-3 text-center text-xs text-zinc-600 flex items-center justify-center gap-2.5 relative z-10">
        <span>Lumina 2048</span>
        <span>·</span>
        <span>Wischen oder Pfeiltasten</span>
      </footer>

      {/* Overlays / Modals */}
      {status === 'GAME_OVER' && (
        <GameOverModal
          score={score}
          bestScore={bestScore}
          highestTile={highestTile}
          moves={moves}
          isNewHighscore={score >= bestScore && score > 0}
          canUndo={history.length > 0}
          onRestart={handleRestart}
          onUndo={handleUndo}
        />
      )}

      {status === 'WON' && (
        <WinModal
          score={score}
          onContinue={() => setStatus('PLAYING')}
          onRestart={handleRestart}
        />
      )}

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
    </main>
  );
}
