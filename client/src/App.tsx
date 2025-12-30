import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

// Placeholder pages for navigation
const Clients = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Client Management</h1><p className="text-muted-foreground">Manage your client relationships and accounts here.</p></div>;
const Portfolios = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Portfolio Analysis</h1><p className="text-muted-foreground">Deep dive into asset allocation and performance.</p></div>;
const Market = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Market Insights</h1><p className="text-muted-foreground">Real-time market data and research.</p></div>;
const AIAdvisor = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Nexus AI Advisor</h1><p className="text-muted-foreground">Chat with your AI assistant for complex portfolio queries.</p></div>;
const Settings = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Settings</h1><p className="text-muted-foreground">Configure your account preferences.</p></div>;

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/clients" component={Clients} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/market" component={Market} />
        <Route path="/ai-advisor" component={AIAdvisor} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;