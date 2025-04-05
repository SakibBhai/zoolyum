
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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
    { size: "h-16 w-16", color: "bg-primary/10", delay: "delay-100", top: "top-[20%]", left: "left-[10%]" },
    { size: "h-12 w-12", color: "bg-accent/10", delay: "delay-300", top: "top-[70%]", left: "left-[15%]" },
    { size: "h-20 w-20", color: "bg-secondary/10", delay: "delay-200", top: "top-[30%]", left: "left-[85%]" },
    { size: "h-14 w-14", color: "bg-primary/10", delay: "delay-400", top: "top-[60%]", left: "left-[80%]" },
  ];
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-32"
      style={{
        background: "linear-gradient(135deg, #1E293B 0%, #2A3D53 100%)",
      }}
    >
      {/* Decorative floating elements */}
      {shapes.map((shape, index) => (
        <div 
          key={index}
          className={`absolute rounded-full ${shape.size} ${shape.color} ${shape.top} ${shape.left} animate-float blur-xl ${shape.delay} opacity-50 hidden md:block`}
        />
      ))}
      
      {/* Grid overlay for futuristic effect */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm text-white text-sm font-medium mb-8 animate-pulse">
            #BrandingPowerhouse
          </div>
          
          {/* Hero Title with glow effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in [text-shadow:0_0_30px_rgba(255,80,1,0.3)]">
            Transform Your Brand with <span className="text-gradient bg-gradient-to-r from-primary to-accent inline-block">Zoolyum</span>
          </h1>
          
          {/* Hero Description with glass effect */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 mb-10 max-w-3xl mx-auto border border-white/10 shadow-[0_0_15px_rgba(255,80,1,0.1)]">
            <p className="text-gray-300 text-lg sm:text-xl">
              We craft compelling brand experiences that captivate audiences and drive growth. 
              Your vision, our expertise – together we'll create something extraordinary.
            </p>
          </div>
          
          {/* CTA Buttons with enhanced hover effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button 
              className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-full px-8 py-6 text-base group transition-all duration-300 shadow-[0_0_15px_rgba(255,80,1,0.5)]"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base backdrop-blur-sm transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('portfolio');
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View Our Work
            </Button>
          </div>
          
          {/* Stats with enhanced glass effect */}
          <div 
            ref={statsRef} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center"
          >
            {[
              { value: animatedStats.clients, label: "Happy Clients" },
              { value: animatedStats.projects, label: "Projects Completed" },
              { value: animatedStats.years, label: "Years Experience" },
              { value: animatedStats.awards, label: "Industry Awards" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`stats-item backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover-lift transition-all duration-300 hover:bg-white/10 ${index % 2 === 0 ? 'lg:translate-y-4' : ''}`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 [text-shadow:0_0_10px_rgba(255,80,1,0.5)]">
                  {typeof stat.value === 'number' ? stat.value + '+' : stat.value}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent"></div>
    </section>
  );
};

export default Hero;
