'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Semi-transparent background for trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#333';
    ctx.font = '14px monospace';

    const chars = '01';
    const fontSize = 14;

    for (let i = 0; i < dropsRef.current.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, dropsRef.current[i] * fontSize);

      if (dropsRef.current[i] * fontSize > canvas.height && Math.random() > 0.975) {
        dropsRef.current[i] = 0;
      }
      dropsRef.current[i]++;
    }

    animationFrameRef.current = requestAnimationFrame(draw);
  }, []);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops array
    dropsRef.current = Array(columns).fill(1);

    // Start animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    draw();
  }, [draw]);

  useEffect(() => {
    initializeCanvas();
    
    // Throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initializeCanvas, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [initializeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
} 