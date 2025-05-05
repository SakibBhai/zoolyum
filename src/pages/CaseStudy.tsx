
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CaseStudyFilters from "@/components/case-studies/CaseStudyFilters";
import FeaturedCaseStudy from "@/components/case-studies/FeaturedCaseStudy";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";
import CallToAction from "@/components/case-studies/CallToAction";
import { useCaseStudies } from "@/hooks/useCaseStudies";

const CaseStudy = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState<number>(6);
  const { caseStudies, isLoading, featuredCase, formatDate, calculateReadTime } = useCaseStudies();

  // Filter case studies based on active filter
  const filteredCaseStudies = activeFilter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  // Effect for animations
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [filteredCaseStudies]);

  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="py-16 mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up text-gray-900">Case Studies</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 fade-up">
            Explore our client success stories and discover how we've helped transform businesses across industries with innovative digital solutions.
          </p>
          
          {/* Filter buttons */}
          <CaseStudyFilters 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Case Study */}
            {featuredCase && activeFilter === 'all' && (
              <FeaturedCaseStudy 
                caseStudy={featuredCase} 
                formatDate={formatDate} 
                calculateReadTime={calculateReadTime} 
              />
            )}

            {/* Case studies grid */}
            <CaseStudyGrid 
              caseStudies={filteredCaseStudies} 
              visibleItems={visibleItems} 
              loadMore={loadMore} 
              calculateReadTime={calculateReadTime} 
            />
          </>
        )}
        
        {/* Call to action */}
        <CallToAction />
      </div>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
