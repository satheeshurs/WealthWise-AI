// Centralized intelligence for both the page-based Advisor and the Floating Chatbot
export const KNOWLEDGE_BASE = {
  strategies: {
    rebalance: "Based on your portfolio analysis, I recommend rebalancing your tech exposure. Your current allocation is 45% vs. the target 35%. Portfolio drift detected: Your allocation has shifted 7% from target.",
    tax: "I've identified a tax-loss harvesting opportunity in your McKenzie Trust account that could offset $50k+ in gains. I found 3 clients with concentrated positions in Energy sector where tax-aware diversification could reduce idiosyncratic risk by ~15%.",
    income: "Your fixed income allocation is underperforming. Consider adjusting the duration to capture higher yields in the current rate environment (target 4.5% - 5.2% duration).",
    support: "Wealth support: I can help with retirement planning, estate tax optimization, and intergenerational wealth transfer strategies. What's your primary goal?",
  },
  application: {
    dashboard: "The Dashboard is your command center. It displays Total AUM, Client count, returns, and advisory fees. The 'Nous AI Insights' card shows real-time alerts about tax opportunities and portfolio drift.",
    clients: "The Clients section manages your relationships. Click any client to see account-level holdings, performance metrics, and risk profiles.",
    portfolios: "The Portfolios section provides deep analysis of allocations. Identify concentration risks, compare against benchmarks, and plan rebalancing strategies.",
    market: "Market Insights gives you real-time data, sector trends, and yield curves to inform your tactical adjustments.",
  }
};

export function getAIResponse(input: string, location: string = "/") {
  const lower = input.trim().toLowerCase();

  // 1. Strategy Keywords (High Priority)
  if (lower.includes("rebalanc") || lower.includes("allocation") || lower.includes("drift")) 
    return KNOWLEDGE_BASE.strategies.rebalance;
  if (lower.includes("tax") || lower.includes("harvest") || lower.includes("gain")) 
    return KNOWLEDGE_BASE.strategies.tax;
  if (lower.includes("income") || lower.includes("yield") || lower.includes("bond")) 
    return KNOWLEDGE_BASE.strategies.income;
  if (lower.includes("retire") || lower.includes("estate") || lower.includes("wealth support") || lower.includes("goal")) 
    return KNOWLEDGE_BASE.strategies.support;

  // 2. Application Context
  if (lower.includes("dashboard") || (location === "/" && (lower.includes("here") || lower.includes("this") || lower.includes("what") || lower.includes("how"))))
    return KNOWLEDGE_BASE.application.dashboard;
  if (lower.includes("client") || (location === "/clients" && (lower.includes("here") || lower.includes("this") || lower.includes("what") || lower.includes("how"))))
    return KNOWLEDGE_BASE.application.clients;
  if (lower.includes("portfolio") || (location === "/portfolios" && (lower.includes("here") || lower.includes("this") || lower.includes("what") || lower.includes("how"))))
    return KNOWLEDGE_BASE.application.portfolios;
  if (lower.includes("market") || (location === "/market" && (lower.includes("here") || lower.includes("this") || lower.includes("what") || lower.includes("how"))))
    return KNOWLEDGE_BASE.application.market;

  // 3. Fallback
  return "I'm your Nous Wealth AI. I can assist with both wealth management strategies (tax, rebalancing, retirement) and navigating this application. What can I help you with?";
}
