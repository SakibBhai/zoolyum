
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navLinks = [
    { name: "Home", href: "/", section: "" },
    { name: "About", href: "/#about", section: "about" },
    { name: "Services", href: "/#services", section: "services" },
    { name: "Portfolio", href: "/#portfolio", section: "portfolio" },
    { name: "Case Studies", href: "/case-study", section: "" },
    { name: "Blog", href: "/blog", section: "" },
    { name: "Contact", href: "/#contact", section: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-2 backdrop-blur-lg bg-white/70 shadow-lg" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with animation effect */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              {navLinks.slice(0, -1).map((link, index) => (
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-primary-hover text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation Toggle with animation */}
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
        </div>

        {/* Mobile Navigation Menu with animation */}
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
      </div>
    </nav>
  );
};

export default Navbar;
