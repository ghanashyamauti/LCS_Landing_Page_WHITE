import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Globe2,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Facebook,
  MessageCircle,
  Sparkles,
  Heart,
  Users,
  Target,
  ShieldCheck,
  Rainbow,
  Quote,
  Star,
  Volume2,
  Award as AwardBadge,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Scene from "@/components/lcs/Scene";
import Preloader from "@/components/lcs/Preloader";
import Navbar from "@/components/lcs/Navbar";
import SmoothScroll from "@/components/lcs/SmoothScroll";
import AmbientAudio from "@/components/lcs/AmbientAudio";
import { WHATSAPP, LANGUAGES, FACULTY, BATCHES, type LangKey } from "@/components/lcs/data";
import frenchImg from "@/assets/lang-french.jpg";
import spanishImg from "@/assets/lang-spanish.jpg";
import japaneseImg from "@/assets/lang-japanese.jpg";
import germanImg from "@/assets/lang-german.jpg";

import frenchImgNew from "@/assets/lang-french-new.png";
import spanishImgNew from "@/assets/lang-spanish-new.png";
import japaneseImgNew from "@/assets/lang-japanese-new.png";
import germanImgNew from "@/assets/lang-german-new.png";
import heroTexture from "@/assets/hero-texture.jpg";

const LANG_IMAGES: Record<LangKey, string> = {
  french: frenchImg,
  spanish: spanishImg,
  japanese: japaneseImg,
  german: germanImg,
};

const LANG_IMAGES_NEW: Record<LangKey, string> = {
  french: frenchImgNew,
  spanish: spanishImgNew,
  japanese: japaneseImgNew,
  german: germanImgNew,
};

export const Route = createFileRoute("/")({
  component: Index,
});

const PreloaderContext = createContext<boolean>(false);

/* -------- helpers -------- */

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const preloaderDone = useContext(PreloaderContext);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView && preloaderDone ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const preloaderDone = useContext(PreloaderContext);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || !preloaderDone) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, preloaderDone, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function FloatingGlow({
  className = "",
  color = "bg-primary",
  delay = 0,
  size = "w-[30vw] h-[30vw]",
}: {
  className?: string;
  color?: string;
  delay?: number;
  size?: string;
}) {
  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, 40, -30, 0],
        y: [0, -30, 20, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`pointer-events-none absolute rounded-full filter blur-[90px] opacity-[0.55] ${size} ${color} ${className}`}
    />
  );
}

function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-xs tracking-widest uppercase text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="mt-5 text-4xl md:text-6xl font-serif tracking-tight">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------- main page -------- */

function Index() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <PreloaderContext.Provider value={preloaderDone}>
      <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <Preloader onComplete={() => setPreloaderDone(true)} />
        <SmoothScroll />
        <Navbar isReady={preloaderDone} />
        <BackdropGlow />

        <Hero />
        <Stats />
        <Marquee />
        <About />
        <Languages />
        <Awards />
        <Testimonials />
        <CTA />
        <Faculty />
        <Batches />
        <Values />
        <Contact />
        <Footer />

        <FloatingSocial />
        <AmbientAudio />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] grain-overlay" />
      </div>
    </PreloaderContext.Provider>
  );
}

function BackdropGlow() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1500], [0, -200]);
  return (
    <motion.div style={{ y }} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--bg-grid-color) 1px, transparent 0)",
          backgroundSize: "42px 42px",
        }}
      />
    </motion.div>
  );
}

const POSTCARD_BACK_DATA = {
  french: {
    level: "CEFR A1 - C2",
    tutor: "Akshay Apte / Sonal Chede",
    nextBatch: "1st Nov 2025",
    curriculum: ["Grammar Essentials", "Conversational Skills", "DELF/DALF Prep", "French Culture"]
  },
  spanish: {
    level: "CEFR A1 - B2",
    tutor: "Madhura Susladkar",
    nextBatch: "1st Nov 2025",
    curriculum: ["Core Vocabulary", "Dynamic Dialogues", "DELE Prep", "Hispanic Culture"]
  },
  japanese: {
    level: "JLPT N5 - N1",
    tutor: "Parimita Ponkshe",
    nextBatch: "1st Nov 2025",
    curriculum: ["Hiragana & Katakana", "SDF Kanji & Grammar", "JLPT Preparation", "Japanese Etiquette"]
  },
  german: {
    level: "CEFR A1 - C2",
    tutor: "German Faculty Team",
    nextBatch: "1st Nov 2025",
    curriculum: ["Sentence Structure", "Compound Words", "Goethe Prep", "Conversational Drills"]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 16
    }
  }
};

interface PostcardProps {
  lang: string;
  flag: string;
  img: string;
  greeting: string;
  tilt: number;
  details: typeof POSTCARD_BACK_DATA.french;
}

function Postcard({ lang, flag, img, greeting, tilt, details }: PostcardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full aspect-[1.48] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      {/* SVG Thumbtack */}
      <svg
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 drop-shadow-md z-30 pointer-events-none transition-transform duration-300"
        style={{ transform: `translateX(-50%) translateY(${isHovered ? "-3px" : "0px"})` }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="10" r="7" fill="url(#brass-grad)" />
        <circle cx="12" cy="10" r="4.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <path d="M12 10v8" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <motion.div
        animate={{
          rotate: isHovered ? 0 : tilt,
          rotateY: isHovered ? 180 : 0,
          scale: isHovered ? 1.05 : 1,
          z: isHovered ? 40 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.33, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative w-full h-full rounded-2xl transition-shadow duration-300 ${isHovered ? "shadow-2xl" : "shadow-md"
          }`}
      >
        {/* FRONT FACE */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-card border border-border/40"
        >
          <img src={img} alt={lang} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/25" />

          {/* Stamp top right */}
          <div className="absolute top-2 right-2 w-9 h-12 border border-dashed border-white/50 bg-white/25 backdrop-blur-[1px] p-0.5 rounded-sm shadow-inner flex flex-col items-center justify-center text-[7px] text-white/90 font-serif leading-none">
            <span className="scale-90 origin-center font-bold">ATELIER</span>
            <span className="text-[9px] mt-1 font-bold">₹5</span>
          </div>

          {/* Postmark top right next to stamp */}
          <div className="absolute top-3 right-12 w-9 h-9 border border-dashed border-white/30 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-[0.5px] rotate-[12deg] scale-90">
            <span className="text-sm leading-none">{flag}</span>
          </div>

          {/* Greeting in corner */}
          <div className="absolute bottom-3 left-3 text-left">
            <span className="display-serif italic font-normal tracking-wide text-white text-2xl drop-shadow-md">
              {greeting}
            </span>
            <p className="text-[9px] text-white/80 font-medium tracking-widest uppercase mt-0.5">
              {lang}
            </p>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#faf6ee] text-[#2c221e] border-2 border-[#e6dfd3] p-3 flex flex-col justify-between shadow-inner"
        >
          {/* Airmail top border */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#ffffff_10px,#ffffff_20px,#3b82f6_20px,#3b82f6_30px,#ffffff_30px,#ffffff_40px)] rounded-t-2xl" />

          <div className="text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dashed border-[#e6dfd3] pb-1.5 mt-1">
              <div>
                <h4 className="font-serif text-sm font-semibold leading-tight text-[#4c3931]">{lang} Course</h4>
                <p className="text-[9px] text-[#8a5b29] font-medium tracking-wide">{details.level}</p>
              </div>
              <span className="text-xl leading-none">{flag}</span>
            </div>

            {/* Curriculum Highlights */}
            <div className="mt-2 space-y-1">
              <p className="text-[7.5px] uppercase tracking-wider text-muted-foreground font-semibold">8-Week Highlights</p>
              <ul className="grid grid-cols-2 gap-x-1.5 gap-y-0.5 text-[9px] leading-tight text-[#4c3931]/95">
                {details.curriculum.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1 min-w-0">
                    <span className="text-[#a16207] scale-75">★</span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tutor & Batch details */}
              <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-[#e6dfd3] mt-2">
                <div className="min-w-0">
                  <p className="text-[7.5px] uppercase tracking-wider text-muted-foreground font-semibold">Tutor</p>
                  <p className="text-[9px] font-medium truncate text-[#4c3931]">{details.tutor}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[7.5px] uppercase tracking-wider text-muted-foreground font-semibold">Next Batch</p>
                  <p className="text-[9px] font-medium truncate text-[#4c3931]">{details.nextBatch}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send details airmail CTA */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="w-full h-8 flex items-center justify-center text-[11px] font-semibold rounded-lg bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-md border-b-2 border-[#7f1d1d] transition-all hover:translate-y-[0.5px] text-center"
          >
            Send me details
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------- Hero -------- */
function Hero() {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 350, 750], [0, 0, -100]);
  const titleOpacity = useTransform(scrollY, [0, 350, 650], [1, 1, 0]);

  const [showCanvas, setShowCanvas] = useState(true);
  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setShowCanvas(latest < 950);
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D scene backdrop */}
      {showCanvas && (
        <div className="absolute inset-0">
          <Scene />
        </div>
      )}
      {/* gradient scrim so text is legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, var(--hero-scrim-start) 0%, var(--hero-scrim-mid) 55%, var(--hero-scrim-end) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />

      {/* Overlay content */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 md:px-8 pt-24 pb-12 max-w-full overflow-x-hidden box-border"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-full box-border">
          {/* Left Column - text & details */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left max-w-full box-border">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase text-foreground/80 backdrop-blur max-w-full box-border">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_18px_var(--brand-1)]" />
                Language Craft Studio · Pune · Est. 2015
              </span>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="mt-3 display-serif text-[2.8rem] sm:text-5xl md:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.5rem] leading-[1.0] lg:leading-[0.95] text-foreground max-w-full box-border">
                Master the
                <br />
                Languages of
                <br />
                <span
                  className="italic text-gradient"
                  style={{
                    fontVariationSettings: '"SOFT" 100, "WONK" 1',
                  }}
                >
                  the world.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-foreground/75 mx-auto md:mx-0 max-w-full box-border">
                Welcome to Pune's premium language learning atelier. We offer immersive, expert-led training in <strong>French, Spanish, Japanese, and German</strong>. Tailored for study abroad, global career opportunities, and exam success (CEFR & JLPT).
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3 w-full max-w-full box-border">
                <MagneticHeroButtons />
              </div>
            </Reveal>

            <Reveal delay={0.65}>
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-foreground/60 w-full max-w-full box-border">
                <span>10+ Years</span>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <span>4 Languages</span>
                <span className="h-1 w-1 rounded-full bg-foreground/20" />
                <span>600+ Students</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Postcard Wall Collage */}
          <div className="w-full md:w-1/2 flex items-center justify-center max-w-full box-border">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="relative w-full max-w-full md:max-w-[620px] p-4 md:p-6 rounded-[2.5rem] border border-primary/15 shadow-xl select-none bg-[#f5f2eb] overflow-hidden -translate-y-6 box-border"
            >
              {/* Linen canvas grid texture */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
                  backgroundSize: "14px 14px"
                }}
              />

              {/* Postcards grid */}
              <div className="grid grid-cols-2 gap-4 relative z-10 w-full max-w-full box-border">
                <Postcard
                  lang="French"
                  flag="🇫🇷"
                  img="/postcard-france.png"
                  greeting="Bonjour!"
                  tilt={-6}
                  details={POSTCARD_BACK_DATA.french}
                />
                <Postcard
                  lang="Spanish"
                  flag="🇪🇸"
                  img="/postcard-spain.png"
                  greeting="¡Hola!"
                  tilt={4}
                  details={POSTCARD_BACK_DATA.spanish}
                />
                <Postcard
                  lang="Japanese"
                  flag="🇯🇵"
                  img="/postcard-japan.png"
                  greeting="こんにちは"
                  tilt={-3}
                  details={POSTCARD_BACK_DATA.japanese}
                />
                <Postcard
                  lang="German"
                  flag="🇩🇪"
                  img="/postcard-germany.png"
                  greeting="Guten Tag!"
                  tilt={7}
                  details={POSTCARD_BACK_DATA.german}
                />
              </div>

              {/* Brass thumbtack gradients definitions */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <radialGradient id="brass-grad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#854d0e" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Airmail red-and-blue striped border at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 w-full pointer-events-none"
        style={{
          background: "repeating-linear-gradient(45deg, #ef4444, #ef4444 15px, #ffffff 15px, #ffffff 30px, #3b82f6 30px, #3b82f6 45px, #ffffff 45px, #ffffff 60px)"
        }}
      />
    </section>
  );
}

/* -------- Stats -------- */
function Stats() {
  const items = [
    {
      icon: <Award className="h-6 w-6" />,
      big: <Counter to={10} suffix="+" />,
      title: "Years of Experience",
      body: "With over a decade of experience, we've been empowering language learners through structured, engaging, and effective training.",
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      big: <Counter to={4} />,
      title: "Languages Offered",
      body: "We offer expertly curated courses in four major global languages, guided by certified instructors and tailored to suit diverse learner needs.",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      big: <Counter to={600} suffix="+" />,
      title: "Students Trained",
      body: "Trusted by hundreds, we've helped 600+ students achieve their language goals through personalized attention and proven methodology.",
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="glass-card group h-full rounded-3xl p-8 transition-transform hover:-translate-y-1">
              <div
                className="mb-6 grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                {it.icon}
              </div>
              <div className="font-serif text-5xl md:text-6xl text-gradient">{it.big}</div>
              <h3 className="mt-3 font-serif text-2xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------- About -------- */
function About() {
  const features = [
    { icon: "🎯", title: "Personalized Learning Paths" },
    { icon: "🌐", title: "Cultural Immersion" },
    { icon: "👨‍🏫", title: "Expert Certified Faculty" },
    { icon: "📜", title: "CEFR / JLPT Aligned" },
  ];
  return (
    <section id="about" className="relative py-24 scroll-mt-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-border/60 shadow-[0_30px_60px_-30px_rgba(60,20,20,0.35)]">
            <img
              src={heroTexture}
              alt="A quiet study — an open book, lavender, and espresso"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.03_40_/_0.75)] via-[oklch(0.2_0.03_40_/_0.15)] to-transparent" />
            <div className="absolute top-5 left-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] tracking-widest uppercase text-white backdrop-blur">
              Est. 2015 · Pune
            </div>
            <div className="absolute inset-x-6 bottom-6 text-white">
              <div className="mb-3 flex gap-3 text-2xl">
                <span>🇫🇷</span>
                <span>🇪🇸</span>
                <span>🇯🇵</span>
                <span>🇩🇪</span>
              </div>
              <h3 className="font-serif text-3xl leading-tight">Language Craft Studio</h3>
              <p className="mt-2 text-xs italic text-white/80">
                A quiet craft, a lifelong fluency.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs tracking-widest uppercase text-primary">Our Story</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight">
              Crafting Global <span className="text-gradient italic">Communicators</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Language Craft Studio, formerly known as The Language Studio, was born out of a
              passion for teaching and a desire to streamline language education. While teaching in
              traditional settings, the tutors recognized the need for a more comprehensive,
              dynamic, and modern approach.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This paved the way for a method that seamlessly integrates the 'rules-based'
              foundation of grammar with practical, real-world use of language, including cultural
              nuances. We aspire to offer a holistic platform for all language needs, enabling
              learners and professionals to explore and develop proficiency in both foreign and
              Indian languages.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={0.35 + i * 0.05}>
                <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-sm">{f.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Languages -------- */
function Languages() {
  return (
    <section id="languages" className="relative py-24 scroll-mt-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Languages"
          title={
            <>
              Master a <span className="text-gradient italic">New Language</span>
            </>
          }
          sub="Choose from four globally in-demand languages, each taught by certified experts with real-world experience."
        />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGES.map((l, i) => (
            <Reveal key={l.key} delay={i * 0.08}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group relative h-full w-full overflow-hidden rounded-3xl text-left border border-border/60 bg-card shadow-[0_20px_50px_-30px_rgba(60,20,20,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(60,20,20,0.35)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={LANG_IMAGES[l.key]}
                        alt={l.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.03_40_/_0.85)] via-[oklch(0.2_0.03_40_/_0.25)] to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] tracking-widest uppercase text-white backdrop-blur">
                        <span>{l.flag}</span>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="absolute inset-x-5 bottom-5 text-white">
                        <h3 className="font-serif text-3xl leading-tight">{l.name}</h3>
                        <p className="mt-1 text-xs italic text-white/80">{l.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {l.levels.slice(0, 4).map((lv) => (
                          <span
                            key={lv}
                            className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {lv.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-primary">
                        Explore{" "}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-border bg-background/95 backdrop-blur-2xl shadow-2xl">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{l.flag}</span>
                    <div>
                      <h3 className="font-serif text-3xl text-foreground font-semibold">{l.name}</h3>
                      <p className="text-sm text-muted-foreground">{l.tagline}</p>
                    </div>
                    <div className="ml-auto">
                      <PronounceButton
                        text={
                          l.key === "french"
                            ? "Bonjour, bienvenue au studio"
                            : l.key === "spanish"
                              ? "Hola, bienvenido al estudio"
                              : l.key === "japanese"
                                ? "こんにちは、スタジオへようこそ"
                                : "Guten Tag, willkommen im Studio"
                        }
                        langCode={
                          l.key === "french"
                            ? "fr-FR"
                            : l.key === "spanish"
                              ? "es-ES"
                              : l.key === "japanese"
                                ? "ja-JP"
                                : "de-DE"
                        }
                        label="Hear greeting"
                      />
                    </div>
                  </div>
                  <div className="mt-4 max-h-[65vh] overflow-y-auto pr-2 space-y-5">
                    <p className="text-sm leading-relaxed text-foreground/90">{l.intro}</p>
                    {l.training && (
                      <div>
                        <h4 className="mb-2 text-xs tracking-widest uppercase text-primary font-semibold">
                          Our Training
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {l.training}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4 className="mb-2 text-xs tracking-widest uppercase text-primary font-semibold">
                        Fun Facts
                      </h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        {l.funFacts.map((f, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-primary font-semibold">{idx + 1}.</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs tracking-widest uppercase text-primary font-semibold">
                        {l.levelLabel}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {l.levels.map((lv, idx) => (
                          <span key={lv} className="flex items-center gap-2">
                            <span className="rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-xs">
                              {lv}
                            </span>
                            {idx < l.levels.length - 1 && (
                              <span className="text-muted-foreground">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Enroll for {l.name} <ArrowRight className="h-4 w-4" />
                  </a>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- CTA -------- */
function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center">
            <div
              className="absolute inset-0 -z-10 opacity-40"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="absolute inset-0 -z-10 bg-background/50" />
            <span className="text-xs tracking-widest uppercase text-primary">Let's Talk</span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight">
              Let's Create <span className="text-gradient italic">Something Great</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              We shift you from today's reality to tomorrow's potential, ensuring you become a
              confident, independent multilingual communicator.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="btn-glow inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                Let's Talk <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl border border-border bg-foreground/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur hover:bg-foreground/5"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------- Faculty -------- */
function Faculty() {
  return (
    <section id="faculty" className="relative py-24 scroll-mt-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Faculty"
          title={
            <>
              Learn From <span className="text-gradient italic">the Best</span>
            </>
          }
          sub="Our certified instructors bring years of teaching experience, cultural immersion, and a genuine passion for language education."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <Tilt className="h-full">
                <div
                  className="glass-card relative h-full overflow-hidden rounded-3xl p-5 flex flex-col"
                  data-cursor="hover"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-35 blur-3xl"
                    style={{ background: "var(--gradient-accent)", transform: "translateZ(30px)" }}
                  />

                  {/* Portrait photo container */}
                  <div
                    className="relative overflow-hidden rounded-2xl aspect-[4/5] w-full"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                    {/* Floating badge for language */}
                    <span
                      className="absolute bottom-3 left-3 rounded-xl bg-black/75 backdrop-blur-md px-3 py-1.5 text-[11px] tracking-wider uppercase text-white border border-white/10 flex items-center gap-1.5 shadow-lg"
                      style={{ transform: "translateZ(45px)" }}
                    >
                      {f.lang}
                    </span>
                  </div>

                  {/* Details section */}
                  <div className="mt-5 flex-grow" style={{ transform: "translateZ(25px)" }}>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground">
                      {f.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
                      {f.creds}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Batches -------- */
function Batches() {
  const tabs: { key: LangKey; label: string }[] = [
    { key: "french", label: "🇫🇷 French" },
    { key: "spanish", label: "🇪🇸 Spanish" },
    { key: "japanese", label: "🇯🇵 Japanese" },
    { key: "german", label: "🇩🇪 German" },
  ];
  return (
    <section id="batches" className="relative py-24 scroll-mt-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Upcoming Batches"
          title={
            <>
              Start Your <span className="text-gradient italic">Journey</span>
            </>
          }
        />
        <Reveal delay={0.15}>
          <div className="mt-12">
            <Tabs defaultValue="french" className="w-full">
              <TabsList className="glass-card mx-auto flex h-auto w-full max-w-2xl flex-wrap justify-center gap-1 rounded-2xl bg-transparent p-1.5">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.key}
                    value={t.key}
                    className="rounded-xl px-4 py-2 data-[state=active]:!bg-primary data-[state=active]:!text-primary-foreground data-[state=active]:shadow-md"
                    style={
                      {
                        // trigger active bg handled via className, but we override:
                      }
                    }
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((t) => (
                <TabsContent key={t.key} value={t.key} className="mt-8">
                  <div className="glass-card overflow-hidden rounded-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[720px] text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-xs tracking-widest uppercase text-muted-foreground">
                            <th className="px-5 py-4">Course</th>
                            <th className="px-5 py-4">Batch</th>
                            <th className="px-5 py-4">Type</th>
                            <th className="px-5 py-4">Hours</th>
                            <th className="px-5 py-4">Start Date</th>
                            <th className="px-5 py-4">Fees (Incl. taxes)</th>
                            <th className="px-5 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {BATCHES[t.key].map((b, i) => (
                            <tr
                              key={i}
                              className="border-b border-border/60 last:border-0 transition-colors hover:bg-foreground/[0.03]"
                            >
                              <td className="px-5 py-4 font-serif text-lg text-gradient">
                                {b.course}
                              </td>
                              <td className="px-5 py-4 text-muted-foreground">{b.batch}</td>
                              <td className="px-5 py-4 text-muted-foreground">{b.type}</td>
                              <td className="px-5 py-4">{b.hours}</td>
                              <td className="px-5 py-4">{b.start}</td>
                              <td className="px-5 py-4 font-medium">{b.fees}</td>
                              <td className="px-5 py-4 text-right">
                                <a
                                  href={WHATSAPP}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary hover:bg-primary/20"
                                >
                                  Apply <ArrowRight className="h-3 w-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------- Values -------- */
function Values() {
  const core = [
    { icon: <Sparkles className="h-5 w-5" />, title: "Excellence in Education" },
    { icon: <Globe2 className="h-5 w-5" />, title: "Cultural Appreciation" },
    { icon: <Target className="h-5 w-5" />, title: "Learner-Centric Approach" },
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Integrity & Transparency" },
    { icon: <Rainbow className="h-5 w-5" />, title: "Inclusivity & Diversity" },
  ];
  return (
    <section className="relative py-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Purpose"
          title={
            <>
              Our Mission <span className="text-gradient italic">& Values</span>
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full rounded-3xl p-8">
              <span className="text-xs tracking-widest uppercase text-primary">Mission</span>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                To cultivate globally competent individuals by delivering transformative language
                education in French, Japanese, Spanish, and German. Through expert instruction and
                personalized learning paths, we strive to unlock opportunities, foster cultural
                understanding and empower learners to thrive in a multilingual world.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card h-full rounded-3xl p-8">
              <span className="text-xs tracking-widest uppercase text-primary">Vision</span>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                To become a premier destination for language learning, where communication bridges
                cultures and creates global citizens. We envision a world where language is no
                longer a barrier but a gateway to connection, opportunity, and understanding.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {core.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {c.icon}
                </div>
                <p className="mt-4 text-sm font-medium">{c.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Contact -------- */
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [flying, setFlying] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFlying(true);
    const text = encodeURIComponent(
      `Hi Language Craft Studio,\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\n${form.message}`,
    );
    setTimeout(() => {
      window.open(`https://wa.me/919769502401?text=${text}`, "_blank");
      setFlying(false);
    }, 1400);
  };
  return (
    <section id="contact" className="py-24 scroll-mt-24">
      {flying && (
        <motion.div
          initial={{ x: "-30vw", y: "20vh", rotate: -15, opacity: 0 }}
          animate={{ x: "110vw", y: "-10vh", rotate: 20, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          className="pointer-events-none fixed top-1/2 left-0 z-[80]"
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#pgrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd08a" />
                <stop offset="60%" stopColor="#f26b6b" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "right center" }}
            className="absolute right-8 top-9 h-px w-56 bg-gradient-to-l from-transparent via-primary/70 to-transparent"
          />
        </motion.div>
      )}
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Get in Touch"
          title={
            <>
              Contact <span className="text-gradient italic">Us</span>
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full space-y-5 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">Address</p>
                  <a
                    href="https://www.google.com/maps/place/LanguageCraft+Studio/@18.5192503,73.8367219,17z/data=!4m6!3m5!1s0x3bc2bfdf2019e351:0xe5f0ed471ec30e5c!8m2!3d18.5192452!4d73.8392968!16s%2Fg%2F11tk4cp94y?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm leading-relaxed hover:text-primary transition-colors"
                  >
                    8 Sagar Apartments, behind Gupte Hospital, 906 Shivajinagar, Deccan Gymkhana,
                    Pune 411004
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">Email</p>
                  <a
                    href="mailto:thelanguagecraftstudio@gmail.com"
                    className="mt-1 block text-sm hover:text-primary"
                  >
                    thelanguagecraftstudio@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">Phone</p>
                  <a href="tel:+919769502401" className="mt-1 block text-sm hover:text-primary">
                    +91 9769 502 401
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="LanguageCraft Studio location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1979207865243!2d73.83672191539455!3d18.519250289139535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfdf2019e351%3A0xe5f0ed471ec30e5c!2sLanguageCraft%20Studio!5e0!3m2!1sen!2sin!4v1719946800000!5m2!1sen!2sin"
                  className="h-64 w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="glass-card grid h-full grid-cols-1 gap-4 rounded-3xl p-8 sm:grid-cols-2"
            >
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone", type: "tel" },
                { key: "subject", label: "Subject", type: "text" },
              ].map((f) => (
                <div key={f.key} className="sm:col-span-1">
                  <label className="mb-1.5 block text-xs tracking-widest uppercase text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full rounded-xl border border-border bg-foreground/[0.03] px-4 py-3 text-sm outline-none focus:border-primary/50 focus:bg-foreground/5"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs tracking-widest uppercase text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-foreground/[0.03] px-4 py-3 text-sm outline-none focus:border-primary/50 focus:bg-foreground/5"
                />
              </div>
              <button
                type="submit"
                className="btn-glow sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                Send via WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------- Footer -------- */
function Marquee() {
  const words = [
    "Bonjour",
    "こんにちは",
    "Hola",
    "Guten Tag",
    "Merci",
    "ありがとう",
    "Gracias",
    "Danke",
    "Amour",
    "愛",
    "Amor",
    "Liebe",
    "Voyage",
    "旅",
    "Viaje",
    "Reise",
  ];
  const row = [...words, ...words];
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothV = useSpring(velocity, { damping: 40, stiffness: 200, mass: 0.4 });
  const skew = useTransform(smoothV, [-1500, 0, 1500], [-6, 0, 6]);
  const speedShift = useTransform(smoothV, [-2000, 0, 2000], [-40, 0, 40]);
  return (
    <section
      aria-hidden
      className="relative border-y border-foreground/10 overflow-hidden"
      style={{ background: "linear-gradient(90deg,var(--secondary),var(--card),var(--secondary))" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{ background: "var(--gradient-accent)" }}
      />
      <motion.div
        style={{ skewX: skew, x: speedShift }}
        className="marquee-track flex gap-14 whitespace-nowrap py-7 md:py-10"
      >
        {row.map((w, i) => (
          <span
            key={i}
            className="display-serif italic text-4xl md:text-6xl text-foreground/90 flex items-center gap-14"
          >
            <span className="relative">
              {w}
              <span
                aria-hidden
                className="absolute inset-0 shimmer-sweep"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, var(--primary) 50%, transparent 70%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {w}
              </span>
            </span>
            <span className="text-primary text-3xl md:text-5xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* -------- Magnetic button helper -------- */
function useMagnetic<T extends HTMLElement>(strength = 22) {
  const ref = useRef<T | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 15, stiffness: 220, mass: 0.5 });
  const sy = useSpring(y, { damping: 15, stiffness: 220, mass: 0.5 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, x, y]);
  return { ref, style: { x: sx, y: sy } };
}

/* -------- Tilt wrapper for cards -------- */
function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 20, stiffness: 220 });
  const sry = useSpring(ry, { damping: 20, stiffness: 220 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      ry.set(dx * 14);
      rx.set(-dy * 14);
    };
    const reset = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [rx, ry]);
  return (
    <motion.div ref={ref} style={{ perspective: 1200 }} className={className}>
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* -------- Pronounce button (uses browser SpeechSynthesis) -------- */
function PronounceButton({
  text,
  langCode,
  label,
}: {
  text: string;
  langCode: string;
  label?: string;
}) {
  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode;
    u.rate = 0.9;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };
  return (
    <button
      onClick={speak}
      data-cursor="hover"
      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary hover:bg-primary/20"
    >
      <Volume2 className="h-3.5 w-3.5" />
      {label ?? "Hear it"}
    </button>
  );
}

/* -------- Awards / press strip -------- */
function MagneticHeroButtons() {
  const a = useMagnetic<HTMLAnchorElement>(18);
  const b = useMagnetic<HTMLAnchorElement>(14);
  return (
    <>
      <motion.a
        ref={a.ref}
        style={a.style}
        data-cursor="hover"
        href="#languages"
        className="btn-glow group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-medium text-primary-foreground"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          style={{ background: "var(--gradient-primary)" }}
        />
        Explore Languages
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.a>
      <motion.a
        ref={b.ref}
        style={b.style}
        data-cursor="hover"
        href="#about"
        className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-7 py-4 text-sm font-medium text-foreground/80 backdrop-blur hover:bg-foreground/10"
      >
        Our Story →
      </motion.a>
    </>
  );
}

function Awards() {
  const badges = [
    { icon: <AwardBadge className="h-5 w-5" />, label: "CEFR Aligned", note: "A1 – C2" },
    { icon: <BookOpen className="h-5 w-5" />, label: "JLPT Prep", note: "N5 – N2" },
    { icon: <Trophy className="h-5 w-5" />, label: "600+ Alumni", note: "Since 2015" },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "Certified Faculty",
      note: "Native + Trained",
    },
  ];
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="text-center text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            Recognised · Certified · Trusted
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {badges.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.06}>
              <div className="glass-card flex items-center gap-4 rounded-2xl px-5 py-4">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {b.icon}
                </div>
                <div>
                  <div className="font-serif text-lg leading-none">{b.label}</div>
                  <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {b.note}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Language Craft Studio turned a hobby into a professional edge. Within eight months I was interviewing in French — the pedagogy is honestly world-class.",
      name: "Aarav Deshpande",
      role: "Product Designer · Paris",
      lang: "French · B2",
    },
    {
      quote:
        "The Japanese cohort felt like a small salon. Nuance, culture, calligraphy — nothing was skipped. I cleared JLPT N4 on the first attempt.",
      name: "Ishita Rao",
      role: "Doctoral Researcher",
      lang: "Japanese · N4",
    },
    {
      quote:
        "Warm, rigorous, and beautifully paced. I now run client calls in Spanish and it changed my career trajectory entirely.",
      name: "Karan Malhotra",
      role: "Growth Lead, SaaS",
      lang: "Spanish · B1",
    },
  ];
  return (
    <section id="stories" className="relative py-28 scroll-mt-24 overflow-hidden">
      <FloatingGlow color="bg-primary" size="w-[450px] h-[450px]" className="-left-36 top-10" delay={0} />
      <FloatingGlow color="bg-accent" size="w-[400px] h-[400px]" className="-right-24 bottom-5" delay={5} />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Student Stories"
          title={
            <>
              Fluency, in <span className="italic text-gradient">their own words</span>
            </>
          }
          sub="Hundreds of learners, four languages, one common thread — a craft learnt patiently, joyfully, and for life."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="glass-card relative h-full rounded-3xl p-8 md:p-9">
                <Quote className="absolute -top-4 left-7 h-10 w-10 rounded-2xl bg-accent p-2 text-accent-foreground shadow-[var(--shadow-glow)]" />
                <div className="mb-4 flex items-center gap-0.5 text-accent">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-[1.35rem] leading-snug text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] tracking-widest uppercase text-primary">
                    {t.lang}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img
              src="/lcs-logo.png"
              alt="Language Craft Studio Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-serif text-lg">Language Craft Studio</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Be Multilingual, Be Independent. Premium language education in Pune since 2015.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              {
                href: "https://www.linkedin.com/company/82263010/",
                icon: <Linkedin className="h-4 w-4" />,
              },
              {
                href: "https://www.instagram.com/languagecraft_studio/",
                icon: <Instagram className="h-4 w-4" />,
              },
              {
                href: "https://www.facebook.com/The-Language-Studio-103295012277646",
                icon: <Facebook className="h-4 w-4" />,
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-foreground/[0.03] text-muted-foreground hover:text-primary hover:border-primary/40"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-primary">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["about", "languages", "faculty", "batches", "contact"].map((s) => (
              <li key={s}>
                <a href={`#${s}`} className="hover:text-foreground capitalize">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-primary">Languages</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {LANGUAGES.map((l) => (
              <li key={l.key}>
                <a href="#languages" className="hover:text-foreground">
                  {l.flag} {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-primary">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Deccan Gymkhana, Pune 411004
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" /> thelanguagecraftstudio@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" /> +91 9769 502 401
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border px-5 pt-6 text-xs text-muted-foreground md:flex-row">
        <p>©2026 Language Craft Studio. All Rights Reserved.</p>
        <p className="flex items-center gap-1.5">
          Crafted with <Heart className="h-3 w-3 fill-primary text-primary" /> in Pune, India
        </p>
      </div>
    </footer>
  );
}

/* -------- Floating social -------- */
function FloatingSocial() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="https://www.instagram.com/languagecraft_studio/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
        style={{
          background:
            "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        }}
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
