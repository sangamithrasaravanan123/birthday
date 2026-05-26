import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, RefreshCw, Music } from "lucide-react";
import { sweetAudio } from "../audio";

interface FinalScreenProps {
  onReplay: () => void;
}

export default function FinalScreen({ onReplay }: FinalScreenProps) {
  const handleReplay = () => {
    sweetAudio.playChime();
    onReplay();
  };

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center bg-radial from-slate-50 via-slate-100 to-slate-200/55 p-6 overflow-hidden select-none">
      
      {/* Immersive floating minimal sparkle points */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-slate-300 opacity-25"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 105}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: ["0vw", `${Math.random() * 10 - 5}vw`],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-lg w-full text-center z-10 flex flex-col items-center">
        
        {/* Sleek luxury medallion */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-sm mb-6"
        >
          <Heart className="w-6 h-6 fill-rose-300 text-rose-300" />
        </motion.div>

        {/* Cinematographical paragraph fade-ins */}
        <div className="space-y-6 max-w-md my-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-serif text-3xl sm:text-4xl text-slate-950 tracking-tight leading-snug font-medium"
          >
            Happy Birthday to my best friend, my love, my everything. 
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="font-serif italic font-light text-xl sm:text-2xl text-slate-500 leading-relaxed max-w-sm mx-auto"
          >
            “Years will roll, coordinates will shift, and calendars will expire...”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="font-serif italic text-2xl sm:text-3xl text-slate-900 font-semibold tracking-wide max-w-md mx-auto py-2"
          >
            “In every universe, it would still be you,only you for me!”
          </motion.p>
        </div>

        {/* Playful final reminder note card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 3.2 }}
          className="mt-6 flex items-center gap-1.5 text-xs text-rose-500/90 font-medium font-sans tracking-widest uppercase"
        >
          <Music className="w-3.5 h-3.5 text-rose-455 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Love you to the moon and back. Always.Always ❤️</span>
        </motion.div>

        {/* Replay action button */}
        <motion.button
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReplay}
          className="mt-10 px-8 py-3 bg-slate-900 hover:bg-slate-950 text-white font-sans uppercase font-medium text-xs tracking-wider rounded-full border border-slate-800 shadow-3xs cursor-pointer flex items-center justify-center gap-2 transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-rose-300" />
          <span>If you can't get over what I made , replay ,heheee</span>
        </motion.button>

      </div>

    </div>
  );
}
