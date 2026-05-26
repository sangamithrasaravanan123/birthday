/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SweetSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private backgroundIntervalId: any = null;
  private currentMelodyId: any = null;
  private isSongPlaying: boolean = false;

  constructor() {
    // Lazy init context on first click to comply with chrome autoplay rule
  }

  private initCtx() {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        return;
      }
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("AudioContext initialization fell back or blocked inside iframe:", e);
      this.ctx = null;
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    } else {
      this.startAmbient();
    }
  }

  toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  getMute(): boolean {
    return this.isMuted;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number = 0.1, delay: number = 0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    // Warm soft ADSR envelope
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + delay + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration / 1000);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration / 1000);
  }

  // Sweet melodic bubby pop click sound
  playClick() {
    this.playTone(523.25, "sine", 120, 0.08); // C5
  }

  // Happy ding when a milestone is completed or note is clicked
  playChime() {
    this.playTone(659.25, "sine", 200, 0.08, 0); // E5
    this.playTone(783.99, "sine", 250, 0.06, 0.08); // G5
    this.playTone(1046.50, "sine", 400, 0.05, 0.16); // C6
  }

  // Soft buzzer when a password is wrong
  playWrong() {
    this.playTone(261.63, "triangle", 300, 0.12, 0); // C4
    this.playTone(246.94, "triangle", 350, 0.1, 0.1); // B3
  }

  // Magical wind swoosh for blow candles/fading out
  playCandleBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 1.5);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 1.5);
  }

  // Play ambient romantic chime box stream in the background
  startAmbient() {
    this.initCtx();
    if (this.isMuted) return;
    if (this.backgroundIntervalId) return;

    // Cozy romantic slow lullaby chord progression (Cmaj9 - G6 - Am9 - Fmaj7)
    // Notes of warmth:
    // Cmaj9: C4(261), E4(329), G4(392), B4(493), D5(587)
    // G6: G3(196), B3(246), D4(293), E4(329), G4(392)
    // Am9: A3(220), C4(261), E4(329), G4(392), B4(493)
    // Fmaj7: F3(174), A3(220), C4(261), E4(329), G4(392)

    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj7(9)
      [196.00, 246.94, 293.66, 329.63, 392.00], // G6
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00]  // Fmaj7
    ];

    let chordIdx = 0;

    const playStep = () => {
      if (this.isMuted || this.isSongPlaying) return;
      
      const chord = chords[chordIdx];
      const volMultiplier = 0.035; // Soft, premium, balanced
      
      // Play a beautiful, cascading, delayed chord arpeggio (simulates a rolling luxurious hand-cranked music box)
      this.playTone(chord[0], "sine", 3500, volMultiplier * 1.5, 0);       // Root note (long bass anchor)
      this.playTone(chord[1], "sine", 2500, volMultiplier * 0.9, 0.3);     // Third (warm sweet middle)
      this.playTone(chord[2], "sine", 2200, volMultiplier * 0.8, 0.6);     // Fifth (pure harmonic spacer)
      this.playTone(chord[4] || chord[3], "sine", 2000, volMultiplier * 1.2, 0.9); // Color 9th (gorgeous aesthetic flair)

      chordIdx = (chordIdx + 1) % chords.length;
    };

    // Play initial chime
    playStep();
    this.backgroundIntervalId = setInterval(playStep, 4500);
  }

  stopAmbient() {
    if (this.backgroundIntervalId) {
      clearInterval(this.backgroundIntervalId);
      this.backgroundIntervalId = null;
    }
  }

  // Play beautiful custom song melody sequence
  playSongMelody(melody: number[][], onLyricChange?: (step: number) => void) {
    this.isSongPlaying = true;
    this.initCtx();
    this.stopMelody();

    let playTime = 0;
    const timeouts: any[] = [];

    melody.forEach((note, idx) => {
      const [freq, duration, typeNum] = note; // duration in ms, typeNum (0=sine, 1=triangle)
      const delay = playTime / 1000;
      
      if (freq > 0) {
        const type: OscillatorType = typeNum === 1 ? "triangle" : "sine";
        const timeout = setTimeout(() => {
          if (!this.isMuted) {
            this.playTone(freq, type, duration, 0.07);
            if (onLyricChange) onLyricChange(idx);
          }
        }, playTime);
        timeouts.push(timeout);
      } else {
        // Rest note, can trigger lyric triggers
        const timeout = setTimeout(() => {
          if (onLyricChange) onLyricChange(idx);
        }, playTime);
        timeouts.push(timeout);
      }

      playTime += duration;
    });

    const finalTimeout = setTimeout(() => {
      this.isSongPlaying = false;
      this.startAmbient();
    }, playTime);
    timeouts.push(finalTimeout);

    this.currentMelodyId = timeouts;
  }

  stopMelody() {
    if (this.currentMelodyId) {
      this.currentMelodyId.forEach((id: any) => clearTimeout(id));
      this.currentMelodyId = null;
    }
    this.isSongPlaying = false;
  }

  stopAll() {
    this.stopAmbient();
    this.stopMelody();
  }
}

export const sweetAudio = new SweetSynth();
