export const birthdayConfig = {
  name: "Name",

  birthday: "07-10",

  intro: {
    eyebrow: "A little world made for you",
    title: "Before you enter…",
    subtitle:
      "There is something waiting for you.",
  },

  messages: [
    "Some people make ordinary moments feel different.",
    "Some memories stay brighter than others.",
    "And some people simply matter.",
  ],

  letter: {
    title: "A letter for you",

    paragraphs: [
      "Seeing you is always the best part of my day.",
      "Every time we meet, every place we've walked together, every step we've taken with you beside me — it's the part of my life I hold onto the most.",
      "I don't need anything big. Just you walking beside me is enough.",
    ],

    signoff: "With all my heart,",
  },

  loveList: [
    "Your eyes. I could get lost in them.",
    "The way I can't stop staring at you every time I see you.",
    "Just being with you feels like enough.",
    "Simply... you ♥",
  ],

  memories: Array.from(
    { length: 10 },
    (_, i) => ({
      image: `/photos/photo${i + 1}.jpg`,
      caption: `Memory ${String(i + 1).padStart(
        2,
        "0",
      )}`,
    }),
  ),

  finalMessage: {
    eyebrow: "07 · 10",
    title: "Happy Birthday",
    name: "Akshitha",
    subtitle:
      "May this year give you more moments worth remembering.",
  },
} as const;
