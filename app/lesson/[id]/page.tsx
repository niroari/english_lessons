import { notFound } from "next/navigation";
import { lessonMap } from "@/data/index";
import { LessonPresenter } from "@/components/LessonPresenter";

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

  return <LessonPresenter lesson={lesson} />;
}
