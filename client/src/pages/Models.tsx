import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, Layers, Info, AlertTriangle, X, Save } from "lucide-react";
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
  const [models, setModels] = useState([
    {
      id: "M1",
      name: "Global Aggressive Strategy",
      type: "Strategy",
      lastUpdated: "2025-05-20",
      status: "Active",
      description: "Aggressive growth model with 90% equity exposure.",
    },
    {
      id: "M2",
      name: "Core Large Cap Sleeve",
      type: "Sleeve",
      lastUpdated: "2025-05-18",
      status: "Active",
      description: "U.S. Large Cap focused sleeve with low tracking error.",
    },
    {
      id: "M3",
      name: "Balanced Income Strategy",
      type: "Strategy",
      lastUpdated: "2025-05-15",
      status: "Draft",
      description: "60/40 balanced model focused on yield generation.",
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
      status: "Draft"
    };
    setModels([model, ...models]);
    setIsCreateOpen(false);
    setNewModel({ name: "", type: "Strategy", description: "" });
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
                      <Button variant="ghost" size="sm" data-testid={`button-edit-${model.id}`}>Edit</Button>
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
