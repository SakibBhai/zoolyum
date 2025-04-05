
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    awards: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);

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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-32"
      style={{
        background: "linear-gradient(135deg, #FFF5F1 0%, #FFF 100%)",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag */}
          <div className="inline-block px-4 py-2 rounded-full bg-orange-100 text-primary text-sm font-medium mb-8">
            #BrandingPowerhouse
          </div>
          
          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6">
            Transform Your Brand with <span className="text-primary">Zoolyum</span>
          </h1>
          
          {/* Hero Description */}
          <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-3xl mx-auto">
            We craft compelling brand experiences that captivate audiences and drive growth. 
            Your vision, our expertise – together we'll create something extraordinary.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button 
              className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-6 text-base"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-300 text-secondary hover:bg-gray-100 rounded-full px-8 py-6 text-base"
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
          
          {/* Stats */}
          <div 
            ref={statsRef} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center"
          >
            <div className="stats-item">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{animatedStats.clients}+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="stats-item">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{animatedStats.projects}+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="stats-item">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{animatedStats.years}+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="stats-item">
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{animatedStats.awards}+</div>
              <p className="text-gray-600">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
