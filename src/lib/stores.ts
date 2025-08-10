"use client";
import { create } from "zustand";
import type { RoutingDecision } from "@/lib/types";

type RoutingState = {
  showReasoning: boolean;
  alwaysShowReasoning: boolean;
  routingHistory: Record<string, RoutingDecision>; // messageId -> decision
  setShowReasoning: (open: boolean) => void;
  setAlwaysShowReasoning: (open: boolean) => void;
  setRoutingForMessage: (messageId: string, decision: RoutingDecision) => void;
};

export const useRoutingStore = create<RoutingState>((set) => ({
  showReasoning: false,
  alwaysShowReasoning: false,
  routingHistory: {},
  setShowReasoning: (open) => set({ showReasoning: open }),
  setAlwaysShowReasoning: (open) => set({ alwaysShowReasoning: open }),
  setRoutingForMessage: (messageId, decision) =>
    set((s) => ({ routingHistory: { ...s.routingHistory, [messageId]: decision } })),
}));


