import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, HelpCircle, Delete, Eye, EyeOff } from "lucide-react";
import { sweetAudio } from "../audio";

interface LockScreenProps {
  onComplete: () => void;
}

const ERROR_MESSAGES = [
  "Thoughtful attempt, but incorrect. Let's try again.",
  "Security clearance required. Think of our special numbers.",
  "Close your eyes, breathe, and recall our double-digits.",
  "Incorrect code. Reach into your memory bank of us."
];

const HINTS = [
  "double-digits...",
  "Think of ascending double pairs ",
  "Hint: 7788..."
];

export default function LockScreen({ onComplete }: LockScreenProps) {
  const [pin, setPin] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showHintIdx, setShowHintIdx] = useState<number>(-1);
  const [shake, setShake] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);

  const handleKeyPress = (num: string) => {
    sweetAudio.playClick();
    if (pin.length < 6) {
      setPin((prev) => prev + num);
      setErrorMsg(""); // Clear errors
    }
  };

  const handleDelete = () => {
    sweetAudio.playClick();
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    sweetAudio.playClick();
    setPin("");
    setErrorMsg("");
  };

  const handleNextHint = () => {
    sweetAudio.playChime();
    setShowHintIdx((prev) => (prev + 1) % HINTS.length);
  };

  const handleSubmit = () => {
    if (pin === "778899") {
      sweetAudio.playChime();
      onComplete();
    } else {
      sweetAudio.playWrong();
      setShake(true);
      const randomMsg = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      setErrorMsg(randomMsg);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-6 overflow-hidden select-none bg-transparent">
      
      <div className="relative max-w-sm w-full glass-romantic border border-white rounded-3xl p-6 sm:p-8 shadow-md z-10 flex flex-col items-center">
        
        {/* Sleek locked state container with pink pulsing focus */}
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center border border-pink-400 shadow-sm mb-4"
        >
          <Lock className="w-5 h-5 text-white" />
        </motion.div>

        <h2 className="font-serif text-2xl text-pink-900 tracking-tight text-center font-semibold italic">
          Unlock Our Cutest Memory
        </h2>
        <p className="text-pink-600/70 text-xs text-center font-sans tracking-wide mt-1.5 font-light">
          GUESS THE DOUBLE TROUBLE PASSWORD.
        </p>

        {/* Dynamic PIN indicators block */}
        <motion.div
          animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
          className="flex items-center gap-3.5 my-6 relative py-1"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 border-2 ${
                i < pin.length
                  ? "bg-pink-500 border-pink-400 scale-105 shadow-3xs"
                  : "bg-pink-50/50 border-pink-200/50"
              }`}
            />
          ))}

          {/* Toggle PIN Preview Button */}
          {pin.length > 0 && (
            <button
              onClick={() => setShowPin(!showPin)}
              className="absolute -right-8 text-pink-400 hover:text-pink-600 transition cursor-pointer"
              title="Reveal code"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </motion.div>

        {/* Code plain text preview */}
        <div className="h-5 text-center mb-1">
          {showPin && pin.length > 0 && (
            <span className="font-mono text-pink-700 text-xs tracking-widest bg-pink-100/60 px-3 py-1 rounded-full border border-pink-200/50">
              {pin}
            </span>
          )}
        </div>

        {/* Automated error diagnostics output */}
        <div className="h-12 flex items-center justify-center text-center mt-1">
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-650 font-sans font-medium bg-red-50 border border-red-100 rounded-xl px-3 py-1.5"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Flat Minimalist Luxury Keypad Desk */}
        <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(251, 113, 133, 0.08)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleKeyPress(num)}
              type="button"
              className="h-12 font-sans font-medium text-base text-pink-900 bg-white/70 border border-pink-100/60 rounded-2xl shadow-3xs transition-colors flex items-center justify-center cursor-pointer"
            >
              {num}
            </motion.button>
          ))}

          {/* Secondary Control Action */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClear}
            type="button"
            className="h-12 font-sans text-xs text-pink-500 hover:text-pink-700 bg-pink-50/40 rounded-2xl flex items-center justify-center cursor-pointer border border-transparent"
          >
            Clear
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(251, 113, 133, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleKeyPress("0")}
            type="button"
            className="h-12 font-sans font-medium text-base text-pink-905 bg-white/70 border border-pink-100/60 rounded-2xl flex items-center justify-center cursor-pointer"
          >
            0
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDelete}
            type="button"
            className="h-12 text-pink-400 hover:text-pink-600 bg-pink-50/40 rounded-2xl flex items-center justify-center cursor-pointer border border-transparent"
          >
            <Delete className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Enter Verification Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSubmit}
          disabled={pin.length < 6}
          className={`w-full h-12 rounded-2xl font-sans font-medium text-xs tracking-wider uppercase border mt-5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            pin.length === 6
              ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-3xs border-pink-300/40"
              : "bg-pink-50/40 text-pink-300 border-pink-100/40 cursor-not-allowed"
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>Authorize Access</span>
        </motion.button>

        {/* Dynamic Hints Accordion */}
        <div className="w-full mt-6 flex flex-col items-center">
          <button
            onClick={handleNextHint}
            className="flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-800 font-sans font-medium bg-pink-50/60 border border-pink-100/50 px-3.5 py-1 rounded-full transition cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Hint Request</span>
          </button>

          <AnimatePresence mode="wait">
            {showHintIdx !== -1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 bg-pink-50/60 border border-dashed border-pink-200/50 rounded-xl p-3 text-center w-full"
              >
                <p className="text-xs text-pink-700 italic font-sans leading-relaxed">
                  “{HINTS[showHintIdx]}”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
