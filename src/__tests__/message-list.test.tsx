import { render, screen } from "@testing-library/react";
import { MessageList, type ChatMessage } from "@/components/chat/MessageList";

describe("MessageList", () => {
  it("renders messages and roles", () => {
    const messages: ChatMessage[] = [
      { id: "1", role: "user", content: "Hello", createdAt: new Date("2024-01-01T10:00:00Z") },
      { id: "2", role: "assistant", content: "Hi there", agentName: "Default", agentRisk: "low", createdAt: new Date("2024-01-01T10:00:10Z") },
    ];

    render(<MessageList messages={messages} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });
});


