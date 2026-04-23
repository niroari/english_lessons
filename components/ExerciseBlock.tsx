import type { Exercise } from "@/data/lessons/unit4-workbook";

const dots = (n?: 1 | 2 | 3) =>
  n ? (
    <span className="text-[var(--accent)] font-bold text-sm mr-1">
      {"▸".repeat(n)}
    </span>
  ) : null;

function Instruction({ ex }: { ex: Exercise }) {
  return (
    <div className="mb-3">
      <div className="flex items-start gap-2">
        {ex.label && (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--primary)] text-white text-sm font-bold shrink-0 mt-0.5">
            {ex.label}
          </span>
        )}
        <div>
          <p className="font-semibold text-[var(--foreground)] leading-snug">
            {dots(ex.difficulty)}
            {ex.instruction}
          </p>
          {ex.hebrewInstruction && (
            <p className="text-sm text-[var(--muted)] mt-0.5 text-right" dir="rtl">
              {ex.hebrewInstruction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function WordBank({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-[var(--muted-bg)] rounded-lg">
      {words.map((w) => (
        <span key={w} className="bg-white border border-[var(--card-border)] rounded px-2 py-0.5 text-sm font-medium">
          {w}
        </span>
      ))}
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal list-inside space-y-2 text-sm">
      {items.map((item, i) => (
        <li key={i} className="text-[var(--foreground)]">
          {item}
        </li>
      ))}
    </ol>
  );
}

function MatchColumns({ colA, colB }: { colA: string[]; colB: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="space-y-1">
        <p className="font-semibold text-xs uppercase text-[var(--muted)] mb-2">A</p>
        {colA.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[var(--muted)] w-4 shrink-0">{i + 1}.</span>
            <span>{item}</span>
            <span className="ml-auto border-b border-dashed border-[var(--muted)] w-12" />
          </div>
        ))}
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xs uppercase text-[var(--muted)] mb-2">B</p>
        {colB.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function ReadingPassage({ content, note }: { content: string; note?: string }) {
  const lines = content.split("\n").filter(Boolean);
  return (
    <div className="bg-[var(--muted-bg)] rounded-lg p-4 text-sm leading-relaxed space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-bold text-base text-[var(--foreground)]">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />;
      })}
      {note && (
        <p className="text-xs text-[var(--muted)] border-t border-[var(--card-border)] pt-2 mt-2">
          {note}
        </p>
      )}
    </div>
  );
}

export function ExerciseBlock({ exercise }: { exercise: Exercise }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5 shadow-sm">
      <Instruction ex={exercise} />

      {exercise.wordBank && <WordBank words={exercise.wordBank} />}

      {exercise.note && exercise.type !== "reading" && (
        <p className="text-xs text-[var(--muted)] bg-yellow-50 border border-yellow-200 rounded px-3 py-2 mb-3">
          {exercise.note}
        </p>
      )}

      {exercise.type === "match" && exercise.columnsA && exercise.columnsB && (
        <MatchColumns colA={exercise.columnsA} colB={exercise.columnsB} />
      )}

      {(exercise.type === "circle" ||
        exercise.type === "complete" ||
        exercise.type === "order" ||
        exercise.type === "crossword-clue" ||
        exercise.type === "table" ||
        exercise.type === "info") &&
        exercise.items && <NumberedList items={exercise.items} />}

      {exercise.type === "reading" && exercise.content && (
        <ReadingPassage content={exercise.content} note={exercise.note} />
      )}

      {exercise.type === "reading" && exercise.items && (
        <NumberedList items={exercise.items} />
      )}

      {exercise.type === "write" && (
        <div className="space-y-2 mt-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border-b border-dashed border-[var(--card-border)] h-8" />
          ))}
        </div>
      )}

      {exercise.type === "complete" && exercise.content && (
        <ReadingPassage content={exercise.content} />
      )}
    </div>
  );
}
