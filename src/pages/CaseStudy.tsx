
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Calendar, User, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string;
  image: string;
  created_at: string;
  category?: string; // For filtering
}

const CaseStudy = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState<number>(6);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredCase, setFeaturedCase] = useState<CaseStudy | null>(null);

  // Fetch case studies from Supabase
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Process data to add category for filtering
        const processedStudies = data.map(study => {
          let category = 'content';
          
          if (study.industry === 'Finance' || study.industry === 'Retail') {
            category = 'marketing';
          } else if (study.industry === 'Technology') {
            category = 'web';
          } else if (study.industry === 'Healthcare' || study.industry === 'Education') {
            category = 'branding';
          }
          
          return {
            ...study,
            category
          };
        });
        
        setCaseStudies(processedStudies || []);
        
        // Set the first case study as featured
        if (processedStudies && processedStudies.length > 0) {
          setFeaturedCase(processedStudies[0]);
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Filter case studies based on active filter
  const filteredCaseStudies = activeFilter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Calculate read time based on content length
  const calculateReadTime = (study: CaseStudy) => {
    const contentLength = 
      (study.summary?.length || 0) + 
      (study.challenge?.length || 0) + 
      (study.solution?.length || 0) + 
      (study.results?.length || 0);
    
    const wordsPerMinute = 200;
    const minutes = Math.ceil(contentLength / 5 / wordsPerMinute);
    return `${minutes} min read`;
  };

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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="py-16 mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up">Case Studies</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 fade-up">
            Explore our client success stories and discover how we've helped transform businesses across industries with innovative digital solutions.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 fade-up">
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'branding' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('branding')}
            >
              Branding
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'marketing' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('marketing')}
            >
              Marketing
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'web' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Design
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'content' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveFilter('content')}
            >
              Content
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Case Study */}
            {featuredCase && activeFilter === 'all' && (
              <div className="mb-16 fade-up">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <img 
                    src={featuredCase.image} 
                    alt={featuredCase.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-3">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs">
                        {featuredCase.industry}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(featuredCase.created_at)}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {calculateReadTime(featuredCase)}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredCase.title}</h2>
                    <p className="text-gray-300 mb-6 line-clamp-2">{featuredCase.summary}</p>
                    <Link 
                      to={`/case-study/${featuredCase.id}`} 
                      className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      View Case Study <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Case studies grid */}
            {filteredCaseStudies.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {filteredCaseStudies.slice(0, visibleItems).map((study, index) => (
                    <Link
                      key={study.id}
                      to={`/case-study/${study.id}`} 
                      className="group bg-gray-900 rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:translate-y-[-5px] fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="h-60 overflow-hidden">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs">
                            {study.industry}
                          </span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {calculateReadTime(study)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">{study.summary}</p>
                        <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all">
                          Read Case Study <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load more button */}
                {visibleItems < filteredCaseStudies.length && (
                  <div className="text-center mb-16">
                    <Button 
                      onClick={loadMore}
                      variant="outline"
                      className="px-8 py-3 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">No case studies found</h3>
                <p className="text-gray-400">
                  No case studies match your current filter. Try selecting a different category.
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Call to action */}
        <div className="bg-gray-900 rounded-2xl p-12 text-center max-w-4xl mx-auto fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your success story?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Let's discuss how we can help transform your business and achieve remarkable results.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full"
            asChild
          >
            <a href="/#contact">Start a Project</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
