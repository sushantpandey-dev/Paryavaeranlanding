import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-700 transition-colors">
              <Leaf className="size-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Paryavaran Bandhu</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate("faq")}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Contact Us
            </button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("login")}
              className="text-gray-700 hover:text-green-600"
            >
              Login
            </Button>
            <Button
              onClick={() => onNavigate("signup")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate("faq");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  onNavigate("contact");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md font-medium"
              >
                Login
              </button>
              <Button
                onClick={() => {
                  onNavigate("signup");
                  setMobileMenuOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white mx-4"
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
