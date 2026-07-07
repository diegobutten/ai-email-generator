# Mailcraft — AI Email Generator (Frontend)

A frontend-only, mock-data-driven UI for an AI email generator. No backend or real
AI calls are wired up yet — `lib/mock-generator.ts` simulates the AI with a delay
and template-based text so every interaction (loading, success, error) is fully
demoable today, and swappable for a real API later.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · shadcn/ui-style
components (Radix primitives) · Framer Motion · Lucide React · next-themes

## Project structure

```
app/
  layout.tsx          Root layout: fonts, ThemeProvider, Navbar, Footer, Toaster
  page.tsx            Homepage assembly (wraps sections in EmailGeneratorProvider)
  globals.css         Design tokens (light/dark), glass utilities, reduced-motion

components/
  ui/                 Reusable primitives: Button, Input, Textarea, Select, Card,
                      Badge, Dialog, Tooltip, Toast/Toaster, Skeleton
  layout/             Navbar, Footer, ThemeToggle
  providers/          EmailGeneratorProvider (shares generator state across sections)
  features/           Page sections: Hero, Generator (form + AI output), Templates,
                      History, Features
  theme-provider.tsx  next-themes wrapper

hooks/
  use-email-generator.ts   Form state + generate/regenerate/improve/translate
  use-toast.ts             Toast queue (shadcn pattern)

lib/
  mock-data.ts        Templates, quick actions, history, features (mock content)
  mock-generator.ts   Simulated AI generation/improve/translate
  options.ts          Dropdown option lists (type, tone, language, length)
  icon-map.tsx         Icon-name -> Lucide component lookup
  utils.ts            cn(), word count, clipboard copy, .txt download

types/
  email.ts            Shared TypeScript interfaces
```

## What's mocked vs. real

- **Real**: all UI state, validation, animations, dark mode, responsive layout,
  toasts, clipboard copy, `.txt` download, template hand-off into the form.
- **Mocked**: the "AI" itself. Swap `lib/mock-generator.ts` for a real API call
  (e.g. to `/api/generate`) and the rest of the app — loading states, error
  states, regenerate/improve/translate — needs no changes, since they already
  operate on the same `GeneratedEmail` shape.

## Notes

- Color palette, dark mode (zinc-950), and animation types follow the original
  brief exactly (Indigo primary, Sky secondary, Emerald accent, Red error).
- Keyboard shortcut: `Ctrl/Cmd + Enter` in the prompt field triggers generation.
- All interactive elements have visible focus rings and `aria-*` labeling; motion
  respects `prefers-reduced-motion`.
