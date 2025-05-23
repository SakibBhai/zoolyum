
import { motion } from "framer-motion";
import { Palette, Target, Zap, Users } from "lucide-react";

const CampaignAbout = () => {
  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Comprehensive Brand Identity",
      description: "Logo variations, color palettes, typography, and visual elements that define your brand's unique personality."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategic Guidelines",
      description: "Clear usage rules, do's and don'ts, and implementation guidelines to maintain brand consistency."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Ready-to-Use Assets",
      description: "High-quality files in multiple formats, templates, and mockups ready for immediate implementation."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Shareable guidelines that help your team and partners maintain consistent brand communication."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            Why Brand Guidelines Matter
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl md:text-4xl font-bold text-secondary"
          >
            Build a Consistent & Professional Brand
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-secondary/70 max-w-2xl mx-auto"
          >
            Professional brand guidelines ensure your business presents a cohesive image across all platforms, 
            building trust and recognition with your audience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignAbout;
