/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PolaroidPhoto, Song, TimelineEvent, LoveReason, Wish } from "./types";

// in data.ts
import img0192 from "./IMG_0192.jpg";
import img0193 from "./IMG_0193.jpg";
import img0194 from "./IMG_0194.jpg";
import img0195 from "./IMG_0195.JPG";

export const PRESET_PHOTOS: PolaroidPhoto[] = [
  {
    id: "photo-1",
    url: img0195,
    caption: "Nov 14 — the day it almost ended 💔",
    date: "November 14",
    rotation: -2,
    note: "We genuinely thought it was over that day..."
  },
  {
    id: "photo-2",
    url: img0192,
    caption: "Apr 14 — our first sort-of date ☕",
    date: "April 14",
    rotation: 3,
    note: "It didn't go the way either of us planned..."
  },
  {
    id: "photo-3",
    url: img0193,
    caption: "Apr 30 — last day at college 🌸",
    date: "April 30",
    rotation: -4,
    note: "The place that gave us everything..."
  },
  {
    id: "photo-4",
    url: img0194,
    caption: "May 12 — the best day 🌊",
    date: "May 12",
    rotation: 2,
    note: "No explanation needed. Just the best day."
  }
];

// Frequencies for synthesizer chiptune playback:
// C4=261.63, D4=293.66, E4=329.63, F4=349.23, F#4=370.00, G4=392.00, G#4=415.30, A4=440.00, A#4=466.16, B4=493.88
// C5=523.25, C#5=554.37, D5=587.33, D#5=622.25, E5=659.25, F5=698.46, F#5=739.99, G5=783.99, A5=880.00, B5=987.77
export const COZY_SONGS: Song[] = [
  {
    title: "Naan Pizhaipeno",
    film: "Enai Noki Paayum Thota",
    lyrics: [
      "Naan pizhaippeno ennai nambiyae...",
      "Nee pirindhalum en ulagam mudiyaadhey...",
      "Kaadhal idhu dhaan enru sonnavan...",
      "Nee aanaai en kanavu naayagane...",
      "En vazhiyengum un nenaivugal dhaan sandhikkumae...",
      "En idhayathil un sirippoli ketkkumae... ❤️"
    ],
    melody: [
      [329.63, 600, 0], // E4 (Naan)
      [392.00, 600, 0], // G4 (pi)
      [440.00, 1000, 0], // A4 (zhaippeno)
      [0, 400, 0],
      [440.00, 400, 0], // A4 (Needh)
      [493.88, 400, 0], // B4 (aa)
      [523.25, 400, 1], // C5 (no)
      [440.00, 400, 0], // A4 (En)
      [0, 300, 0],
      [392.00, 400, 0], // G4 (pirin)
      [329.63, 400, 0], // E4 (dhal)
      [293.66, 1000, 0], // D4 (um)
      [0, 500, 0],
      [261.63, 500, 0], // C4 (vazhi)
      [293.66, 500, 0], // D4 (yengum)
      [329.63, 500, 0], // E4 (un)
      [392.00, 500, 0], // G4 (nenaivugal)
      [440.00, 1250, 1]  // A4 (ketkkumae!)
    ]
  },
  {
    title: "Ayo Ayo",
    film: "Oh My Kadavule",
    lyrics: [
      "Ayo Ayo kadavulaae ennai thookki pottadhadi...",
      "Un azhagil vizhundhu moozhgi poyitene...",
      "Kaadhal tharum inbamum thunbamum...",
      "Nee dhaan tharuvai en thozhane...",
      "Oh my kadavule, unna vidamaatene...",
      "Enna solvadhendru theriyaamal thavikkirene... 💕"
    ],
    melody: [
      [440.00, 400, 1], // A4 (Ay)
      [493.88, 400, 1], // B4 (yo)
      [523.25, 600, 1], // C5 (Ay)
      [493.88, 400, 0], // B4 (yo)
      [440.00, 400, 0], // A4 (kada)
      [392.00, 600, 0], // G4 (vulaae)
      [0, 400, 0],
      [392.00, 400, 1], // G4 (Un)
      [440.00, 400, 1], // A4 (a)
      [493.88, 600, 1], // B4 (zhagil)
      [440.00, 400, 0], // A4 (moozh)
      [392.00, 400, 0], // G4 (gi)
      [329.63, 800, 0], // E4 (poyitene)
      [0, 500, 0],
      [329.63, 400, 0], // E4 (Oh)
      [392.00, 400, 0], // G4 (my)
      [440.00, 400, 0], // A4 (kada)
      [523.25, 400, 1], // C5 (vulae)
      [493.88, 400, 0], // B4 (unna)
      [440.00, 1000, 1] // A4 (vidamaatene)
    ]
  }
];

export const TIMELINE_MILESTONES: TimelineEvent[] = [
  {
    id: "tl-1",
    date: "The talking stage",
    title: "We just talked ",
    description: "For so long. Like embarrassingly long. We were just talking and somehow neither of us noticed we were already way past just talking.",
    emoji: "👀"
  },
  {
    id: "tl-2",
    date: "3AM to 3PM",
    title: "It literally became you ",
    description: "Every hour of the day, you were just there. Still are. I'd have a full existential crisis without you at this point and that's not even an exaggeration.",
    emoji: "💬"
  },
  {
    id: "tl-3",
    date: "The I love you",
    title: "Took a while but we got there ",
    description: "It wasn't some big moment. It came out when it was supposed to and it felt real because it was. No weirdness, no pressure. Just meant it.",
    emoji: "🔐"
  },
  {
    id: "tl-4",
    date: "Right now",
    title: "Distance and everything, still us ",
    description: "Long distance, not enough time together, and yet here we are. It just works. I love you and honestly that's the whole explanation.",
    emoji: "🧸"
  }
];

export const WISH_JAR_CONTENT: Wish[] = [
  {
    id: "wish-1",
    title: "Growing old with you ",
    message: "I just want to get old with you. That's it. Still bickering, still laughing, still us. I want to look back at everything we built and think yeah, we did good.",
    color: "bg-pink-100 border-pink-300 text-pink-700"
  },
  {
    id: "wish-2",
    title: "Every country, with you ",
    message: "I want to travel everywhere with you. No plan, bad flights, wrong turns and all. As long as you're next to me complaining about the food or taking terrible photos, I'm happy.",
    color: "bg-amber-100 border-amber-300 text-amber-800"
  },
  {
    id: "wish-3",
    title: "2 pets, 2 kids, full house ",
    message: "Two pets that destroy everything we own and two kids who somehow make it worse. Absolute chaos. I want all of it with you.",
    color: "bg-rose-100 border-rose-300 text-rose-800"
  },
  {
    id: "wish-4",
    title: "A home that feels like us ",
    message: "I want us to have a place that's ours. Doesn't have to be big or perfect. Just somewhere that feels like home because you're in it.",
    color: "bg-purple-100 border-purple-300 text-purple-700"
  },
  {
    id: "wish-5",
    title: "Just us, always ",
    message: "Through all of it the travel, the chaos, the kids, the pets, the hard days , I just want it to always be us. That's the whole wish.",
    color: "bg-cyan-100 border-cyan-300 text-cyan-800"
  }
];

export const REASONS_I_LOVE_YOU: LoveReason[] = [
  {
    id: 1,
    reason: "You actually care. Not in a 'yeah sure' way. You check in, you remember things, you show up. That means more than you probably know.",
    hint: "You give a damn ",
    illustration: "🎨"
  },
  {
    id: 2,
    reason: "You try to buy me things without me asking and but I stop it. It's not about the thing, it's that you thought of me. That gets me every time.",
    hint: "The little surprises ",
    illustration: "🥐"
  },
  {
    id: 3,
    reason: "You call. Even when you're busy, even when it's just to say nothing. I never have to wonder if you're thinking about me.",
    hint: "You always call",
    illustration: "🎀"
  },
  {
    id: 4,
    reason: "You're genuinely so cute and so smart and somehow you chose me. I don't take that lightly. Not even a little bit.",
    hint: "You, just you ",
    illustration: "🌸"
  },
  {
    id: 5,
    reason: "You make me feel loved in a way that's calm and steady. Not overwhelming, not confusing. Just to be loved. Properly.",
    hint: "How you love me ",
    illustration: "🎼"
  },
  {
    id: 6,
    reason: "Life with you is just happy. Not perfect, but happy. And honestly that's everything.",
    hint: "This life with you ",
    illustration: "✨"
  }
];
