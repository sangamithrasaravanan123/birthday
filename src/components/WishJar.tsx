/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { WISH_JAR_CONTENT } from "../data";
import { Wish } from "../types";
import { sweetAudio } from "../audio";

interface WishJarProps {
  onClose: () => void;
}

export default function WishJar({ onClose }: WishJarProps) {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const handleOpenWish = (wish: Wish) => {
    sweetAudio.playChime();
    setSelectedWish(wish);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto p-2 sm:p-4 font-quicksand">
      
      {/* Narrative header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-[10px] text-pink-600 font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Dreams do come true </span>
        </div>
        <h2 className="font-playfair text-xl sm:text-2xl font-bold text-pink-700">
          My Wish Jar 🍯
        </h2>
        <p className="text-pink-500 text-xs mt-1 font-medium">
          Tap them...
        </p>
      </div>

      {/* Glass Jar Canvas Container */}
      <div className="relative w-72 sm:w-80 aspect-[3/4] bg-white/20 backdrop-blur-md rounded-[60px] border-4 border-white/60 shadow-2xl flex flex-col items-center justify-between p-6 select-none relative overflow-hidden ring-4 ring-pink-100/50">
        
        {/* Glow halo inside the jar */}
        <div className="absolute inset-4 rounded-[45px] bg-gradient-to-b from-rose-200/20 via-pink-100/35 to-amber-100/40 pointer-events-none blur-xl" />

        {/* Jar Wooden cork lid at top */}
        <div className="absolute top-0 w-32 h-6 bg-amber-200 hover:bg-amber-300 rounded-b-xl border-b-2 border-amber-300 z-20 shadow-sm" />
        <div className="absolute top-5 w-40 h-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 opacity-60 z-15" />

        {/* Jar Sparkle loops */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-300 text-xs"
              style={{
                top: `${30 + Math.random() * 50}%`,
                left: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                scale: [0.7, 1.2, 0.7],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        {/* Floating Folded Notes inside Jar */}
        <div className="flex-1 w-full relative flex items-center justify-center mt-6">
          {WISH_JAR_CONTENT.map((wish, idx) => {
            // Distribute notes coordinates within jar bounds
            // e.g. x positions: 15%, 45%, 75%
            const placements = [
              { x: "20%", y: "45%", rot: -15 },
              { x: "55%", y: "30%", rot: 25 },
              { x: "40%", y: "65%", rot: -5 },
              { x: "15%", y: "15%", rot: -30 },
              { x: "70%", y: "55%", rot: 40 }
            ];
            const pos = placements[idx % placements.length];

            return (
              <motion.div
                key={wish.id}
                onClick={() => handleOpenWish(wish)}
                style={{
                  top: pos.y,
                  left: pos.x,
                  rotate: `${pos.rot}deg`
                }}
                animate={{
                  y: [0, -12, 0],
                  rotate: [pos.rot, pos.rot + 5, pos.rot]
                }}
                transition={{
                  duration: 3 + idx * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.15, zIndex: 30 }}
                className="absolute w-12 h-8 rounded-lg bg-white shadow-md border border-pink-200 cursor-pointer flex items-center justify-center font-bold text-[10px] text-pink-600 hover:shadow-pink-300 transition-all duration-300 scale-100 ring-2 ring-white/10"
              >
                💌
              </motion.div>
            );
          })}
        </div>

        {/* Jar labeling sticker */}
        <div className="z-10 bg-[#fefdf5]/90 border border-amber-200 rounded-xl px-5 py-2.5 shadow-sm text-center font-caveat text-xl text-amber-800 rotate-1 flex flex-col items-center">
          <span className="font-sans text-[9px] text-amber-600 font-bold tracking-widest uppercase mb-0.5">EST. 2026</span>
          <span className="font-bold flex items-center gap-1.5 leading-none">
            My Small Wishes which would sum up the whole world<Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          </span>
        </div>

      </div>

      {/* Opened Note Overlay Drawer popup */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWish(null)}
            className="fixed inset-0 bg-pink-950/20 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className={`${selectedWish.color} border-2 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative font-quicksand`}
            >
              
              {/* Corner mini sticker */}
              <div className="absolute -top-3.5 left-6 w-16 h-7 bg-white/70 border border-slate-100/50 rounded shadow-2xs rotate-4 flex items-center justify-center font-bold text-[9px] tracking-wide text-neutral-500 uppercase">
                Promise
              </div>

              {/* Title */}
              <div className="mt-2 text-center">
                <h3 className="font-playfair font-bold text-base sm:text-lg flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse fill-amber-500" />
                  <span>{selectedWish.title}</span>
                </h3>
              </div>

              {/* Message Paper texture content scroll */}
              <div className="bg-white/80 border border-dashed border-white/50 rounded-2xl p-4 mt-4 font-caveat text-lg sm:text-xl text-neutral-800 leading-relaxed min-h-36">
                “ {selectedWish.message} ”
              </div>

              {/* Bottom control */}
              <div className="mt-5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-neutral-400 font-mono uppercase">
                  folded with love
                </span>
                <button
                  onClick={() => setSelectedWish(null)}
                  className="px-5 py-1.5 bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full shadow-xs hover:bg-neutral-50 transition cursor-pointer"
                >
                  Fold back
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
