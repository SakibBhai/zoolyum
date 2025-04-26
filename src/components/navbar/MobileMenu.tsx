
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: Array<{
    name: string;
    href: string;
    section: string;
  }>;
  scrollToSection: (section: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, navLinks, scrollToSection, setIsOpen }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed inset-0 top-16 z-20 bg-white/95 backdrop-blur-xl flex flex-col p-6 shadow-xl"
      >
        <div className="flex flex-col space-y-4 mt-4">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.section ? (
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section!);
                  }}
                  className="block py-3 text-secondary hover:text-primary text-lg font-medium border-b border-gray-200 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="block py-3 text-secondary hover:text-primary text-lg font-medium border-b border-gray-200 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button 
            onClick={() => {
              scrollToSection('contact');
              setIsOpen(false);
            }}
            className="bg-gradient-to-r from-primary to-primary-hover text-white w-full rounded-full py-6"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu;
