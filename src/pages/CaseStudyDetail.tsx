import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Building, CheckCircle, PieChart, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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

interface ProjectStep {
  id: number;
  title: string;
  description: string;
}

interface ResultMetric {
  percentage: string;
  title: string;
  description: string;
}

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);
  const { toast } = useToast();

  // Sample project steps data (in a real app, this might come from the database)
  const projectSteps: ProjectStep[] = [
    {
      id: 1,
      title: "Digital Audit",
      description: "Comprehensive assessment of existing digital infrastructure, user flows, competitors, and market opportunities."
    },
    {
      id: 2,
      title: "Customer Journey Mapping",
      description: "Detailed analysis of customer touch points and interactions with your business to identify pain points and opportunities."
    },
    {
      id: 3,
      title: "Digital Strategy Development",
      description: "Creation of a cohesive, actionable digital transformation roadmap with clear KPIs and measurable outcomes."
    },
    {
      id: 4,
      title: "Experience Design",
      description: "Redesign of key touchpoints and interfaces with a focus on user experience and conversion optimization."
    },
    {
      id: 5,
      title: "Content Strategy",
      description: "Development of a content framework to leverage your brand's unique story and value."
    },
    {
      id: 6,
      title: "Implementation & Training",
      description: "Execution and optimization of the digital transformation plan with ongoing support and training."
    }
  ];

  // Sample results metrics data
  const resultMetrics: ResultMetric[] = [
    {
      percentage: "156%",
      title: "Increase in E-commerce Revenue",
      description: "Year-over-year growth in digital sales through optimization of the new digital ecosystem"
    },
    {
      percentage: "4.2×",
      title: "Improvement in Conversion Rate",
      description: "Significant increase in website conversion rates through improved user journey design"
    },
    {
      percentage: "68%",
      title: "Growth in Digital Engagement",
      description: "Higher consumer interaction levels with the new content strategy and digital presence"
    }
  ];

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
            .limit(2);
          
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
    <div className="min-h-screen bg-white text-gray-900">
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
              className="inline-flex items-center mb-8 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all case studies
            </Link>
            
            {/* Hero Section */}
            <div className="py-16 relative mb-16 bg-gray-100 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-black z-0"></div>
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{caseStudy.title}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(caseStudy.created_at)}
                  </span>
                  <span>•</span>
                  <span>{caseStudy.industry}</span>
                  <span>•</span>
                  <span>{calculateReadTime(caseStudy)}</span>
                </div>
              </div>
            </div>
            
            {/* Project Overview */}
            <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Project Overview</h2>
                <p className="text-gray-600 mb-6">
                  {caseStudy.summary}
                </p>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Details</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-primary mb-1">Industry</p>
                    <p className="text-gray-700">{caseStudy.industry}</p>
                  </div>
                  
                  <div>
                    <p className="text-primary mb-1">Timeline</p>
                    <p className="text-gray-700">12 weeks</p>
                  </div>
                  
                  <div>
                    <p className="text-primary mb-1">Services</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">Digital Strategy</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">UX/UI Design</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Challenge & Solution */}
            <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">The Challenge</h2>
                <p className="text-gray-600">
                  {caseStudy.challenge}
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">The Solution</h2>
                <p className="text-gray-600">
                  {caseStudy.solution}
                </p>
              </div>
            </section>
            
            {/* Our Approach */}
            <section className="mb-24">
              <h2 className="text-2xl font-bold mb-12 text-center text-gray-900">Our Approach</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectSteps.map((step) => (
                  <div key={step.id} className="bg-gray-100 p-6 rounded-lg">
                    <div className="bg-primary/20 text-primary h-10 w-10 rounded-full flex items-center justify-center mb-4">
                      {step.id}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Project Gallery */}
            <section className="mb-24">
              <h2 className="text-2xl font-bold mb-12 text-center text-gray-900">Project Gallery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item} 
                    className="bg-white aspect-video rounded-lg overflow-hidden flex items-center justify-center shadow-md"
                  >
                    <img 
                      src={caseStudy.image} 
                      alt={`Project gallery ${item}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
            
            {/* Results & Impact */}
            <section className="mb-24">
              <h2 className="text-2xl font-bold mb-12 text-center text-gray-900">Results & Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">{metric.percentage}</h3>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{metric.title}</h4>
                    <p className="text-gray-600 text-sm">{metric.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-gray-600">
                <p>{caseStudy.results}</p>
              </div>
            </section>
            
            {/* Client Testimonial */}
            <section className="mb-24">
              <h2 className="text-2xl font-bold mb-12 text-center text-gray-900">Client Feedback</h2>
              
              <div className="bg-gray-100 p-10 rounded-lg max-w-4xl mx-auto">
                <div className="text-4xl text-primary mb-6">"</div>
                <blockquote className="text-xl mb-8 text-gray-700">
                  Working with Zoolyum transformed not just our digital presence but our entire approach to customer engagement. The strategic vision and execution went above and beyond what we could have ever anticipated. Our team now has both the tools and the capabilities to continue evolving our digital ecosystem as our business grows.
                </blockquote>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Michael Chen</p>
                    <p className="text-sm text-gray-500">Marketing Director, Client</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Explore More Projects */}
            <section className="mb-24">
              <h2 className="text-2xl font-bold mb-12 text-center text-gray-900">Explore More Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCaseStudies.map((study) => (
                  <Link 
                    key={study.id} 
                    to={`/case-study/${study.id}`}
                    className="relative block bg-white rounded-lg overflow-hidden group h-64 shadow-md"
                  >
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{study.title}</h3>
                      <span className="text-sm text-gray-300">{study.industry}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            
            {/* Call to Action */}
            <section className="text-center mb-24 bg-gray-100 p-16 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Ready to Transform Your Brand?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Let's collaborate to create a tailored digital strategy that will transform your online presence and drive real business results.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                asChild
              >
                <a href="/#contact">Start Your Project</a>
              </Button>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Case Study Not Found</h2>
            <p className="text-gray-500 mb-8">The case study you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/case-study"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all case studies
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
