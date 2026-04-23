# English Lessons — Project Summary

## What This Is
A private companion website for English lessons taught to Grade 7 Hebrew-speaking students. Used by the teacher during class. New lessons are added by Claude before each session and auto-deploy to the live URL.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui, design tokens in `globals.css`
- **Hosting:** Vercel (auto-deploys on every push to `main`)
- **Repo:** https://github.com/niroari/english_lessons
- **No database** — lesson content lives as TypeScript data files in the repo

## Project Structure
```
/app
  page.tsx                  ← home page (lesson list)
  lesson/[id]/page.tsx      ← dynamic lesson page
  globals.css               ← all design tokens (colors, etc.)
  layout.tsx

/components
  SectionBadge.tsx          ← colored section header
  ExerciseBlock.tsx         ← renders any exercise type

/data
  index.ts                  ← exports all lessons + lessonMap
  lessons/
    unit4-workbook.ts       ← Unit 4 lesson data (types defined here too)
```

## How Lessons Work
Each lesson is a `Lesson` object with `sections[]`, each section has `exercises[]`.

**To add a new lesson:**
1. Create `data/lessons/<id>.ts` following the same structure
2. Import and add it to the `lessons` array in `data/index.ts`
3. Push → Vercel auto-deploys

**Exercise types supported:** `match`, `circle`, `fill-in`, `complete`, `reading`, `table`, `crossword-clue`, `write`, `order`, `info`

**Section colors:** `grammar` (purple), `words` (teal), `listening` (green), `writing` (amber), `neutral`

## Current Lessons

### Unit 4 Workbook — pp. 108–124
| Section | Pages | Content |
|---------|-------|---------|
| Grammar 1 | 108–110 | Past Simple Positive — reflexive pronouns, verb maze, irregular verbs chart, Flannan Island fill-in |
| Words 1 + Read & Spell | 112–114 | Vocabulary: furniture, ceiling, carpet, brain, examine, everywhere… Vowel sounds, crossword |
| Grammar 2 | 119–120 | Past Simple Negative & Questions — A Great Vacation, Harry Houdini |
| Listening & Speaking | 121–123 | Mystery of Roanoke Island — new words, podcast questions, email writing |
| Writing | 124 | A Past Experience — sequencing, connectors (First / Next / Then / Finally) |

## Workflow
1. Tell Claude what the next lesson covers (topic, pages, workbook file if new)
2. Claude builds the lesson data file and pushes to GitHub
3. Vercel deploys automatically (~1 min)
4. Open the URL in class
