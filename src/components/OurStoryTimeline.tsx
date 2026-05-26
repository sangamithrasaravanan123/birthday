/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Award, Milestone, Calendar, Heart, Share2, Sparkles } from "lucide-react";
import { TIMELINE_MILESTONES } from "../data";
import { sweetAudio } from "../audio";

interface OurStoryTimelineProps {
  onClose: () => void;
}

export default function OurStoryTimeline({ onClose }: OurStoryTimelineProps) {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sweetAudio.playChime();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div className="flex flex-col items-center max-w-2xl w-full mx-auto p-2 sm:p-4 font-quicksand">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/75 border border-pink-200 text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-2">
          <Milestone className="w-3.5 h-3.5" />
          <span>Our Love Story</span>
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-pink-700">
          Our Special Story So Far :)
        </h2>
        <p className="text-pink-500 text-xs mt-1 font-medium">
          A collection of our tiny little  moments
        </p>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative w-full border-l-2 border-dashed border-pink-300 ml-4 pl-6 sm:pl-8 sm:ml-6 space-y-10">
        
        {TIMELINE_MILESTONES.map((mile, idx) => (
          <motion.div
            key={mile.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative bg-white/75 backdrop-blur-md border border-pink-100 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-pink-200 transition"
          >
            {/* Left circular timeline node badge */}
            <div className="absolute -left-[45px] sm:-left-[53px] top-5 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center border-4 border-white shadow-md text-white font-sans text-base">
              {mile.emoji}
            </div>

            {/* Date Tag bubble */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-pink-50 border border-pink-100 rounded-full px-3 py-1 w-max mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>{mile.date}</span>
            </div>

            {/* Title & Narrative content */}
            <h3 className="font-playfair text-lg sm:text-xl font-bold text-pink-700">
              {mile.title}
            </h3>

            {/* Timeline narrative story text */}
            <p className="text-slate-600 text-xs sm:text-sm mt-3 font-medium leading-relaxed pl-1">
              {mile.description}
            </p>

            {/* Heart reactions box at bottom */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
              <div className="flex gap-2">
                <button
                  onClick={(e) => handleLike(mile.id, e)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-100/70 text-xs text-pink-600 font-bold transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>Double Tap!</span>
                  <span className="font-mono text-[10px] text-pink-700 bg-white px-2 py-0.5 rounded-full border border-pink-100">
                    {likes[mile.id] || 0}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold font-mono uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Chapter 0{idx + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Tiny endpoint node decoration */}
        <div className="absolute -left-[30px] bottom-0 w-2 h-2 bg-pink-300 rounded-full" />
      </div>

      {/* Stated pledge at bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        className="mt-12 text-center text-xs italic text-pink-600 font-medium font-serif"
      >
        “ And the best chapters... are the ones we haven't typed yet. ”
      </motion.p>
    </div>
  );
}
