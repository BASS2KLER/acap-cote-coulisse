import type { GenreSpectacle } from "@/lib/types";
import { getGenreChipClass } from "@/lib/utils";

interface ChipProps {
  label: string;
  genre?: GenreSpectacle;
  className?: string;
}

export default function Chip({ label, genre, className = "" }: ChipProps) {
  const colorClass = genre ? getGenreChipClass(genre) : "bg-creme-deep text-encre";
  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-body font-bold text-sm
        px-3 py-1 rounded-pill
        border-2 border-encre
        ${colorClass}
        ${className}
      `}
    >
      {label}
    </span>
  );
}
