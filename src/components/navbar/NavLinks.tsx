
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavLinksProps {
  navLinks: Array<{
    name: string;
    href: string;
    section: string;
  }>;
  isHomePage: boolean;
  isScrolled: boolean;
  scrollToSection: (section: string) => void;
}

const NavLinks = ({ navLinks, isHomePage, isScrolled, scrollToSection }: NavLinksProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex items-center space-x-6"
  >
    {navLinks.slice(0, -1).map((link) => (
      link.section ? (
        <motion.a
          key={link.name}
          href={link.href}
          onClick={(e) => {
            if (isHomePage && link.section) {
              e.preventDefault();
              scrollToSection(link.section);
            }
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`text-sm font-medium relative overflow-hidden group ${
            isScrolled ? "text-secondary" : "text-secondary"
          }`}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
            {link.name}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
        </motion.a>
      ) : (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            to={link.href}
            className={`text-sm font-medium relative overflow-hidden group ${
              isScrolled ? "text-secondary" : "text-secondary"
            }`}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
              {link.name}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
          </Link>
        </motion.div>
      )
    ))}
  </motion.div>
);

export default NavLinks;
