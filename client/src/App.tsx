import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Portfolios from "@/pages/Portfolios";
import Market from "@/pages/Market";
import AIAdvisor from "@/pages/AIAdvisor";
import NotFound from "@/pages/not-found";

// Placeholder page for settings
const Settings = () => <div className="p-4"><h1 className="text-2xl font-serif font-bold mb-4">Account Settings</h1><p className="text-muted-foreground">Configure your Nous Infosystems preferences.</p></div>;

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/clients" component={Clients} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/market" component={Market} />
        <Route path="/advisor" component={AIAdvisor} />
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