import { BookOpen, MapPin, Award } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Learning & Education",
      description:
        "Access a rich library of environmental courses, articles, and resources. Expand your knowledge about sustainability, conservation, and climate action while earning certificates.",
      color: "bg-blue-500",
      hoverColor: "group-hover:bg-blue-600",
    },
    {
      icon: MapPin,
      title: "Location-Based Tasks",
      description:
        "Find and participate in environmental activities near you. From tree planting to beach cleanups, discover opportunities to make a tangible impact in your local community.",
      color: "bg-green-500",
      hoverColor: "group-hover:bg-green-600",
    },
    {
      icon: Award,
      title: "Reward System",
      description:
        "Earn points and badges for completing tasks and courses. Refer friends to join the movement and unlock exclusive rewards. Your contributions are recognized and celebrated.",
      color: "bg-amber-500",
      hoverColor: "group-hover:bg-amber-600",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Paryavaran Bandhu?
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to become an environmental champion in one platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`${feature.color} ${feature.hoverColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-md`}
                >
                  <Icon className="size-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Value Props */}
        <div className="mt-20 bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Together, We Can Make a Difference
            </h3>
            <p className="text-lg text-green-50 mb-8">
              Join thousands of Bandhus across the country who are actively contributing 
              to environmental conservation. Every action counts, every volunteer matters.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-left">
              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl">🌱</div>
                <div>
                  <div className="font-semibold">Flexible</div>
                  <div className="text-sm text-green-50">Work at your pace</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl">🤝</div>
                <div>
                  <div className="font-semibold">Community</div>
                  <div className="text-sm text-green-50">Connect with others</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl">🎯</div>
                <div>
                  <div className="font-semibold">Impact</div>
                  <div className="text-sm text-green-50">See real results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
