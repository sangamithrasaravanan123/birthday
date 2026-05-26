import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Wind, Mic, MicOff, Volume2 } from "lucide-react";
import { sweetAudio } from "../audio";

interface BirthdayCakeScreenProps {
  onComplete: () => void;
}

interface CandleStatus {
  id: number;
  isLit: boolean;
  x: number; // custom horizontal positions across the cake tiers
  y: number; // vertical positions for a tiered look
  height: number;
}

export default function BirthdayCakeScreen({ onComplete }: BirthdayCakeScreenProps) {
  const [candles, setCandles] = useState<CandleStatus[]>([]);
  const [countdown, setCountdown] = useState<number>(3);
  const [countdownActive, setCountdownActive] = useState<boolean>(true);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [blowStrength, setBlowStrength] = useState<number>(0);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize 23 candles scattered across the cake tiers
  useEffect(() => {
    const initCandles: CandleStatus[] = [];
    
    // Tier 1 (Top tier, narrow): 5 candles
    for (let i = 0; i < 5; i++) {
      initCandles.push({
        id: i,
        isLit: true,
        x: 40 + i * 5, // 40, 45, 50, 55, 60
        y: 190,
        height: 25 + Math.random() * 10
      });
    }

    // Tier 2 (Middle tier, wider): 8 candles
    for (let i = 0; i < 8; i++) {
      initCandles.push({
        id: 5 + i,
        isLit: true,
        x: 32 + i * 5.2, // wide spread
        y: 250,
        height: 25 + Math.random() * 10
      });
    }

    // Tier 3 (Bottom tier, widest): 10 candles
    for (let i = 0; i < 10; i++) {
      initCandles.push({
        id: 13 + i,
        isLit: true,
        x: 23 + i * 6, // widest spread
        y: 310,
        height: 25 + Math.random() * 10
      });
    }

    setCandles(initCandles);
  }, []);

  // Countdown timer on entrance
  useEffect(() => {
    if (countdown > 0 && countdownActive) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        sweetAudio.playClick();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && countdownActive) {
      setCountdownActive(false);
      sweetAudio.playChime();
    }
  }, [countdown, countdownActive]);

  // Handle individual candle tap
  const handleCandleTap = (id: number) => {
    if (countdownActive) return; // Wait for countdown
    setCandles((prev) =>
      prev.map((c) => {
        if (c.id === id && c.isLit) {
          sweetAudio.playCandleBlow();
          return { ...c, isLit: false };
        }
        return c;
      })
    );
  };

  // Blow out candles with button press/microphone
  const blowCandlesValue = (strength: number) => {
    if (strength > 40 && !countdownActive) {
      setCandles((prev) => {
        const anyLit = prev.some((c) => c.isLit);
        if (!anyLit) return prev;

        // Randomly extinguish some lit candles based on blow strength
        const newCandles = prev.map((c) => {
          if (c.isLit && Math.random() * 100 < strength * 0.95) {
            return { ...c, isLit: false };
          }
          return c;
        });

        const justExtinguished = prev.filter(c => c.isLit).length > newCandles.filter(c => c.isLit).length;
        if (justExtinguished) {
          sweetAudio.playCandleBlow();
        }
        return newCandles;
      });
    }
  };

  // Monitor candle state to trigger full screen celebration
  useEffect(() => {
    if (candles.length > 0 && candles.every((c) => !c.isLit) && !celebrating) {
      setCelebrating(true);
      sweetAudio.playChime();
      setTimeout(() => {
        setIsDone(true);
      }, 4000);
    }
  }, [candles, celebrating]);

  // Real microphone feedback loop
  const toggleMicrophone = async () => {
    if (micActive) {
      stopMicrophone();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicActive(true);
      sweetAudio.playChime();

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Find average amplitude
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Scale strength to 0-100 percentage
        const power = Math.min(100, Math.max(0, average * 3));
        setBlowStrength(power);
        blowCandlesValue(power);

        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access declined or unavailable", err);
    }
  };

  const stopMicrophone = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    analyserRef.current = null;
    streamRef.current = null;
    setMicActive(false);
    setBlowStrength(0);
  };

  useEffect(() => {
    return () => stopMicrophone();
  }, []);

  // Simulating blow interaction for clean UX without mic permissions
  const handleSimulatedBlow = () => {
    if (countdownActive) return;
    setBlowStrength(85);
    blowCandlesValue(85);
    setTimeout(() => setBlowStrength(0), 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-6 overflow-hidden select-none bg-transparent">
      
      {/* Floating neutral highlights */}
      <AnimatePresence>
        {celebrating && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`firework-${i}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "50vw",
                  y: "50vh",
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.3 + Math.random() * 1.2, 0.4],
                  x: [`${50 + Math.random() * 10 - 5}vw`, `${Math.random() * 100}vw`],
                  y: [`${40 + Math.random() * 10 - 5}vh`, `${Math.random() * 80}vh`],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute"
              >
                {i % 4 === 0 ? (
                  <Heart className="w-6 h-6 fill-pink-300 text-pink-300 opacity-60 animate-ping" />
                ) : i % 4 === 1 ? (
                  <Sparkles className="w-5 h-5 text-amber-350 fill-amber-300 opacity-70" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-pink-400 blur-3xs opacity-40" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative max-w-2xl w-full flex flex-col items-center z-10">
        
        {/* State Prompts in Cormorant Serif */}
        <AnimatePresence mode="wait">
          {countdownActive ? (
            <motion.div
              key="countdown-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              className="text-center mb-6"
            >
              <h2 className="font-serif italic text-lg text-pink-500">LET US BLOW CANDLES AND MAKE A WISH</h2>
              <motion.div
                className="font-serif text-6xl font-light text-pink-900 my-2"
                key={countdown}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {countdown}
              </motion.div>
              <p className="text-xs uppercase tracking-widest text-pink-400 font-sans">Blow it all...</p>
            </motion.div>
          ) : !celebrating ? (
            <motion.div
              key="actions-box"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 px-4"
            >
              <h2 className="font-serif text-3xl text-pink-900 font-semibold tracking-tight italic">
                Make a Wish !
              </h2>
              <p className="text-[#8e6d72] font-sans text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                You are turning 23 today and you are gonna blow all the 23 candles (tap, click, or blow virtual breeze)
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="celeb-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-6"
            >
    
              <p className="text-rose-600 font-sans text-xs uppercase tracking-widest mt-2 animate-pulse font-medium">
                All 23 candles blown..
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Luxury Interactive Cake Display Card */}
        <div className="relative w-full max-w-md glass-romantic border border-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center">
          
          {!celebrating && !countdownActive && (
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest uppercase bg-pink-50 px-3 py-1 rounded-full text-pink-600 border border-pink-100 flex items-center gap-1.5 shadow-3xs">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" />
              <span>Lit: {candles.filter((c) => c.isLit).length} / 23</span>
            </div>
          )}

          {/* SVG Canvas for Elegant Editorial Cake */}
          <svg viewBox="0 0 500 450" className="w-full h-auto drop-shadow-3xs">
            <defs>
              <radialGradient id="neutral-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff0f3" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fffbfd" stopOpacity="0" />
              </radialGradient>
              {/* Strawberry and Cream Pastel Palettes */}
              <linearGradient id="frosting-champagne" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbfd" />
                <stop offset="50%" stopColor="#fff2f5" />
                <stop offset="100%" stopColor="#ffe4ea" />
              </linearGradient>
              <linearGradient id="frosting-rose" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffeff2" />
                <stop offset="100%" stopColor="#ffcdd7" />
              </linearGradient>
            </defs>

            <ellipse cx="250" cy="220" rx="200" ry="140" fill="url(#neutral-glow)" />

            {/* Bottom Tier (Tier 3) */}
            <rect x="100" y="290" width="300" height="70" rx="16" fill="url(#frosting-rose)" stroke="#ffb3c1" strokeWidth="1" />
            <ellipse cx="250" cy="290" rx="150" ry="18" fill="#ffe3e8" />
            <ellipse cx="250" cy="360" rx="150" ry="16" fill="#ffb4c2" opacity="0.9" />
            
            {/* Swirl Cream Minimal Piping */}
            <path d="M 100,290 Q 120,300 140,290 T 180,290 T 220,290 T 260,290 T 300,290 T 340,290 T 380,290 T 400,290" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.85" />

            {/* Middle Tier (Tier 2) */}
            <rect x="130" y="230" width="240" height="60" rx="14" fill="url(#frosting-champagne)" stroke="#ffa6c9" strokeWidth="0.8" />
            <ellipse cx="250" cy="230" rx="120" ry="14" fill="#ffeef2" />
            <ellipse cx="250" cy="290" rx="120" ry="12" fill="#ffccd5" opacity="0.8" />
            <path d="M 130,230 Q 150,238 170,230 T 210,230 T 250,230 T 290,230 T 330,230 T 370,230" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

            {/* Top Tier (Tier 1) */}
            <rect x="170" y="170" width="160" height="60" rx="10" fill="url(#frosting-rose)" stroke="#ffb3c1" strokeWidth="0.8" />
            <ellipse cx="250" cy="170" rx="80" ry="10" fill="#ffe3e8" />
            <ellipse cx="250" cy="230" rx="80" ry="9" fill="#ffb4c2" opacity="0.8" />

           
            {/* Interactive Candle Spikes */}
            {candles.map((candle) => (
              <g key={candle.id} className="cursor-pointer" onClick={() => handleCandleTap(candle.id)}>
                {/* Thin sleek slate sticks */}
                <line
                  x1={candle.x * 5}
                  y1={candle.y}
                  x2={candle.x * 5}
                  y2={candle.y - candle.height}
                  stroke={candle.id % 2 === 0 ? "#ec4899" : "#ff85a2"}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Sparkling warm luxury fires */}
                {candle.isLit && (
                  <g>
                    {/* Golden luxury ambient halo */}
                    <circle
                      cx={candle.x * 5}
                      cy={candle.y - candle.height - 7}
                      r="8"
                      fill="#ffd000"
                      opacity="0.32"
                      className="animate-pulse"
                    />
                    {/* Flickering warm flame path */}
                    <path
                      d={`M ${candle.x * 5 - 2.5} ${candle.y - candle.height - 3} 
                          Q ${candle.x * 5} ${candle.y - candle.height - 15} ${candle.x * 5 + 2.5} ${candle.y - candle.height - 3} 
                          Z`}
                      fill="#ea580c"
                    >
                      <animate
                        attributeName="d"
                        values={`
                          M ${candle.x * 5 - 2.5} ${candle.y - candle.height - 3} Q ${candle.x * 5} ${candle.y - candle.height - 14} ${candle.x * 5 + 2.5} ${candle.y - candle.height - 3} Z;
                          M ${candle.x * 5 - 2} ${candle.y - candle.height - 3} Q ${candle.x * 5 - 1} ${candle.y - candle.height - 16} ${candle.x * 5 + 2} ${candle.y - candle.height - 3} Z;
                          M ${candle.x * 5 - 2.5} ${candle.y - candle.height - 3} Q ${candle.x * 5 + 1} ${candle.y - candle.height - 15} ${candle.x * 5 + 2.5} ${candle.y - candle.height - 3} Z;
                          M ${candle.x * 5 - 2.5} ${candle.y - candle.height - 3} Q ${candle.x * 5} ${candle.y - candle.height - 14} ${candle.x * 5 + 2.5} ${candle.y - candle.height - 3} Z
                        `}
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                )}
              </g>
            ))}
          </svg>

          {/* Interactive Blow System Desk */}
          {!countdownActive && !celebrating && (
            <div className="w-full flex flex-col items-center gap-3 mt-4">
              <p className="text-[10px] text-pink-600 font-sans tracking-wide text-center">
                Tap individual candles or activate your mic 
              </p>

              <div className="flex gap-2 w-full mt-1">
                {/* Simulated direct breeze blow button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSimulatedBlow}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-rose-400 border border-white/40 text-white font-sans font-medium text-[11px] uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:from-pink-500 hover:to-rose-500 transition"
                >
                  <Wind className="w-4 h-4 text-white animate-pulse" />
                  <span>BLOWWWWW</span>
                </motion.button>

                {/* Voice blow detection toggle */}
                <button
                  onClick={toggleMicrophone}
                  className={`px-4 py-3 border rounded-xl flex items-center justify-center gap-1.5 transition text-[11px] font-sans uppercase font-medium tracking-wider cursor-pointer ${
                    micActive
                      ? "bg-pink-500 text-white border-pink-400"
                      : "bg-pink-50/50 text-pink-600 border-pink-200/50 hover:bg-pink-100"
                  }`}
                >
                  {micActive ? <Mic className="w-4 h-4 animate-bounce" /> : <MicOff className="w-4 h-4" />}
                  <span>{micActive ? "Mic On" : "Mic Mode"}</span>
                </button>
              </div>

              {/* Progress visual level guides */}
              {blowStrength > 0 && (
                <div className="w-full bg-pink-100/50 h-1.5 rounded-full overflow-hidden border border-pink-200/40 mt-1">
                  <motion.div
                    className="bg-pink-500 h-full"
                    style={{ width: `${blowStrength}%` }}
                    transition={{ type: "spring", stiffness: 120 }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skip action guidelines */}
        {!countdownActive && (
          <button
            onClick={() => {
              sweetAudio.playChime();
              setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
            }}
            className="text-[11px] text-[#b08b91] hover:text-pink-800 font-sans uppercase tracking-widest cursor-pointer mt-6 transition underline underline-offset-4 font-semibold"
          >
             You got no patience, click here :)
          </button>
        )}

      </div>

      {/* Ceremony conclusion drawer over viewport */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-[#fff2f5] via-[#fffafe] to-white flex flex-col items-center justify-center z-50 p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-5"
            >
              <Heart className="w-12 h-12 fill-pink-400 text-pink-500 opacity-80" />
            </motion.div>
            
            <h1 className="font-serif italic font-semibold text-3xl sm:text-4xl text-pink-905 leading-tight">
              Are you ready ?
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onComplete}
              className="mt-8 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-sans uppercase tracking-wider font-semibold text-xs rounded-full border border-white/30 shadow-md cursor-pointer"
            >
              Let's go to the main drama!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
