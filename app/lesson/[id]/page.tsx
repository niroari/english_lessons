import { notFound } from "next/navigation";
import Link from "next/link";
import { lessonMap } from "@/data/index";
import { SectionHeader } from "@/components/SectionBadge";
import { ExerciseBlock } from "@/components/ExerciseBlock";

export function generateStaticParams() {
  return Object.keys(lessonMap).map((id) => ({ id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = lessonMap[id];
  if (!lesson) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 inline-block"
      >
        ← All lessons
      </Link>

      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-0.5">
        {lesson.title}
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">
        {lesson.unit} · {lesson.grade}
      </p>

      <div className="space-y-12">
        {lesson.sections.map((section) => (
          <section key={section.id}>
            <SectionHeader section={section} />
            <div className="space-y-5 mt-4">
              {section.exercises.map((ex) => (
                <ExerciseBlock key={ex.id} exercise={ex} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
