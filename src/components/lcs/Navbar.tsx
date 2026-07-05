import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#languages", label: "Languages" },
  { href: "#faculty", label: "Faculty" },
  { href: "#batches", label: "Batches" },
  { href: "#contact", label: "Contact" },
];

const WHATSAPP = "https://wa.me/919769502401?text=Hi%2C+I+want+to+know+more+about+the+courses%21+";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
      >
        <div className="h-full w-full" style={{ background: "var(--gradient-primary)" }} />
      </motion.div>

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className={`fixed left-1/2 -translate-x-1/2 top-3 md:top-5 z-50 w-[95%] max-w-6xl rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-card py-2.5" : "bg-transparent py-3.5"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src="/lcs-logo.png"
              alt="Language Craft Studio Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-serif text-base md:text-lg tracking-wide whitespace-nowrap">
              Language Craft Studio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Enroll Now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-foreground"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden mt-3 border-t border-border px-4 pt-3 pb-2"
          >
            <div className="flex flex-col gap-3 text-sm">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex justify-center rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
