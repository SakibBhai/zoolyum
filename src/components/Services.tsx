import { Palette, Rocket, Monitor, Video, Crown, Target, Code, BookOpen, ChartBar, Layout, UserRound, PenTool } from "lucide-react";
const Services = () => {
  const serviceLines = [{
    title: "Branding & Identity",
    description: "Build iconic brands with strong positioning and premium aesthetics.",
    icon: <Crown className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    model: "One-Time High-Ticket Projects",
    services: [{
      name: "Personal Branding for CEOs & Entrepreneurs",
      icon: <UserRound size={20} />
    }, {
      name: "Corporate & Business Branding",
      icon: <Palette size={20} />
    }, {
      name: "Luxury Brand Strategy & Identity",
      icon: <Crown size={20} />
    }, {
      name: "Brand Positioning & Messaging",
      icon: <Target size={20} />
    }, {
      name: "Logo, Color Palette & Visual Identity",
      icon: <Palette size={20} />
    }, {
      name: "Brand Guidelines & Tone of Voice",
      icon: <BookOpen size={20} />
    }]
  }, {
    title: "Digital Marketing & Growth",
    description: "Drive targeted traffic, generate leads, and scale brands online.",
    icon: <Rocket className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    model: "Monthly Retainers, Performance-Based Ad Services",
    services: [{
      name: "Social Media Management & Growth",
      icon: <ChartBar size={20} />
    }, {
      name: "Paid Ads (Google, FB, IG, LinkedIn)",
      icon: <Target size={20} />
    }, {
      name: "SEO & Organic Growth",
      icon: <ChartBar size={20} />
    }, {
      name: "Email & Funnel Marketing",
      icon: <Target size={20} />
    }, {
      name: "High-Impact Marketing Strategy",
      icon: <Rocket size={20} />
    }]
  }, {
    title: "Web & UI/UX Design",
    description: "Create high-converting digital experiences.",
    icon: <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    model: "One-Time Projects + Monthly Maintenance Retainers",
    services: [{
      name: "Premium Website Design & Development",
      icon: <Layout size={20} />
    }, {
      name: "E-commerce & Landing Page Funnels",
      icon: <Code size={20} />
    }, {
      name: "Conversion-Optimized UX/UI Design",
      icon: <Monitor size={20} />
    }, {
      name: "Custom Personal Branding Websites",
      icon: <UserRound size={20} />
    }, {
      name: "Website Maintenance & Optimization",
      icon: <Code size={20} />
    }]
  }, {
    title: "Content Creation & Storytelling",
    description: "Build brand authority through engaging, high-quality content.",
    icon: <Video className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    model: "Scalable & Subscription-Based Services",
    services: [{
      name: "Brand Storytelling & Copywriting",
      icon: <PenTool size={20} />
    }, {
      name: "Video Content & Motion Graphics",
      icon: <Video size={20} />
    }, {
      name: "Social Media Creatives & Graphics",
      icon: <Layout size={20} />
    }, {
      name: "Podcast & Thought Leadership Content",
      icon: <BookOpen size={20} />
    }, {
      name: "Reels, Shorts & Viral Video Editing",
      icon: <Video size={20} />
    }]
  }];
  return <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Services
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            Transform Your Brand With Our Services
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            Comprehensive solutions to elevate your brand, drive growth, and create lasting impact in the digital landscape.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceLines.map((line, index) => <div key={index} className="p-6 md:p-8 rounded-2xl glass hover:shadow-lg transition-all duration-300 fade-up">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3 md:p-4">
                  {line.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-secondary">
                    {line.title}
                  </h3>
                  
                </div>
              </div>
              
              <p className="mt-4 text-secondary/80">
                {line.description}
              </p>

              <div className="mt-6 space-y-3">
                {line.services.map((service, serviceIndex) => <div key={serviceIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                    <span className="text-secondary/80 text-sm md:text-base">
                      {service.name}
                    </span>
                  </div>)}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Services;