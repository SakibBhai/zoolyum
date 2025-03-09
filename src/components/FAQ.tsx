
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// FAQ data
const faqData = [
  {
    question: "What services does Zoolyum offer?",
    answer: "Zoolyum offers a comprehensive range of creative and digital services including branding, web design and development, digital marketing, content creation, and strategic consulting tailored to meet your business needs."
  },
  {
    question: "How does the creative process work?",
    answer: "Our creative process begins with understanding your business goals, followed by research, strategy development, concept creation, execution, and continuous refinement. We maintain open communication throughout the entire journey to ensure your vision is achieved."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while comprehensive branding projects can take 2-3 months. During our initial consultation, we'll provide a personalized timeline for your specific project."
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes! We work with businesses of all sizes, from startups to established enterprises. Our flexible approach allows us to tailor our services to match your specific needs and budget constraints."
  },
  {
    question: "What makes Zoolyum different from other agencies?",
    answer: "Zoolyum stands out through our strategic approach, creative excellence, and commitment to measurable results. We focus on building long-term partnerships rather than one-off projects, becoming an extension of your team dedicated to your ongoing success."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-up">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground fade-up">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-border rounded-lg overflow-hidden fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className="flex items-center justify-between w-full p-5 text-left bg-card hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <Minus className="flex-shrink-0 text-primary" />
                ) : (
                  <Plus className="flex-shrink-0 text-primary" />
                )}
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 p-5" : "max-h-0"
                }`}
                aria-hidden={openIndex !== index}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-up">
          <p className="mb-4 text-muted-foreground">Still have questions?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
