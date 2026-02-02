import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function RecentActivities() {
  const activities = [
    {
      title: "Beach Cleanup Drive - Juhu Beach",
      location: "Mumbai, Maharashtra",
      date: "March 15, 2026",
      participants: 45,
      image: "https://images.unsplash.com/photo-1610093366806-b2907e880fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXAlMjB2b2x1bnRlZXJzJTIwZ3JvdXB8ZW58MXx8fHwxNzcwMDU1NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Cleanup",
      impact: "200 kg waste collected",
      status: "Completed",
    },
    {
      title: "Community Tree Plantation",
      location: "Bangalore, Karnataka",
      date: "March 18, 2026",
      participants: 32,
      image: "https://images.unsplash.com/photo-1759716705272-8d1697eccf7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjBwbGFudGluZ3xlbnwxfHx8fDE3NzAwNTU0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Plantation",
      impact: "150 trees planted",
      status: "Completed",
    },
    {
      title: "Waste Segregation Workshop",
      location: "Delhi NCR",
      date: "March 20, 2026",
      participants: 28,
      image: "https://images.unsplash.com/photo-1761494907751-faf14c99f7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMHNvcnRpbmd8ZW58MXx8fHwxNzcwMDU1NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Education",
      impact: "500 families trained",
      status: "Completed",
    },
    {
      title: "River Cleaning Initiative",
      location: "Pune, Maharashtra",
      date: "March 25, 2026",
      participants: 52,
      image: "https://images.unsplash.com/photo-1610093366806-b2907e880fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXAlMjB2b2x1bnRlZXJzJTIwZ3JvdXB8ZW58MXx8fHwxNzcwMDU1NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Cleanup",
      impact: "300 kg plastic removed",
      status: "Upcoming",
    },
    {
      title: "Urban Gardening Project",
      location: "Hyderabad, Telangana",
      date: "March 28, 2026",
      participants: 38,
      image: "https://images.unsplash.com/photo-1759716705272-8d1697eccf7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjBwbGFudGluZ3xlbnwxfHx8fDE3NzAwNTU0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Gardening",
      impact: "5 community gardens",
      status: "Upcoming",
    },
    {
      title: "E-Waste Collection Drive",
      location: "Chennai, Tamil Nadu",
      date: "March 30, 2026",
      participants: 41,
      image: "https://images.unsplash.com/photo-1761494907751-faf14c99f7ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMHNvcnRpbmd8ZW58MXx8fHwxNzcwMDU1NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Recycling",
      impact: "1 ton e-waste target",
      status: "Upcoming",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recent Activities
          </h2>
          <p className="text-lg text-gray-600">
            See what our community has been up to and join upcoming environmental tasks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900">
                    {activity.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {activity.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4 text-green-600" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4 text-green-600" />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="size-4 text-green-600" />
                    {activity.participants} participants
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-green-800">
                    Impact: {activity.impact}
                  </p>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white group/btn"
                  size="sm"
                >
                  {activity.status === "Completed" ? "View Details" : "Join Task"}
                  <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50"
          >
            View All Activities
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
