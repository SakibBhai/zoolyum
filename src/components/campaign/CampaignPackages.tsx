
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CampaignPackages = () => {
  const packages = [
    {
      name: "Essential",
      price: "10,000",
      currency: "BDT",
      description: "Perfect for startups and small businesses",
      popular: false,
      features: [
        "Logo Design (3 concepts)",
        "Primary Color Palette",
        "Typography Selection",
        "Basic Brand Guidelines (PDF)",
        "Business Card Design",
        "Basic Social Media Templates",
        "2 Revisions",
        "7-Day Delivery"
      ]
    },
    {
      name: "Premium",
      price: "15,000",
      currency: "BDT",
      description: "Most popular choice for growing businesses",
      popular: true,
      features: [
        "Logo Design (5 concepts)",
        "Complete Color System",
        "Typography Hierarchy",
        "Comprehensive Brand Guidelines",
        "Business Stationery Set",
        "Social Media Kit (10 templates)",
        "Brand Pattern & Icons",
        "5 Revisions",
        "10-Day Delivery",
        "Digital Asset Library"
      ]
    },
    {
      name: "Enterprise",
      price: "25,000",
      currency: "BDT",
      description: "Complete brand system for established businesses",
      popular: false,
      features: [
        "Logo Design (Unlimited concepts)",
        "Advanced Color System",
        "Custom Typography",
        "Complete Brand Manual",
        "Full Stationery Suite",
        "Social Media Master Kit",
        "Brand Applications Guide",
        "Website Style Guide",
        "Packaging Guidelines",
        "Unlimited Revisions",
        "15-Day Delivery",
        "3 Months Support"
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="packages" className="py-20 px-4 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Choose Your Package
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl md:text-4xl font-bold text-secondary"
          >
            Transparent Pricing for Every Business
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-secondary/70 max-w-2xl mx-auto"
          >
            Select the perfect package for your business needs. All packages include professional consultation and ongoing support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                pkg.popular
                  ? "bg-white border-2 border-primary shadow-2xl shadow-primary/20"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-secondary mb-2">{pkg.name}</h3>
                <p className="text-secondary/60 mb-6">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary">{pkg.price}</span>
                  <span className="text-lg text-secondary/60 ml-2">{pkg.currency}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-secondary/80 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={scrollToContact}
                className={`w-full py-6 text-base rounded-xl transition-all duration-300 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-lg"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
                variant={pkg.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-secondary/70 mb-4">
            Need a custom solution? 
          </p>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Contact us for a personalized quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignPackages;
