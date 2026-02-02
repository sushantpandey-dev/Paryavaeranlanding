import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1655091834941-4e4cfd699a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG5hdHVyZSUyMGZvcmVzdCUyMGFlcmlhbHxlbnwxfHx8fDE3NzAwNTUwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Green forest aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Join the Movement to{" "}
            <span className="text-green-400">Save Our Planet</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Paryavaran Bandhu connects passionate volunteers with meaningful environmental 
            tasks in their community. Learn, contribute, and earn rewards while making a 
            real difference for our environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => onNavigate("signup")}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 h-auto group"
            >
              Get Started
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate("login")}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 backdrop-blur-sm text-lg px-8 py-6 h-auto"
            >
              Login
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400">1000+</div>
              <div className="text-sm sm:text-base text-gray-300 mt-1">Active Bandhus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400">500+</div>
              <div className="text-sm sm:text-base text-gray-300 mt-1">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-400">50+</div>
              <div className="text-sm sm:text-base text-gray-300 mt-1">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
