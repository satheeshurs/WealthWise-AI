import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Globe, Zap, AlertCircle } from "lucide-react";

const marketNews = [
  { id: 1, title: "Tech Stocks Surge on AI Innovations", impact: "High Positive", category: "Technology", time: "2h ago" },
  { id: 2, title: "Central Bank Hints at Rate Adjustments", impact: "Moderate", category: "Macro", time: "4h ago" },
  { id: 3, title: "Energy Sector Faces New Regulatory Hurdles", impact: "High Negative", category: "Energy", time: "5h ago" },
  { id: 4, title: "Emerging Markets Show Resilience in Q1", impact: "Moderate Positive", category: "Global", time: "1d ago" },
];

export default function Market() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Global Market Insights</h1>
        <p className="text-muted-foreground mt-1">Real-time intelligence and sector analysis for tactical decision making.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Global Market News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketNews.map((news) => (
              <div key={news.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.time}</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{news.title}</h3>
                  </div>
                  <Badge className={news.impact.includes("Positive") ? "bg-emerald-100 text-emerald-700" : news.impact.includes("Negative") ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}>
                    {news.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" /> Sector Movers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Semiconductors", change: "+3.2%", trend: "up" },
                { name: "Real Estate", change: "-1.8%", trend: "down" },
                { name: "Healthcare", change: "+1.1%", trend: "up" },
                { name: "Utilities", change: "-0.5%", trend: "down" },
              ].map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{sector.name}</span>
                  <div className={`flex items-center gap-1 text-sm font-bold ${sector.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {sector.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {sector.change}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertCircle className="h-5 w-5" /> Tactical Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/80">
                Inverted yield curve persistent for 18 months. Recommend increasing defensive exposure in portfolios with high sensitivity to growth sectors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}