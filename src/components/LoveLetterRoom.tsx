/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, BookOpen, Star, RefreshCw } from "lucide-react";
import { sweetAudio } from "../audio";

interface LoveLetterRoomProps {
  onClose: () => void;
}

const LETTER_PAGES = [
  {
    title: "The Day We Made it ?",
    content: [
      "To my dearest boy,",
      "Honestly, when we first met, I had no idea. No idea that you'd become the person I'd want to tell everything to, the person I'd think about before I sleep. I didn't see it coming at all and maybe that's the best part.",
      "We figured it out slowly, didn't we? And now here we are. Still standing, still choosing each other, happier than I think either of us expected. I'm really glad we made it this far."
    ]
  },
  {
    title: "The Little Things ",
    content: [
      "You give me more than I deserve, and I mean that. You show up for me not just for the good days, but for the days I'm a mess too. You've been my shoulder to cry on more times than I can count, and you never made me feel like a burden for it.",
      "You treat me like I'm something precious, and sometimes I have to remind myself I'm allowed to have this. The way you make sure I'm okay, the way you notice things about me that I don't even notice about myself that's you, YOU!.",
      "I don't take any of it lightly. Not a single bit."
    ]
  },
  {
    title: " My Promise ",
    content: [
      "I'm not going anywhere. Whatever comes the hard seasons, the uncertain ones, the ones where nothing makes sense, I'll be right here. I'm not the type to walk away when things get heavy.",
      "I want to be for you what you've always been for me. Your person. Your safe place.",
      "Happy 23rd birthday to the boy who somehow became my whole home. I love you, and I mean it every single day."
    ]
  }
];

export default function LoveLetterRoom({ onClose }: LoveLetterRoomProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [resetKey, setResetKey] = useState<number>(0);

  const prevPage = () => {
    if (currentPage > 0) {
      sweetAudio.playClick();
      setCurrentPage(currentPage - 1);
      setResetKey(prev => prev + 1);
    }
  };

  const nextPage = () => {
    if (currentPage < LETTER_PAGES.length - 1) {
      sweetAudio.playClick();
      setCurrentPage(currentPage + 1);
      setResetKey(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 max-w-2xl w-full mx-auto">
      
      {/* Love Letter Scrapbook Paper */}
      <motion.div
        initial={{ rotate: -2, y: 15, opacity: 0 }}
        animate={{ rotate: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative bg-[#fefcf6] border-2 border-[#e6dfcc] rounded-3xl p-6 sm:p-10 shadow-xl w-full text-zinc-800 font-caveat text-xl sm:text-2xl leading-relaxed select-none overflow-hidden min-h-[460px] flex flex-col justify-between"
      >
        {/* Binder rings overlay decorations on top */}
        <div className="absolute top-0 left-10 right-10 flex justify-between pointer-events-none -translate-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center z-20">
              <div className="w-3.5 h-6 bg-slate-200 border border-slate-300 rounded-full shadow-inner" />
              <div className="w-1.5 h-6 bg-pink-100/50 rounded-full" />
            </div>
          ))}
        </div>

        {/* Vintage scotch tapes, doodles, coffee ring stain style */}
        <div className="absolute top-4 right-4 rotate-12 opacity-80 pointer-events-none bg-yellow-100/60 border border-yellow-200/40 text-yellow-800 text-[11px] font-sans px-3 py-1 uppercase tracking-widest shadow-2xs">
          💘 TO THE LOML
        </div>
        <div className="absolute bottom-16 -left-8 w-24 h-24 border-4 border-dashed border-pink-200/50 rounded-full rotate-45 pointer-events-none flex items-center justify-center text-pink-300 font-sans text-[10px] select-none">
          POSTAGE OK
        </div>

        {/* Ink Coffee stain ring */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 border-4 border-amber-800/10 rounded-full pointer-events-none" />

        {/* Chapter Passages Display with Typewriter-like transition animation */}
        <div className="mt-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${resetKey}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              {/* Heading */}
              <h3 className="font-playfair text-pink-600 font-bold text-center text-xl sm:text-2xl mb-6 tracking-wide drop-shadow-3xs">
                {LETTER_PAGES[currentPage].title}
              </h3>

              {/* Staggered Paragraph Display */}
              <div className="space-y-4 px-2 sm:px-4 text-slate-800 font-medium">
                {LETTER_PAGES[currentPage].content.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.35, duration: 0.8 }}
                    className="indent-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Little ink doodles at bottom */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#f0ebde]">
          {/* Action indicator dots and buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-xl transition ${
                currentPage === 0
                  ? "text-zinc-300 cursor-not-allowed"
                  : "text-pink-500 hover:bg-pink-50 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="font-sans text-xs text-zinc-400 self-center">
              Page {currentPage + 1} of {LETTER_PAGES.length}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === LETTER_PAGES.length - 1}
              className={`p-2 rounded-xl transition ${
                currentPage === LETTER_PAGES.length - 1
                  ? "text-zinc-300 cursor-not-allowed"
                  : "text-pink-500 hover:bg-pink-50 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-pink-400 font-semibold italic text-base">
            <span>Always and forever only</span>
            <Star className="w-4 h-4 fill-pink-300 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
