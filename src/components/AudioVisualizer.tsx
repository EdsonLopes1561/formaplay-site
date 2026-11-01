import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

interface AudioVisualizerProps {
  className?: string;
  barCount?: number;
  minHeight?: number;
}

const DEFAULT_BAR_COUNT = 40;

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  className,
  barCount = DEFAULT_BAR_COUNT,
  minHeight = 40,
}) => {
  const { isPlaying, status, stopResetToken, getFrequencyData } = useAudioPlayer();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const count = Math.max(16, Math.min(64, barCount));
  const smoothedBarsRef = useRef<Float32Array>(new Float32Array(count));
  const peakBarsRef = useRef<Float32Array>(new Float32Array(count));
  const peakHoldFramesRef = useRef<Int8Array>(new Int8Array(count));
  const freqBufferRef = useRef<Uint8Array>(new Uint8Array(128));
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Re-initialize arrays if barCount prop changes
  useEffect(() => {
    smoothedBarsRef.current = new Float32Array(count);
    peakBarsRef.current = new Float32Array(count);
    peakHoldFramesRef.current = new Int8Array(count);
  }, [count]);

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Pause canvas loop when off-screen to save CPU/GPU resources
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsVisible(entries[0].isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Draw a single frame on the canvas with vibrant bars and peak accents
  const drawFrame = useCallback(
    (bars: Float32Array, peaks: Float32Array, activeGlow: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(160, Math.floor(rect.width));
      const height = Math.max(minHeight, Math.floor(rect.height));

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep dark blue / black background with subtle radial luminescence
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.65, '#061025');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Center ambient glow reacting to music presence
      const ambientGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.76,
        15,
        width * 0.5,
        height * 0.76,
        width * 0.6
      );
      ambientGrad.addColorStop(
        0,
        activeGlow ? 'rgba(56, 189, 248, 0.22)' : 'rgba(37, 99, 235, 0.08)'
      );
      ambientGrad.addColorStop(
        0.55,
        activeGlow ? 'rgba(14, 165, 233, 0.09)' : 'rgba(37, 99, 235, 0.03)'
      );
      ambientGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      const baselineY = height * 0.82;
      const maxBarHeight = height * 0.75;

      // Baseline horizon glow line
      ctx.strokeStyle = activeGlow
        ? 'rgba(56, 189, 248, 0.42)'
        : 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(8, baselineY + 1);
      ctx.lineTo(width - 8, baselineY + 1);
      ctx.stroke();

      const horizontalPadding = Math.max(8, Math.min(16, width * 0.04));
      const usableWidth = width - horizontalPadding * 2;
      const totalBars = bars.length;
      const step = usableWidth / totalBars;
      const barWidth = Math.max(2, Math.min(10, step * 0.64));

      for (let i = 0; i < totalBars; i++) {
        const normalized = Math.max(0.04, Math.min(1, bars[i]));
        const barH = Math.max(3, normalized * maxBarHeight);
        const x = horizontalPadding + i * step + (step - barWidth) / 2;
        const y = baselineY - barH;

        // Rich vertical gradient: deep royal blue -> electric blue -> vibrant cyan -> bright ice cyan
        const barGrad = ctx.createLinearGradient(x, baselineY, x, y);
        barGrad.addColorStop(0, '#1e40af');
        barGrad.addColorStop(0.38, '#2563eb');
        barGrad.addColorStop(0.72, '#06b6d4');
        barGrad.addColorStop(0.92, '#38bdf8');
        barGrad.addColorStop(1, '#cffafe');

        ctx.save();
        if (activeGlow && normalized > 0.3) {
          ctx.shadowColor = 'rgba(56, 189, 248, 0.65)';
          ctx.shadowBlur = Math.min(12, 4 + normalized * 8);
        }
        ctx.fillStyle = barGrad;

        // Draw rounded top bar
        const radius = Math.min(barWidth / 2, 3);
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [radius, radius, 1, 1]);
        ctx.fill();
        ctx.restore();

        // Draw subtle luminous peak cap on top of each bar
        if (activeGlow && peaks && peaks[i] > 0.08) {
          const peakNorm = Math.max(0.05, Math.min(1, peaks[i]));
          const peakY = baselineY - peakNorm * maxBarHeight;
          const capHeight = Math.max(1.8, Math.min(2.5, height * 0.04));

          ctx.save();
          ctx.shadowColor = 'rgba(125, 211, 252, 0.85)';
          ctx.shadowBlur = 6;
          ctx.fillStyle = '#f0f9ff';
          ctx.beginPath();
          ctx.roundRect(
            x,
            Math.max(2, peakY - capHeight),
            barWidth,
            capHeight,
            1.2
          );
          ctx.fill();
          ctx.restore();
        }

        // Subtle mirror reflection below baseline
        const reflectH = Math.min(height - baselineY - 2, barH * 0.22);
        if (reflectH > 1) {
          const reflGrad = ctx.createLinearGradient(
            x,
            baselineY + 2,
            x,
            baselineY + 2 + reflectH
          );
          reflGrad.addColorStop(0, 'rgba(56, 189, 248, 0.26)');
          reflGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = reflGrad;
          ctx.fillRect(x, baselineY + 2, barWidth, reflectH);
        }
      }

      ctx.restore();
    },
    [minHeight]
  );

  // Build initial calm baseline bars
  const getInitialBars = useCallback((): Float32Array => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const centerDist = Math.abs(i - (count - 1) / 2) / (count / 2);
      arr[i] = 0.06 + (1 - centerDist) * 0.05;
    }
    return arr;
  }, [count]);

  // Reset to initial state when Stop is triggered or status is idle/stopped
  useEffect(() => {
    if (status === 'stopped' || status === 'idle') {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const initial = getInitialBars();
      smoothedBarsRef.current = initial;
      peakBarsRef.current = new Float32Array(initial);
      peakHoldFramesRef.current.fill(0);
      drawFrame(initial, initial, false);
    }
  }, [status, stopResetToken, getInitialBars, drawFrame]);

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(smoothedBarsRef.current, peakBarsRef.current, isPlaying);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, isPlaying]);

  // Animation loop while playing
  useEffect(() => {
    // Pause animation when music is paused or not playing or offscreen
    if (!isPlaying || !isVisible) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (status === 'paused') {
        // Keep the current bars frozen on screen when paused
        drawFrame(smoothedBarsRef.current, peakBarsRef.current, false);
      }
      return;
    }

    // If user prefers reduced motion, show a calm static representation while playing
    if (prefersReducedMotion) {
      const staticPlaying = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        staticPlaying[i] = 0.24 + Math.sin(i * 0.45) * 0.12;
      }
      smoothedBarsRef.current = staticPlaying;
      drawFrame(staticPlaying, staticPlaying, true);
      return;
    }

    const animate = () => {
      const freqData = freqBufferRef.current;
      const hasRealData = getFrequencyData(freqData);
      const currentBars = smoothedBarsRef.current;
      const peakBars = peakBarsRef.current;
      const peakHoldFrames = peakHoldFramesRef.current;

      let sum = 0;
      if (hasRealData) {
        for (let i = 0; i < freqData.length; i++) {
          sum += freqData[i];
        }
      }

      const totalBins = freqData.length; // 128 bins with fftSize 256
      const now = performance.now() / 1000;

      for (let i = 0; i < count; i++) {
        let targetAmplitude: number;

        if (hasRealData && sum > 0) {
          const t = i / (count - 1);
          const centerBin = Math.pow(t, 1.72) * (totalBins * 0.86);
          const binRadius = Math.max(1, Math.round(t * 3.2));
          const startBin = Math.max(0, Math.floor(centerBin - binRadius));
          const endBin = Math.min(totalBins - 1, Math.ceil(centerBin + binRadius));

          let maxVal = 0;
          let sumVal = 0;
          let binCount = 0;
          for (let b = startBin; b <= endBin; b++) {
            const val = freqData[b];
            if (val > maxVal) maxVal = val;
            sumVal += val;
            binCount++;
          }
          const avgVal = binCount > 0 ? sumVal / binCount : 0;
          const sample = (maxVal * 0.72 + avgVal * 0.28) / 255;

          const eqBoost = 1.1 + Math.pow(t, 1.15) * 0.85;

          let scaled = sample * eqBoost;
          if (scaled > 0) {
            scaled = Math.pow(scaled, 1.25) * 1.28;
          }

          targetAmplitude = Math.min(0.98, Math.max(0.04, scaled));
        } else {
          targetAmplitude =
            0.18 +
            Math.abs(Math.sin(now * 5.2 + i * 0.32)) * 0.52 +
            Math.abs(Math.cos(now * 3.4 - i * 0.22)) * 0.26;
        }

        const prev = currentBars[i] || 0.04;
        if (targetAmplitude > prev) {
          currentBars[i] = prev + (targetAmplitude - prev) * 0.72;
        } else {
          currentBars[i] = prev + (targetAmplitude - prev) * 0.16;
        }

        if (currentBars[i] >= peakBars[i]) {
          peakBars[i] = currentBars[i];
          peakHoldFrames[i] = 5;
        } else {
          if (peakHoldFrames[i] > 0) {
            peakHoldFrames[i]--;
          } else {
            peakBars[i] = Math.max(currentBars[i], peakBars[i] - 0.016);
          }
        }
      }

      drawFrame(currentBars, peakBars, true);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, isVisible, status, prefersReducedMotion, count, getFrequencyData, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Visualizador de frequências da Música Oficial FormaPlay"
      role="img"
      data-testid="audio-visualizer-canvas"
    />
  );
};
