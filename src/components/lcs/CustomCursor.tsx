import { useEffect, useRef } from "react";

/**
 * Blended dual-ring cursor. Grows over [data-cursor="hover"] elements.
 * Hides on touch devices.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;

      const el = (e.target as HTMLElement)?.closest?.('[data-cursor="hover"], a, button');
      const nowHover = !!el;
      if (nowHover !== hovered) {
        hovered = nowHover;
        if (ring.current) {
          ring.current.style.width = hovered ? "72px" : "36px";
          ring.current.style.height = hovered ? "72px" : "36px";
          ring.current.style.background = hovered ? "rgba(255,208,138,0.18)" : "transparent";
          ring.current.style.borderColor = hovered
            ? "rgba(255,208,138,0.85)"
            : "rgba(255,255,255,0.55)";
        }
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 36,
          height: 36,
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition:
            "width 220ms cubic-bezier(.2,.7,.2,1), height 220ms cubic-bezier(.2,.7,.2,1), background 220ms, border-color 220ms",
        }}
      />
      <div
        ref={dot}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          background: "#ffd08a",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 18px rgba(255,208,138,0.75)",
        }}
      />
    </>
  );
}
