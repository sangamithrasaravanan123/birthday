import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Square, Volume2, VolumeX, ListMusic, Music, Heart } from "lucide-react";
import { COZY_SONGS } from "../data";
import { sweetAudio } from "../audio";

interface OurSongsProps {
  onClose: () => void;
}

export default function OurSongs({ onClose }: OurSongsProps) {
  const [selectedSongIdx, setSelectedSongIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  const song = COZY_SONGS[selectedSongIdx];

  // Stop track when leaving or changing song
  useEffect(() => {
    return () => {
      sweetAudio.stopMelody();
      sweetAudio.startAmbient();
    };
  }, []);

  const handlePlaySong = () => {
    if (isPlaying) {
      sweetAudio.stopMelody();
      setIsPlaying(false);
      setCurrentLineIdx(0);
      sweetAudio.startAmbient();
    } else {
      sweetAudio.stopAmbient();
      setIsPlaying(true);
      setCurrentLineIdx(0);

      // Trigger synthesizer notes loop
      // Map note steps to lyric displays logically
      const notesPerLine = Math.ceil(song.melody.length / song.lyrics.length);

      sweetAudio.playSongMelody(song.melody, (noteIdx) => {
        const lineIdx = Math.min(
          song.lyrics.length - 1,
          Math.floor(noteIdx / notesPerLine)
        );
        setCurrentLineIdx(lineIdx);
      });
    }
  };

  const handleStopSong = () => {
    sweetAudio.stopMelody();
    setIsPlaying(false);
    setCurrentLineIdx(0);
    sweetAudio.startAmbient();
  };

  const selectNewSongIdx = (idx: number) => {
    sweetAudio.playClick();
    handleStopSong();
    setSelectedSongIdx(idx);
  };

  const toggleMute = () => {
    const isMuted = sweetAudio.toggleMute();
    setAudioMuted(isMuted);
  };

  return (
    <div className="flex flex-col items-center max-w-xl w-full mx-auto px-4 py-6 font-sans select-none">
      
      {/* Modern High-End Media Player Card */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full glass-romantic border border-pink-150/45 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center relative"
      >
        
        {/* Playback status indicator bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 shadow-3xs">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-pink-500 animate-pulse" : "bg-pink-300"}`} />
          <span className="text-[8px] text-pink-600 font-semibold uppercase tracking-widest font-mono">
            {isPlaying ? " ACTIVE" : "SONGS THAT ME MMHHMMMHMM FOR YOU"}
          </span>
        </div>

        {/* Beautiful high-end modern spinning record mock */}
        <div className="relative w-40 sm:w-44 h-40 sm:h-44 my-8 flex items-center justify-center">
          
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="relative rounded-full aspect-square w-full bg-[#1e1315] flex items-center justify-center border-[5px] border-pink-50 shadow-md"
          >
            {/* Real record grooved circles */}
            <div className="absolute inset-4 rounded-full border border-pink-950/20" />
            <div className="absolute inset-8 rounded-full border border-pink-950/20" />
            <div className="absolute inset-12 rounded-full border border-pink-950/30" />
            <div className="absolute inset-16 rounded-full border border-pink-950/30" />

            {/* Premium center label sticker */}
            <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-100 flex flex-col items-center justify-center p-3 text-center shadow-inner relative overflow-hidden border border-[#2e0b11]">
              <span className="text-[8px] font-bold text-pink-900 truncate max-w-[55px] uppercase font-mono tracking-widest leading-none">
                {song.title}
              </span>
              <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500 mt-1 animate-pulse" />
              
              {/* Spindle hole */}
              <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-white border border-[#2e0b11] rounded-full shadow-inner" />
            </div>
          </motion.div>

          {/* Sleek needle arm indicator */}
          <motion.div
            animate={isPlaying ? { rotate: [0, 15, 13] } : { rotate: 0 }}
            style={{ originX: 0.9, originY: 0.1 }}
            className="absolute -top-1 right-1 h-20 w-10 pointer-events-none transform origin-top-right transition duration-500"
          >
            <svg viewBox="0 0 40 100" className="w-full h-full text-pink-350">
              <path d="M 30,10 L 15,35 L 12,75 L 14,85" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="23" y="6" width="10" height="8" rx="2" fill="#eb8f99" />
              <circle cx="30" cy="10" r="4.5" fill="#f7d4d6" />
              <polygon points="11,80 16,80 13,90" fill="#ec4899" />
            </svg>
          </motion.div>
        </div>

        {/* Track Title labels */}
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-semibold text-pink-950 tracking-tight">
            {song.title}
          </h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-50 border border-pink-100 text-[9px] text-[#a47a80] font-sans mt-2 font-medium uppercase tracking-widest">
            <Music className="w-2.5 h-2.5 text-pink-400" />
            <span>{song.film}</span>
          </span>
        </div>

        {/* Beautiful Lyric highlights card */}
        <div className="w-full h-16 bg-white/50 border border-pink-100 rounded-2xl flex items-center justify-center p-3 mb-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${selectedSongIdx}-${currentLineIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-serif italic text-base sm:text-lg text-pink-500 text-center leading-relaxed"
            >
              “ {song.lyrics[currentLineIdx]} ”
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Control Desk Row */}
        <div className="flex items-center gap-4 w-full justify-between pt-4 border-t border-pink-100">
          
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl border border-pink-100 hover:bg-pink-50 text-pink-400 hover:text-pink-600 transition cursor-pointer"
            title="Mute Soundtrack"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-pink-350" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
          </button>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaySong}
              className={`px-7 py-2.5 rounded-xl font-sans font-medium text-xs tracking-wider flex items-center justify-center gap-2 shadow-3xs transition duration-200 cursor-pointer border uppercase ${
                isPlaying
                  ? "bg-pink-100/80 border-pink-200 text-pink-700"
                  : "bg-gradient-to-tr from-pink-400 to-rose-455 border border-pink-300 text-white hover:opacity-95"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3 h-3 fill-current" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play Cover</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Equalizer lines status animation */}
          <div className="flex items-end gap-1 h-4 w-8 justify-center">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? { height: [3, 12, 3] } : { height: 3 }}
                transition={{
                  duration: 0.35 + i * 0.08,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-0.5 bg-pink-450 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Compact track library desk list */}
        <div className="w-full mt-6 bg-white/50 border border-pink-100 rounded-2xl p-4 text-left">
          <h4 className="text-[9px] text-pink-500 font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
            <ListMusic className="w-3.5 h-3.5 text-pink-400" />
            <span>Tracks</span>
          </h4>

          <div className="flex flex-col gap-1.5">
            {COZY_SONGS.map((tk, idx) => (
              <button
                key={tk.title}
                onClick={() => selectNewSongIdx(idx)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs flex items-center justify-between transition cursor-pointer font-sans ${
                  selectedSongIdx === idx
                    ? "bg-white border-pink-200 text-pink-900 font-bold shadow-3xs"
                    : "bg-transparent border-transparent text-pink-500 hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-pink-350">0{idx+1}.</span>
                  <span className="truncate">{tk.title}</span>
                </div>
                <span className="font-mono text-[8px] text-pink-400 uppercase tracking-widest">
                  {tk.film === "Taylor Swift" ? "Pop" : "Tamil"}
                </span>
              </button>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
