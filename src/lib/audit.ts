export type AuditEvent =
  | { type: "ROUTING"; decision: unknown }
  | { type: "FEEDBACK"; messageId: string; value: "up" | "down" }
  | { type: "COPY"; messageId: string };

export function emitAudit(event: AuditEvent) {
  // Placeholder: integrate with real telemetry later
  // eslint-disable-next-line no-console
  console.log("AUDIT", event);
}


