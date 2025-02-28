
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { Toaster } from "@/components/ui/toaster";
import PortfolioPreview from "@/components/PortfolioPreview";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import BlogPreview from "@/components/BlogPreview";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-up");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <PortfolioPreview />
      <CaseStudyPreview />
      <BlogPreview />
      <Contact />
      <Toaster />
    </div>
  );
};

export default Index;
