
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    revenue: 0,
  });

  useEffect(() => {
    setHasAnimated(true);
    
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
        clients: Math.floor(easedProgress * 720),
        projects: Math.floor(easedProgress * 1000),
        years: Math.floor(easedProgress * 10),
        revenue: Math.floor(easedProgress * 7000),
      });
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, []);

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Future of your</span>
              <br />
              <span className="text-gray-900">business today.</span>
            </h1>
            
            <p className="mt-6 text-gray-600 max-w-lg">
              We're a creative branding and digital marketing agency committed to elevating your brand in a competitive marketplace.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex items-center space-x-3">
                <span className="text-primary text-3xl font-bold">{hasAnimated ? animatedStats.clients : "0"}+</span>
                <p className="text-gray-600 text-sm">Growth in our priority</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary text-3xl font-bold">{hasAnimated ? animatedStats.projects : "0"}+</span>
                <p className="text-gray-600 text-sm">Projects delivered</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="p-6 border rounded-lg hover:shadow-md transition-all duration-300">
                <h3 className="text-gray-900 font-semibold mb-3">Build the future of your business</h3>
                <p className="text-gray-600 text-sm mb-4">We work with ambitious brands to deliver outstanding digital experiences.</p>
                <ArrowUpRight className="text-primary" />
              </div>
              
              <div className="p-6 bg-primary text-white rounded-lg">
                <h3 className="font-semibold mb-3">We are here to help your business</h3>
                <p className="text-white text-sm opacity-90 mb-4">Our expertise combined with your vision creates remarkable results.</p>
                <ArrowUpRight className="text-white" />
              </div>
            </div>
          </div>
          
          {/* Right Content - Images */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-video bg-gray-100 rounded-lg w-full h-auto"></div>
            <div className="absolute bottom-16 -left-8 w-48 h-48 bg-gray-100 rounded-lg hidden md:block"></div>
            <div className="absolute top-20 right-0 w-1/2 h-56 bg-gray-100 rounded-lg hidden md:block"></div>
            
            <div className="mt-12 py-4 px-6 ml-auto mr-0 bg-white w-max rounded-lg">
              <h3 className="text-sm font-semibold mb-2">HELPING BUSINESSES <br/>THRIVE IN A DIGITAL-FIRST WORLD</h3>
              <p className="text-gray-600 text-xs mb-4 max-w-xs">
                We are a strategic partner that helps brands navigate the evolving digital landscape and connect with their audience.
              </p>
              <button className="text-xs flex items-center space-x-2 bg-gray-900 text-white px-3 py-1 rounded-md">
                <span>Learn more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
