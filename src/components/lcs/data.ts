export const WHATSAPP =
  "https://wa.me/919769502401?text=Hi%2C+I+want+to+know+more+about+the+courses%21+";

export type LangKey = "french" | "spanish" | "japanese" | "german";

export const LANGUAGES: {
  key: LangKey;
  name: string;
  flag: string;
  tagline: string;
  intro: string;
  training?: string;
  funFacts: string[];
  levels: string[];
  levelLabel: string;
  accent: string;
}[] = [
  {
    key: "french",
    name: "French",
    flag: "🇫🇷",
    tagline: "The language of love & diplomacy",
    intro:
      "French is spoken by over 300 million people worldwide and is an official language in 29 countries. It's one of the six official languages of the United Nations. Known as the language of love, French has influenced English heavily, with nearly half of English vocabulary derived from French.",
    training:
      "Language Craft Studio provides high-quality French language training tailored for learners at all proficiency levels. Our experienced instructors use immersive and interactive teaching methods to build strong foundations in speaking, listening, reading, and writing.",
    funFacts: [
      'Longest word: "anticonstitutionnellement" — 25 letters!',
      "70 = soixante-dix (sixty-ten), 80 = quatre-vingts (four-twenties)",
      "L'Académie Française = France's \"word police\"",
    ],
    levels: [
      "A1 Beginner",
      "A2 Elementary",
      "B1 Intermediate",
      "B2 Upper Intermediate",
      "C1 Advanced",
      "C2 Proficient",
    ],
    levelLabel: "CEFR Levels",
    accent: "#7aa8ff",
  },
  {
    key: "spanish",
    name: "Spanish",
    flag: "🇪🇸",
    tagline: "The world's second most spoken language",
    intro:
      "Spanish is the second most spoken language in the world, with 21 countries using it as an official language. It's a beautiful language tied to a rich culture and history.",
    funFacts: ["495M+ native speakers", "Unique letter Ñ", "~4000 words from Arabic"],
    levels: ["A1", "A2", "B1", "B2"],
    levelLabel: "CEFR Levels",
    accent: "#ff9b6a",
  },
  {
    key: "japanese",
    name: "Japanese",
    flag: "🇯🇵",
    tagline: "Three scripts, one fascinating world",
    intro:
      "The Japanese language is fascinating and complex with a unique writing system. Japanese uses three main systems: Hiragana, Katakana, and Kanji.",
    funFacts: [
      "Three writing systems: ひらがな, カタカナ, 漢字",
      "No plurals — context is everything",
      "English loanwords: コンピューター = computer",
    ],
    levels: ["N5", "N4", "N3", "N2", "N1"],
    levelLabel: "JLPT Levels",
    accent: "#ff8dd6",
  },
  {
    key: "german",
    name: "German",
    flag: "🇩🇪",
    tagline: "Precision, poetry & compound wonders",
    intro:
      "German is spoken by more than 130 million people worldwide. Most widely spoken native language in the EU.",
    funFacts: [
      'Compound words like "Donaudampfschifffahrtsgesellschaftskapitän"',
      "Unique words: Fernweh, Kummerspeck, Schadenfreude",
      "ALL nouns are capitalized",
    ],
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    levelLabel: "CEFR Levels",
    accent: "#ffe27a",
  },
];

export const FACULTY = [
  {
    name: "Parimita Ponkshe",
    initials: "PP",
    image: "/parimiti.jpg",
    lang: "🇯🇵 Japanese Faculty",
    creds: "BMM (Advertising), Advanced Diploma in Japanese, JLPT N2",
    bio: "I have been in the Japanese language field for the past 8 years. As a Japanese language Trainer, I meet various students from different backgrounds and age groups. Each student has a different perspective to offer about the Japanese language. Every single student inspires me so I take all the motivation to create and make class as fun and fulfilling as it can be.",
  },
  {
    name: "Akshay Apte",
    initials: "AA",
    image: "/Akshay-TLS.jpg",
    lang: "🇫🇷 French Faculty",
    creds: "M.A French, C1",
    bio: "I have done my bachelor's and master's both in French, studying literature, translation, didactics, subtitling and more. Languages are more than simple mediums of communication — each language has a whole new world of itself, and it's definitely interesting to help like-minded language enthusiasts to discover it.",
  },
  {
    name: "Sonal Chede",
    initials: "SC",
    image: "/sonal-TLS.jpg",
    lang: "🇫🇷 French Faculty",
    creds: "M.A French, B2",
    bio: "Sonal has pursued her Master's degree in French at SPPU. She completed her B2 from Alliance Française Pune and participated in a cultural immersion in Strasbourg and Montpellier. She worked as a Language Assistant in France for 7 months and has nearly 6 years of experience as a French Language Facilitator in an IB World School.",
  },
  {
    name: "Madhura Susladkar",
    initials: "MS",
    image: "/madhura-tls.jpg",
    lang: "🇪🇸 Spanish Faculty",
    creds: "M.A Spanish, C1",
    bio: "I have completed Master's Degree in Spanish from SPPU and have been teaching Spanish for over 4 years. I possess C1 level and spent an academic year in Spain itself. I specialize in building confidence in young learners through games, songs, storytelling, and real-life conversations.",
  },
  {
    name: "Savani Barve",
    initials: "SB",
    image: "/Savani-tls.jpg",
    lang: "🇫🇷 French Faculty",
    creds: "M.A French, DELF B2",
    bio: "I have been teaching French for five years, and it remains a true passion of mine. Every lesson is an opportunity to connect with people, spark curiosity, and open doors to new experiences.",
  },
];

export type Batch = {
  course: string;
  batch: string;
  type: string;
  hours: string;
  start: string;
  fees: string;
};

export const BATCHES: Record<LangKey, Batch[]> = {
  french: [
    {
      course: "A1",
      batch: "Batch 1",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Nov 2025",
      fees: "₹14,000",
    },
    {
      course: "A2",
      batch: "Batch 1",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st Jan 2026",
      fees: "₹16,000",
    },
    {
      course: "A1",
      batch: "Batch 2",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Feb 2026",
      fees: "₹14,000",
    },
    {
      course: "A2",
      batch: "Batch 2",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st May 2026",
      fees: "₹16,000",
    },
    {
      course: "A1",
      batch: "Batch 3",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st May 2026",
      fees: "₹14,000",
    },
    {
      course: "A2",
      batch: "Batch 3",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st Sept 2026",
      fees: "₹16,000",
    },
  ],
  spanish: [
    {
      course: "A1",
      batch: "Batch 1",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Nov 2025",
      fees: "₹14,000",
    },
    {
      course: "B1",
      batch: "Batch 1",
      type: "Weekday",
      hours: "125 Hrs",
      start: "1st Nov 2025",
      fees: "₹20,000",
    },
    {
      course: "A2",
      batch: "Batch 1",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st Jan 2026",
      fees: "₹16,000",
    },
    {
      course: "A1",
      batch: "Batch 2",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Feb 2026",
      fees: "₹14,000",
    },
    {
      course: "B1",
      batch: "Batch 2",
      type: "Weekday",
      hours: "125 Hrs",
      start: "1st Apr 2026",
      fees: "₹20,000",
    },
    {
      course: "A2",
      batch: "Batch 2",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st May 2026",
      fees: "₹16,000",
    },
    {
      course: "A1",
      batch: "Batch 3",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st May 2026",
      fees: "₹14,000",
    },
    {
      course: "A2",
      batch: "Batch 3",
      type: "Weekday",
      hours: "100 Hrs",
      start: "1st Sept 2026",
      fees: "₹16,000",
    },
  ],
  japanese: [
    {
      course: "N5",
      batch: "Batch 1",
      type: "Weekday",
      hours: "80 Hrs",
      start: "1st Jan 2026",
      fees: "₹16,000",
    },
    {
      course: "N4",
      batch: "Batch 1",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Jan 2026",
      fees: "₹20,000",
    },
    {
      course: "N5",
      batch: "Batch 2",
      type: "Weekday",
      hours: "80 Hrs",
      start: "1st Jan 2026",
      fees: "₹16,000",
    },
    {
      course: "N4",
      batch: "Batch 2",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st July 2026",
      fees: "₹20,000",
    },
    {
      course: "N5",
      batch: "Batch 3",
      type: "Weekday",
      hours: "80 Hrs",
      start: "1st July 2026",
      fees: "₹16,000",
    },
  ],
  german: [
    {
      course: "A1",
      batch: "Batch 1",
      type: "Weekday",
      hours: "90 Hrs",
      start: "20th Nov 2025",
      fees: "₹14,000",
    },
    {
      course: "A1",
      batch: "Batch 2",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Feb 2026",
      fees: "₹14,000",
    },
    {
      course: "A1",
      batch: "Batch 3",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st May 2026",
      fees: "₹14,000",
    },
    {
      course: "A1",
      batch: "Batch 4",
      type: "Weekday",
      hours: "90 Hrs",
      start: "1st Aug 2026",
      fees: "₹14,000",
    },
  ],
};
