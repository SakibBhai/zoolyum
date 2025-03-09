
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/#about" },
        { name: "Services", href: "/#services" },
        { name: "Portfolio", href: "/#portfolio" },
        { name: "Blog", href: "/#blog" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Brand Identity", href: "/#services" },
        { name: "Digital Strategy", href: "/#services" },
        { name: "Content Creation", href: "/#services" },
        { name: "Web Development", href: "/#services" },
        { name: "Social Media", href: "/#services" },
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "hello@zoolyum.com", href: "mailto:hello@zoolyum.com" },
        { name: "+1 (555) 123-4567", href: "tel:+15551234567" },
        { name: "Los Angeles, CA", href: "#" },
        { name: "New York, NY", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "/#case-studies" },
        { name: "Blog Articles", href: "/#blog" },
        { name: "FAQs", href: "/#faq" },
        { name: "Client Portal", href: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Disclaimer", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">© {currentYear} Zoolyum. All Rights Reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
