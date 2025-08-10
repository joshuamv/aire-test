"use client";
import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RoutingDecision } from "@/lib/types";

export function ReasoningDrawer({ decision, open, onOpenChange }: { decision: RoutingDecision; open?: boolean; onOpenChange?: (o: boolean) => void }) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = typeof open === "boolean";
  const isOpen = controlled ? (open as boolean) : internalOpen;
  const setOpen = controlled ? (onOpenChange as (o: boolean) => void) : setInternalOpen;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs underline underline-offset-4">
          Why this route?
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Why this route?</SheetTitle>
          <SheetDescription>How the system selected the agents and features that matched.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rationale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{decision.rationale}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="py-2 pr-3">Agent</th>
                      <th className="py-2 pr-3">Score</th>
                      <th className="py-2 pr-3">Reasons</th>
                      <th className="py-2 pr-3">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decision.agents.map((a) => (
                      <tr key={a.name} className="border-t">
                        <td className="py-2 pr-3 font-medium">{a.name}</td>
                        <td className="py-2 pr-3 tabular-nums">{a.score.toFixed(2)}</td>
                        <td className="py-2 pr-3">
                          <ul className="list-inside list-disc space-y-1">
                            {a.reasons.map((r, i) => (
                              <li key={i} className="text-muted-foreground">{r}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-2 pr-3">
                          <Badge variant="secondary" className={cn(
                            a.riskTier === "high"
                              ? "bg-red-500/15 text-red-700 dark:text-red-400"
                              : a.riskTier === "medium"
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
                          )}>{a.riskTier ?? "low"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features matched</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 text-xs font-medium text-muted-foreground">Keywords</div>
                <div className="flex flex-wrap gap-2">
                  {decision.features.keywords?.map((k) => (
                    <Badge key={k} variant="secondary" className="bg-muted text-muted-foreground">
                      {k}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs font-medium text-muted-foreground">Entities</div>
                <div className="flex flex-wrap gap-2">
                  {decision.features.entities?.map((k) => (
                    <Badge key={k} variant="secondary" className="bg-muted text-muted-foreground">
                      {k}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs font-medium text-muted-foreground">Flags</div>
                <div className="flex flex-wrap gap-2">
                  {decision.features.flags?.map((k) => (
                    <Badge key={k} variant="secondary" className="bg-muted text-muted-foreground">
                      {k}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}


