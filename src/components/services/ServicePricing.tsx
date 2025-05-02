
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicePricing = () => {
  const pricingPlans = [
    {
      name: "Essential",
      description: "Perfect for small businesses and startups",
      price: "$1,999",
      duration: "one-time project",
      features: [
        "Brand Identity Development",
        "Responsive Website Design",
        "Basic SEO Setup",
        "Social Media Setup",
        "30 Days Support"
      ],
      isPopular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Premium",
      description: "Ideal for growing businesses",
      price: "$3,499",
      duration: "one-time project",
      features: [
        "Advanced Brand Strategy",
        "Custom Website with CMS",
        "E-commerce Integration",
        "Content Creation (5 pages)",
        "Advanced SEO Package",
        "Social Media Strategy",
        "60 Days Support",
      ],
      isPopular: true,
      buttonText: "Choose Premium",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      description: "For established businesses seeking growth",
      price: "Custom",
      duration: "tailored package",
      features: [
        "Comprehensive Brand Strategy",
        "Custom Web Application",
        "Full Digital Marketing Strategy",
        "Content Marketing Plan",
        "Marketing Automation",
        "Monthly Performance Reports",
        "Dedicated Account Manager",
        "Priority Support"
      ],
      isPopular: false,
      buttonText: "Contact Us",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Pricing
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-secondary">
            Transparent & Flexible Pricing
          </h2>
          <p className="mt-4 text-secondary/70">
            Choose the package that best fits your business needs, or contact us for a custom solution
            tailored to your specific requirements.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl p-6 border ${
                plan.isPopular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-gray-200"
              } relative`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center pb-6">
                <h3 className="text-xl font-bold text-secondary">{plan.name}</h3>
                <p className="mt-2 text-secondary/60 text-sm">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-3xl font-bold text-secondary">{plan.price}</span>
                  <span className="text-secondary/60 ml-2">/{plan.duration}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-secondary/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className={`w-full ${plan.isPopular ? "bg-primary hover:bg-primary-hover" : ""}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-secondary/70">
            Need a custom solution? <a href="/contact" className="text-primary font-medium hover:underline">Contact us</a> for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
