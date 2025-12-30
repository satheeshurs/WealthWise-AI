import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, X, MessageCircle, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sampleResponses = [
  "Based on your portfolio analysis, I recommend rebalancing your tech exposure. Your current allocation is 45% vs. the target 35%.",
  "I've identified a tax-loss harvesting opportunity in your McKenzie Trust account that could offset $50k+ in gains.",
  "Your fixed income allocation is underperforming. Consider adjusting the duration to capture higher yields in the current rate environment.",
  "Portfolio drift detected: Your allocation has shifted 7% from target. Would you like me to generate a rebalancing recommendation?",
  "I found 3 clients with concentrated positions in Energy sector. Diversification could reduce their idiosyncratic risk by ~15%.",
  "Looking at the market trends, emerging markets are showing strong momentum. Your international allocation might benefit from increased exposure.",
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! 👋 I'm Nous, your AI wealth advisor. Ask me about portfolios, market trends, or optimization strategies!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: String(Date.now()),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        type: "assistant",
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chatbot"
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40",
          isOpen
            ? "bg-destructive text-white hover:bg-destructive/90"
            : "bg-primary text-white hover:bg-primary/90 animate-bounce"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] bg-card border border-border/60 rounded-lg shadow-2xl flex flex-col h-[600px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/60 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-white/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-semibold text-sm">Nous Assistant</h3>
                <p className="text-xs opacity-80">AI Wealth Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <Minimize2 className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.type === "assistant" && (
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-xs px-3 py-2 rounded-lg text-sm",
                    message.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  )}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border/60 bg-card p-3 rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Nous..."
                className="flex-1 h-9 bg-background/50 border-transparent focus:border-primary focus:bg-background transition-all text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 bg-primary text-white hover:bg-primary/90 flex-shrink-0"
                data-testid="button-send-chat"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}