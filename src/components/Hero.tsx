
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    awards: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate the counters when stats section is visible
          const duration = 2000; // animation duration in ms
          const frameDuration = 1000 / 60; // 60fps
          const totalFrames = Math.round(duration / frameDuration);
          
          let frame = 0;
          const counter = setInterval(() => {
            frame++;
            
            const progress = frame / totalFrames;
            const easeOutQuad = (t: number) => t * (2 - t); // easing function
            const easedProgress = easeOutQuad(progress);
            
            setAnimatedStats({
              clients: Math.floor(easedProgress * 150),
              projects: Math.floor(easedProgress * 200),
              years: Math.floor(easedProgress * 10),
              awards: Math.floor(easedProgress * 15)
            });
            
            if (frame === totalFrames) {
              clearInterval(counter);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Floating animation for decorative elements
  const shapes = [
    { size: "h-16 w-16", color: "bg-primary/10", delay: "delay-100", top: "top-[20%]", left: "left-[10%]", animation: "animate-float" },
    { size: "h-12 w-12", color: "bg-accent/10", delay: "delay-300", top: "top-[70%]", left: "left-[15%]", animation: "animate-bounce" },
    { size: "h-20 w-20", color: "bg-secondary/10", delay: "delay-200", top: "top-[30%]", left: "left-[85%]", animation: "animate-spin" },
    { size: "h-14 w-14", color: "bg-primary/10", delay: "delay-400", top: "top-[60%]", left: "left-[80%]", animation: "animate-pulse" },
  ];
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-32"
      style={{
        background: "linear-gradient(135deg, #FFF5F1 0%, #FFFFFF 100%)",
      }}
    >
      {/* Decorative floating elements with various animations */}
      {shapes.map((shape, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className={`absolute rounded-full ${shape.size} ${shape.color} ${shape.top} ${shape.left} ${shape.animation} blur-xl ${shape.delay} opacity-60 hidden md:block`}
        />
      ))}
      
      {/* Grid overlay for futuristic effect - made more visible and with light color scheme */}
      <div className="absolute inset-0 bg-grid-light bg-[size:40px_40px] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm text-secondary text-sm font-medium mb-8 animate-pulse"
          >
            #BrandingPowerhouse
          </motion.div>
          
          {/* Hero Title with animated gradient effect */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 animate-fade-in"
          >
            Transform Your Brand with <span className="text-gradient bg-gradient-to-r from-primary to-accent inline-block animate-text-shimmer bg-[size:200%_auto]">Zoolyum</span>
          </motion.h1>
          
          {/* Hero Description with glass effect */}
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/60 rounded-xl p-6 mb-10 max-w-3xl mx-auto border border-black/5 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <p className="text-secondary text-lg sm:text-xl">
              We craft compelling brand experiences that captivate audiences and drive growth. 
              Your vision, our expertise – together we'll create something extraordinary.
            </p>
          </motion.div>
          
          {/* CTA Buttons with enhanced hover effects */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-full px-8 py-6 text-base group transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                variant="outline" 
                className="border border-secondary/20 text-secondary hover:bg-secondary/5 rounded-full px-8 py-6 text-base backdrop-blur-sm transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('portfolio');
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Stats with enhanced glass effect and animations */}
          <motion.div 
            ref={statsRef} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: animatedStats.clients, label: "Happy Clients" },
              { value: animatedStats.projects, label: "Projects Completed" },
              { value: animatedStats.years, label: "Years Experience" },
              { value: animatedStats.awards, label: "Industry Awards" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`stats-item backdrop-blur-md bg-white/70 rounded-2xl p-6 border border-black/5 transition-all duration-300 hover:bg-white/90 ${index % 2 === 0 ? 'lg:translate-y-4' : ''}`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {typeof stat.value === 'number' ? stat.value + '+' : stat.value}
                </div>
                <p className="text-secondary/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent"></div>
    </section>
  );
};

export default Hero;
