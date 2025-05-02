
import { motion } from "framer-motion";

const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-light bg-[length:30px_30px] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Our Premium Services
            </span>
          </motion.div>
          
          <motion.h1 
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transform Your Brand's Digital Presence
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-secondary/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our full-service creative agency specializes in building iconic brands, 
            driving measurable growth, and creating digital experiences that connect and convert.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#services" 
              className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
            >
              Explore Services
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 rounded-md border border-secondary/20 hover:border-secondary/40 font-medium transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default ServiceHero;
