import { Monitor, Palette, Rocket, Globe, Users, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [{
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png",
    description: "15+ years of creative leadership experience"
  }, {
    name: "Michael Chen",
    role: "Creative Director",
    image: "/lovable-uploads/949a5bb0-e47a-44f1-a56b-87c108dcf594.png",
    description: "Award-winning designer & strategist"
  }, {
    name: "Emma Davis",
    role: "Marketing Lead",
    image: "/lovable-uploads/d8065ca3-8770-4547-bd54-2883754725d0.png",
    description: "Digital marketing specialist"
  }];

  const stats = [{
    number: "250+",
    label: "Projects Completed",
    icon: <Award className="h-6 w-6" />
  }, {
    number: "10+",
    label: "Years Experience",
    icon: <Globe className="h-6 w-6" />
  }, {
    number: "50+",
    label: "Team Members",
    icon: <Users className="h-6 w-6" />
  }];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              We Create Digital Experiences That Matter
            </h1>
            <p className="text-lg md:text-xl text-secondary/80 mb-8">
              Our passion lies in transforming ideas into impactful digital solutions 
              that help businesses thrive in the modern world.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-up">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-2">{stat.number}</h3>
                <p className="text-secondary/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <h2 className="text-3xl font-bold text-secondary mb-4">Our Mission</h2>
              <p className="text-secondary/80 mb-6">
                To empower businesses with innovative digital solutions that drive 
                growth, enhance user experiences, and create lasting impact in the 
                digital landscape.
              </p>
              <Separator className="my-8" />
              <h2 className="text-3xl font-bold text-secondary mb-4">Our Vision</h2>
              <p className="text-secondary/80">
                To be the leading creative force in digital transformation, setting 
                new standards for excellence and innovation in the industry.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden fade-up">
              <img 
                src="/lovable-uploads/eb1bf9f7-df76-422c-a394-06357ddb4d6b.png"
                alt="Our Mission and Vision"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">What We Do Best</h2>
            <p className="text-secondary/80">
              Our comprehensive range of services is designed to help your business 
              thrive in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[{
            icon: <Palette className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
            title: "Brand Identity",
            description: "We craft unique and memorable brand identities that resonate with your target audience."
          }, {
            icon: <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
            title: "Digital Strategy",
            description: "Our data-driven strategies ensure your brand thrives in the digital landscape."
          }, {
            icon: <Rocket className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
            title: "Growth Marketing",
            description: "We implement innovative marketing solutions that drive sustainable business growth."
          }].map((service, index) => <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 fade-up">
                <CardContent className="p-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">{service.title}</h3>
                  <p className="text-secondary/70">{service.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">Meet Our Team</h2>
            <p className="text-secondary/80">
              Our talented team of creatives, strategists, and technologists work together 
              to deliver exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 fade-up">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2 text-center">{member.role}</p>
                  <p className="text-secondary/70 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-none">
            <CardContent className="p-8 text-center">
              <div className="mb-6 text-4xl text-primary">❝</div>
              <p className="text-lg md:text-xl italic text-secondary/90 mb-8">
                Working with Zoolyum transformed our brand completely. Their team's creativity 
                and strategic approach helped us connect with our audience in ways we never 
                thought possible.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <span className="text-primary font-bold">JD</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold">Jane Doe</h4>
                  <p className="text-sm text-secondary/60">CEO, TechVision Inc</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
