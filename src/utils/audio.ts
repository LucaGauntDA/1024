// Web Audio API Synthesizer for high-fidelity satisfying game sounds

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private hapticsEnabled: boolean = true;

  constructor() {
    // Check saved preferences
    try {
      const savedMute = localStorage.getItem('lumina_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedHaptics = localStorage.getItem('lumina_haptics_enabled');
      if (savedHaptics !== null) {
        this.hapticsEnabled = savedHaptics === 'true';
      }
    } catch {
      // LocalStorage not available
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('lumina_sound_muted', String(this.isMuted));
    } catch {}
    if (!this.isMuted) {
      this.playClick();
    }
    return this.isMuted;
  }

  public getHaptics(): boolean {
    return this.hapticsEnabled;
  }

  public toggleHaptics(): boolean {
    this.hapticsEnabled = !this.hapticsEnabled;
    try {
      localStorage.setItem('lumina_haptics_enabled', String(this.hapticsEnabled));
    } catch {}
    if (this.hapticsEnabled) {
      this.triggerHaptic(12);
    }
    return this.hapticsEnabled;
  }

  public triggerHaptic(duration = 10) {
    if (!this.hapticsEnabled) return;
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(duration);
      }
    } catch {}
  }

  // Soft slide sound: gentle filtered whisper
  public playSlide() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.08);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Satisfying chime on tile merge: pitch scales with tile value
  public playMerge(value: number) {
    this.triggerHaptic(value >= 256 ? 25 : 12);
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Map tile value to pentatonic harmonic musical frequencies
      const frequencies: Record<number, number> = {
        4: 261.63,   // C4
        8: 293.66,   // D4
        16: 329.63,  // E4
        32: 392.00,  // G4
        64: 440.00,  // A4
        128: 523.25, // C5
        256: 587.33, // D5
        512: 659.25, // E5
        1024: 783.99,// G5
        2048: 880.00,// A5
        4096: 1046.50// C6
      };

      const baseFreq = frequencies[value] || (440 * Math.pow(2, Math.log2(value / 64) * 0.15));

      // Fundamental oscillator
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      // Harmonic overtone for shimmering warmth
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 2, now);

      const duration = value >= 1024 ? 0.35 : 0.22;
      const vol = Math.min(0.18, 0.09 + Math.log2(value) * 0.008);

      gain1.gain.setValueAtTime(vol, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(vol * 0.35, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {}
  }

  // Tactile button click
  public playClick() {
    this.triggerHaptic(8);
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  // Triumphant win fanfare
  public playWin() {
    this.triggerHaptic(40);
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const noteTime = now + idx * 0.12;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.55);
      });
    } catch {}
  }

  // Subtle game over chord
  public playGameOver() {
    this.triggerHaptic(30);
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [392.00, 329.63, 261.63, 220.00]; // G4, E4, C4, A3
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const noteTime = now + idx * 0.14;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.08, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.45);
      });
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
