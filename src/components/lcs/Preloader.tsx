import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = [
  { text: "Bonjour", lang: "Français" },
  { text: "Hola", lang: "Español" },
  { text: "こんにちは", lang: "日本語" },
  { text: "Guten Tag", lang: "Deutsch" },
  { text: "Namaste", lang: "मराठी" },
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const step = setInterval(() => setIdx((i) => i + 1), 600);
    const end = setTimeout(() => {
      setDone(true);
      if (onComplete) {
        onComplete();
      }
    }, 3500);
    return () => {
      clearInterval(step);
      clearTimeout(end);
    };
  }, [onComplete]);

  const current = GREETINGS[Math.min(idx, GREETINGS.length - 1)];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#fbfaf7]"
        >
          {/* curtain wipes */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
            style={{ background: "linear-gradient(180deg,#faf8f5 0%,#f5f2eb 100%)" }}
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "linear-gradient(0deg,#faf8f5 0%,#f5f2eb 100%)" }}
          />

          {/* multilingual reveal */}
          <div className="relative z-10 flex min-h-[3.6rem] md:min-h-[5.4rem] items-baseline justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={current.text}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="display-serif italic text-5xl md:text-7xl"
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {current.text}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.p
            key={current.lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.15 }}
            className="relative z-10 mt-4 text-[11px] tracking-[0.4em] uppercase text-foreground/60"
          >
            {current.lang}
          </motion.p>

          <div className="relative z-10 mt-14 flex items-center gap-4">
            <img
              src="/lcs-logo.png"
              alt="Language Craft Studio Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-serif text-sm tracking-[0.35em] uppercase text-foreground/80">
              Language Craft Studio
            </span>
          </div>

          <div className="relative z-10 mt-6 h-[2px] w-64 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
              className="h-full w-full"
              style={{ background: "var(--gradient-primary)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
