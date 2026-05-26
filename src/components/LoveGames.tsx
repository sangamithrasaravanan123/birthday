/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, HelpCircle, Heart, Star, Sparkles, Smile, RefreshCw, Gamepad2, ArrowLeft, ArrowRight } from "lucide-react";
import { sweetAudio } from "../audio";

interface LoveGamesProps {
  onClose: () => void;
}

type ActiveGame = "menu" | "hearts" | "kisses" | "matching";

export default function LoveGames({ onClose }: LoveGamesProps) {
  const [activeGame, setActiveGame] = useState<ActiveGame>("menu");

  const startNewGame = (game: ActiveGame) => {
    sweetAudio.playChime();
    setActiveGame(game);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-2 sm:p-4 font-quicksand">
      
      {/* Top Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-[10px] text-pink-600 font-bold uppercase tracking-wider mb-2">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Boyfriend Playroom</span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-bold text-pink-700">
          Tiny Games
        </h2>
    
      </div>

      <AnimatePresence mode="wait">
        {activeGame === "menu" ? (
          <motion.div
            key="game-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-2"
          >
            {/* Find the Hidden Hearts */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              onClick={() => startNewGame("hearts")}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-pink-100 cursor-pointer text-center flex flex-col justify-between items-center shadow-md shadow-pink-100/50"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-2xl mb-3"></div>
              <h3 className="font-playfair font-bold text-pink-700 text-sm sm:text-base">Find Hidden Hearts</h3>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">Snoop-search across our  room workspace for 5 cleverly tucked heart badges!</p>
              <button className="mt-4 px-4 py-1.5 bg-pink-400 text-white rounded-full text-[10px] font-bold shadow-xs cursor-pointer">Play </button>
            </motion.div>

            {/* Catch the Kisses */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              onClick={() => startNewGame("kisses")}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-pink-100 cursor-pointer text-center flex flex-col justify-between items-center shadow-md shadow-pink-100/50"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-2xl mb-3"></div>
              <h3 className="font-playfair font-bold text-pink-700 text-sm sm:text-base">Catch the Kisses</h3>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">Position your basket back and forth to scoop up 10 floating emoji kisses!</p>
              <button className="mt-4 px-4 py-1.5 bg-rose-400 text-white rounded-full text-[10px] font-bold shadow-xs cursor-pointer">Play </button>
            </motion.div>

            {/* Memory Matching Card puzzle */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              onClick={() => startNewGame("matching")}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-pink-100 cursor-pointer text-center flex flex-col justify-between items-center shadow-md shadow-pink-100/50"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-2xl mb-3"></div>
              <h3 className="font-playfair font-bold text-pink-700 text-sm sm:text-base">Cozy Match Pairs</h3>
              <p className="text-[11px] text-slate-500 mt-2 font-medium">Memory grid match the cutest romantic cards of rings, roses, and chocolate treats!</p>
              <button className="mt-4 px-4 py-1.5 bg-amber-400 text-white rounded-full text-[10px] font-bold shadow-xs cursor-pointer">Play </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="game-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full bg-white/80 backdrop-blur-md border border-pink-200 rounded-3xl p-5 sm:p-6 shadow-xl relative"
          >
            {/* Header / Return menu command */}
            <div className="flex justify-between items-center pb-3 border-b border-pink-50 mb-4">
              <button
                onClick={() => {
                  sweetAudio.playClick();
                  setActiveGame("menu");
                }}
                className="text-xs text-pink-500 hover:text-pink-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Back to Games list</span>
              </button>

              <span className="text-[10px] bg-pink-105 border border-pink-200/50 px-2.5 py-0.5 rounded-full text-pink-600 font-bold uppercase tracking-wider">
                {activeGame === "hearts" ? "Search Hearts" : activeGame === "kisses" ? "Catch Kisses" : "Memory Match"}
              </span>
            </div>

            {/* INNER GAME RENDERING ENGINE */}
            {activeGame === "hearts" && <FindHeartsGame />}
            {activeGame === "kisses" && <CatchKissesGame />}
            {activeGame === "matching" && <MemoryMatchGame />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------
// GAME 1: FIND THE HIDDEN HEARTS GAME
// ----------------------------------------
interface HeartPoint {
  id: number;
  x: number; // pos%
  y: number; // pos%
  hint: string;
  found: boolean;
}

function FindHeartsGame() {
  const [points, setPoints] = useState<HeartPoint[]>([
    { id: 1, x: 23, y: 72, hint: "Tucked behind the cozy desk lamp bulb...", found: false },
    { id: 2, x: 74, y: 35, hint: "Glued inside the bottom coffee mugs... ", found: false },
    { id: 3, x: 48, y: 18, hint: "Resting snug on top of the floating cloud shelf... ", found: false },
    { id: 4, x: 86, y: 78, hint: "Hiding in the pockets of his favorite hoodie icon... ", found: false },
    { id: 5, x: 12, y: 44, hint: "Stuck behind the cute flower pot base... ", found: false },
  ]);

  const [message, setMessage] = useState<string>("Tap on suspicious elements in our room workspace to find hidden gems!");
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleTapPoint = (pt: HeartPoint) => {
    if (pt.found) return;
    sweetAudio.playChime();
    setPoints((prev) =>
      prev.map((item) => (item.id === pt.id ? { ...item, found: true } : item))
    );
    setMessage(`Found heart #${pt.id}! “${pt.hint}”`);
  };

  useEffect(() => {
    if (points.every((p) => p.found) && !hasWon) {
      setHasWon(true);
      sweetAudio.playChime();
    }
  }, [points, hasWon]);

  const handleRestart = () => {
    sweetAudio.playClick();
    setPoints((prev) => prev.map((p) => ({ ...p, found: false })));
    setMessage("Room sketch clean! Find all 5 secret hearts again.");
    setHasWon(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Decorative cute workspace graphic */}
      <div className="relative w-full aspect-[16/9] bg-[#fdfbf7] border-2 border-[#e3dcc4] rounded-2xl overflow-hidden shadow-inner select-none relative">
        {/* Soft grid lines to mimic paper notepad */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#f8ebd3]/20 to-transparent pointer-events-none" />

        {/* Drawn mock items vectors */}
        <div className="absolute top-8 left-16 text-3xl font-bold opacity-30 select-none">☁️</div>
        <div className="absolute top-16 left-6 text-2xl font-bold opacity-30">🌻</div>
        <div className="absolute top-24 left-24 text-3xl font-bold opacity-45">🛋️</div>
        <div className="absolute bottom-6 right-36 text-4xl opacity-40">☕</div>
        <div className="absolute bottom-8 left-36 text-4xl opacity-40">💡</div>
        <div className="absolute bottom-12 right-12 text-5xl opacity-45">🧥</div>

        {/* Clickable transparent heart triggers scattered */}
        {points.map((pt) => {
          return (
            <button
              key={pt.id}
              onClick={() => handleTapPoint(pt)}
              style={{ top: `${pt.y}%`, left: `${pt.x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition border-2 cursor-pointer ${
                pt.found
                  ? "bg-rose-400 border-rose-300 text-white scale-110 shadow-md shadow-pink-200"
                  : "bg-pink-100/10 border-transparent hover:border-pink-300 hover:bg-pink-200/20"
              }`}
            >
              <Heart className={`w-4 h-4 ${pt.found ? "fill-current" : "opacity-0 hover:opacity-10"}`} />
            </button>
          );
        })}

        {/* Win banners layout inside image frame */}
        <AnimatePresence>
          {hasWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-pink-700/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 text-white z-20"
            >
              <Heart className="w-10 h-10 fill-current text-pink-200 animate-bounce mb-2" />
              <h4 className="font-playfair text-xl font-bold">Magnificent Searcher! </h4>
              <p className="text-xs font-quicksand text-pink-100 max-w-xs mt-1">
                You located all 5 secret hearts,WTFFFFF !
              </p>
              <button
                onClick={handleRestart}
                className="mt-4 px-5 py-1 bg-white text-pink-600 rounded-full text-xs font-bold shadow-md cursor-pointer hover:bg-slate-50"
              >
                Reset Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 bg-pink-50/50 rounded-xl px-4 py-2 text-center border border-pink-100/70 w-full min-h-[48px] flex items-center justify-center">
        <p className="text-[11px] text-pink-700 font-bold leading-normal">
          {message}
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------
// GAME 2: CATCH THE KISSES GAME
// ----------------------------------------
interface FallingKiss {
  id: number;
  x: number; // percentage left pos
  y: number; // absolute px position top
  speed: number;
  emoji: string;
}

function CatchKissesGame() {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem("kiss_high_score") || "0");
  });
  const [basketPos, setBasketPos] = useState<number>(50); // percentage pos 0-100
  const [fallingList, setFallingList] = useState<FallingKiss[]>([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Catch falling kisses to reach 10 points!");

  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  const startPlayingKisses = () => {
    sweetAudio.playChime();
    setScore(0);
    setFallingList([]);
    setGameActive(true);
    setMessage("Hover / slide your range to position your basket!");
  };

  useEffect(() => {
    if (!gameActive) return;

    let idTracker = 0;
    // Spawn falling kisses every 1200ms
    const spawnTimer = setInterval(() => {
      const emojiOptions = ["😘", "💋", "❤️", "🥰", "🧁"];
      const newKiss: FallingKiss = {
        id: idTracker++,
        x: 5 + Math.random() * 90,
        y: 0,
        speed: 2 + Math.random() * 2,
        emoji: emojiOptions[Math.floor(Math.random() * emojiOptions.length)]
      };
      setFallingList((prev) => [...prev, newKiss]);
    }, 1100);

    return () => clearInterval(spawnTimer);
  }, [gameActive]);

  // Game tick physics updates
  useEffect(() => {
    if (!gameActive) return;

    const tick = () => {
      setFallingList((prev) => {
        // Drop elements downwards
        const updated = prev.map((k) => ({ ...k, y: k.y + k.speed }));

        // Detect basket caught collisions or pass bottom
        // basket position center has bounds. Let's assume h = 250px inside board bounds
        const caught: FallingKiss[] = [];
        const overflowFiltered = updated.filter((k) => {
          if (k.y > 220) {
            // Collision horizontal delta calculation
            const basketXPos = basketPos;
            const itemXPos = k.x;
            const diff = Math.abs(basketXPos - itemXPos);

            if (diff <= 12 && k.y < 235) {
              // Caught index matched!
              caught.push(k);
              return false; // delete from screen
            }
          }
          return k.y < 260; // bottom bound delete
        });

        if (caught.length > 0) {
          sweetAudio.playClick();
          setScore((prevS) => {
            const nextScore = prevS + caught.length;
            if (nextScore >= 10) {
              // Win!
              setGameActive(false);
              sweetAudio.playChime();
              setMessage("Congrats buddyy");
              if (nextScore > highScore) {
                setHighScore(nextScore);
                localStorage.setItem("kiss_high_score", String(nextScore));
              }
            }
            return nextScore;
          });
        }

        return overflowFiltered;
      });

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameActive, basketPos, highScore]);

  return (
    <div className="flex flex-col items-center">
      
      {/* HUD score tracking summary */}
      <div className="flex justify-between w-full text-xs font-bold text-rose-600 mb-3 px-1">
        <span>Score: {score} / 10</span>
        <span>High Score: {highScore}</span>
      </div>

      {/* Physics Board frame wrapper */}
      <div
        ref={containerRef}
        className="w-full h-64 bg-radial from-rose-50 to-pink-100 rounded-2xl relative border-2 border-dashed border-rose-200 overflow-hidden select-none"
      >
        {/* Render Falling kisses */}
        {fallingList.map((k) => (
          <div
            key={k.id}
            style={{
              left: `${k.x}%`,
              top: `${k.y}px`,
            }}
            className="absolute -translate-x-1/2 text-2xl select-none"
          >
            {k.emoji}
          </div>
        ))}

        {/* Mobile slide button helpers for desktop/keyboards */}
        {gameActive && (
          <div className="absolute top-2 left-2 flex gap-1 pointer-events-auto">
            <button
              onClick={() => setBasketPos(prev => Math.max(0, prev - 10))}
              className="p-1 px-1.5 bg-white/70 hover:bg-white rounded-lg border border-pink-100 text-[10px] text-pink-600 font-bold active:scale-90 transition cursor-pointer"
            >
              ◀ Left
            </button>
            <button
              onClick={() => setBasketPos(prev => Math.min(100, prev + 10))}
              className="p-1 px-1.5 bg-white/70 hover:bg-white rounded-lg border border-pink-100 text-[10px] text-pink-600 font-bold active:scale-90 transition cursor-pointer"
            >
              Right ▶
            </button>
          </div>
        )}

        {/* Interactive Basket at Bottom */}
        <div
          style={{ left: `${basketPos}%` }}
          className="absolute bottom-3 -translate-x-1/2 w-18 h-9 rounded-b-xl rounded-t-lg bg-rose-400 border-2 border-rose-300 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-rose-200 transition-all duration-75 relative z-10"
        >
          🧺 
          {/* visual flower accent */}
          <span className="absolute -top-1.5 text-[10px]">🌸</span>
        </div>

        {/* Overlay trigger play buttons */}
        {!gameActive && (
          <div className="absolute inset-0 bg-rose-900/10 backdrop-blur-3xs flex flex-col items-center justify-center text-center p-4">
            <Heart className="w-12 h-12 fill-rose-500 text-rose-500 animate-pulse mb-2" />
            <p className="text-xs text-rose-700 font-bold max-w-xs">{message}</p>
            <button
              onClick={startPlayingKisses}
              className="mt-3 px-6 py-2 bg-gradient-to-r from-pink-400 to-rose-450 text-white rounded-full text-xs font-bold shadow-md cursor-pointer"
            >
              Play / Restart Game 
            </button>
          </div>
        )}
      </div>

      {/* Manual Left/Right input slider overlay */}
      {gameActive && (
        <div className="w-full flex flex-col items-center gap-1 mt-4">
          <input
            type="range"
            min="5"
            max="95"
            value={basketPos}
            onChange={(e) => setBasketPos(Number(e.target.value))}
            className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <span className="text-[10px] text-pink-400 font-bold block">
            Drag slider to slide your romantic basket!
          </span>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------
// GAME 3: MEMORY MATCHING BOARD PUZZLE
// ----------------------------------------
interface MatchCard {
  id: number;
  val: string;
  isFlipped: boolean;
  isCleared: boolean;
}

const CARDS_VALUES = ["💖", "🌹", "🎁", "💍", "🧸", "✉️"];

function MemoryMatchGame() {
  const [board, setBoard] = useState<MatchCard[]>([]);
  const [selectedInRound, setSelectedInRound] = useState<number[]>([]);
  const [clearsCount, setClearsCount] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const initMatchingGame = () => {
    sweetAudio.playChime();
    // Double array and shuffle
    const combined = [...CARDS_VALUES, ...CARDS_VALUES].sort(() => Math.random() - 0.5);
    const mapped: MatchCard[] = combined.map((val, idx) => ({
      id: idx,
      val: val,
      isFlipped: false,
      isCleared: false,
    }));
    setBoard(mapped);
    setSelectedInRound([]);
    setClearsCount(0);
    setHasWon(false);
  };

  useEffect(() => {
    initMatchingGame();
  }, []);

  const handleFlipCard = (idx: number) => {
    // block clicks if round matches or card already flipped/cleared
    if (selectedInRound.length >= 2 || board[idx].isFlipped || board[idx].isCleared) return;

    sweetAudio.playClick();
    const updated = [...board];
    updated[idx].isFlipped = true;
    setBoard(updated);

    const nextSelection = [...selectedInRound, idx];
    setSelectedInRound(nextSelection);

    if (nextSelection.length === 2) {
      constFirstCheck(nextSelection);
    }
  };

  const constFirstCheck = (selection: number[]) => {
    const [firstIdx, secondIdx] = selection;
    const isMatched = board[firstIdx].val === board[secondIdx].val;

    setTimeout(() => {
      setBoard((prev) => {
        const nextBoard = [...prev];
        if (isMatched) {
          sweetAudio.playChime();
          nextBoard[firstIdx].isCleared = true;
          nextBoard[secondIdx].isCleared = true;
          
          setClearsCount((c) => {
            const nextClears = c + 1;
            if (nextClears === CARDS_VALUES.length) {
              setHasWon(true);
            }
            return nextClears;
          });
        } else {
          // Flip them back down
          nextBoard[firstIdx].isFlipped = false;
          nextBoard[secondIdx].isFlipped = false;
        }
        return nextBoard;
      });
      setSelectedInRound([]);
    }, 900);
  };

  return (
    <div className="flex flex-col items-center">
      
      {/* Game board grid */}
      <div className="grid grid-cols-4 gap-3 w-max mx-auto my-3 relative">
        {board.map((card, idx) => {
          const shown = card.isFlipped || card.isCleared;

          return (
            <motion.button
              key={card.id}
              onClick={() => handleFlipCard(idx)}
              whileHover={{ scale: card.isCleared ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold border-2 transition shadow-3xs cursor-pointer ${
                shown
                  ? "bg-amber-50 border-amber-200"
                  : "bg-[#be185d]/5 border-[#fbcfe8] hover:border-pink-300"
              }`}
            >
              {shown ? (
                <span>{card.val}</span>
              ) : (
                <span className="font-playfair text-pink-500 text-sm">❤️</span>
              )}
            </motion.button>
          );
        })}

        {/* Win popup matching */}
        <AnimatePresence>
          {hasWon && (
            <div className="absolute inset-x-0 -inset-y-3 bg-amber-500/90 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-white z-10">
              <Trophy className="w-10 h-10 text-white fill-current animate-bounce mb-1" />
              <h4 className="font-playfair text-lg font-bold">Absolute Twosomes match! 🏆</h4>
              <p className="text-[10px] text-amber-50 max-w-xs mt-1">
                You successfully paired up every romantic item here. We are an unbeatable match, indeed!
              </p>
              <button
                onClick={initMatchingGame}
                className="mt-3 px-5 py-1 bg-white text-amber-600 rounded-full text-xs font-bold shadow cursor-pointer hover:bg-slate-50"
              >
                Replay Grid
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[10px] text-center text-pink-500 font-bold uppercase tracking-wider mt-3">
        Match pairs: {clearsCount} / {CARDS_VALUES.length} Completed
      </div>
    </div>
  );
}
