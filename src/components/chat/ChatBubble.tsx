import { useState } from 'react';
import { ChatPanel } from './ChatPanel.tsx';

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open AI Assistant"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={() => setOpen(true)}
      >
        <img
          src="/tele-new-logo2.png"
          alt="Assistant"
          className="h-14 w-14"
        />
      </button>
      <ChatPanel open={open} onOpenChange={setOpen} />
    </>
  );
}
