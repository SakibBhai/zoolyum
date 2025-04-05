
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4 bg-white shadow-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/949a5bb0-e47a-44f1-a56b-87c108dcf594.png" 
              alt="Zoolyum Logo" 
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.slice(0, -1).map((link) => (
                link.section ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (isHomePage && link.section) {
                        e.preventDefault();
                        scrollToSection(link.section);
                      }
                    }}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isScrolled ? "text-gray-700 hover:text-primary" : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-primary-hover text-white rounded-full px-6"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white absolute top-full left-0 right-0 p-4 shadow-md">
            {navLinks.map((link) => (
              link.section ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section!);
                  }}
                  className="block py-2 text-gray-700 hover:text-primary text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-2 text-gray-700 hover:text-primary text-sm transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <div className="mt-4">
              <Button 
                onClick={() => {
                  scrollToSection('contact');
                  setIsOpen(false);
                }}
                className="bg-primary hover:bg-primary-hover text-white w-full rounded-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
