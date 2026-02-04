import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    
    // Mock authentication logic
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for testing (admin@paryavaran.com/admin123 or bandhu@paryavaran.com/bandhu123)
      if (
        formData.email === "admin@paryavaran.com" &&
        formData.password === "admin123"
      ) {
        onNavigate("admin-dashboard");
      } else if (
        formData.email === "bandhu@paryavaran.com" &&
        formData.password === "bandhu123"
      ) {
        onNavigate("bandhu-dashboard");
      } else {
        setErrors({
          general: "Invalid email or password. Please try again.",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div 
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-3 mb-8 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Leaf className="size-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Paryavaran Bandhu</h1>
                <p className="text-xs text-green-600 font-medium">Environmental Volunteer Platform</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-lg text-gray-600">
                Sign in to continue your environmental journey
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 flex items-start gap-3 animate-in slide-in-from-top">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  Authentication Failed
                </p>
                <p className="text-sm text-red-700 mt-1">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  placeholder="you@example.com"
                  className={`pl-12 h-12 text-base border-2 rounded-xl transition-all ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top">
                  <AlertCircle className="size-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) {
                      setErrors({ ...errors, password: undefined });
                    }
                  }}
                  placeholder="Enter your password"
                  className={`pl-12 pr-12 h-12 text-base border-2 rounded-xl transition-all ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top">
                  <AlertCircle className="size-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset functionality coming soon!")}
                className="text-sm text-green-600 hover:text-green-700 font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("signup")}
                className="text-green-600 hover:text-green-700 font-bold hover:underline"
              >
                Sign up for free
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Info */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyaW5nJTIwY29tbXVuaXR5JTIwZ3JlZW58ZW58MXx8fHwxNzcwMDk4NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Environmental volunteering"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">Join 12,500+ Bandhus</span>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight">
              Make a Real Impact on Our Planet
            </h2>
            
            <p className="text-xl text-green-50 leading-relaxed">
              Connect with environmental tasks, learn sustainable practices, and earn rewards while making a difference in your community.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Learn & Grow</h3>
                  <p className="text-green-50">Access 200+ educational courses on environmental topics</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Take Action</h3>
                  <p className="text-green-50">Participate in location-based environmental tasks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Earn Rewards</h3>
                  <p className="text-green-50">Get recognized with points, badges, and exclusive perks</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-4xl font-bold mb-1">50K+</div>
                <div className="text-green-100 text-sm">Trees Planted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">200+</div>
                <div className="text-green-100 text-sm">Courses</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">50+</div>
                <div className="text-green-100 text-sm">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}