import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const allocationData = [
  { name: "Equities", value: 55, color: "hsl(var(--primary))" },
  { name: "Fixed Income", value: 30, color: "hsl(215, 25%, 70%)" },
  { name: "Real Estate", value: 10, color: "hsl(142, 70%, 45%)" },
  { name: "Cash", value: 5, color: "hsl(38, 92%, 50%)" },
];

const performanceData = [
  { month: "Jan", return: 4.2 },
  { month: "Feb", return: 3.8 },
  { month: "Mar", return: 5.1 },
  { month: "Apr", return: 4.7 },
  { month: "May", return: 6.2 },
  { month: "Jun", return: 5.9 },
];

export default function Portfolios() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Portfolio Analytics Engine</h1>
        <p className="text-muted-foreground mt-1">Deep dive into asset allocation and comparative performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="return" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Efficiency Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Sharpe Ratio", value: "1.84", status: "Optimal" },
              { label: "Alpha", value: "2.1%", status: "High" },
              { label: "Beta", value: "0.92", status: "Balanced" },
              { label: "Volatility", value: "14.2%", status: "Moderate" },
            ].map((metric) => (
              <div key={metric.label} className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <p className="text-xs text-primary mt-1 font-medium">{metric.status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}