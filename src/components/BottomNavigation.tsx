import { Home, Mic, Search, FolderOpen, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Mic, label: "Record", path: "/recording" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: FolderOpen, label: "Library", path: "/library" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-smooth",
                "hover:bg-muted/50 active:scale-95",
                isActive && "text-primary bg-primary/10"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-smooth",
                  isActive && "text-primary"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;