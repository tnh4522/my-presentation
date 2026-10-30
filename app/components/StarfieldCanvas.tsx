"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  twinkleSpeed: number;
  phase: number;
  colorIndex: number;
}

const DARK_COLORS = ["#ffffff", "#bae6fd", "#fde68a", "#c4b5fd", "#e2e8f0"];
const LIGHT_COLORS = ["#0284c7", "#4f46e5", "#0ea5e9", "#64748b", "#3b82f6"];

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef<"light" | "dark">(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    let animationFrameId: number;
    let resizeFrameId: number | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    const starCount = Math.min(140, Math.floor((width * height) / 9500));

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.35 + 0.35,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.08 + 0.02,
      twinkleSpeed: Math.random() * 0.02 + 0.006,
      phase: Math.random() * Math.PI * 2,
      colorIndex: Math.floor(Math.random() * DARK_COLORS.length),
    }));

    const renderStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";
      const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

      for (let c = 0; c < colors.length; c++) {
        ctx.fillStyle = colors[c];
        ctx.beginPath();
        for (const s of stars) {
          if (s.colorIndex !== c) continue;
          ctx.moveTo(s.x + s.radius, s.y);
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        }
        ctx.globalAlpha = isDark ? 0.65 : 0.35;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let tick = 0;
    let isLoopRunning = false;

    const render = () => {
      if (prefersReducedMotion) {
        renderStatic();
        return;
      }
      tick += 1;
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";
      const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

      for (let c = 0; c < colors.length; c++) {
        ctx.fillStyle = colors[c];
        for (const s of stars) {
          if (s.colorIndex !== c) continue;

          s.y -= s.speed;
          if (s.y < 0) {
            s.y = height;
            s.x = Math.random() * width;
          }

          const currentAlpha =
            s.alpha *
            (0.65 + 0.35 * Math.sin(tick * s.twinkleSpeed + s.phase)) *
            (isDark ? 0.95 : 0.42);

          ctx.globalAlpha = Math.max(0.04, Math.min(1, currentAlpha));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isLoopRunning && !prefersReducedMotion && !document.hidden) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (isLoopRunning) {
        cancelAnimationFrame(animationFrameId);
        isLoopRunning = false;
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopLoop();
        renderStatic();
      } else {
        startLoop();
      }
    };
    mediaQuery.addEventListener?.("change", handleMotionChange);

    // Coalesce window resize with rAF to prevent layout thrashing
    const handleResize = () => {
      if (resizeFrameId !== null) return;
      resizeFrameId = requestAnimationFrame(() => {
        setupCanvasSize();
        if (prefersReducedMotion) {
          renderStatic();
        }
        resizeFrameId = null;
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Page Visibility API: Stop rAF when tab is hidden, resume when active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion) {
      renderStatic();
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      if (resizeFrameId !== null) cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-75 transition-opacity duration-500"
    />
  );
}
