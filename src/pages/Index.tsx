
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import PortfolioPreview from "@/components/PortfolioPreview";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Improved scroll animation handler with throttling
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      // Clear the timeout if it's set
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Set a timeout to run the animation check
      scrollTimeout = setTimeout(() => {
        const elements = document.querySelectorAll(".fade-up");
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.85;
          if (isVisible) {
            element.classList.add("visible");
          }
        });
      }, 100); // 100ms throttle
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    // Run the check again after images might have loaded
    window.addEventListener("load", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Helmet>
        <title>Zoolyum | Creative Agency for Digital Excellence</title>
        <meta name="description" content="Zoolyum is a full-service creative agency specializing in branding, web design, digital marketing, and content creation to help businesses achieve growth and success." />
        <meta name="keywords" content="creative agency, branding, web design, digital marketing, content creation, business growth" />
        <meta property="og:title" content="Zoolyum | Creative Agency for Digital Excellence" />
        <meta property="og:description" content="Elevate your brand with our comprehensive creative and digital services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zoolyum.com" />
        <meta property="og:image" content="/lovable-uploads/d8065ca3-8770-4547-bd54-2883754725d0.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zoolyum | Creative Agency" />
        <meta name="twitter:description" content="Elevate your brand with our comprehensive creative and digital services." />
        <link rel="canonical" href="https://zoolyum.com" />
      </Helmet>
      
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <PortfolioPreview />
        <CaseStudyPreview />
        <BlogPreview />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
