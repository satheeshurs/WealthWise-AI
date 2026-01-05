import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Play,
  Settings,
  ChevronRight,
  Info
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Trading() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rebalanceType, setRebalanceType] = useState("strategy");
  const [driftOnly, setDriftOnly] = useState(true);

  const driftAccounts = [
    {
      id: "ACC-001",
      name: "McKenzie Trust",
      model: "Global Aggressive",
      drift: "7.2%",
      status: "Out of Tolerance",
      impact: "High"
    },
    {
      id: "ACC-002",
      name: "Satheesh Personal",
      model: "Balanced Growth",
      drift: "4.8%",
      status: "Out of Tolerance",
      impact: "Medium"
    }
  ];

  const handleRunRebalance = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Rebalancing Tool</h1>
          <p className="text-muted-foreground mt-1">Generate trades based on model targets and drift rules.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" /> Preferences
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 gap-2" 
            onClick={handleRunRebalance}
            disabled={isProcessing}
          >
            {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run Rebalancer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rebalance Configuration</CardTitle>
              <CardDescription>Define how the system should analyze and generate trades.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Rebalancer Type</Label>
                  <Select value={rebalanceType} onValueChange={setRebalanceType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategy">Strategy Rebalancer (Master)</SelectItem>
                      <SelectItem value="sleeve">Sleeve Rebalancer (Component)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md bg-muted/20">
                  <div className="space-y-0.5">
                    <Label>Drift-Only Rebalance</Label>
                    <p className="text-xs text-muted-foreground">Only trade if tolerance is breached.</p>
                  </div>
                  <Switch checked={driftOnly} onCheckedChange={setDriftOnly} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accounts to Rebalance</CardTitle>
              <CardDescription>The following accounts have breached their defined drift thresholds.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Account</th>
                      <th className="px-4 py-3 text-left font-medium">Model</th>
                      <th className="px-4 py-3 text-right font-medium">Current Drift</th>
                      <th className="px-4 py-3 text-center font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {driftAccounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-primary">{acc.name}</p>
                            <p className="text-xs text-muted-foreground">{acc.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{acc.model}</td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-destructive font-bold">{acc.drift}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                            {acc.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <ChevronRight className="h-4 w-4 text-muted-foreground inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                <Info className="h-5 w-5" /> Rebalancing Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4 text-blue-900 leading-relaxed">
              <p>
                <strong>{rebalanceType === 'strategy' ? 'Strategy Rebalancer' : 'Sleeve Rebalancer'}</strong> is selected.
              </p>
              <p>
                {driftOnly 
                  ? "Generated trades will only address positions that have moved outside their tolerance bands, minimizing turnover." 
                  : "A full rebalance will be executed, resetting every position in the selected accounts to their exact target weights."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Expected Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Aligns <strong>{driftAccounts.length} accounts</strong> with model targets.</span>
                </li>
                <li className="flex gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Applies <strong>Trade Preferences</strong> (Min size, restrictions).</span>
                </li>
                <li className="flex gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Reduces operational risk via automated trade generation.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
