import { useState } from "react";
import { Search, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";

export function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<"tourist" | "guide">("tourist");

  const touristFaqs = [
    {
      question: "How do I book a guide?",
      answer: "Browse treks, select a trek you're interested in, click 'See Guides', filter guides based on your preferences, and click 'Book Now' on your chosen guide's profile.",
    },
    {
      question: "Can I negotiate prices with guides?",
      answer: "Yes! Guides marked as 'Negotiable' allow you to propose a custom price. You can submit your offer and the guide will review it.",
    },
    {
      question: "How are guides verified?",
      answer: "All guides go through a verification process where we check their certifications, experience, and documentation. Verified guides have a green shield badge.",
    },
    {
      question: "What's included in the guide fee?",
      answer: "Guide fees typically include the guide's service, expertise, and local knowledge. Food, accommodation, and permits are usually separate unless specified otherwise.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Cancellation policies vary by guide. Please discuss cancellation terms directly with your guide before confirming your booking.",
    },
  ];

  const guideFaqs = [
    {
      question: "How do I become a guide on Gantavya?",
      answer: "Click 'Become a Guide' in the navigation, fill out the registration form with your details, select the treks you guide, and submit. We'll review your application within 2-3 business days.",
    },
    {
      question: "How does the booking system work?",
      answer: "When a tourist books you, you'll receive a notification in your dashboard. You can accept or decline the request. Once accepted, you can message the tourist directly.",
    },
    {
      question: "Can I set my own prices?",
      answer: "Yes! You have full control over your pricing. You can set a fixed daily rate or mark yourself as negotiable to receive custom price proposals.",
    },
    {
      question: "How do I get paid?",
      answer: "Payment arrangements are made directly between you and the tourist. Gantavya is a connection platform - we don't handle payments.",
    },
    {
      question: "Why aren't there 'top guide' rankings?",
      answer: "Gantavya believes in fair representation. All guides are shown equally, and tourists use filters to find their perfect match. This ensures everyone gets equal opportunity.",
    },
  ];

  const faqs = activeCategory === "tourist" ? touristFaqs : guideFaqs;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-white mb-4">How can we help you?</h1>
          <p className="text-white/90 mb-8">Search our FAQ or contact support</p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#717182]" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32] text-[#263238]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-[#1B5E20] mb-6">Frequently Asked Questions</h2>

              {/* Category Toggle */}
              <div className="flex gap-2 mb-6 p-1 bg-[#F5F5F5] rounded-xl">
                <button
                  onClick={() => setActiveCategory("tourist")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === "tourist"
                      ? "bg-white text-[#1B5E20] shadow-sm"
                      : "text-[#717182] hover:text-[#263238]"
                  }`}
                >
                  For Tourists
                </button>
                <button
                  onClick={() => setActiveCategory("guide")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === "guide"
                      ? "bg-white text-[#1B5E20] shadow-sm"
                      : "text-[#717182] hover:text-[#263238]"
                  }`}
                >
                  For Guides
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F5F5] transition-colors"
                    >
                      <span className="text-[#263238] pr-4">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 text-[#717182] bg-[#F5F5F5]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-[#1B5E20] mb-6">Contact Support</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="text-[#263238] mb-1">Live Chat</h4>
                    <p className="text-sm text-[#717182] mb-2">Chat with our support team</p>
                    <button className="text-sm text-[#2E7D32] hover:text-[#1B5E20]">
                      Start Chat →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="text-[#263238] mb-1">Email</h4>
                    <p className="text-sm text-[#717182] mb-2">support@gantavya.com</p>
                    <button className="text-sm text-[#2E7D32] hover:text-[#1B5E20]">
                      Send Email →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h4 className="text-[#263238] mb-1">Phone</h4>
                    <p className="text-sm text-[#717182] mb-2">+977 1234 5678</p>
                    <p className="text-sm text-[#717182]">Mon-Fri, 9AM-6PM NPT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
                <p className="text-sm text-[#1B5E20]">
                  💡 Most questions are answered within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Issue */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-[#1B5E20] mb-6">Report an Issue</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#263238] mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
              <div>
                <label className="block text-[#263238] mb-2">Issue Type</label>
                <select className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]">
                  <option>Booking Issue</option>
                  <option>Payment Issue</option>
                  <option>Technical Problem</option>
                  <option>Guide Verification</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#263238] mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Please describe the issue..."
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
