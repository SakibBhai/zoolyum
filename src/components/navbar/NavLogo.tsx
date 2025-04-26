
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavLogo = () => (
  <Link to="/" className="flex items-center relative group">
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <img 
        src="/lovable-uploads/eb1bf9f7-df76-422c-a394-06357ddb4d6b.png" 
        alt="Zoolyum Logo" 
        className="h-10 relative z-10 animate-pulse"
      />
    </motion.div>
  </Link>
);

export default NavLogo;
