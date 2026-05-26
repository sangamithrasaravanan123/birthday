import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Clock, Gift, Settings, MessageSquare, CheckCircle2 } from "lucide-react";
import { sweetAudio } from "../audio";

interface CountdownWidgetProps {
  onClose: () => void;
}

interface DurationState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownWidget({ onClose }: CountdownWidgetProps) {
  // First met milestone
  const [firstMetStr, setFirstMetStr] = useState<string>(() => {
    return localStorage.getItem("romance_first_met_date") || "2023-11-18";
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Time metrics states
  const [durMet, setDurMet] = useState<DurationState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [durHeSaid, setDurHeSaid] = useState<DurationState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [durISaid, setDurISaid] = useState<DurationState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [durNextBday, setDurNextBday] = useState<DurationState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTicks = () => {
      const now = new Date();

      // Helper to compute difference since an absolute past date (Count Up)
      const getElapsed = (targetDateStr: string): DurationState => {
        const target = new Date(targetDateStr);
        const diffMs = now.getTime() - target.getTime();
        if (diffMs > 0) {
          const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
          const seconds = Math.floor((diffMs / 1000) % 65);
          return { days, hours, minutes, seconds: Math.min(59, seconds) };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      };

      // 1. First Met
      setDurMet(getElapsed(firstMetStr + "T00:00:00"));

      // 2. March 18, 2026: When he told love you (Count Up)
      setDurHeSaid(getElapsed("2026-03-18T00:00:00"));

      // 3. April 11, 2026: When I said love you (Count Up)
      setDurISaid(getElapsed("2026-04-11T00:00:00"));

      // 4. His Next Birthday: May 29th (Count Down)
      const currentYear = now.getFullYear();
      let bdayDate = new Date(currentYear, 4, 29); // May 29 (Month index is 4)
      if (now.getTime() > bdayDate.getTime()) {
        bdayDate = new Date(currentYear + 1, 4, 29);
      }

      const diffBdayMs = bdayDate.getTime() - now.getTime();
      if (diffBdayMs > 0) {
        const days = Math.floor(diffBdayMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffBdayMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffBdayMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffBdayMs / 1000) % 60);
        setDurNextBday({ days, hours, minutes, seconds });
      } else {
        setDurNextBday({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTicks();
    const interval = setInterval(calculateTicks, 1000);
    return () => clearInterval(interval);
  }, [firstMetStr]);

  const handleSaveDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      sweetAudio.playChime();
      setFirstMetStr(val);
      localStorage.setItem("romance_first_met_date", val);
    }
  };

  // Helper renderer for modern luxury counters
  const renderCounterGrid = (dur: DurationState, isDark: boolean = false) => {
    const units = [
      { label: "days", value: dur.days },
      { label: "hours", value: dur.hours },
      { label: "mins", value: dur.minutes },
      { label: "secs", value: dur.seconds },
    ];

    return (
      <div className="grid grid-cols-4 gap-2 w-full mt-4">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border ${
              isDark
                ? "bg-white/25 border-white/20"
                : "bg-white/70 border-pink-100/60"
            }`}
          >
            <span
              className={`font-mono text-xl sm:text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-pink-950"
              }`}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className={`text-[9px] font-sans uppercase tracking-widest mt-1 ${isDark ? "text-pink-100" : "text-pink-400"}`}>
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 font-sans select-none">
      
      {/* Sleek luxury header section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 font-sans text-[9px] text-pink-600 tracking-widest uppercase mb-3 border border-pink-100 shadow-3xs">
          <Clock className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: "14s" }} />
          <span>CUTE TIMELINE GOT TICKINGG!!!</span>
        </div>
        <h2 className="font-serif italic text-3xl sm:text-4xl text-pink-900 font-semibold tracking-tight">
           Love Tickers
        </h2>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* PANEL 1: SHARED DAYS TOGETHER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-romantic border border-pink-100/30 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-550 border border-pink-100 shadow-3xs">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              </div>

              <button
                onClick={() => {
                  sweetAudio.playClick();
                  setIsEditing(!isEditing);
                }}
                className="p-1.5 rounded-lg text-pink-400 hover:text-pink-700 hover:bg-pink-50 transition cursor-pointer"
                title="Edit Milestone Met Date"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-serif text-lg font-semibold text-pink-900">
              Us?
            </h3>

            {/* Editing section */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full mt-3 p-3 bg-pink-50/60 border border-pink-100 rounded-xl flex flex-col gap-1"
                >
                  <label className="text-[9px] text-pink-400 font-semibold uppercase tracking-wider">Date Met Milestone:</label>
                  <input
                    type="date"
                    value={firstMetStr}
                    onChange={handleSaveDate}
                    className="px-3 py-1.5 bg-white border border-pink-200/50 rounded-lg text-xs text-pink-800 font-mono focus:outline-none focus:border-pink-350"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {renderCounterGrid(durMet)}
          </div>

          <div className="mt-5 pt-3.5 border-t border-pink-100/35 flex items-center justify-between text-[10px] text-pink-400 font-mono uppercase tracking-wider">
            <span>We meet , we talk</span>
            <span className="text-pink-700 font-bold">
              {new Date(firstMetStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
            </span>
          </div>
        </motion.div>

        {/* PANEL 2: HE SAID I LOVE YOU */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-romantic border border-pink-100/30 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-650 border border-pink-100 shadow-3xs mb-3">
              <MessageSquare className="w-4 h-4 text-pink-500 fill-pink-50" />
            </div>

            <h3 className="font-serif text-lg font-semibold text-pink-900">
              He Said “I Love You”
            </h3>
            <p className="text-xs text-pink-600 font-light mt-1 leading-relaxed">
              When it became only you, you for me.
            </p>

            {renderCounterGrid(durHeSaid)}
          </div>

          <div className="mt-5 pt-3.5 border-t border-pink-100/35 flex items-center justify-between text-[10px] text-pink-400 font-mono uppercase tracking-wider">
            <span>Got me hehaha (blushing)</span>
            <span className="text-pink-700 font-bold">March 18, 2026</span>
          </div>
        </motion.div>

        {/* PANEL 3: I SAID I LOVE YOU */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-romantic border border-pink-100/30 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-650 border border-pink-100 shadow-3xs mb-3">
              <CheckCircle2 className="w-4 h-4 text-pink-500" />
            </div>

            <h3 className="font-serif text-lg font-semibold text-pink-900">
              I Said “I Love You”
            </h3>
            <p className="text-xs text-pink-600 font-light mt-1 leading-relaxed">
              I got your back and you got mine since then.
            </p>

            {renderCounterGrid(durISaid)}
          </div>

          <div className="mt-5 pt-3.5 border-t border-pink-100/35 flex items-center justify-between text-[10px] text-pink-400 font-mono uppercase tracking-wider">
            <span>I made it toE</span>
            <span className="text-pink-700 font-bold">April 11, 2026</span>
          </div>
        </motion.div>

        {/* PANEL 4: BOYFRIEND BIRTHDAY COUNTDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-tr from-pink-400 to-rose-400 border-2 border-white/55 rounded-3xl p-6 shadow-md flex flex-col justify-between text-white"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-pink-100 shadow-3xs mb-3">
              <Gift className="w-4 h-4 text-white" />
            </div>

            <h3 className="font-serif text-lg font-semibold text-white">
              Next Birthday ?
            </h3>
            {renderCounterGrid(durNextBday, true)}
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/20 flex items-center justify-between text-[10px] text-pink-100/85 font-mono uppercase tracking-wider">
            <span>FOREVER FAVOURITE</span>
            <span className="text-white font-bold">May 29</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
