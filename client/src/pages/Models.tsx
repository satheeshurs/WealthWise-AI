import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, Layers, Info, AlertTriangle, X, Save, Search as SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Models() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState([
    {
      id: "M1",
      name: "Global Aggressive Strategy",
      type: "Strategy",
      lastUpdated: "2025-05-20",
      status: "Active",
      description: "Aggressive growth model with 90% equity exposure.",
      securities: [
        { id: "S1", ticker: "VOO", name: "Vanguard S&P 500 ETF", weight: 60, type: "ETF" },
        { id: "S2", ticker: "VXUS", name: "Vanguard Total Intl Stock ETF", weight: 30, type: "ETF" },
        { id: "S3", ticker: "BND", name: "Vanguard Total Bond Market ETF", weight: 10, type: "ETF" }
      ]
    },
    {
      id: "M2",
      name: "Core Large Cap Sleeve",
      type: "Sleeve",
      lastUpdated: "2025-05-18",
      status: "Active",
      description: "U.S. Large Cap focused sleeve with low tracking error.",
      securities: [
        { id: "S4", ticker: "AAPL", name: "Apple Inc.", weight: 7, type: "Equity" },
        { id: "S5", ticker: "MSFT", name: "Microsoft Corp.", weight: 6, type: "Equity" }
      ]
    },
    {
      id: "M3",
      name: "Balanced Income Strategy",
      type: "Strategy",
      lastUpdated: "2025-05-15",
      status: "Draft",
      description: "60/40 balanced model focused on yield generation.",
      securities: []
    }
  ]);

  const [newModel, setNewModel] = useState({
    name: "",
    type: "Strategy",
    description: ""
  });

  const handleCreate = () => {
    const model = {
      id: `M${models.length + 1}`,
      ...newModel,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: "Draft",
      securities: []
    };
    setModels([model, ...models]);
    setIsCreateOpen(false);
    setNewModel({ name: "", type: "Strategy", description: "" });
  };

  const handleAddSecurity = () => {
    if (!searchQuery || !editingModel) return;
    
    const newSecurity = {
      id: `S${Date.now()}`,
      ticker: searchQuery.toUpperCase(),
      name: `${searchQuery.toUpperCase()} Investment`,
      weight: 0,
      type: "Security"
    };

    const updatedModel = {
      ...editingModel,
      securities: [...(editingModel.securities || []), newSecurity]
    };
    
    setEditingModel(updatedModel);
    setSearchQuery("");
  };

  const handleRemoveSecurity = (id: string) => {
    setEditingModel({
      ...editingModel,
      securities: editingModel.securities.filter((s: any) => s.id !== id)
    });
  };

  const handleUpdateWeight = (id: string, weight: string) => {
    setEditingModel({
      ...editingModel,
      securities: editingModel.securities.map((s: any) => 
        s.id === id ? { ...s, weight: Number(weight) || 0 } : s
      )
    });
  };

  const handleSaveModel = () => {
    setModels(models.map(m => m.id === editingModel.id ? editingModel : m));
    setEditingModel(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Model Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage reusable investment frameworks.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90" 
          onClick={() => setIsCreateOpen(true)}
          data-testid="button-create-model"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Model
        </Button>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Investment Model</DialogTitle>
            <DialogDescription>
              Define the base parameters for your new model. You can configure hierarchy levels after saving.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Model Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. ESG Focused Growth Strategy" 
                value={newModel.name}
                onChange={(e) => setNewModel({...newModel, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Model Type</Label>
              <Select 
                value={newModel.type} 
                onValueChange={(value) => setNewModel({...newModel, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strategy">Strategy Model (Master)</SelectItem>
                  <SelectItem value="Sleeve">Sleeve Model (Component)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the investment objective..." 
                className="h-24"
                value={newModel.description}
                onChange={(e) => setNewModel({...newModel, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newModel.name}>Create Model</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingModel} onOpenChange={(open) => !open && setEditingModel(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Model Lineup: {editingModel?.name}</DialogTitle>
            <DialogDescription>
              Search and add securities to your investment model. Ensure total weight equals 100%.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search Ticker, Name, or ISIN..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSecurity()}
                />
              </div>
              <Button onClick={handleAddSecurity}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>

            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Security</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-right font-medium w-32">Target Weight (%)</th>
                    <th className="px-4 py-3 text-right font-medium w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {editingModel?.securities?.map((s: any) => (
                    <tr key={s.id}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{s.ticker}</p>
                          <p className="text-xs text-muted-foreground">{s.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[10px] uppercase">{s.type}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Input 
                          type="number" 
                          className="text-right h-8" 
                          value={s.weight}
                          onChange={(e) => handleUpdateWeight(s.id, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSecurity(s.id)}>
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {(!editingModel?.securities || editingModel.securities.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground italic">
                        No securities added to this model yet.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-muted/20">
                  <tr>
                    <td colSpan={2} className="px-4 py-3 font-bold text-right text-sm">Total Weight:</td>
                    <td className="px-4 py-3 font-bold text-right text-sm">
                      {editingModel?.securities?.reduce((sum: number, s: any) => sum + s.weight, 0)}%
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {editingModel?.securities?.reduce((sum: number, s: any) => sum + s.weight, 0) !== 100 && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-amber-50 text-amber-800 text-xs border border-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Total weight must equal 100% for an active strategy. Current total is {editingModel?.securities?.reduce((sum: number, s: any) => sum + s.weight, 0)}%.</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingModel(null)}>Discard Changes</Button>
            <Button onClick={handleSaveModel} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" /> Save Lineup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
              <Layers className="h-4 w-4" /> Strategy Models
            </CardTitle>
            <div className="text-2xl font-bold">12</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">High-level master allocations</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" /> Sleeve Models
            </CardTitle>
            <div className="text-2xl font-bold">48</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Asset-specific building blocks</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50/50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
              <Info className="h-4 w-4" /> Advisor Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-orange-700 leading-relaxed">
              Use **Sleeve Models** for specific asset classes and aggregate them into a **Strategy Model** for full client portfolios.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Models</CardTitle>
          <CardDescription>Manage your existing investment models and their hierarchies.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Model Name</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {models.map((model) => (
                  <tr key={model.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-primary">{model.name}</p>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={model.type === "Strategy" ? "default" : "secondary"} className={model.type === "Strategy" ? "bg-blue-600" : "bg-orange-500 text-white"}>
                        {model.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${model.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                        {model.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{model.lastUpdated}</td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setEditingModel(model)} data-testid={`button-edit-${model.id}`}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Hierarchy Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 bg-primary rounded-full" />
              <div>
                <p className="font-semibold text-sm">Level 1: Asset Type</p>
                <p className="text-xs text-muted-foreground">Broad categories like Equity, Fixed Income, or Alternatives.</p>
              </div>
            </div>
            <div className="flex gap-4 ml-6">
              <div className="w-1 bg-orange-500 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-orange-600">Level 2: Asset Class</p>
                <p className="text-xs text-muted-foreground">Specific segments like Large Cap, Emerging Markets, or Govt Bonds.</p>
              </div>
            </div>
            <div className="flex gap-4 ml-12">
              <div className="w-1 bg-blue-600 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-blue-600">Level 3: Security Level</p>
                <p className="text-xs text-muted-foreground">Individual tickers or funds (e.g., VOO, AAPL, AGG).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Modeling Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm text-amber-900">
                <span className="font-bold">•</span>
                <span><strong>Avoid Mixing Levels:</strong> Never place a broad Asset Type and a specific Security in the same node.</span>
              </li>
              <li className="flex gap-2 text-sm text-amber-900">
                <span className="font-bold">•</span>
                <span><strong>Execution Depth:</strong> Ensure all models ultimately drill down to liquid securities for trading.</span>
              </li>
              <li className="flex gap-2 text-sm text-amber-900">
                <span className="font-bold">•</span>
                <span><strong>Reusability:</strong> Use Sleeves for modularity across multiple client Strategy models.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
