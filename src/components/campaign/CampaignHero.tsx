
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CampaignHero = () => {
  const scrollToPackages = () => {
    const element = document.getElementById('packages');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/5 pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light bg-[size:40px_40px] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/10 text-primary text-sm font-semibold uppercase tracking-wide">
              ✨ Limited Time Campaign
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6"
          >
            Professional <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block">Brand Guidelines</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary/80 mb-12 max-w-3xl mx-auto"
          >
            Transform your business with comprehensive brand guidelines that ensure consistency across all touchpoints and elevate your brand presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={scrollToPackages}
              className="bg-gradient-to-r from-primary to-primary-hover text-white px-8 py-6 text-lg rounded-full group hover:shadow-xl transition-all duration-300"
            >
              View Packages
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="border-2 border-secondary/20 text-secondary hover:bg-secondary/5 px-8 py-6 text-lg rounded-full"
            >
              Get Consultation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              "Complete Brand Identity",
              "Professional Guidelines",
              "Ready-to-Use Assets"
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-secondary/70">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampaignHero;
