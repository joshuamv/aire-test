import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title = "Nothing here yet",
  description = "Get started by creating a new item.",
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mx-auto flex max-w-lg flex-col items-center justify-center gap-3 rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="rounded-full border bg-secondary p-3 text-secondary-foreground">
        {icon ?? <AlertCircle className="h-6 w-6" aria-hidden />}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}


