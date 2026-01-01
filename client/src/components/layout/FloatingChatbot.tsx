import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, X, MessageCircle, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLocation } from "wouter";
import { getAIResponse } from "@/lib/ai-service";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function FloatingChatbot() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! 👋 I'm your Nous Wealth AI Assistant. I'm here to help you navigate our wealth management systems. I'm currently monitoring your view on the " + (location === "/" ? "Dashboard" : location.slice(1).charAt(0).toUpperCase() + location.slice(2)) + " page. How can I assist you today?",
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
      const response = getAIResponse(input, location);
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        type: "assistant",
        content: response,
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
                <h3 className="font-semibold text-sm">Nous Wealth AI</h3>
                <p className="text-xs opacity-80">System Support Assistant</p>
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
              className="space-y-2"
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about portfolios, tax strategies..."
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
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium">Try asking about:</p>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setInput("How do I use the Dashboard?")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput("How do I manage clients?")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Clients
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput("Where is the Portfolio section?")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Navigation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}