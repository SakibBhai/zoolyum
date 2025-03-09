
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I get help in a consultation?",
      answer: "Our expert team is ready to discuss your specific needs and goals. Simply schedule a call, and we'll guide you through the process of creating a tailored solution for your business."
    },
    {
      question: "How do you measure the success of your services?",
      answer: "We establish clear KPIs at the beginning of each project and provide regular reports on performance metrics relevant to your goals, such as engagement, conversions, and ROI."
    },
    {
      question: "Do you work with businesses in all industries?",
      answer: "Yes, we work with clients across various industries, bringing our expertise in branding and digital marketing to help businesses of all sizes and sectors achieve their goals."
    },
    {
      question: "What is the process for starting a project?",
      answer: "We begin with a discovery call to understand your needs, followed by a proposal outlining our approach, timeline, and investment. Once approved, we kick off with a detailed planning session."
    },
    {
      question: "How long does it take to see results?",
      answer: "Timelines vary depending on the project scope, but we typically start seeing initial results within 30-60 days, with more significant outcomes developing over 3-6 months."
    },
    {
      question: "How do you measure the success of your services?",
      answer: "We track key performance indicators specific to your goals, providing regular reports and analyses to demonstrate ROI and progress toward your business objectives."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing is customized based on your specific needs and project scope. We offer different service tiers to accommodate various budgets while ensuring quality results."
    },
    {
      question: "Can you help with rebranding or repositioning our business?",
      answer: "Absolutely! We specialize in helping businesses evolve their brand identity and positioning to better connect with their target audience and achieve their strategic goals."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            {faqs.slice(0, 4).map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button 
                  className="flex justify-between items-center w-full text-left py-3"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-medium flex items-center">
                    <span className="text-primary mr-3">{index + 1}</span>
                    {faq.question}
                  </span>
                  <ChevronDown className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={18} />
                </button>
                {openIndex === index && (
                  <div className="text-gray-600 text-sm pt-2 pl-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="grid gap-4">
            <div className="bg-primary rounded-lg p-8 mb-4">
              <h3 className="text-white font-semibold mb-4">Different from other agencies?</h3>
              <p className="text-white text-sm opacity-90 mb-4">
                Unlike typical agencies, we focus on holistic brand growth with customized strategies 
                and transparent reporting. Our collaborative approach means your success is our priority.
              </p>
              <button className="flex items-center text-white">
                <span>Learn more</span>
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
            
            {faqs.slice(4).map((faq, index) => (
              <div key={index + 4} className="border-b pb-4">
                <button 
                  className="flex justify-between items-center w-full text-left py-3"
                  onClick={() => toggleQuestion(index + 4)}
                >
                  <span className="font-medium flex items-center">
                    <span className="text-primary mr-3">{index + 5}</span>
                    {faq.question}
                  </span>
                  <ChevronDown className={`transition-transform ${openIndex === index + 4 ? 'rotate-180' : ''}`} size={18} />
                </button>
                {openIndex === index + 4 && (
                  <div className="text-gray-600 text-sm pt-2 pl-6">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
