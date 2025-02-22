
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto text-center">
        <div className="inline-block animate-fade-in">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            #BrandingPowerhouse
          </span>
        </div>
        
        <h1 className="mt-8 text-4xl md:text-6xl font-bold text-secondary animate-fade-up">
          Transform Your Brand with
          <span className="text-primary"> Zoolyum</span>
        </h1>
        
        <p className="mt-6 text-lg text-secondary/80 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
          We craft compelling brand experiences that captivate audiences and drive
          growth. Your vision, our expertise – together we'll create something
          extraordinary.
        </p>
        
        <div className="mt-10 space-x-4 animate-fade-up [animation-delay:400ms]">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center px-8 py-3 border-2 border-secondary/20 text-secondary rounded-full hover:bg-secondary/5 transition-all duration-300"
          >
            View Our Work
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-up [animation-delay:600ms]">
          {[
            { number: "150+", label: "Happy Clients" },
            { number: "200+", label: "Projects Completed" },
            { number: "10+", label: "Years Experience" },
            { number: "15+", label: "Industry Awards" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="mt-2 text-sm text-secondary/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
