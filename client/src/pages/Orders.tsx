import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function OrderManagement() {
  const [orders] = useState([
    { id: "ORD-001", symbol: "AAPL", side: "BUY", quantity: 50, price: "$185.20", status: "Filled", time: "10:15 AM" },
    { id: "ORD-002", symbol: "MSFT", side: "SELL", quantity: 30, price: "$420.10", status: "Pending", time: "10:42 AM" },
    { id: "ORD-003", symbol: "GOOGL", side: "BUY", quantity: 100, price: "$142.50", status: "Cancelled", time: "09:30 AM" },
    { id: "ORD-004", symbol: "TSLA", side: "BUY", quantity: 25, price: "$175.80", status: "Filled", time: "Yesterday" },
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
        <h2 className="text-2xl font-serif font-bold tracking-tight text-primary">Order Management</h2>
        <p className="text-muted-foreground text-sm">Monitor and manage all active and historical trade orders across client accounts.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management System</CardTitle>
          <CardDescription>Real-time execution monitoring and order history.</CardDescription>
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
    </div>
  );
}
