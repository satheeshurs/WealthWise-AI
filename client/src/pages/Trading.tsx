import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Plus, Send, CheckCircle2, Clock, XCircle, List } from "lucide-react";

export default function Trading() {
  const [orders, setOrders] = useState([
    { id: "ORD-001", symbol: "AAPL", side: "BUY", quantity: 50, price: "$185.20", status: "Filled", time: "10:15 AM" },
    { id: "ORD-002", symbol: "MSFT", side: "SELL", quantity: 30, price: "$420.10", status: "Pending", time: "10:42 AM" },
    { id: "ORD-003", symbol: "GOOGL", side: "BUY", quantity: 100, price: "$142.50", status: "Cancelled", time: "09:30 AM" },
    { id: "ORD-004", symbol: "TSLA", side: "BUY", quantity: 25, price: "$175.80", status: "Filled", time: "Yesterday" },
  ]);

  const [rebalanceData, setRebalanceData] = useState([
    { asset: "Technology", current: "45%", target: "35%", drift: "+10%", action: "Sell $1.2M" },
    { asset: "Financials", current: "15%", target: "20%", drift: "-5%", action: "Buy $600k" },
    { asset: "Healthcare", current: "12%", target: "15%", drift: "-3%", action: "Buy $360k" },
    { asset: "Fixed Income", current: "28%", target: "30%", drift: "-2%", action: "Buy $240k" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Filled": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Filled</Badge>;
      case "Pending": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "Cancelled": return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none flex items-center gap-1"><XCircle className="h-3 w-3" /> Cancelled</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">Trading Terminal</h2>
        <p className="text-muted-foreground text-sm">Execute rebalancing strategies and manage orders across client accounts.</p>
      </div>

      <Tabs defaultValue="rebalance" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-4">
          <TabsTrigger value="rebalance" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Portfolio Rebalancing</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Order Management</TabsTrigger>
        </TabsList>

        <TabsContent value="rebalance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Global Rebalancing Engine</CardTitle>
                  <CardDescription>Analyze and correct portfolio drift across all managed accounts.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" /> Run Analysis
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Class</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Drift</TableHead>
                      <TableHead className="text-right">Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rebalanceData.map((item) => (
                      <TableRow key={item.asset}>
                        <TableCell className="font-medium">{item.asset}</TableCell>
                        <TableCell>{item.current}</TableCell>
                        <TableCell>{item.target}</TableCell>
                        <TableCell className={item.drift.startsWith('+') ? "text-red-600" : "text-green-600"}>
                          {item.drift}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="font-mono">{item.action}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">
                    Generate Bulk Orders
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Bulk Order</CardTitle>
                <CardDescription>Place multiple orders simultaneously.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Select Strategy</label>
                  <Select defaultValue="model-a">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="model-a">Aggressive Growth Model</SelectItem>
                      <SelectItem value="model-b">Balanced Income Model</SelectItem>
                      <SelectItem value="model-c">Conservative Capital Pres.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Order Type</label>
                  <Select defaultValue="limit">
                    <SelectTrigger>
                      <SelectValue placeholder="Order Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Affected Accounts</span>
                    <span className="font-medium">24 Clients</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-medium">$2.45M</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 gap-2">
                  <Send className="h-4 w-4" /> Place Bulk Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order Management System</CardTitle>
                <CardDescription>Monitor and manage all active and historical trade orders.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Manual Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell className="font-bold">{order.symbol}</TableCell>
                      <TableCell>
                        <span className={order.side === "BUY" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {order.side}
                        </span>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{order.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
