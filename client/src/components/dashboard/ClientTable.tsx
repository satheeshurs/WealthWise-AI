import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const clients = [
  {
    id: 1,
    name: "Eleanor Rigby",
    email: "eleanor.r@example.com",
    avatar: "ER",
    aum: "$2.4M",
    performance: "+12.5%",
    status: "Active",
    risk: "Conservative",
  },
  {
    id: 2,
    name: "James McKenzie",
    email: "j.mckenzie@example.com",
    avatar: "JM",
    aum: "$5.1M",
    performance: "-1.2%",
    status: "Review Needed",
    risk: "Aggressive",
  },
  {
    id: 3,
    name: "Sophia Li",
    email: "sophia.li@example.com",
    avatar: "SL",
    aum: "$8.9M",
    performance: "+5.8%",
    status: "Active",
    risk: "Balanced",
  },
  {
    id: 4,
    name: "Arthur Dent",
    email: "arthur.d@example.com",
    avatar: "AD",
    aum: "$1.2M",
    performance: "+3.4%",
    status: "Onboarding",
    risk: "Balanced",
  },
];

export function ClientTable() {
  return (
    <div className="rounded-md border border-border/60 bg-card">
      <div className="p-4 flex items-center justify-between border-b border-border/60">
        <h3 className="font-serif font-semibold text-base">Top Client Accounts</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground text-xs hover:text-primary">View All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/60">
            <TableHead className="w-[300px]">Client</TableHead>
            <TableHead>AUM</TableHead>
            <TableHead>YTD Return</TableHead>
            <TableHead>Risk Profile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-muted/30 border-border/60">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-primary/10 text-primary border border-primary/10">
                    <AvatarFallback>{client.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-serif font-medium">{client.aum}</TableCell>
              <TableCell>
                <div className={`flex items-center text-xs font-medium ${client.performance.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {client.performance.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {client.performance}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal text-muted-foreground bg-muted/20 border-border/60">
                  {client.risk}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  className={
                    client.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shadow-none border-transparent" :
                    client.status === "Review Needed" ? "bg-amber-100 text-amber-700 hover:bg-amber-100 shadow-none border-transparent" :
                    "bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none border-transparent"
                  }
                >
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}