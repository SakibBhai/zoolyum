
import { Monitor, Palette, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            About Us
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            We Are Your Creative Partners
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            With a decade of experience in digital branding, we've helped hundreds
            of businesses transform their brand identity and achieve remarkable
            growth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              icon: <Palette className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
              title: "Brand Identity",
              description:
                "We craft unique and memorable brand identities that resonate with your target audience.",
            },
            {
              icon: <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
              title: "Digital Strategy",
              description:
                "Our data-driven strategies ensure your brand thrives in the digital landscape.",
            },
            {
              icon: <Rocket className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
              title: "Growth Marketing",
              description:
                "We implement innovative marketing solutions that drive sustainable business growth.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 md:p-8 rounded-2xl glass hover:shadow-lg transition-all duration-300"
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="mt-2 md:mt-4 text-sm md:text-base text-secondary/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
