
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
    { name: "About Us", href: "/#about", section: "about" },
    { name: "Services", href: "/#services", section: "services" },
    { name: "Projects", href: "/#portfolio", section: "portfolio" },
    { name: "FAQ", href: "/#faq", section: "faq" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-6 ${
        isScrolled ? "bg-secondary/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Zoolyum
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
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
                    className="text-white/80 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-white/80 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            <div className="h-5 w-px bg-white/20"></div>

            <a
              href="/#contact"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection('contact');
                }
              }}
              className="text-white/80 hover:text-white text-sm transition-colors duration-300 flex items-center"
            >
              CONTACT US
              <span className="ml-1">↗</span>
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-white/80 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 bg-secondary/95 backdrop-blur-md absolute top-full left-0 right-0 p-4">
            {navLinks.map((link) => (
              link.section ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section!);
                  }}
                  className="block py-2 text-white/80 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block py-2 text-white/80 hover:text-white text-sm transition-colors duration-300"
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
              className="block py-2 text-white/80 hover:text-white text-sm transition-colors duration-300"
            >
              CONTACT US
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
