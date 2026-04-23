import type { Section } from "@/data/lessons/unit4-workbook";

const colorMap: Record<Section["color"], { bg: string; text: string; border: string }> = {
  grammar: { bg: "bg-[var(--grammar-bg)]", text: "text-[var(--grammar)]", border: "border-[var(--grammar)]" },
  words: { bg: "bg-[var(--words-bg)]", text: "text-[var(--words)]", border: "border-[var(--words)]" },
  listening: { bg: "bg-[var(--listening-bg)]", text: "text-[var(--listening)]", border: "border-[var(--listening)]" },
  writing: { bg: "bg-[var(--writing-bg)]", text: "text-[var(--writing)]", border: "border-[var(--writing)]" },
  neutral: { bg: "bg-[var(--muted-bg)]", text: "text-[var(--muted)]", border: "border-[var(--muted)]" },
};

export function SectionHeader({ section }: { section: Section }) {
  const c = colorMap[section.color];
  return (
    <div className={`rounded-xl border-l-4 ${c.border} ${c.bg} p-5 mb-4`}>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className={`text-xl font-bold uppercase tracking-wide ${c.text}`}>
          {section.title}
        </span>
        {section.subtitle && (
          <span className={`text-base font-semibold ${c.text} opacity-80`}>
            — {section.subtitle}
          </span>
        )}
        <span className="ml-auto text-sm text-[var(--muted)] font-medium">
          pp. {section.pages}
        </span>
      </div>
      {section.reference && (
        <p className="text-xs text-[var(--muted)] mt-1">{section.reference}</p>
      )}
    </div>
  );
}
