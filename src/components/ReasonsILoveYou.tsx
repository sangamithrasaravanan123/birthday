/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Stars, Sparkles, RefreshCw } from "lucide-react";
import { REASONS_I_LOVE_YOU } from "../data";
import { sweetAudio } from "../audio";

interface ReasonsILoveYouProps {
  onClose: () => void;
}

export default function ReasonsILoveYou({ onClose }: ReasonsILoveYouProps) {
  // Store set of flipped card IDs
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    sweetAudio.playClick();
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-2 sm:p-4 font-quicksand">
      
      {/* Page Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
          <span>Infinite Adorations</span>
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-pink-700">
          Reasons Why I Love You 💕
        </h2>
        <p className="text-pink-500 text-xs mt-1 font-medium">
          Tap each card !!
        </p>
      </div>

      {/* Grid of 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-2">
        {REASONS_I_LOVE_YOU.map((reason) => {
          const isFlipped = flippedCards.includes(reason.id);

          return (
            <div
              key={reason.id}
              onClick={() => toggleFlip(reason.id)}
              className="h-64 cursor-pointer perspective-1000 select-none group"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full transform-style-3d shadow-md hover:shadow-xl rounded-3xl transition-shadow duration-300"
              >
                
                {/* CARD FRONT SIDE */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-150 flex flex-col justify-between items-center text-center backface-hidden ring-pink-100 group-hover:ring-4 transition duration-300">
                  
                  {/* Deco corner stars */}
                  <span className="absolute top-4 left-4 text-pink-300">✦</span>
                  <span className="absolute bottom-4 right-4 text-pink-300">✦</span>

                  {/* Illustration Emoji */}
                  <div className="w-16 h-16 bg-pink-50 border border-pink-100 rounded-full flex items-center justify-center text-3xl shadow-3xs group-hover:scale-110 transition duration-300">
                    {reason.illustration}
                  </div>

                  {/* Hint and Trigger instructions */}
                  <div className="flex-1 flex flex-col justify-center mt-3">
                    <h4 className="font-playfair font-bold text-pink-700 text-base sm:text-lg px-2">
                      {reason.hint}
                    </h4>
                    <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest mt-3 flex items-center gap-1 justify-center">
                      <RefreshCw className="w-3 h-3 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
                      <span>Tap to Flip</span>
                    </p>
                  </div>

                  {/* Stamp detail on front */}
                  <div className="text-[10px] text-pink-400 font-mono font-bold">
                    REASON #0{reason.id}
                  </div>
                </div>

                {/* CARD BACK SIDE */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-3xl p-6 border border-pink-200 flex flex-col justify-between items-center text-center text-white backface-hidden rotate-y-180">
                  
                  {/* Decorative Sparkle icon */}
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>

                  {/* Deep cute message */}
                  <div className="flex-1 flex items-center justify-center px-1">
                    <p className="font-caveat font-medium text-lg leading-relaxed sm:text-xl text-pink-50 italic">
                      “ {reason.reason} ”
                    </p>
                  </div>

                  {/* Bottom verification label */}
                  <div className="text-[10px] font-mono tracking-widest font-semibold text-white/80 uppercase">
                     In My Heart Forever
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
