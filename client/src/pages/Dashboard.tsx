import { StatCard } from "@/components/dashboard/StatCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { ClientTable } from "@/components/dashboard/ClientTable";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {format(new Date(), "EEEE, MMMM do, yyyy")} • Market Open
          </p>
        </div>
        <div className="flex gap-2">
          {/* Action buttons could go here */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total AUM" 
          value="$142.5M" 
          change="+4.5%" 
          trend="up" 
          icon={DollarSign}
        />
        <StatCard 
          title="Total Clients" 
          value="48" 
          change="+2" 
          trend="up" 
          icon={Users}
        />
        <StatCard 
          title="Avg. Portfolio Rtn" 
          value="8.2%" 
          change="-0.4%" 
          trend="down" 
          icon={TrendingUp}
        />
        <StatCard 
          title="Advisory Fees (YTD)" 
          value="$384k" 
          change="+12%" 
          trend="up" 
          icon={Activity}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7 h-[400px]">
        <div className="col-span-4 lg:col-span-5 h-full">
          <PortfolioChart />
        </div>
        <div className="col-span-3 lg:col-span-2 h-full">
          <AIInsights />
        </div>
      </div>

      <div>
        <ClientTable />
      </div>
    </div>
  );
}