import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { auth } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border shadow-sm transition-all duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold transition hover:text-primary/80"
            >
              ModernUI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary/80",
                isActive("/") ? "text-primary" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary/80",
                isActive("/about") ? "text-primary" : "text-muted-foreground",
              )}
            >
              About Us
            </Link>
            {auth.isAuthenticated ? (
              <Link
                to="/profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary/80",
                  isActive("/profile")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary/80",
                  isActive("/login") ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </div>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2 rounded-full"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border pb-4 px-4 slide-in-bottom">
          <div className="flex flex-col space-y-4 pt-2">
            <Link
              to="/"
              className={cn(
                "text-base font-medium transition-colors hover:text-primary/80 py-2",
                isActive("/") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-base font-medium transition-colors hover:text-primary/80 py-2",
                isActive("/about") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={closeMenu}
            >
              About Us
            </Link>
            {auth.isAuthenticated ? (
              <Link
                to="/profile"
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary/80 py-2",
                  isActive("/profile")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary/80 py-2",
                  isActive("/login") ? "text-primary" : "text-muted-foreground",
                )}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
