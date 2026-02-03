import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors shadow-lg">
              <Leaf className="size-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white drop-shadow-lg">Paryavaran Bandhu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate("faq")}
              className="text-white hover:text-green-400 transition-colors font-medium drop-shadow-md"
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="text-white hover:text-green-400 transition-colors font-medium drop-shadow-md"
            >
              Contact Us
            </button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("login")}
              className="text-white hover:text-green-400 hover:bg-white/10"
            >
              Login
            </Button>
            <Button
              onClick={() => onNavigate("signup")}
              className="bg-green-600 hover:bg-green-500 text-white shadow-lg"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-black/40 backdrop-blur-md rounded-b-lg">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate("faq");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-white hover:bg-white/10 rounded-md font-medium"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  onNavigate("contact");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-white hover:bg-white/10 rounded-md font-medium"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-white hover:bg-white/10 rounded-md font-medium"
              >
                Login
              </button>
              <Button
                onClick={() => {
                  onNavigate("signup");
                  setMobileMenuOpen(false);
                }}
                className="bg-green-600 hover:bg-green-500 text-white mx-4 shadow-lg"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}