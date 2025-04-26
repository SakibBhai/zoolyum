
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenuButton = ({ isOpen, setIsOpen }: MobileMenuButtonProps) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    onClick={() => setIsOpen(!isOpen)}
    className="md:hidden text-secondary hover:text-primary transition-colors relative z-30"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <div className="relative w-6 h-6">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.button>
);

export default MobileMenuButton;
