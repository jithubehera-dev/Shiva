# Happy Birthday — an interactive birthday experience

A nine-scene, cinematic birthday website built with React, TypeScript,
Tailwind CSS, and Framer Motion. It plays out as a private digital gift
rather than a page: invitation → sealed letter → floating message card →
memory fragments → quiet build-up → the reveal → a personal letter → a
memory archive → a final photograph.

---

## 1. Install

You'll need Node.js 18+ installed. From the project root:

```bash
npm install
```

## 2. Customize the birthday

Open **`src/config/birthday.ts`**. This is the only file you need to
touch — no component contains hard-coded names, messages, or photo paths.

```ts
export const birthdayConfig = {
  name: "YOUR_NAME",
  birthday: "YOUR_DATE",
  intro: { line1: "...", line2: "..." },
  messages: ["...", "...", "..."],   // shown across the letter + floating card scenes
  buildup: ["...", "...", "..."],     // the quiet lines just before the reveal
  letter: { greeting: "...", paragraphs: ["...", "...", "..."], signoff: "..." },
  memories: [ /* see below */ ],
  finalMessage: { line1: "...", line2: "...", line3: "..." },
  music: { enabled: true, source: "/music/birthday.wav" },
};
```

Every string above is what the visitor sees, in order. Edit freely — the
scenes just render whatever is here.

## 3. Add photos

Put images in **`public/photos/`** and reference them in `birthdayConfig.memories`:

```ts
memories: [
  { image: "/photos/photo1.jpg", caption: "The first time", date: "Summer, 2022", note: "" },
  { image: "/photos/photo2.jpg", caption: "That afternoon" },
  // ...as many as you like
],
```

- `caption` and `date` are optional and shown under each photo.
- `note` is optional and only appears when a photo is opened full-screen.
- The last entry in the list is used as the final photograph in the closing scene.
- You can list anywhere from 1 photo to as many as you want — both the
  memory-fragments scene and the archive scene adapt to however many you provide.
- If an image path is broken or missing, that photo is dropped from the
  layout instead of showing a broken-image icon — the experience keeps working.

Ten placeholder photos are already in `public/photos/` so the
site works immediately, out of the box, before you add real ones.

## 4. Add music (optional)

Drop an audio file (mp3, wav, etc.) into **`public/music/`**, then in the config:

```ts
music: {
  enabled: true,
  source: "/music/birthday.wav",
},
```

The sound control (bottom-left) only appears once `enabled` is `true`.
It never autoplays — the visitor has to press it, and volume fades in
and out rather than cutting sharply.

## 5. Run locally

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). Resize
your browser or open it on your phone to check both layouts — the
mobile experience is a deliberate vertical composition, not a shrunk
desktop one.

To produce a production build:

```bash
npm run build
npm run preview   # serve the built output locally to double-check it
```

## 6. Deploy to Vercel

The project is pre-configured (`vercel.json`) for zero-config deploys:

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, "Add New Project" → import the repo. Framework preset
   "Vite" will be detected automatically.
3. Deploy. Build command `npm run build`, output directory `dist` —
   already set in `vercel.json`, so the defaults work.

Or from the CLI, from the project root:

```bash
npm i -g vercel
vercel
```

---

## Project structure

```
src/
  config/birthday.ts       ← all personal content lives here
  components/
    BackgroundEffects.tsx  ← film grain + the ambient light motif
    MusicController.tsx    ← optional ambient sound, fades, never autoplays
    LoadingScreen.tsx       ← the brief hold on black before scene one
    PhotoLightbox.tsx       ← full-screen photo viewer, shared by two scenes
    scenes/
      IntroScene.tsx        ← 01 — the invitation
      LetterScene.tsx       ← 02 — the sealed letter
      MessageScene.tsx      ← 03 — the floating card
      MemoryScene.tsx       ← 04 — memory fragments
      BuildupScene.tsx      ← 05 — the quiet build-up (auto-advances)
      BirthdayReveal.tsx    ← 06 — the reveal
      FinalLetter.tsx       ← 07 — the personal letter
      MemoryArchive.tsx     ← 08 — the memory archive
      FinalScene.tsx        ← 09 — the final photograph
  hooks/useSceneEngine.ts   ← drives which scene is showing
  lib/scenes.ts             ← the scene order, one place to change it
public/
  photos/                   ← your images
  music/                    ← your ambient track (optional)
```

## Notes on quality

- Respects `prefers-reduced-motion` — every animation collapses to
  a near-instant transition if the visitor has that OS setting on.
- Every interactive element (envelope, card, photos, buttons) is
  keyboard-reachable and has a visible focus ring.
- Nothing autoplays — sound requires an explicit tap.
- The layout is designed mobile-first with intentional vertical
  composition; desktop adds cursor-driven ambient light and richer spacing.

## A note on the build

This project was written and reviewed for correctness (every file was
syntax-checked), but `npm install` / `npm run build` have not been run
end-to-end in the environment that generated it, since that environment
has no network access to the npm registry. Please run `npm install &&
npm run build` yourself as a final check before deploying — if anything
surfaces, it's most likely a dependency version bump rather than a
structural issue, since all the application code has been verified to
parse cleanly.
