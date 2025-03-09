
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about", section: "about" },
    { name: "Services", href: "/#services", section: "services" },
    { name: "Portfolio", href: "/#portfolio", section: "portfolio" },
    { name: "Blog", href: "/#blog", section: "blog" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white shadow-sm" : "py-4 bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/d8065ca3-8770-4547-bd54-2883754725d0.png" 
              alt="Zoolyum Logo" 
              className="h-8 md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.section ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      scrollToSection(link.section!);
                    }
                  }}
                  className="text-gray-700 hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href="/#contact"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection('contact');
                }
              }}
              className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors duration-300 text-sm font-medium"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navLinks.map((link) => (
              link.section ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section!);
                  }}
                  className="block py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-2 text-gray-700 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
                setIsOpen(false);
              }}
              className="block mt-4 px-5 py-2 bg-primary text-white text-center rounded-md hover:bg-primary-hover transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
