import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  Info,
  RefreshCw
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function OrderManagement() {
  const [orders] = useState([
    { id: "ORD-7721", account: "McKenzie Trust", symbol: "VOO", side: "SELL", quantity: "1,240", price: "MKT", status: "Pending", risk: "High", time: "10:15 AM" },
    { id: "ORD-7722", account: "Satheesh Personal", symbol: "AAPL", side: "BUY", quantity: "450", price: "$185.20", status: "Filled", risk: "Low", time: "10:42 AM" },
    { id: "ORD-7723", account: "Global Growth Bulk", symbol: "VXUS", side: "BUY", quantity: "12,500", price: "MKT", status: "Partial", risk: "Medium", time: "09:30 AM" },
    { id: "ORD-7724", account: "McKenzie Trust", symbol: "BND", side: "BUY", quantity: "800", price: "MKT", status: "Pending", risk: "Low", time: "Yesterday" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Filled": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Filled</Badge>;
      case "Pending": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "Partial": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none flex items-center gap-1"><RefreshCw className="h-3 w-3 animate-spin" /> Partial</Badge>;
      case "Cancelled": return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Order Management</h1>
          <p className="text-muted-foreground mt-1">Monitor, validate, and manage trade execution across custodians.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Execute All Pending</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by Order ID, Account, or Symbol..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Execution Grid</CardTitle>
              <CardDescription>Consolidated view of trades generated from rebalancing and trading tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Side/Symbol</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-primary">{order.account}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={order.side === "BUY" ? "text-green-600 font-bold text-xs" : "text-red-600 font-bold text-xs"}>
                            {order.side}
                          </span>
                          <span className="font-bold">{order.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.quantity}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Exception Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white rounded border border-orange-200 shadow-sm">
                <p className="text-xs font-bold text-orange-800 mb-1">High Risk: ORD-7721</p>
                <p className="text-xs text-orange-700 leading-tight">Large sell order for McKenzie Trust exceeds 5% of daily avg volume.</p>
              </div>
              <div className="p-3 bg-white rounded border border-orange-200 shadow-sm">
                <p className="text-xs font-bold text-orange-800 mb-1">Ineligible: ORD-9904</p>
                <p className="text-xs text-orange-700 leading-tight">Wash-sale rule violation detected. Trade blocked automatically.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5" /> Order Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-blue-900 leading-relaxed">
              <p>
                <strong>Order Bulking:</strong> 12 individual trades have been consolidated into <strong>Global Growth Bulk</strong> to minimize execution costs.
              </p>
              <p>
                Review and approve high-risk exceptions before triggering global execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
