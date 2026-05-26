import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface FloatingItem {
  id: number;
  type: "heart" | "petal" | "sparkle" | "butterfly";
  size: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
}

export default function RomanticBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate a fixed but randomized set of romantic floating elements
    const newItems: FloatingItem[] = Array.from({ length: 22 }).map((_, i) => {
      const types: ("heart" | "petal" | "sparkle" | "butterfly")[] = [
        "heart",
        "petal",
        "sparkle",
        "butterfly",
      ];
      // Randomize selection
      const type = types[i % types.length];
      return {
        id: i,
        type,
        size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
        left: Math.random() * 100, // percentage x-axis
        delay: Math.random() * 8, // staggered start delays
        duration: Math.random() * 12 + 15, // ultra slow speed (15s to 27s)
        rotate: Math.random() * 360,
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Immersive layered pastel romance gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ffeef2] via-[#fffbf9] to-[#edf0f9] opacity-90 transition-all duration-1000" />

      {/* Layered glowing bokeh light blobs */}
      <div className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-pink-100/40 mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-rose-100/45 mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: "16s" }} />
      <div className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-amber-50/50 mix-blend-multiply filter blur-3xl" />
      <div className="absolute bottom-[-5%] left-[25%] w-[50vw] h-[40vw] rounded-full bg-purple-50/40 mix-blend-multiply filter blur-3xl" />

      {/* Dreamy light leak gradients on edges */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-200/20 to-transparent rounded-full filter blur-2xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-peach-100/20 to-transparent rounded-full filter blur-2xl" />

      {/* Fine texture overlay for premium, non-flat notebook feel */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay" />

      {/* Elegant ribbon / bow SVG contours floating softly */}
      <div className="absolute inset-0 flex justify-around items-center opacity-[0.06] text-pink-300">
        <svg className="w-40 h-40 transform -rotate-12 translate-x-[-10%]" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="1">
          {/* Subtle floral curve */}
          <path d="M 0,50 Q 25,25 50,50 T 100,50" />
          <path d="M 10,60 Q 35,35 60,60 T 90,60" />
        </svg>
        <svg className="w-56 h-56 transform rotate-45 translate-y-[30%] translate-x-[20%] hidden md:block" fill="none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="0.8">
          <circle cx="50" cy="50" r="30" />
          <path d="M 50,0 Q 20,50 50,100" />
          <path d="M 50,0 Q 80,50 50,100" />
        </svg>
      </div>

      {/* Interactive slow vertical floating particles */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            bottom: "-5%",
            left: `${item.left}%`,
            width: item.size,
            height: item.size,
          }}
          initial={{ y: "0vh", opacity: 0, rotate: item.rotate, scale: 0.8 }}
          animate={{
            y: "-110vh",
            opacity: [0, 0.8, 0.8, 0],
            x: ["0px", `${Math.sin(item.id) * 45}px`, `${Math.sin(item.id) * -30}px`, `${Math.sin(item.id) * 35}px`],
            rotate: [item.rotate, item.rotate + (item.id % 2 === 0 ? 120 : -120)],
            scale: [0.8, 1.1, 0.9, 0.8]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.type === "heart" && (
            <svg
              className="text-pink-300/40 fill-pink-200/30 w-full h-full"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {item.type === "petal" && (
            <svg
              className="text-rose-200/50 fill-rose-100/40 w-full h-full"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Organic leaf/petal shape */}
              <path d="M17,8C14.12,8 10,12 8,15C6,12 2.12,8 5,8C7.88,8 11,5 11,2C11,5 14.12,8 17,8Z" />
            </svg>
          )}

          {item.type === "sparkle" && (
            <svg
              className="text-amber-200/60 fill-amber-100/40 w-full h-full"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
            </svg>
          )}

          {item.type === "butterfly" && (
            <svg
              className="text-indigo-200/40 fill-indigo-100/30 w-full h-full transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Simplistic stylized twin wings */}
              <path d="M12,12 C10,9 6,9 5,11 C4,13 6,15 12,14 C18,15 20,13 19,11 C18,9 14,9 12,12 Z M12,12 C10,15 7,19 8,20 C9,21 11,18 12,14 C13,18 15,21 16,20 C17,19 14,15 12,12 Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
