
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Building, CheckCircle, PieChart } from "lucide-react";
import Navbar from "../components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  created_at: string;
}

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setIsLoading(true);
        if (!id) return;

        // Fetch the specific case study
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }

        setCaseStudy(data);

        // Fetch related case studies based on the same industry
        if (data) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('case_studies')
            .select('*')
            .eq('industry', data.industry)
            .neq('id', id)
            .limit(3);
          
          if (relatedError) {
            console.error('Error fetching related case studies:', relatedError);
          } else {
            setRelatedCaseStudies(relatedData || []);
          }
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        toast({
          title: "Error",
          description: "Failed to load case study details.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, [id, toast]);

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
  }, [caseStudy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : caseStudy ? (
          <>
            {/* Back button */}
            <Link
              to="/case-study"
              className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all case studies
            </Link>
            
            {/* Header section */}
            <div className="mb-12 fade-up">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(caseStudy.created_at)}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {calculateReadTime(caseStudy)}
                </span>
                <span className="flex items-center">
                  <Building size={14} className="mr-1" />
                  {caseStudy.industry}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{caseStudy.title}</h1>
              <p className="text-lg text-muted-foreground max-w-4xl">{caseStudy.summary}</p>
            </div>
            
            {/* Hero image */}
            <div className="rounded-xl overflow-hidden mb-16 fade-up max-h-[500px]">
              <img 
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              <div className="fade-up">
                <div className="p-6 bg-muted rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">The Challenge</h2>
                  </div>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </div>
              </div>
              
              <div className="fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="p-6 bg-muted rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Our Solution</h2>
                  </div>
                  <p className="text-muted-foreground">{caseStudy.solution}</p>
                </div>
              </div>
              
              <div className="fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="p-6 bg-muted rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <PieChart className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">The Results</h2>
                  </div>
                  <p className="text-muted-foreground">{caseStudy.results}</p>
                </div>
              </div>
            </div>
            
            {/* Related case studies */}
            {relatedCaseStudies.length > 0 && (
              <div className="mt-20 fade-up">
                <h2 className="text-2xl font-bold mb-8">Related Case Studies</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedCaseStudies.map((study) => (
                    <div 
                      key={study.id} 
                      className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{study.summary}</p>
                        <Link 
                          to={`/case-study/${study.id}`} 
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          Read Case Study
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Call to action */}
            <div className="mt-20 glass rounded-xl p-8 text-center max-w-4xl mx-auto fade-up">
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
            <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/case-study"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all case studies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyDetail;
