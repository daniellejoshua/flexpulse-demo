import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white p-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 rounded-full p-0"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2ch] text-center font-medium" aria-live="polite">
        {value}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 rounded-full p-0"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
