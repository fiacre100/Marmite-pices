/**
 * Gentle culinary kitchen timer chime and haptic feedback
 */
export function playKitchenChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Play two melodic ascending tones (E5: 659Hz, A5: 880Hz)
    const now = ctx.currentTime;
    
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    playTone(523.25, now, 0.4); // C5
    playTone(659.25, now + 0.2, 0.4); // E5
    playTone(783.99, now + 0.4, 0.8); // G5
  } catch {
    // Silently ignore if audio context is blocked by user gesture
  }

  // Haptic feedback if available
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([100, 50, 200]);
    } catch {
      // Ignored
    }
  }
}
