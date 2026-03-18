"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg text-white transition-transform group-hover:rotate-12">
            <Gift size={24} />
          </div>
          <span className="text-2xl font-headline font-bold text-primary tracking-tight">
            A&H | Casamento
          </span>
        </Link>
        
        <div className="flex gap-4">
          <Link 
            href="/" 
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === "/" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <Home size={18} />
            <span className="hidden sm:inline">Início</span>
          </Link>
          <Link 
            href="/admin" 
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === "/admin" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Gerenciar</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}