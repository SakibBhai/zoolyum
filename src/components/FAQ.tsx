
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFaqs } from "./hooks/useFaqs";
import { Helmet } from "react-helmet";

const FAQ = () => {
  const { faqs, isLoading } = useFaqs();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // SEO schema for FAQs
  const generateFaqSchema = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    return JSON.stringify(faqSchema);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <Helmet>
        <script type="application/ld+json">
          {generateFaqSchema()}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-up">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground fade-up">
            Find answers to common questions about our services and process.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="mb-4 border border-border rounded-lg overflow-hidden fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="px-5 py-4 hover:bg-muted/50">
                    <h3 className="text-lg font-medium text-left">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

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
