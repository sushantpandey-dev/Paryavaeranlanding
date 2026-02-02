import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Paryavaran Bandhu?",
      answer:
        "Paryavaran Bandhu is a platform that connects environmental volunteers (Bandhus) with meaningful tasks, educational content, and rewards. We help you make a real difference in your community while learning about environmental conservation.",
    },
    {
      question: "How do I become a Bandhu?",
      answer:
        "Simply sign up for a free account, complete your profile, and start exploring available tasks and courses in your area. It's completely free to join!",
    },
    {
      question: "What kind of tasks can I participate in?",
      answer:
        "Tasks range from tree planting, beach cleanups, waste segregation drives, to awareness campaigns. All tasks are location-based, so you can find opportunities near you.",
    },
    {
      question: "How does the reward system work?",
      answer:
        "You earn points for completing tasks and courses. These points unlock badges and exclusive rewards. You can also earn bonus points by referring friends to join the platform.",
    },
    {
      question: "Is there a minimum time commitment?",
      answer:
        "No! Paryavaran Bandhu is flexible. You can participate in tasks and courses at your own pace. Whether you have an hour or a day, there's always an opportunity to contribute.",
    },
    {
      question: "Can I create my own environmental task?",
      answer:
        "Yes! Once you've completed a certain number of tasks and earned the 'Task Leader' badge, you can propose and organize your own environmental initiatives through the platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about Paryavaran Bandhu
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`size-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
