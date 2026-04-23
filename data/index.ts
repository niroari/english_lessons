import unit4 from "./lessons/unit4-workbook";
import type { Lesson } from "./lessons/unit4-workbook";

export type { Lesson };
export const lessons: Lesson[] = [unit4];
export const lessonMap: Record<string, Lesson> = Object.fromEntries(
  lessons.map((l) => [l.id, l])
);
