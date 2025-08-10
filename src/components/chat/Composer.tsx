"use client";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export type ComposerProps = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  className?: string;
  onQuickAction?: (action: "population-builder" | "sight") => void;
  maxLength?: number;
};

export function Composer({ value, onChange, onSend, disabled, className, onQuickAction, maxLength = 4000 }: ComposerProps) {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);
  const remaining = maxLength - value.length;

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim().length > 0) onSend();
    }
  }

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + "px";
  }, [value]);

  return (
    <div className={className}>
      <div className="flex items-end gap-2">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[44px] max-h-[200px] resize-none"
          aria-label="Message composer"
          disabled={disabled}
        />
        <Button type="button" onClick={onSend} disabled={disabled || value.trim().length === 0}>
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded bg-secondary px-2 py-1 hover:bg-secondary/80"
            onClick={() => onQuickAction?.("population-builder")}
          >
            Population Builder
          </button>
          <button
            type="button"
            className="rounded bg-secondary px-2 py-1 hover:bg-secondary/80"
            onClick={() => onQuickAction?.("sight")}
          >
            Sight
          </button>
        </div>
        <div className="tabular-nums opacity-70">
          {remaining} / {maxLength}
          <span className="ml-2">Press Enter to send • Shift+Enter for newline</span>
        </div>
      </div>
    </div>
  );
}


