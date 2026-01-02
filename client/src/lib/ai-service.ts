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
    rebalance: "The Rebalancing tool (found in the sidebar) allows you to analyze portfolio drift and execute bulk rebalancing trades to bring client accounts back to their target asset allocation.",
    orders: "The Order Management screen (found in the sidebar) provides a central view to monitor all active and historical trade executions. You can track status (Filled, Pending, Cancelled) and trade details here.",
    navigation: "You can navigate the application using the left sidebar. If you need more screen space, click the orange menu icon in the top-left corner to collapse or expand the menu.",
    models: {
      overview: "Model management allows you to create reusable investment frameworks. The system supports two primary model types: Sleeve and Strategy.",
      sleeveVsStrategy: "• Sleeve Models: Focused components representing a single asset class or niche strategy (e.g., 'Core Large Cap'). Used as building blocks.\n• Strategy Models: High-level 'master' models that aggregate multiple Sleeves or direct securities into a complete client allocation (e.g., 'Balanced Growth').",
      hierarchy: "1. Asset Type (Level 1): Broad categories like Equity or Fixed Income.\n2. Asset Class (Level 2): Specific segments like U.S. Small Cap or High Yield Bonds.\n3. Security Level (Level 3): The specific instrument (e.g., AAPL, AGG).",
      warnings: "⚠️ Avoid Mixing Levels: Do not define targets for an Asset Type and a specific Security in the same node.\n⚠️ Hierarchy Depth: Ensure every Strategy Model drills down to liquid securities for execution."
    }
  }
};

export function getAIResponse(input: string, location: string = "/") {
  const lower = input.trim().toLowerCase();

  // 1. Model Management & Construction (High Priority)
  if (lower.includes("model") || lower.includes("sleeve") || lower.includes("strategy") || lower.includes("hierarchy")) {
    if (lower.includes("sleeve") && lower.includes("strategy")) {
      return KNOWLEDGE_BASE.application.models.sleeveVsStrategy;
    }
    if (lower.includes("hierarchy") || lower.includes("level")) {
      return KNOWLEDGE_BASE.application.models.hierarchy;
    }
    if (lower.includes("mistake") || lower.includes("warning") || lower.includes("wrong")) {
      return KNOWLEDGE_BASE.application.models.warnings;
    }
    return `${KNOWLEDGE_BASE.application.models.overview}\n\n${KNOWLEDGE_BASE.application.models.sleeveVsStrategy}`;
  }

  // 2. Strategy Keywords
  if (lower.includes("rebalanc") || lower.includes("drift")) {
    if (lower.includes("how") || lower.includes("where")) return KNOWLEDGE_BASE.application.rebalance;
    return KNOWLEDGE_BASE.strategies.rebalance;
  }
  
  if (lower.includes("order") || lower.includes("trade")) {
    return KNOWLEDGE_BASE.application.orders;
  }

  if (lower.includes("navigate") || lower.includes("menu") || lower.includes("sidebar")) {
    return KNOWLEDGE_BASE.application.navigation;
  }
  if (lower.includes("tax") || lower.includes("harvest") || lower.includes("gain")) 
    return KNOWLEDGE_BASE.strategies.tax;
  if (lower.includes("income") || lower.includes("yield") || lower.includes("bond")) 
    return KNOWLEDGE_BASE.strategies.income;
  if (lower.includes("retire") || lower.includes("estate") || lower.includes("wealth support") || lower.includes("goal")) 
    return KNOWLEDGE_BASE.strategies.support;

  // 2. Application Context & Navigation
  if (lower.includes("order") || lower.includes("trade") || lower.includes("status") || lower.includes("execution"))
    return KNOWLEDGE_BASE.application.orders;
  if (lower.includes("navigate") || lower.includes("menu") || lower.includes("sidebar") || lower.includes("collapse") || lower.includes("expand") || lower.includes("find"))
    return KNOWLEDGE_BASE.application.navigation;
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
