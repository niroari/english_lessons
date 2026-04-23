"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Lesson, Section, Exercise } from "@/data/lessons/unit4-workbook";

// ─── Types ────────────────────────────────────────────────────────────────────

type Slide =
  | { kind: "section"; section: Section }
  | { kind: "exercise"; section: Section; exercise: Exercise };

function buildSlides(lesson: Lesson): Slide[] {
  const slides: Slide[] = [];
  for (const section of lesson.sections) {
    slides.push({ kind: "section", section });
    for (const exercise of section.exercises) {
      slides.push({ kind: "exercise", section, exercise });
    }
  }
  return slides;
}

// ─── Color palette (Tailwind classes, no CSS vars) ────────────────────────────

type ColorKey = Section["color"];

const C: Record<ColorKey, {
  headerBg: string; headerBorder: string;
  pill: string; label: string; accent: string;
  answerBg: string; answerBorder: string; answerText: string;
  dot: string; sectionTitle: string;
}> = {
  grammar: {
    headerBg: "bg-purple-50", headerBorder: "border-purple-400",
    pill: "bg-purple-100 text-purple-700", label: "bg-purple-600",
    accent: "text-purple-600", sectionTitle: "text-purple-700",
    answerBg: "bg-green-50", answerBorder: "border-green-300", answerText: "text-green-800",
    dot: "bg-purple-500",
  },
  words: {
    headerBg: "bg-cyan-50", headerBorder: "border-cyan-400",
    pill: "bg-cyan-100 text-cyan-700", label: "bg-cyan-600",
    accent: "text-cyan-600", sectionTitle: "text-cyan-700",
    answerBg: "bg-green-50", answerBorder: "border-green-300", answerText: "text-green-800",
    dot: "bg-cyan-500",
  },
  listening: {
    headerBg: "bg-emerald-50", headerBorder: "border-emerald-400",
    pill: "bg-emerald-100 text-emerald-700", label: "bg-emerald-600",
    accent: "text-emerald-600", sectionTitle: "text-emerald-700",
    answerBg: "bg-green-50", answerBorder: "border-green-300", answerText: "text-green-800",
    dot: "bg-emerald-500",
  },
  writing: {
    headerBg: "bg-amber-50", headerBorder: "border-amber-400",
    pill: "bg-amber-100 text-amber-700", label: "bg-amber-600",
    accent: "text-amber-600", sectionTitle: "text-amber-700",
    answerBg: "bg-green-50", answerBorder: "border-green-300", answerText: "text-green-800",
    dot: "bg-amber-500",
  },
  neutral: {
    headerBg: "bg-slate-50", headerBorder: "border-slate-400",
    pill: "bg-slate-100 text-slate-700", label: "bg-slate-600",
    accent: "text-slate-600", sectionTitle: "text-slate-700",
    answerBg: "bg-green-50", answerBorder: "border-green-300", answerText: "text-green-800",
    dot: "bg-slate-500",
  },
};

// ─── Content renderer (handles ¹______ blanks + **bold** + *italic*) ──────────

const SUP_INDEX: Record<string, number> = {
  "¹": 0, "²": 1, "³": 2, "⁴": 3, "⁵": 4,
  "⁶": 5, "⁷": 6, "⁸": 7, "⁹": 8, "⁰": 9,
};

function renderPassageLine(
  line: string,
  answers?: string[],
  showAnswer?: boolean
): string {
  return line
    .replace(/([¹²³⁴⁵⁶⁷⁸⁹])_{2,}(?:\s*\([^)]+\))?/g, (_, sup) => {
      const idx = SUP_INDEX[sup];
      if (showAnswer && answers?.[idx]) {
        return `<span class="inline-block bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded border border-green-300 text-base mx-0.5">${answers[idx]}</span>`;
      }
      return `<sup class="text-slate-400 text-xs font-bold mr-0.5">${idx + 1}</sup><span class="inline-block border-b-2 border-slate-500 min-w-[4rem] mx-0.5">&nbsp;</span>`;
    })
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WordBank({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
      {words.map((w) => (
        <span
          key={w}
          className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-lg font-medium text-slate-700"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

function AnswerPanel({
  exercise,
  c,
}: {
  exercise: Exercise;
  c: (typeof C)[ColorKey];
}) {
  if (!exercise.answers) return null;

  // For match exercises: show inline in the columns (handled there)
  if (exercise.type === "match") return null;

  // For reading/complete with content: answers shown inline in passage
  if (exercise.content && exercise.answers) return null;

  return (
    <div
      className={`mt-6 p-5 rounded-xl border ${c.answerBorder} ${c.answerBg}`}
    >
      <p className={`text-sm font-bold uppercase tracking-wide mb-3 ${c.answerText}`}>
        Answers
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {exercise.answers.map((ans, i) => (
          <span key={i} className="text-lg">
            <span className="text-slate-400 text-sm font-medium">{i + 1}.&nbsp;</span>
            <span className={`font-bold ${c.answerText}`}>{ans}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionSlide({ section }: { section: Section }) {
  const c = C[section.color];
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20 select-none">
      <p className="text-xl text-slate-400 mb-4 font-medium">pp. {section.pages}</p>
      <h2 className={`text-6xl font-extrabold mb-3 ${c.sectionTitle}`}>
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="text-3xl text-slate-600 font-semibold mb-4">
          {section.subtitle}
        </p>
      )}
      {section.reference && (
        <p className="text-lg text-slate-400 mt-2">{section.reference}</p>
      )}
      <p className="text-base text-slate-300 mt-10">Press → or click Next to start</p>
    </div>
  );
}

function ExerciseSlide({
  exercise,
  showAnswer,
  c,
}: {
  exercise: Exercise;
  showAnswer: boolean;
  c: (typeof C)[ColorKey];
}) {
  const diffDots = exercise.difficulty ? "▸".repeat(exercise.difficulty) + " " : "";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Instruction */}
      <div className="flex items-start gap-4 mb-6">
        {exercise.label && (
          <span
            className={`${c.label} text-white text-2xl font-extrabold w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1`}
          >
            {exercise.label}
          </span>
        )}
        <div className="flex-1">
          <p className="text-2xl font-bold leading-snug text-slate-800">
            <span className={`${c.accent} mr-1`}>{diffDots}</span>
            {exercise.instruction}
          </p>
          {exercise.hebrewInstruction && (
            <p
              className="text-lg text-slate-500 mt-1 leading-relaxed"
              dir="rtl"
            >
              {exercise.hebrewInstruction}
            </p>
          )}
        </div>
      </div>

      {/* Word bank */}
      {exercise.wordBank && <WordBank words={exercise.wordBank} />}

      {/* Note */}
      {exercise.note && (
        <p className="text-base text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-5">
          {exercise.note}
        </p>
      )}

      {/* MATCH */}
      {exercise.type === "match" && exercise.columnsA && exercise.columnsB && (
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2">A</p>
            {exercise.columnsA.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xl">
                <span className="text-slate-400 font-semibold w-6 shrink-0">{i + 1}.</span>
                <span className="flex-1">{item}</span>
                <span className="flex-none border-b-2 border-dashed border-slate-300 w-10" />
                {showAnswer && exercise.answers?.[i] && (
                  <span className="font-bold text-green-700 text-lg shrink-0">
                    {exercise.answers[i]}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2">B</p>
            {exercise.columnsB.map((item, i) => (
              <div key={i} className="text-xl text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      )}

      {/* READING PASSAGE (with inline blank fill) */}
      {exercise.content && (
        <div className="bg-slate-50 rounded-xl p-6 text-xl leading-loose border border-slate-200">
          {exercise.content.split("\n").filter(Boolean).map((line, i) => (
            <p
              key={i}
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: renderPassageLine(line, exercise.answers, showAnswer),
              }}
            />
          ))}
        </div>
      )}

      {/* ITEMS LIST (circle, complete, order, table, info, crossword-clue) */}
      {!exercise.content && exercise.items && exercise.type !== "match" && (
        <ol
          className={`space-y-3 ${
            exercise.items.length > 6 ? "grid grid-cols-2 gap-x-10 gap-y-3 space-y-0" : ""
          }`}
        >
          {exercise.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-xl">
              <span className="text-slate-400 font-semibold shrink-0 w-6">{i + 1}.</span>
              <span className="flex-1">{item}</span>
              {showAnswer && exercise.answers?.[i] && (
                <span className="font-bold text-green-700 shrink-0 text-lg ml-2">
                  → {exercise.answers[i]}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {/* WRITE — blank lines */}
      {exercise.type === "write" && (
        <div className="space-y-6 mt-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="border-b-2 border-dashed border-slate-300 h-10"
            />
          ))}
        </div>
      )}

      {/* Answer panel (non-passage, non-match types) */}
      {showAnswer && <AnswerPanel exercise={exercise} c={c} />}
    </div>
  );
}

// ─── Main presenter ───────────────────────────────────────────────────────────

export function LessonPresenter({ lesson }: { lesson: Lesson }) {
  const slides = buildSlides(lesson);
  const totalEx = slides.filter((s) => s.kind === "exercise").length;

  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState<Set<number>>(new Set());

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(slides.length - 1, idx)));
      setShowAnswer(false);
    },
    [slides.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
      if (e.key === " ") {
        e.preventDefault();
        setShowAnswer((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const slide = slides[current];
  const c = C[slide.section.color];

  // Count exercise index among exercise-only slides
  let exNum = 0;
  for (let i = 0; i <= current; i++) {
    if (slides[i].kind === "exercise") exNum++;
  }

  const isDone = slide.kind === "exercise" && done.has(current);
  const hasAnswers =
    slide.kind === "exercise" && !!slide.exercise.answers?.length;

  function toggleDone() {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* ── Top bar ── */}
      <div
        className={`flex items-center justify-between px-6 py-3 border-b-2 ${c.headerBorder} ${c.headerBg} shrink-0`}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-600 transition"
          >
            ← All lessons
          </Link>
          <span className="text-slate-300 select-none">|</span>
          <span className="font-bold text-slate-700 text-base">{lesson.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${c.pill}`}>
            {slide.section.title}
            {slide.section.subtitle ? ` — ${slide.section.subtitle}` : ""}
          </span>
          {slide.kind === "exercise" && (
            <span className="text-sm text-slate-500 font-medium">
              Ex {exNum} / {totalEx}
            </span>
          )}
          {slide.kind === "section" && (
            <span className="text-sm text-slate-400">pp. {slide.section.pages}</span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {slide.kind === "section" ? (
          <SectionSlide section={slide.section} />
        ) : (
          <ExerciseSlide
            exercise={slide.exercise}
            showAnswer={showAnswer}
            c={c}
          />
        )}
      </div>

      {/* ── Bottom nav ── */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white shrink-0">
        {/* Prev */}
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-semibold text-sm transition"
        >
          ← Prev
        </button>

        {/* Center: dots + action buttons */}
        <div className="flex items-center gap-3">
          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {slides.map((s, i) => {
              const isDoneSlide = done.has(i);
              const isCurrent = i === current;
              const isSection = s.kind === "section";
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  title={s.kind === "exercise" ? s.exercise.instruction : s.section.title}
                  className={`rounded-full transition-all ${
                    isSection ? "w-3 h-3" : "w-2 h-2"
                  } ${
                    isCurrent
                      ? `${c.dot} ring-2 ring-offset-1 ring-slate-400`
                      : isDoneSlide
                      ? "bg-green-400"
                      : isSection
                      ? "bg-slate-300"
                      : "bg-slate-200"
                  }`}
                />
              );
            })}
          </div>

          {/* Answer + Done buttons */}
          <div className="flex items-center gap-2 ml-2">
            {hasAnswers && (
              <button
                onClick={() => setShowAnswer((v) => !v)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                  showAnswer
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                }`}
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>
            )}
            {slide.kind === "exercise" && (
              <button
                onClick={toggleDone}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                  isDone
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-slate-500 border-slate-300 hover:bg-slate-50"
                }`}
              >
                {isDone ? "✓ Done" : "Mark Done"}
              </button>
            )}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-semibold text-sm transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
