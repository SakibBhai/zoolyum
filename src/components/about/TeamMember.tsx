
import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember = ({ name, role, image, bio }: TeamMemberProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div 
        className="mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-32 h-32 rounded-full mx-auto object-cover hover:ring-4 hover:ring-primary/20 transition-all duration-300"
        />
      </motion.div>
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </motion.div>
    </motion.div>
  );
};

export default TeamMember;
