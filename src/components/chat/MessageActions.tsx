import { Bookmark, Copy, ThumbsDown, ThumbsUp, MoreHorizontal } from "lucide-react";
import { emitAudit } from "@/lib/audit";

export function MessageActions({ messageId, text }: { messageId: string; text: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      emitAudit({ type: "COPY", messageId });
    } catch {}
  }
  return (
    <div className="mt-2 flex items-center gap-3 text-muted-foreground" aria-label="message actions">
      <button className="hover:text-foreground" title="Save (stub)">
        <Bookmark className="h-4 w-4" />
      </button>
      <button onClick={handleCopy} className="hover:text-foreground" title="Copy">
        <Copy className="h-4 w-4" />
      </button>
      <button onClick={() => emitAudit({ type: "FEEDBACK", messageId, value: "up" })} className="hover:text-foreground" title="Thumbs up">
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button onClick={() => emitAudit({ type: "FEEDBACK", messageId, value: "down" })} className="hover:text-foreground" title="Thumbs down">
        <ThumbsDown className="h-4 w-4" />
      </button>
      <button className="hover:text-foreground" title="More (stub)">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}


