import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MailOpen, Heart, Sparkles, Volume2 } from "lucide-react";
import { sweetAudio } from "../audio";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    sweetAudio.playChime();
    // Warm audio start
    sweetAudio.setMute(false);
    sweetAudio.startAmbient();
  };

  const handleProceed = () => {
    sweetAudio.playClick();
    onComplete();
  };

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-4 overflow-hidden bg-transparent select-none">
      
      <div className="relative max-w-xl w-full flex flex-col items-center z-10">
        
        {/* Sleek, clean luxury boutique intro badge & title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 text-pink-600 text-[9px] uppercase font-semibold tracking-widest mb-4 shadow-3xs border border-pink-100">
            <Heart className="w-3 C5 h-3 fill-pink-300 text-pink-400" />
            <span>OUR LITTLE WORLD!</span>
          </div>
          
          <h1 className="font-serif italic font-light text-4xl sm:text-5xl text-pink-900 tracking-tight leading-tight">
            Full of love, laughter and our sweetest memories
          </h1>
          
          <p className="font-sans text-xs sm:text-sm text-pink-500/80 mt-2.5 tracking-wide font-light max-w-sm mx-auto leading-relaxed">
            My small gift to my whole heart
          </p>
        </motion.div>

        {/* Intricately designed luxury envelope */}
        <div className="relative w-full aspect-video sm:aspect-[4/3] flex items-center justify-center">
          {!isOpen ? (
            <motion.div
              layoutId="envelope-box"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-80 sm:w-96 h-56 glass-romantic-pink border border-white rounded-3xl flex flex-col items-center justify-center p-6 shadow-md cursor-pointer hover:shadow-lg transition-all duration-350 text-center"
              onClick={handleOpenLetter}
            >
              <div className="absolute -top-5.5 left-1/2 -translate-x-1/2 w-11 h-11 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 active:scale-95 transition duration-300">
                <Heart className="w-4 h-4 text-pink-100 fill-pink-100 animate-pulse" />
              </div>

              <Mail className="w-10 h-10 text-pink-400 stroke-[1.2] mt-4 mb-2.5 animate-bounce" style={{ animationDuration: "3s" }} />
              <h3 className="font-serif font-medium text-pink-900 text-lg leading-tight italic">
                CLICK TO OPEN 
              </h3>
              <p className="text-[11px] text-[#a07c82] mt-1 font-sans">
               
              </p>

              <span className="absolute bottom-3.5 left-5 text-[9px] font-mono text-pink-400/80 tracking-widest uppercase">ALL LOVE</span>
              <span className="absolute bottom-3.5 right-5 text-[9px] font-mono text-pink-400/80 tracking-widest uppercase">FOR YOU</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md glass-romantic border border-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center relative"
            >
              {/* Paper Flap top detail */}
              <div className="absolute -top-4.5 bg-pink-500 text-white font-sans font-semibold text-[9px] py-1 px-4.5 rounded-full shadow-sm border border-pink-400 flex items-center gap-1.5 uppercase tracking-widest">
                <MailOpen className="w-3 h-3" />
                <span>Message</span>
              </div>

              {/* Letter content in gorgeous luxury editorial styling */}
              <div className="w-full border-t border-b border-pink-100/40 py-6 my-4 font-serif text-[#78545a] leading-relaxed text-left pl-2">
                <p className="mb-2 italic text-xs uppercase tracking-wider text-pink-400 font-sans font-semibold">To my favorite boy,</p>
                <p className="text-sm sm:text-base italic font-light text-pink-950">
                  Hehehe you would be proud that I made this :)
                </p>
                <p className="mt-4 text-right font-caveat text-2xl text-pink-600 font-bold">- Your favourite trouble maker</p>
              </div>

              <p className="text-[11px] text-[#9c7c81] mb-6 font-sans">
                Idk if you would crack the password, try it !
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-sans font-medium text-xs rounded-full shadow-sm shadow-pink-150 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-widest border border-white/50"
              >
                <span>Lessgo to the Lockscreen</span>
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Action guidelines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center gap-2 text-xs text-pink-500 font-sans cursor-pointer hover:opacity-100 transition"
          onClick={() => {
            sweetAudio.setMute(!sweetAudio.getMute());
          }}
        >
          <Volume2 className="w-3.5 h-3.5 text-pink-400" />
          <span>I added a sound effect too !!!</span>
        </motion.div>
      </div>
    </div>
  );
}
