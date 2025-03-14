
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Helmet } from "react-helmet";

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
