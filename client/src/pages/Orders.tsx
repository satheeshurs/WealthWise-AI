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
  RefreshCw,
  Edit2
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function OrderManagement() {
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [orders, setOrders] = useState([
    { id: "ORD-7721", account: "McKenzie Trust", symbol: "VOO", side: "SELL", quantity: "1,240", priceType: "Market", price: "MKT", tif: "Day", status: "Pending", risk: "High", time: "10:15 AM" },
    { id: "ORD-7722", account: "Satheesh Personal", symbol: "AAPL", side: "BUY", quantity: "450", priceType: "Limit", price: "$185.20", tif: "Day", status: "Filled", risk: "Low", time: "10:42 AM" },
    { id: "ORD-7723", account: "Global Growth Bulk", symbol: "VXUS", side: "BUY", quantity: "12,500", priceType: "Market", price: "MKT", tif: "GTC", status: "Partial", risk: "Medium", time: "09:30 AM" },
    { id: "ORD-7724", account: "McKenzie Trust", symbol: "BND", side: "BUY", quantity: "800", priceType: "Market", price: "MKT", tif: "Day", status: "Pending", risk: "Low", time: "Yesterday" },
  ]);

  const handleUpdateOrder = () => {
    setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Filled": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Executed</Badge>;
      case "Pending": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "Partial": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none flex items-center gap-1"><RefreshCw className="h-3 w-3 animate-spin" /> Partial</Badge>;
      case "Created": return <Badge variant="outline" className="flex items-center gap-1 text-slate-500">Created</Badge>;
      case "Verified": return <Badge variant="outline" className="flex items-center gap-1 text-indigo-500 border-indigo-200">Verified</Badge>;
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

      <Dialog open={!!editingOrder} onOpenChange={(open) => !open && setEditingOrder(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modify Order: {editingOrder?.id}</DialogTitle>
            <DialogDescription>Adjust parameters for {editingOrder?.symbol} ({editingOrder?.side})</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Order Type</Label>
                <Select 
                  value={editingOrder?.priceType} 
                  onValueChange={(val) => setEditingOrder({...editingOrder, priceType: val, price: val === 'Market' ? 'MKT' : editingOrder.price})}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Market">Market</SelectItem>
                    <SelectItem value="Limit">Limit</SelectItem>
                    <SelectItem value="Stop">Stop</SelectItem>
                    <SelectItem value="Stop Limit">Stop Limit</SelectItem>
                    <SelectItem value="Trailing Stop">Trailing Stop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time in Force</Label>
                <Select value={editingOrder?.tif} onValueChange={(val) => setEditingOrder({...editingOrder, tif: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Day</SelectItem>
                    <SelectItem value="GTC">GTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {editingOrder?.priceType !== "Market" && (
              <div className="space-y-2">
                <Label>Price / Trigger</Label>
                <Input 
                  type="text" 
                  value={editingOrder?.price === "MKT" ? "" : editingOrder?.price} 
                  onChange={(e) => setEditingOrder({...editingOrder, price: e.target.value})}
                  placeholder="$0.00"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input 
                type="text" 
                value={editingOrder?.quantity} 
                onChange={(e) => setEditingOrder({...editingOrder, quantity: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingOrder(null)}>Cancel</Button>
            <Button onClick={handleUpdateOrder}>Update Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by Account, Symbol, or Status..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Trade Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">BUY</SelectItem>
              <SelectItem value="sell">SELL</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="executed">Executed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> More</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Execution Tracking</CardTitle>
              <CardDescription>Full audit trail from creation to execution.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Account/Symbol</TableHead>
                    <TableHead>Parameters</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-primary text-sm">{order.account}</p>
                        <p className="text-xs font-bold text-muted-foreground">{order.symbol}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className={order.side === "BUY" ? "text-green-600 font-bold text-xs" : "text-red-600 font-bold text-xs"}>
                              {order.side}
                            </span>
                            <span className="text-xs font-medium">{order.priceType} @ {order.price}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground uppercase">{order.tif} Order</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{order.quantity}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingOrder(order)}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
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
                <AlertTriangle className="h-5 w-5" /> Execution Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white rounded border border-orange-200 shadow-sm">
                <p className="text-xs font-bold text-orange-800 mb-1">Trailing Stops Active</p>
                <p className="text-xs text-orange-700 leading-tight">Prices auto-adjust based on high-water marks for protection.</p>
              </div>
              <div className="p-3 bg-white rounded border border-orange-200 shadow-sm">
                <p className="text-xs font-bold text-orange-800 mb-1">Audit Ready</p>
                <p className="text-xs text-orange-700 leading-tight">Every modification is logged with a timestamp for compliance.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5" /> Status Legend
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-3 text-blue-900 leading-relaxed">
              <p><strong>Created:</strong> Initial trade generation.</p>
              <p><strong>Verified:</strong> Pre-trade compliance passed.</p>
              <p><strong>Pending:</strong> Queued for execution.</p>
              <p><strong>Executed:</strong> Fully filled at custodian.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
