import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import professionalImage from "@assets/Screenshot_2025-05-27_145726_1767256689663.png";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 w-1/3">
        <button className="lg:hidden p-2 hover:bg-muted rounded-full">
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="relative w-full max-sm:hidden max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search clients, portfolios, or securities..." 
            className="pl-9 bg-background/50 border-transparent focus:border-primary focus:bg-background transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border border-card"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-border pl-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium leading-none">Satheesh Kumar</p>
            <p className="text-xs text-muted-foreground mt-1">Senior Wealth Advisor</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
            <AvatarImage src={professionalImage} alt="Satheesh Kumar" className="object-cover rounded-full" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}