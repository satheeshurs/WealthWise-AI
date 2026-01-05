import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Coins, 
  ArrowUpDown, 
  Settings2,
  Info,
  AlertCircle
} from "lucide-react";

export default function TradePreferences() {
  const instrumentTypes = [
    { id: "equities", label: "Equities", icon: ShieldCheck },
    { id: "mutual_funds", label: "Mutual Funds", icon: Coins },
    { id: "fixed_income", label: "Fixed Income", icon: ArrowUpDown },
    { id: "options", label: "Options", icon: Settings2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Trade Preferences</h1>
          <p className="text-muted-foreground mt-1">Configure global rules for trade generation and rebalancing.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Save Preferences</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {instrumentTypes.map((type) => (
            <Card key={type.id}>
              <CardHeader className="pb-3 border-b mb-4 bg-muted/20">
                <div className="flex items-center gap-2">
                  <type.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{type.label} Rules</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Fractional Shares</Label>
                      <p className="text-xs text-muted-foreground">Enable for portfolio precision.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Trade Size ($)</Label>
                    <Input type="number" placeholder="100.00" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Order Type</Label>
                    <Select defaultValue="market">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="limit">Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Restriction Level</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (SRI/ESG)</SelectItem>
                        <SelectItem value="strict">Strict Compliance</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Why Preferences Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Trade preferences act as a **guardrail** for the rebalancing engine. They ensure that generated trades align with your operational capacity and firm policies.
              </p>
              <p>
                Setting a **Minimum Trade Size** prevents "dust" trades that incur unnecessary transaction costs without meaningfully impacting the portfolio allocation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Active Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded border border-orange-200 bg-white">
                <Badge className="bg-orange-500">Global</Badge>
                <p className="text-xs text-orange-900">Wash sale prevention active (30-day window).</p>
              </div>
              <div className="flex items-start gap-3 p-2 rounded border border-orange-200 bg-white">
                <Badge className="bg-orange-500">Firm</Badge>
                <p className="text-xs text-orange-900">No buying of proprietary IPOs for 90 days.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
