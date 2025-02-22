
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Palette className="h-8 w-8 text-primary" />,
              title: "Brand Identity",
              description:
                "We craft unique and memorable brand identities that resonate with your target audience.",
            },
            {
              icon: <Monitor className="h-8 w-8 text-primary" />,
              title: "Digital Strategy",
              description:
                "Our data-driven strategies ensure your brand thrives in the digital landscape.",
            },
            {
              icon: <Rocket className="h-8 w-8 text-primary" />,
              title: "Growth Marketing",
              description:
                "We implement innovative marketing solutions that drive sustainable business growth.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl glass hover:shadow-lg transition-all duration-300"
            >
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-secondary">
                {feature.title}
              </h3>
              <p className="mt-4 text-secondary/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
