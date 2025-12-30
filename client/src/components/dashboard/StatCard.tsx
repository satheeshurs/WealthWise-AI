import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon?: any;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : <MoreHorizontal className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-serif font-bold text-foreground">{value}</div>
        <div className="flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-600" />
          ) : trend === "down" ? (
            <ArrowDownRight className="mr-1 h-4 w-4 text-rose-600" />
          ) : null}
          <p
            className={cn(
              "text-xs font-medium",
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-muted-foreground"
            )}
          >
            {change}
          </p>
          <p className="text-xs text-muted-foreground ml-1">vs last month</p>
        </div>
      </CardContent>
    </Card>
  );
}