
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
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300"
    >
      <div className="mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-gray-600 text-sm">{bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMember;
