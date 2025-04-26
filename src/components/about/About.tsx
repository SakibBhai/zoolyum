
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

  // Animation variants for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-20 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section with enhanced animations */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Zoolyum
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We're a team of creative thinkers and problem solvers, dedicated to transforming digital experiences.
        </motion.p>
      </motion.div>

      {/* Our Story Section with scroll animations */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-20"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <Building2 className="text-primary h-6 w-6" />
          <h2 className="text-3xl font-bold">Our Story</h2>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, Zoolyum emerged from a vision to bridge the gap between creativity and technology. 
            What started as a small team of passionate designers and developers has grown into a full-service 
            creative agency, delivering innovative digital solutions to clients worldwide.
          </p>
        </motion.div>
      </motion.section>

      {/* Mission & Vision Section with parallax effect */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Target className="text-primary h-6 w-6" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </motion.div>
          <div className="bg-white rounded-2xl p-8 shadow-lg h-full hover:shadow-xl transition-all duration-300">
            <p className="text-gray-600 leading-relaxed">
              To empower businesses with innovative digital solutions that drive growth, 
              enhance user experiences, and create lasting impact in the digital landscape.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Lightbulb className="text-primary h-6 w-6" />
            <h2 className="text-3xl font-bold">Our Vision</h2>
          </motion.div>
          <div className="bg-white rounded-2xl p-8 shadow-lg h-full hover:shadow-xl transition-all duration-300">
            <p className="text-gray-600 leading-relaxed">
              To be the leading creative force in digital transformation, setting new 
              standards for innovation, creativity, and technical excellence in the industry.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Team Section with staggered animations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-20"
      >
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 mb-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Users className="text-primary h-6 w-6" />
          <h2 className="text-3xl font-bold">Our Team</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              viewport={{ once: true }}
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
