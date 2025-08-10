import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";

export function SuggestionList({
  suggestions,
  onPick,
}: {
  suggestions: string[];
  onPick: (text: string) => void;
}) {
  if (!suggestions?.length) return null;
  return (
    <div className="mt-2 flex flex-col gap-2" data-testid="suggestion-list">
      {suggestions.slice(0, 4).map((s, i) => (
        <Button key={i} variant="ghost" className="h-8 w-fit gap-2 px-2 text-sm" onClick={() => onPick(s)}>
          <CornerDownLeft className="h-4 w-4 text-muted-foreground" aria-hidden /> {s}
        </Button>
      ))}
    </div>
  );
}


