
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20 px-4"
      style={{
        background: "linear-gradient(135deg, #1E293B 0%, #FF5001 200%)",
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-transparent z-0"></div>
      
      <div className="container mx-auto relative z-10 mt-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white space-y-2 leading-tight">
            <span className="block">Crafting</span>
            <span className="block">narrative</span>
            <span className="block text-gray-300">through</span>
            <span className="block text-gray-300">design</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
            With bold vision design is key to 
            building meaningful experiences.
          </p>
          
          <div className="mt-12 flex space-x-4">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-white text-secondary rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              SEE OUR PORTFOLIO
            </a>
          </div>
          
          {/* Portfolio preview images */}
          <div className="mt-24 md:mt-32 flex space-x-3 items-center">
            <div className="w-24 h-16 overflow-hidden rounded-md">
              <img 
                src="/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png" 
                alt="Portfolio preview 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-16 overflow-hidden rounded-md">
              <img 
                src="/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png" 
                alt="Portfolio preview 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-16 overflow-hidden rounded-md">
              <img 
                src="/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png" 
                alt="Portfolio preview 3" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-white text-sm font-medium">SCROLL NOW</span>
              <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Small circles indicator */}
          <div className="mt-8 flex space-x-1">
            {[1, 2, 3, 4].map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
