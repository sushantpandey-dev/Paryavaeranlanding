import { UserPlus, Search, CheckCircle, Trophy } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description:
        "Create your free Bandhu account in minutes. Add your location and interests to get personalized recommendations.",
      step: "01",
    },
    {
      icon: Search,
      title: "Discover Tasks",
      description:
        "Browse environmental tasks and courses near you. Filter by type, duration, and impact level to find the perfect match.",
      step: "02",
    },
    {
      icon: CheckCircle,
      title: "Take Action",
      description:
        "Participate in tasks, complete courses, and contribute to your community. Track your progress in real-time.",
      step: "03",
    },
    {
      icon: Trophy,
      title: "Earn Rewards",
      description:
        "Collect points, unlock badges, and climb the leaderboard. Refer friends to multiply your impact and rewards.",
      step: "04",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started is easy. Follow these simple steps to begin your environmental journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
                )}
                
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute -top-3 -right-3 bg-green-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.step}
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto">
                      <Icon className="size-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
