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

// Application workflow assistance knowledge base
const appAssistanceKnowledge: Record<string, string[]> = {
  dashboard: [
    "The Dashboard is your command center. It displays your Total AUM, Client count, average portfolio returns, and advisory fees YTD. You can see the AUM trend chart and top client accounts here.",
    "On the Dashboard, the 'Nous AI Insights' card shows real-time alerts about tax opportunities, portfolio drift, and compliance status. Click the chat button to dive deeper into any insight.",
    "The Dashboard charts help you track your Assets Under Management over time. Use the time period selector to view different timeframes (1M, 3M, YTD, 1Y, All Time).",
  ],
  clients: [
    "The Clients section lets you manage your client relationships and accounts. You can view client details, AUM, year-to-date returns, and risk profiles in the main client list.",
    "Click on any client in the Client Management section to see detailed account information, portfolio holdings, and performance metrics for that specific account.",
    "Use the Clients page to track client retention, identify high-value accounts, and monitor which clients need portfolio reviews or rebalancing.",
  ],
  portfolios: [
    "The Portfolios section provides deep analysis of your portfolio allocations, asset class breakdowns, and performance versus benchmarks. Use this to optimize client portfolios.",
    "In Portfolio Analysis, you can identify concentration risks, compare allocations to targets, and plan rebalancing strategies for underperforming positions.",
    "View detailed portfolio statistics including volatility, Sharpe ratio, drawdown analysis, and correlation matrices to make informed investment decisions.",
  ],
  market: [
    "The Market Insights section gives you real-time market data, sector trends, and economic indicators to inform your investment decisions and client recommendations.",
    "Use Market Insights to stay updated on yield curves, interest rate movements, sector rotation trends, and macroeconomic catalysts affecting your portfolios.",
    "Monitor emerging market opportunities, relative valuations across sectors, and key economic data releases to time rebalancing and tactical adjustments.",
  ],
  navigation: [
    "Use the left sidebar to navigate between Dashboard, Clients, Portfolios, Market Insights, and Settings. The sidebar shows your current location with a highlighted menu item.",
    "The top header has a search bar to quickly find clients or securities, and a notification bell for important alerts and market updates.",
    "Click the Nous Wealth logo to return to the Dashboard from anywhere in the application.",
  ],
  settings: [
    "Settings lets you customize your account preferences, notification rules, dashboard widgets, and viewing preferences.",
    "In Settings, you can configure which insights appear on your dashboard, set alert thresholds, and manage your account information.",
    "Use Settings to update your profile, set up API integrations, manage user permissions, and configure automation rules.",
  ],
  help: [
    "I can help you navigate the Nous Wealth application. Ask me about the Dashboard, Clients, Portfolios, Market Insights, or any feature you'd like to understand.",
    "Need help finding something? Just ask me about a specific section or feature, and I'll guide you through how to use it and where to find what you need.",
    "I'm here to help you get the most out of Nous Wealth. Ask about navigating sections, using tools, understanding reports, or optimizing your workflow.",
  ],
};

function getContextualResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  let matchedCategory = null;
  let matchScore = 0;

  // Define keyword patterns for each section
  const categoryKeywords: Record<string, { keywords: string[]; score: number }> = {
    dashboard: {
      keywords: ["dashboard", "overview", "aum", "assets under management", "stats", "metrics", "cards", "chart", "trend", "total"],
      score: 0,
    },
    clients: {
      keywords: ["client", "account", "book", "manage", "customer", "relationship", "list", "table", "status"],
      score: 0,
    },
    portfolios: {
      keywords: ["portfolio", "allocation", "asset", "position", "holdings", "analysis", "rebalance", "target"],
      score: 0,
    },
    market: {
      keywords: ["market", "insight", "trend", "sector", "economic", "yield", "rate", "data", "outlook"],
      score: 0,
    },
    navigation: {
      keywords: ["navigate", "sidebar", "menu", "page", "section", "button", "go to", "find", "where", "how to get"],
      score: 0,
    },
    settings: {
      keywords: ["settings", "preferences", "configure", "setup", "customize", "options", "profile"],
      score: 0,
    },
    help: {
      keywords: ["help", "guide", "how", "explain", "what is", "feature", "use", "understand", "tutorial"],
      score: 0,
    },
  };

  // Score each category based on keyword matches
  for (const [category, data] of Object.entries(categoryKeywords)) {
    for (const keyword of data.keywords) {
      if (input.includes(keyword)) {
        categoryKeywords[category].score += 1;
      }
    }
  }

  // Find the category with highest score
  for (const [category, data] of Object.entries(categoryKeywords)) {
    if (data.score > matchScore) {
      matchScore = data.score;
      matchedCategory = category;
    }
  }

  // Return category-specific response if matched, otherwise general response
  if (matchedCategory && matchScore > 0 && appAssistanceKnowledge[matchedCategory]) {
    const responses = appAssistanceKnowledge[matchedCategory];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default general app assistance responses
  const generalResponses = [
    "I'm here to help you navigate and use the Nous Wealth application! Ask me about the Dashboard, Clients section, Portfolios, Market Insights, or how to use any feature.",
    "Welcome! I can guide you through the Nous Wealth platform. Need help with a specific section? Ask about Dashboard, Clients, Portfolios, Market Insights, navigation, or Settings.",
    "I'm your application assistant for Nous Wealth. Ask me about any section, feature, or workflow - I'll help you find what you need and explain how to use it.",
  ];

  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! 👋 I'm your Nous Application Assistant. I'm here to help you navigate and get the most out of the Nous Wealth platform. Ask me about the Dashboard, Clients, Portfolios, Market Insights, or how to use any feature!",
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
      const response = getContextualResponse(input);
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
                <h3 className="font-semibold text-sm">Nous Assistant</h3>
                <p className="text-xs opacity-80">Application Guidance</p>
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