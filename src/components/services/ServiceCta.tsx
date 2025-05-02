
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCta = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Brand?
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-secondary/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let's discuss how our services can help you achieve your business goals. 
            Schedule a free consultation with our team today.
          </motion.p>
          
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-medium hover:bg-primary-hover transition-colors"
            >
              Schedule a Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <motion.p
            className="mt-6 text-sm text-secondary/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            No commitments. Let's just talk about your vision and goals.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ServiceCta;
