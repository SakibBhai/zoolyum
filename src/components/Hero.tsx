
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block animate-fade-in mb-4 transition-all hover:scale-105">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium shadow-sm">
            #BrandingPowerhouse
          </span>
        </div>
        
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary animate-fade-up tracking-tight">
          Transform Your Brand with
          <span className="text-primary ml-2 relative inline-block">
            Zoolyum
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
          </span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms] leading-relaxed">
          We craft compelling brand experiences that captivate audiences and drive
          growth. Your vision, our expertise – together we'll create something
          extraordinary.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:400ms]">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md group"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border-2 border-secondary/20 text-secondary rounded-full hover:bg-secondary/5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Our Work
          </a>
        </div>

        <div 
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-up [animation-delay:600ms]"
        >
          {[
            { number: hasAnimated ? animatedStats.clients : "0", suffix: "+", label: "Happy Clients" },
            { number: hasAnimated ? animatedStats.projects : "0", suffix: "+", label: "Projects Completed" },
            { number: hasAnimated ? animatedStats.years : "0", suffix: "+", label: "Years Experience" },
            { number: hasAnimated ? animatedStats.awards : "0", suffix: "+", label: "Industry Awards" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl glass hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{stat.number}</span>
                <span className="text-3xl font-bold text-primary">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-secondary/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
