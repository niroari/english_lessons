import Link from "next/link";
import { lessons } from "@/data/index";

const colorDot: Record<string, string> = {
  grammar: "bg-[var(--grammar)]",
  words: "bg-[var(--words)]",
  listening: "bg-[var(--listening)]",
  writing: "bg-[var(--writing)]",
  neutral: "bg-[var(--muted)]",
};

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-1">
        English Lessons
      </h1>
      <p className="text-[var(--muted)] mb-8">Grade 7 — Hebrew Speakers</p>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lesson/${lesson.id}`}
            className="block bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--muted)] mb-1">
                  {lesson.unit} · {lesson.grade}
                </p>
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  {lesson.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {lesson.sections.map((s) => (
                    <span
                      key={s.id}
                      className="flex items-center gap-1 text-xs text-[var(--muted)] bg-[var(--muted-bg)] px-2 py-0.5 rounded-full"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colorDot[s.color]}`} />
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[var(--muted)] text-xl">›</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
