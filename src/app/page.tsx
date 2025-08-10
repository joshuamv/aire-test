import { ChatPanel } from "@/components/chat/ChatPanel";

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <ChatPanel initialMessages={[]} hasPHIConsent={true} />
    </div>
  );
}
