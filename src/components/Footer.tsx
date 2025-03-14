
import React from "react";
import { Link } from "react-router-dom";
import { useFooterLinks } from "./hooks/useFooterLinks";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const { isLoading, getFooterLinksBySection } = useFooterLinks();
  const footerSections = getFooterLinksBySection();

  // Function to render the social media icons
  const renderSocialIcons = () => (
    <div className="flex items-center gap-4">
      <a href="https://instagram.com/zoolyum" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
        <Instagram className="h-5 w-5" />
      </a>
      <a href="https://facebook.com/zoolyum" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
        <Facebook className="h-5 w-5" />
      </a>
      <a href="https://youtube.com/zoolyum" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
        <Youtube className="h-5 w-5" />
      </a>
      <a href="mailto:info@zoolyum.com" className="text-white hover:text-primary transition-colors">
        <Mail className="h-5 w-5" />
      </a>
    </div>
  );

  if (isLoading) {
    return (
      <footer className="bg-secondary text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Zoolyum Creative Agency. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer top section with logo and sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and description column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">ZOOLYUM</h2>
            </Link>
            <p className="text-gray-300 mb-6">
              We're a creative agency focused on delivering exceptional digital experiences that help brands stand out, engage their audience, and grow their business.
            </p>
            {renderSocialIcons()}
          </div>

          {/* Footer links columns */}
          {Object.keys(footerSections).map((section) => (
            <div key={section} className="flex flex-col">
              <h3 className="font-bold text-primary mb-4">{section}</h3>
              <ul className="space-y-2">
                {footerSections[section].map((link) => (
                  <li key={link.id}>
                    {link.url.startsWith("http") ? (
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link 
                        to={link.url} 
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom section with copyright and admin link */}
        <div className="pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Zoolyum Creative Agency. All rights reserved.
          </p>
          <Link 
            to="/admin" 
            className="text-xs text-gray-500 hover:text-gray-300 transition-opacity"
          >
            Site Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
