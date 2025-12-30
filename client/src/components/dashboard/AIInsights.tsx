import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const insights = [
  {
    id: 1,
    type: "opportunity",
    title: "Tax-Loss Harvesting Opportunity",
    description: "3 clients have unrealized losses >$50k in Technology sector. Harvesting could offset recent gains.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    id: 2,
    type: "risk",
    title: "Portfolio Drift Alert",
    description: "McKenzie Trust allocation has drifted 7% from target due to recent market rally in Equities.",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    id: 3,
    type: "info",
    title: "Compliance Check Passed",
    description: "Q4 Reg BI documentation is complete for 95% of your book.",
    icon: ShieldCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

export function AIInsights() {
  const [, navigate] = useLocation();
  
  return (
    <Card className="h-full border-border/60 bg-gradient-to-br from-card to-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-100 text-indigo-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-serif font-semibold">Nous AI Insights</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">Settings</Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="group relative flex gap-4 p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all cursor-pointer">
              <div className={`mt-0.5 h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${insight.bg} ${insight.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                  {insight.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {insight.description}
                </p>
              </div>
              <ArrowRight className="absolute right-3 top-3 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
            </div>
          );
        })}
        
        <div className="pt-2">
          <Button 
            onClick={() => navigate("/ai-advisor")}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Ask Nous Assistant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}