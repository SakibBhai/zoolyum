
import { Users, Target, Lightbulb, Building2 } from "lucide-react";
import TeamMember from "./TeamMember";
import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png",
      bio: "Visionary leader with 15+ years of experience in digital innovation."
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png",
      bio: "Award-winning designer passionate about creating meaningful experiences."
    },
    {
      name: "Mike Chen",
      role: "Technical Lead",
      image: "/lovable-uploads/d479c761-6b78-46a8-a365-dfc9dce9145c.png",
      bio: "Full-stack developer specializing in scalable web applications."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Zoolyum</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're a team of creative thinkers and problem solvers, dedicated to transforming digital experiences.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="text-primary h-6 w-6" />
          <h2 className="text-3xl font-bold">Our Story</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, Zoolyum emerged from a vision to bridge the gap between creativity and technology. 
            What started as a small team of passionate designers and developers has grown into a full-service 
            creative agency, delivering innovative digital solutions to clients worldwide.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="text-primary h-6 w-6" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
            <p className="text-gray-600 leading-relaxed">
              To empower businesses with innovative digital solutions that drive growth, 
              enhance user experiences, and create lasting impact in the digital landscape.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-primary h-6 w-6" />
            <h2 className="text-3xl font-bold">Our Vision</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
            <p className="text-gray-600 leading-relaxed">
              To be the leading creative force in digital transformation, setting new 
              standards for innovation, creativity, and technical excellence in the industry.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center gap-2 mb-10">
          <Users className="text-primary h-6 w-6" />
          <h2 className="text-3xl font-bold">Our Team</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
