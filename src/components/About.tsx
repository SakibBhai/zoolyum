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
  return <section className="relative overflow-hidden">
      {/* Hero Section */}
      

      {/* Stats Section */}
      

      {/* Mission & Vision */}
      

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
    </section>;
};
export default About;