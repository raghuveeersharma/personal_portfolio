import { useEffect, useRef } from "react";
import { prefersReducedMotion, subscribeReducedMotion } from "../animation";

const RADIUS = 170; // cursor influence, CSS px
const PULL = 0.55; // how far toward the cursor a star at distance 0 is drawn
const LINK = 90; // max distance for a constellation line near the cursor
const AREA_PER_STAR = 1500;
const MAX_STARS = 300;

/**
 * Cosmic star layer for the hero. Stars drift and twinkle on their own;
 * those near the pointer are drawn toward it and spring back when it
 * leaves, with faint lines linking the ones it has gathered.
 *
 * Canvas rather than DOM nodes: ~150 moving points updating every frame
 * would be a layout/paint cost, and this stays off the main thread's
 * React render path entirely. Colour is read from the canvas's computed
 * `color` (a token class), so the layer follows the theme with no
 * `resolvedTheme` and no literals here.
 *
 * Under reduced motion it draws one static frame and never listens to
 * the pointer. It also pauses while offscreen or the tab is hidden.
 */
const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    let stars = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let reduced = prefersReducedMotion();
    let color = "rgb(232 232 244)";
    let frame = 0;
    const mouse = { x: 0, y: 0, active: false };

    const seed = () => {
      const count = Math.min(MAX_STARS, Math.round((w * h) / AREA_PER_STAR));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 far → 1 near
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          hx: x, // home position
          hy: y,
          x,
          y,
          r: 0.7 + depth * 1.8,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.9,
          drift: 3 + depth * 7,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    function draw(t) {
      // Re-read the token occasionally so a theme switch is picked up.
      if (frame++ % 45 === 0) {
        color = getComputedStyle(canvas).color || color;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      const live = mouse.active && !reduced;

      for (const s of stars) {
        // Idle drift around the home point, deeper stars move more.
        const dx = Math.sin(t * 0.0002 * s.speed + s.phase) * s.drift;
        const dy = Math.cos(t * 0.00017 * s.speed + s.phase) * s.drift;
        let tx = s.hx + dx;
        let ty = s.hy + dy;

        if (live) {
          const mx = mouse.x - tx;
          const my = mouse.y - ty;
          const dist = Math.hypot(mx, my);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            const pull = f * f * PULL * (0.5 + s.depth * 0.5);
            tx += mx * pull;
            ty += my * pull;
          }
        }

        // Spring toward the target: stars trail the cursor and settle back.
        s.x += (tx - s.x) * 0.09;
        s.y += (ty - s.y) * 0.09;

        const twinkle = reduced
          ? 1
          : 0.65 + 0.35 * Math.sin(t * 0.002 * s.speed + s.phase);
        // Stars the cursor has gathered brighten and swell.
        const glow = live
          ? Math.max(0, 1 - Math.hypot(s.x - mouse.x, s.y - mouse.y) / RADIUS)
          : 0;
        ctx.globalAlpha = Math.min(
          1,
          (0.5 + s.depth * 0.5) * twinkle + glow * 0.4,
        );
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (1 + glow * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      if (live) {
        ctx.lineWidth = 0.8;
        const near = stars.filter(
          (s) => Math.hypot(s.x - mouse.x, s.y - mouse.y) < RADIUS * 0.8,
        );
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const d = Math.hypot(near[i].x - near[j].x, near[i].y - near[j].y);
            if (d < LINK) {
              ctx.globalAlpha = (1 - d / LINK) * 0.6;
              ctx.beginPath();
              ctx.moveTo(near[i].x, near[i].y);
              ctx.lineTo(near[j].x, near[j].y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !reduced && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(host);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const unsubscribe = subscribeReducedMotion((value) => {
      reduced = value;
      if (value) {
        stop();
        draw(0);
      } else {
        start();
      }
    });

    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-hero-text"
    />
  );
};

export default StarField;
