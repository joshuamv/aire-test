import { ChatPanel } from "@/components/chat/ChatPanel";
import { ChatBackground } from "@/components/chat/ChatBackground";

export default function Home() {
  return (
    <div className="relative flex w-full justify-center">
      {/* Background reacts to last assistant */}
      {/* In a real app, pass messages from state; for now, leave empty to neutral */}
      <ChatBackground messages={[]} />
      <ChatPanel initialMessages={[]} hasPHIConsent={true} />
    </div>
  );
}
