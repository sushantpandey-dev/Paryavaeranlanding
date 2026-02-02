import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Environmental Engineer",
      location: "Mumbai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote:
        "Paryavaran Bandhu transformed my weekends. I've planted over 200 trees and met amazing like-minded people. The platform makes it so easy to find and participate in meaningful environmental work.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "College Student",
      location: "Delhi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote:
        "The educational courses are top-notch! I learned so much about sustainability and even earned certificates that helped my resume. Plus, the reward system keeps me motivated to do more.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      role: "Teacher",
      location: "Bangalore",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      quote:
        "I got my entire school involved through Paryavaran Bandhu. The location-based tasks made it easy to organize community cleanups. We've completed 15 projects together this year!",
      rating: 5,
    },
    {
      name: "Vikram Patel",
      role: "Software Developer",
      location: "Pune",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      quote:
        "As someone who works remotely, Paryavaran Bandhu helped me connect with my local community. The flexible scheduling and variety of tasks mean I can always find something that fits my lifestyle.",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      role: "Marketing Manager",
      location: "Hyderabad",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      quote:
        "The referral program is genius! I've brought 10 friends to the platform and we all earned rewards while making a positive impact. It's a win-win for everyone and the environment.",
      rating: 5,
    },
    {
      name: "Arjun Kumar",
      role: "Entrepreneur",
      location: "Chennai",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      quote:
        "I started as a volunteer and now I organize tasks for my entire neighborhood. Paryavaran Bandhu gave me the tools and platform to become a real environmental leader in my community.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories from Our Bandhus
          </h2>
          <p className="text-lg text-gray-600">
            Real people making real impact. Hear what our community members have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 size-8 text-green-200" />
              
              <div className="flex items-center gap-4 mb-6">
                <ImageWithFallback
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span>📍</span> {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Join thousands of satisfied Bandhus making a difference every day
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 5).map((testimonial, index) => (
                <ImageWithFallback
                  key={index}
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              +12,000 more Bandhus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
