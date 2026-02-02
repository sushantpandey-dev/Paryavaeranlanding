import { Sprout, Users, BookOpen, Recycle } from "lucide-react";

export function ImpactStats() {
  const stats = [
    {
      icon: Sprout,
      number: "50,000+",
      label: "Trees Planted",
      description: "Across 50+ cities in India",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      number: "12,500+",
      label: "Active Volunteers",
      description: "Growing community of Bandhus",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      number: "200+",
      label: "Educational Courses",
      description: "From beginner to advanced",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Recycle,
      number: "100 Tons",
      label: "Waste Recycled",
      description: "Preventing landfill pollution",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our Collective Impact
          </h2>
          <p className="text-lg text-gray-300">
            Together, we're creating measurable change. See what our community has accomplished.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <Icon className="size-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 mb-2">
            Join us in creating a sustainable future
          </p>
          <p className="text-sm text-gray-400">
            Updated daily • Real-time impact tracking
          </p>
        </div>
      </div>
    </section>
  );
}
