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

// Wealth management knowledge base for context-aware responses
const wealthAdvisorKnowledge: Record<string, string[]> = {
  portfolio: [
    "I'm analyzing your portfolio allocations. Based on the current market environment, consider rebalancing your equity exposure. Your tech allocation is at 45% vs. the recommended 35% target.",
    "Your portfolio shows signs of style drift. The concentrated positions in large-cap growth could be balanced with defensive sectors to reduce idiosyncratic risk.",
    "I've identified an opportunity to optimize your portfolio's tax efficiency. Tax-loss harvesting in your underperforming positions could offset $40k+ in gains.",
  ],
  tax: [
    "Tax planning analysis complete. I found 3 clients with unrealized losses >$50k in the Technology sector. Harvesting these losses strategically could significantly reduce tax liability.",
    "Your year-end tax position shows opportunities for charitable gifting strategies and donor-advised fund contributions to optimize your tax outcome.",
    "I recommend reviewing your estimated tax payments. Based on current income projections, you may benefit from adjusting withholdings to avoid overpayment.",
  ],
  rebalancing: [
    "Portfolio drift detected on the McKenzie Trust: Your allocation has shifted 7% from target due to recent market rally in equities. Would you like me to generate a rebalancing recommendation?",
    "Quarterly rebalancing analysis shows your fixed income allocation has declined from 40% to 28%. Rebalancing back to target would restore your risk profile.",
    "I've detected significant drift in your strategic asset allocation. Recommend selling overweight positions and purchasing underweight allocations across your client accounts.",
  ],
  risk: [
    "Risk analysis complete: 3 of your clients have concentrated positions in the Energy sector (>25% of portfolio). Diversification could reduce their idiosyncratic risk by ~15%.",
    "I'm detecting elevated market risk in your equity allocations. Consider a systematic de-risking strategy or implementing hedging strategies for large positions.",
    "Your portfolio's volatility has increased 12% this quarter. I recommend stress-testing your allocation against recent market scenarios and considering protective puts.",
  ],
  market: [
    "Market insights: Emerging markets are showing strong momentum with a 8.5% YTD return. Your international allocation at 15% appears underweight relative to opportunities.",
    "Fixed income outlook: With yields currently elevated, now presents a compelling opportunity to increase duration and capture higher returns in your bond portfolio.",
    "Sector analysis shows Technology and Healthcare driving market returns. However, valuations are stretched. I recommend a balanced approach with selective exposure.",
  ],
  client: [
    "Client account analysis: Your high-net-worth client base shows average AUM of $2.4M with 8.2% YTD returns. Advisory fees have grown 12% YoY.",
    "I've identified 2 clients whose accounts show underperformance vs. their benchmarks. Recommend a portfolio review meeting to discuss optimization strategies.",
    "Your client retention rate stands at 94% with new client AUM growth of 18% YoY. Continue focusing on personalized wealth planning services.",
  ],
  compliance: [
    "Compliance status: Your Q4 Reg BI documentation is 95% complete. I recommend reviewing the remaining 5% of client agreements before year-end.",
    "Annual compliance review shows strong adherence to suitability standards across all accounts. Recommend quarterly training refresher for your advisory team.",
    "I've reviewed your best execution reporting. All trades demonstrated best execution standards with minimal market impact. Excellent compliance record.",
  ],
};

function getContextualResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  
  // Check for keywords and return relevant responses
  for (const [category, responses] of Object.entries(wealthAdvisorKnowledge)) {
    if (input.includes(category) || 
        (category === "portfolio" && (input.includes("allocation") || input.includes("asset") || input.includes("position"))) ||
        (category === "tax" && (input.includes("tax") || input.includes("harvest") || input.includes("loss"))) ||
        (category === "rebalancing" && (input.includes("rebalance") || input.includes("drift") || input.includes("target"))) ||
        (category === "risk" && (input.includes("risk") || input.includes("concentration") || input.includes("volatility"))) ||
        (category === "market" && (input.includes("market") || input.includes("trends") || input.includes("outlook"))) ||
        (category === "client" && (input.includes("client") || input.includes("account") || input.includes("aum"))) ||
        (category === "compliance" && (input.includes("compliance") || input.includes("reg") || input.includes("regulation")))) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Default general wealth management responses
  const generalResponses = [
    "I can help you with portfolio analysis, tax optimization, rebalancing strategies, risk management, market insights, and client account analysis. What aspect of wealth management would you like to explore?",
    "As your Nous AI advisor, I specialize in wealth management insights. I can analyze your portfolios for optimization opportunities, help with tax planning, and monitor market trends. What's on your mind?",
    "I'm analyzing your wealth management data. Ask me about portfolio performance, tax-loss harvesting opportunities, client concentration risks, or market trends.",
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! 👋 I'm Nous, your AI wealth advisor. I analyze your portfolios, identify optimization opportunities, monitor client accounts, and provide market insights. Ask me about portfolio rebalancing, tax strategies, risk management, or any aspect of wealth management!",
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
                <h3 className="font-semibold text-sm">Nous AI Advisor</h3>
                <p className="text-xs opacity-80">Wealth Management Expert</p>
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
                    onClick={() => setInput("What tax optimization opportunities do I have?")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Tax Planning
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput("Show me portfolio rebalancing recommendations")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Rebalancing
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput("What risks should I monitor?")}
                    className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  >
                    Risk Management
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