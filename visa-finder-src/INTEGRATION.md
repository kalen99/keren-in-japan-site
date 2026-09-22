# Integrate Japan Visa Finder into Your Site

Use these steps to add the visa finder as a route (e.g. `/visa-finder`) in your "keren in Japan" Next.js site.

---

## Step 1: Install dependencies

In your site project:

```bash
npm install framer-motion canvas-confetti
```

---

## Step 2: Copy folders

From `japan-visa-finder` into your site's `src/`:

| Copy from | Copy to |
|-----------|---------|
| `src/components/` | `src/components/` (merge) |
| `src/context/` | `src/context/` (merge) |
| `src/lib/` | `src/lib/` (merge) |
| `src/types/` | `src/types/` (merge) |

---

## Step 3: Copy public assets

From `japan-visa-finder` into your site's `public/`:

| Copy from | Copy to |
|-----------|---------|
| `public/celebrities/` | `public/celebrities/` |
| `public/keren-watermark.png` | `public/keren-watermark.png` |

---

## Step 4: Add CSS (if not already present)

Add these to your global CSS (e.g. `app/globals.css`):

```css
@keyframes gold-sparkle {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.85; }
}

@keyframes sparkle-twinkle {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.15); }
}

@keyframes gold-sheen {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## Step 5: Create the visa finder page

Create `app/visa-finder/page.tsx` (or `pages/visa-finder.tsx` for Pages Router):

```tsx
import { QuizProvider } from "@/context/QuizContext";
import { Quiz } from "@/components/Quiz";

export default function VisaFinderPage() {
  return (
    <QuizProvider>
      <main className="min-h-screen py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">Japan Visa Finder</h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Find your path to Japan
          </p>
          <Quiz />
        </div>
      </main>
    </QuizProvider>
  );
}
```

---

## Step 6: Ensure path alias

Your `tsconfig.json` should have:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step 7: Link from your site

Add a link to the visa finder, e.g.:

```tsx
<Link href="/visa-finder">Japan Visa Finder</Link>
```

---

## Checklist

- [ ] Dependencies installed (`framer-motion`, `canvas-confetti`)
- [ ] `src/components/` copied
- [ ] `src/context/` copied
- [ ] `src/lib/` copied
- [ ] `src/types/` copied
- [ ] `public/celebrities/` copied (with male & female images)
- [ ] `public/keren-watermark.png` copied
- [ ] CSS keyframes added
- [ ] `app/visa-finder/page.tsx` created
- [ ] `@/*` path alias configured
- [ ] Link added in navigation

---

## Troubleshooting

**Tailwind:** The visa finder uses Tailwind. If your site uses Tailwind, ensure `src/components/**` and `src/lib/**` are in your `tailwind.config.js` content paths.

**Conflicts:** If you have existing `QuizContext` or `Quiz` components, rename the visa finder's versions (e.g. `VisaQuizContext`, `VisaQuiz`) and update imports.
