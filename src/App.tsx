/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, Volume2, VolumeX, Sparkles, ArrowLeft,
  BookOpen, Camera, Disc, Milestone, MessageSquare, Gift, Clock, Sparkle
} from "lucide-react";

import WelcomeScreen from "./components/WelcomeScreen";
import LockScreen from "./components/LockScreen";
import BirthdayCakeScreen from "./components/BirthdayCakeScreen";
import LoveLetterRoom from "./components/LoveLetterRoom";
import ScrapbookGallery from "./components/ScrapbookGallery";
import OurSongs from "./components/OurSongs";
import OurStoryTimeline from "./components/OurStoryTimeline";
import ReasonsILoveYou from "./components/ReasonsILoveYou";
import WishJar from "./components/WishJar";
import LoveGames from "./components/LoveGames";
import CountdownWidget from "./components/CountdownWidget";
import FinalScreen from "./components/FinalScreen";
import RomanticBackground from "./components/RomanticBackground";

import { sweetAudio } from "./audio";

type ScreenState = "welcome" | "lock" | "cake" | "hub" | "final";
type ActiveOverlay = 
  | null 
  | "letter" 
  | "gallery" 
  | "songs" 
  | "timeline" 
  | "reasons" 
  | "jar" 
  | "games" 
  | "countdown";

interface HubNode {
  id: ActiveOverlay;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string; // sleek card border configuration
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("welcome");
  const [overlay, setOverlay] = useState<ActiveOverlay>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Sync mute state from synthesizer
  useEffect(() => {
    setIsMuted(sweetAudio.getMute());
  }, []);

  const handleToggleMute = () => {
    const nextMuted = sweetAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleCloseOverlay = () => {
    sweetAudio.playClick();
    setOverlay(null);
  };

  const handleOpenOverlay = (nodeId: ActiveOverlay) => {
    sweetAudio.playChime();
    setOverlay(nodeId);
  };

  // 8 premium streamlined hub segments
  const hubNodes: HubNode[] = [
    {
      id: "letter",
      title: "My small letter",
      desc: "This one is just for you.",
      icon: <BookOpen className="w-5 h-5 text-rose-500" />,
      color: "from-white to-rose-50/10 hover:border-rose-300 border-slate-100"
    },
    {
      id: "gallery",
      title: "Cute pictures ft",
      desc: "Photos i can't take my eyes off",
      icon: <Camera className="w-5 h-5 text-amber-500" />,
      color: "from-white to-amber-50/10 hover:border-amber-300 border-slate-100"
    },
    {
      id: "songs",
      title: "Y(our) Favorite Songs",
      desc: "Songs we would not mind listening to on repeat together.",
      icon: <Disc className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: "10s" }} />,
      color: "from-white to-indigo-50/10 hover:border-indigo-300 border-slate-100"
    },
    {
      id: "timeline",
      title: "Our Story ?",
      desc: "What got us in ?",
      icon: <Milestone className="w-5 h-5 text-teal-500" />,
      color: "from-white to-teal-50/10 hover:border-teal-300 border-slate-100"
    },
    {
      id: "reasons",
      title: "Reasons I Love You",
      desc: " 3D flipcards containing my cute thoughts.",
      icon: <MessageSquare className="w-5 h-5 text-pink-500" />,
      color: "from-white to-pink-50/10 hover:border-pink-300 border-slate-100"
    },
    {
      id: "jar",
      title: "The Magic Wish Jar",
      desc: "Our future floating happily inside our glass jar ",
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      color: "from-white to-yellow-50/10 hover:border-yellow-300 border-slate-100"
    },
    {
      id: "games",
      title: "Cute Love Games",
      desc: "Flip the match cards, find hearts, and play catching loops.",
      icon: <Gift className="w-5 h-5 text-emerald-500" />,
      color: "from-white to-emerald-50/10 hover:border-emerald-300 border-slate-100"
    },
    {
      id: "countdown",
      title: "Love Tickers",
      desc: "How long ?.",
      icon: <Clock className="w-5 h-5 text-slate-500" />,
      color: "from-white to-slate-50/10 hover:border-slate-400 border-slate-150"
    }
  ];

  return (
    <div className="relative min-h-screen text-[#5c3e43] antialiased font-sans flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      
      {/* Global Dreamy Romantic Background Layer */}
      <RomanticBackground />

      {/* Sleek, frosted luxury persistent header bar */}
      <header className="fixed top-0 inset-x-0 h-14 bg-white/70 backdrop-blur-md border-b border-pink-100/35 px-6 py-2 flex items-center justify-between z-30 select-none">
        <div className="flex items-center gap-2 font-serif italic text-pink-700 tracking-wide text-base font-semibold">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-300 animate-pulse" />
          <span>Birthday Special 🎀</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest font-mono text-pink-400/80 hidden sm:inline-block">for My Favorite Boy</span>
          {/* Audio controller toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-full border transition duration-300 flex items-center justify-center cursor-pointer ${
              isMuted
                ? "bg-pink-50 text-pink-350 border-pink-100 hover:bg-pink-100"
                : "bg-pink-500 text-white border-pink-400 hover:bg-pink-600 shadow-sm"
            }`}
            title={isMuted ? "Unmute Music and Chimes" : "Mute Soundtracks"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main component router viewport container */}
      <main className="flex-1 pt-14 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* WELCOME SCREEN */}
          {screen === "welcome" && (
            <motion.div
              key="welcome-scr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <WelcomeScreen onComplete={() => setScreen("lock")} />
            </motion.div>
          )}

          {/* SECURITY PIN CODE SCREEN */}
          {screen === "lock" && (
            <motion.div
              key="lock-scr"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full"
            >
              <LockScreen onComplete={() => setScreen("cake")} />
            </motion.div>
          )}

          {/* CELEBRATORY MULTI-TIER CAKE SCREEN */}
          {screen === "cake" && (
            <motion.div
              key="cake-scr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <BirthdayCakeScreen onComplete={() => setScreen("hub")} />
            </motion.div>
          )}

          {/* MAIN MODERN SCRAPBOOK MEMORIES HUB */}
          {screen === "hub" && (
            <motion.div
              key="hub-scr"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="relative min-h-[calc(100vh-56px)] p-6 sm:p-10 select-none pb-24"
            >
              
              {/* Title Header in High-End Editorial Serif Styling */}
              <div className="text-center max-w-xl mx-auto mb-12 mt-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 text-pink-600 font-sans text-[9px] uppercase tracking-widest mb-4 shadow-3xs border border-pink-100">
                  <Sparkle className="w-3.5 h-3.5 text-pink-400 fill-pink-300 animate-pulse" />
                  <span>Cute little space </span>
                </div>
                
                <h1 className="font-serif italic font-light text-4xl sm:text-5xl text-pink-900 tracking-tight leading-tight">
                  US, ONLY US!
                </h1>
                
                <p className="font-sans text-xs sm:text-sm text-pink-500/80 mt-2.5 max-w-sm mx-auto leading-relaxed tracking-wide font-light">
                  Press any card!
                </p>
              </div>

              {/* High precision aesthetic grid using premium glassmorphic architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10 px-2 sm:px-4">
                {hubNodes.map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenOverlay(node.id)}
                    className="glass-romantic border border-pink-100/30 rounded-3xl p-6 sm:p-7 cursor-pointer hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[195px] text-left group"
                  >
                    {/* Minimal pink-accented circular badge indicator */}
                    <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center border border-pink-50 shadow-3xs group-hover:bg-pink-500 group-hover:text-white transition duration-300">
                      {node.icon}
                    </div>

                    <div className="mt-4">
                      <span className="text-[9px] font-mono tracking-widest text-pink-400 uppercase font-semibold">CHAPTER 0{i+1}</span>
                      <h3 className="font-serif font-semibold text-pink-900 text-base leading-tight mt-1 transition group-hover:text-pink-950">
                        {node.title}
                      </h3>
                      <p className="text-[11px] text-[#8c6d72] mt-1.5 line-clamp-2 leading-relaxed font-light">
                        {node.desc}
                      </p>
                    </div>

                    <span className="text-[9px] text-[#a88288] font-sans tracking-widest uppercase mt-4 block font-semibold text-right group-hover:text-pink-600 transition duration-300">
                      Explore guyss
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Proceed Surge surprise control block */}
              <div className="w-full flex justify-center mt-20 mb-8 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    sweetAudio.playChime();
                    setScreen("final");
                  }}
                  className="px-9 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-sans font-medium text-xs shadow-md shadow-pink-200 hover:shadow-lg hover:from-pink-500 hover:to-rose-500 tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer border-2 border-white/65"
                >
                  <Gift className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                  <span>Something special!</span>
                </motion.button>
              </div>

              {/* PORTAL TRANSITION OVERLAY DRAWER */}
              <AnimatePresence>
                {overlay && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 pt-16 pb-4 bg-gradient-to-b from-[#ffeef1]/96 via-[#fffbfb]/98 to-white/99 z-40 overflow-y-auto px-4"
                  >
                    {/* Top action row */}
                    <div className="max-w-4xl mx-auto flex justify-between items-center py-4 mb-2">
                      <button
                        onClick={handleCloseOverlay}
                        className="px-4 py-1.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 flex items-center gap-1.5 cursor-pointer shadow-xs border border-pink-400 transition-all text-[11px] uppercase tracking-wider"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back </span>
                      </button>

                      <span className="font-serif text-sm italic tracking-wide text-pink-600 font-semibold">
                        Memory Chamber
                      </span>
                    </div>

                    {/* Active drawer container frame */}
                    <div className="w-full py-2 pb-12">
                      {overlay === "letter" && <LoveLetterRoom onClose={handleCloseOverlay} />}
                      {overlay === "gallery" && <ScrapbookGallery onClose={handleCloseOverlay} />}
                      {overlay === "songs" && <OurSongs onClose={handleCloseOverlay} />}
                      {overlay === "timeline" && <OurStoryTimeline onClose={handleCloseOverlay} />}
                      {overlay === "reasons" && <ReasonsILoveYou onClose={handleCloseOverlay} />}
                      {overlay === "jar" && <WishJar onClose={handleCloseOverlay} />}
                      {overlay === "games" && <LoveGames onClose={handleCloseOverlay} />}
                      {overlay === "countdown" && <CountdownWidget onClose={handleCloseOverlay} />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {/* FINAL EXPERIENCE SURPRISE */}
          {screen === "final" && (
            <motion.div
              key="final-scr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <FinalScreen onReplay={() => {
                setScreen("welcome");
                setOverlay(null);
                sweetAudio.stopAll();
              }} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
