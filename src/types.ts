/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number; // degrees for cute scattered scrapbook feel
  note?: string;
  isCustom?: boolean;
}

export interface Song {
  title: string;
  film: string;
  lyrics: string[];
  melody: number[][]; // synthesized notes [frequency, duration_ms]
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  image?: string;
}

export interface LoveReason {
  id: number;
  reason: string;
  hint: string;
  illustration: string;
}

export interface RemindItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  joke: string;
}

export interface Wish {
  id: string;
  title: string;
  message: string;
  color: string; // pastel color string
}

export interface CloudNote {
  id: string;
  note: string;
  x: number; // percentage pos
  y: number; // percentage pos
  color: string;
}

export interface MemoryPoint {
  id: number;
  x: number; // pos x for click-game
  y: number; // pos y
  found: boolean;
}

export interface GameScore {
  score: number;
  highScore: number;
  played: boolean;
}
