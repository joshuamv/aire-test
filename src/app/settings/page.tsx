"use client";
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageShell from "@/components/common/PageShell";
import { useRoutingStore } from "@/lib/stores";
import * as ReactHookForm from "react-hook-form";
import { Input } from "@/components/ui/input";

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

        <Card>
          <CardHeader>
            <CardTitle>LLM (dev)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:max-w-lg" data-testid="settings-llm">
            <label className="grid gap-1 text-sm">
              <span className="text-muted-foreground">Provider</span>
              <Input
                defaultValue={typeof window !== "undefined" ? localStorage.getItem("aire:llm:provider") ?? "mock" : "mock"}
                onChange={(e) => {
                  if (typeof window !== "undefined") localStorage.setItem("aire:llm:provider", e.target.value);
                }}
                placeholder="mock | openai"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted-foreground">Model</span>
              <Input
                defaultValue={typeof window !== "undefined" ? localStorage.getItem("aire:llm:model") ?? "gpt-4o-mini" : "gpt-4o-mini"}
                onChange={(e) => {
                  if (typeof window !== "undefined") localStorage.setItem("aire:llm:model", e.target.value);
                }}
                placeholder="model name"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted-foreground">Endpoint (optional)</span>
              <Input
                defaultValue={typeof window !== "undefined" ? localStorage.getItem("aire:llm:endpoint") ?? "" : ""}
                onChange={(e) => {
                  if (typeof window !== "undefined") localStorage.setItem("aire:llm:endpoint", e.target.value);
                }}
                placeholder="https://..."
              />
            </label>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}


