import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const clients = [
  { id: 1, name: "Eleanor Rigby", aum: "$2.4M", returns: "+12.5%", status: "High Priority", manager: "Sarah Chen" },
  { id: 2, name: "James McKenzie", aum: "$5.1M", returns: "-1.2%", status: "Review Needed", manager: "Mark Thompson" },
  { id: 3, name: "Sophia Li", aum: "$8.9M", returns: "+5.8%", status: "Active", manager: "Sarah Chen" },
  { id: 4, name: "Arthur Dent", aum: "$1.2M", returns: "+3.4%", status: "Onboarding", manager: "Mark Thompson" },
  { id: 5, name: "Beatrix Kiddo", aum: "$3.7M", returns: "+15.2%", status: "Active", manager: "David Kim" },
  { id: 6, name: "John Wick", aum: "$12.4M", returns: "+8.9%", status: "High Priority", manager: "Sarah Chen" },
];

export default function Clients() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Client Portfolio Management</h1>
          <p className="text-muted-foreground mt-1">Manage and track your primary client relationships.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients by name, manager, or status..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Assets Under Management</TableHead>
                <TableHead>YTD Returns</TableHead>
                <TableHead>Portfolio Manager</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.aum}</TableCell>
                  <TableCell className={client.returns.startsWith('+') ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
                    {client.returns}
                  </TableCell>
                  <TableCell>{client.manager}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "Review Needed" ? "destructive" : "secondary"}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}