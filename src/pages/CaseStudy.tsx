
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Calendar, User, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import { supabase } from "@/integrations/supabase/client";

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
  const [visibleItems, setVisibleItems] = useState<number>(3);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setVisibleItems(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up">Case Studies</h1>
          <p className="text-lg text-muted-foreground mb-8 fade-up">
            Explore our client success stories and see how we've helped transform businesses across industries.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up">
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'branding' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('branding')}
            >
              Branding
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'marketing' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('marketing')}
            >
              Marketing
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'web' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Design
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'content' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
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
            {/* Case studies grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.slice(0, visibleItems).map((study, index) => (
                <div 
                  key={study.id} 
                  className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(study.created_at)}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {calculateReadTime(study)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                    <p className="text-muted-foreground mb-4">{study.summary}</p>
                    <Link 
                      to={`/case-study/${study.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      Read Case Study <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Show message if no case studies match filter */}
            {filteredCaseStudies.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No case studies found</h3>
                <p className="text-muted-foreground">
                  No case studies match your current filter. Try selecting a different category.
                </p>
              </div>
            )}

            {/* Load more button */}
            {visibleItems < filteredCaseStudies.length && (
              <div className="text-center mt-12">
                <button 
                  onClick={loadMore}
                  className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Call to action */}
        <div className="mt-24 glass rounded-xl p-8 text-center max-w-4xl mx-auto fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your success story?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Let's discuss how we can help transform your business and achieve remarkable results.
          </p>
          <a 
            href="/#contact" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Start a Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
