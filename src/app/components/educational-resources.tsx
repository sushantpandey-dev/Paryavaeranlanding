import { BookOpen, Video, FileText, Award, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function EducationalResources() {
  const courses = [
    {
      title: "Introduction to Sustainable Living",
      category: "Beginner",
      duration: "2 hours",
      modules: 8,
      enrollments: 1250,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      description: "Learn the fundamentals of sustainable living and how to reduce your carbon footprint.",
    },
    {
      title: "Climate Change & Global Warming",
      category: "Intermediate",
      duration: "4 hours",
      modules: 12,
      enrollments: 890,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      description: "Understand the science behind climate change and its impact on our planet.",
    },
    {
      title: "Waste Management & Recycling",
      category: "Beginner",
      duration: "3 hours",
      modules: 10,
      enrollments: 1420,
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      description: "Master the art of proper waste segregation and recycling techniques.",
    },
    {
      title: "Biodiversity Conservation",
      category: "Advanced",
      duration: "6 hours",
      modules: 15,
      enrollments: 650,
      icon: Video,
      color: "from-purple-500 to-pink-500",
      description: "Explore ecosystems, endangered species, and conservation strategies.",
    },
  ];

  const resources = [
    {
      title: "Articles & Blogs",
      count: "500+",
      description: "In-depth articles on environmental topics",
      icon: FileText,
    },
    {
      title: "Video Tutorials",
      count: "200+",
      description: "Expert-led video content",
      icon: Video,
    },
    {
      title: "Certificates",
      count: "50+",
      description: "Industry-recognized certifications",
      icon: Award,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Educational Resources
          </h2>
          <p className="text-lg text-gray-600">
            Expand your environmental knowledge with our comprehensive courses and learning materials
          </p>
        </div>

        {/* Resource Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="size-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {resource.count}
                </div>
                <div className="font-semibold text-gray-900 mb-1">{resource.title}</div>
                <div className="text-sm text-gray-600">{resource.description}</div>
              </div>
            );
          })}
        </div>

        {/* Popular Courses */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Popular Courses
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className={`bg-gradient-to-r ${course.color} p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                        <Icon className="size-8 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                        {course.category}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {course.title}
                    </h4>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{course.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div className="text-center">
                        <Clock className="size-5 text-gray-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-gray-900">
                          {course.duration}
                        </div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <BookOpen className="size-5 text-gray-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-gray-900">
                          {course.modules} modules
                        </div>
                        <div className="text-xs text-gray-500">Lessons</div>
                      </div>
                      <div className="text-center">
                        <Award className="size-5 text-gray-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-gray-900">
                          {course.enrollments}
                        </div>
                        <div className="text-xs text-gray-500">Enrolled</div>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Start Learning
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Browse All Courses
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            All courses are free for Paryavaran Bandhu members
          </p>
        </div>
      </div>
    </section>
  );
}
