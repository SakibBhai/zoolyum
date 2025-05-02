
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ServiceProcess = () => {
  const processes = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business, goals, target audience, and challenges through in-depth consultations and research.",
      features: [
        "Business & Market Analysis",
        "Goal Setting & KPI Definition",
        "Audience Research",
        "Competitive Landscape Review"
      ]
    },
    {
      step: "02",
      title: "Creative Concept & Design",
      description: "Our creative team develops concepts and designs that align with your brand identity and strategic objectives.",
      features: [
        "Concept Development",
        "Visual Design & Art Direction",
        "Content Strategy",
        "Prototype Development"
      ]
    },
    {
      step: "03",
      title: "Development & Production",
      description: "We bring concepts to life through high-quality development, ensuring technical excellence and attention to detail.",
      features: [
        "Website/App Development",
        "Content Production",
        "Quality Assurance",
        "Pre-Launch Testing"
      ]
    },
    {
      step: "04",
      title: "Launch & Growth",
      description: "After launch, we focus on continuous optimization, data analysis, and strategic refinements to drive ongoing growth.",
      features: [
        "Strategic Launch Planning",
        "Performance Monitoring",
        "Data Analysis & Insights",
        "Continuous Optimization"
      ]
    }
  ];

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Process
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-secondary">
            How We Deliver Excellence
          </h2>
          <p className="mt-4 text-secondary/70">
            Our proven methodology ensures we deliver exceptional results by following a structured
            and collaborative approach tailored to your unique needs.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {processes.map((process, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="md:w-1/3">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{process.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary">{process.title}</h3>
                </div>
                <p className="mt-4 text-secondary/70 pl-20">
                  {process.description}
                </p>
              </div>

              <div className="md:w-2/3 bg-white rounded-xl p-6 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {process.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-secondary/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
