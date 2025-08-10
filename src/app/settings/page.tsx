"use client";
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageShell from "@/components/common/PageShell";
import { useRoutingStore } from "@/lib/stores";

export default function SettingsPage() {
  const always = useRoutingStore((s) => s.alwaysShowReasoning);
  const setAlways = useRoutingStore((s) => s.setAlwaysShowReasoning);

  React.useEffect(() => {
    // dev-only localStorage persistence
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("aire:alwaysShowReasoning");
    if (saved != null) setAlways(saved === "true");
    // sync store -> storage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("aire:alwaysShowReasoning", String(always));
  }, [always]);

  return (
    <PageShell className="py-8">
      <div className="space-y-6">
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Explainability</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="font-medium">Always show reasoning</div>
              <p className="text-sm text-muted-foreground">Automatically open the routing drawer after assistant replies.</p>
            </div>
            <Switch checked={always} onCheckedChange={setAlways} aria-label="Always show reasoning" />
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}


