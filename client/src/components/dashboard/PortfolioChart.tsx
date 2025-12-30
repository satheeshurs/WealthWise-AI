import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: "Jan", aum: 12.5 },
  { month: "Feb", aum: 12.8 },
  { month: "Mar", aum: 13.2 },
  { month: "Apr", aum: 12.9 },
  { month: "May", aum: 13.5 },
  { month: "Jun", aum: 13.8 },
  { month: "Jul", aum: 14.1 },
  { month: "Aug", aum: 14.0 },
  { month: "Sep", aum: 14.5 },
  { month: "Oct", aum: 15.2 },
  { month: "Nov", aum: 15.5 },
  { month: "Dec", aum: 16.1 },
];

export function PortfolioChart() {
  return (
    <Card className="col-span-4 border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-serif font-semibold">Total Assets Under Management</CardTitle>
        <Select defaultValue="ytd">
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} 
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-md)"
                }}
                itemStyle={{ color: "hsl(var(--primary))" }}
                formatter={(value) => [`$${value}M`, "AUM"]}
              />
              <Area 
                type="monotone" 
                dataKey="aum" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAum)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}