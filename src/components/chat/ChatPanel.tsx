import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('chat.welcome'),
        },
      ]);
    }
  }, [open, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: language }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { reply: string };
      const aMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: data.reply };
      setMessages((m) => [...m, aMsg]);
    } catch (err: any) {
      const aMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: language === 'el' ? 'Συγγνώμη, δεν μπόρεσα να λάβω απάντηση αυτή τη στιγμή.' : 'Sorry, I could not get a response right now.',
      };
      setMessages((m) => [...m, aMsg]);
      console.error('chat error', err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 w-[min(90vw,420px)] overflow-hidden rounded-xl border border-border bg-card/95 shadow-medium backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex items-center gap-3 border-b border-border bg-gradient-hero px-4 py-3 text-white">
        <img src="/tele-new-logo2.png" alt="Assistant" className="h-6 w-6 rounded-full border border-white/20 bg-white/10" />
        <div className="flex-1">
          <div className="text-sm font-semibold">{t('chat.title')}</div>
          <div className="text-xs opacity-90">{t('chat.subtitle')}</div>
        </div>
        <button
          aria-label="Close"
          className="rounded-md p-1 text-white/90 transition hover:bg-white/10"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>
      </div>
      <div className="flex max-h-[60vh] flex-col">
        <div className="scroll-area flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
          {messages.map((m) => (
            <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={
                  'inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ' +
                  (m.role === 'user'
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-foreground')
                }
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex items-center gap-2 border-t border-border bg-card p-3">
          <input
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder={t('chat.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
          />
          <Button size="sm" onClick={send} disabled={loading}>
            {loading ? t('chat.sending') : t('chat.send')}
          </Button>
        </div>
      </div>
    </div>
  );
}
