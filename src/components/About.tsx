import { Monitor, Palette, Rocket } from "lucide-react";
const About = () => {
  return <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block fade-up">
            About Us
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary fade-up">
            We Are Your <span className="text-gradient text-orange-600">Creative Partners</span>
          </h2>
          <p className="mt-4 text-secondary/80 fade-up">
            With a decade of experience in digital branding, we've helped hundreds
            of businesses transform their brand identity and achieve remarkable
            growth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[{
          icon: <Palette className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
          title: "Brand Identity",
          description: "We craft unique and memorable brand identities that resonate with your target audience.",
          delay: "delay-100"
        }, {
          icon: <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
          title: "Digital Strategy",
          description: "Our data-driven strategies ensure your brand thrives in the digital landscape.",
          delay: "delay-200"
        }, {
          icon: <Rocket className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
          title: "Growth Marketing",
          description: "We implement innovative marketing solutions that drive sustainable business growth.",
          delay: "delay-300"
        }].map((feature, index) => <div key={index} className={`p-6 md:p-8 rounded-2xl glass hover:shadow-lg transition-all duration-500 hover:transform hover:translate-y-[-5px] fade-up ${feature.delay}`}>
              <div className="rounded-full bg-primary/10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-6 animate-float">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-secondary/70">
                {feature.description}
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary to-primary/30 rounded-full"></div>
            </div>)}
        </div>
        
        {/* Added testimonial section */}
        <div className="mt-20 md:mt-32 max-w-4xl mx-auto px-4 py-8 md:py-12 rounded-2xl glass fade-up">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 text-4xl">❝</div>
            <p className="text-lg md:text-xl italic text-secondary/90 mb-6">
              Working with Zoolyum transformed our brand completely. Their team's creativity 
              and strategic approach helped us connect with our audience in ways we never 
              thought possible.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-bold">JD</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Jane Doe</h4>
                <p className="text-sm text-secondary/60">CEO, TechVision Inc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;