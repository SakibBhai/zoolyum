
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  summary: string;
  image: string;
  created_at: string;
}

const CaseStudyPreview = () => {
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (error) {
          throw error;
        }
        
        setFeaturedCaseStudies(data || []);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="case-studies" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Case Studies
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            Our Success Stories
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            Dive deep into how we've helped businesses transform and achieve remarkable results.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredCaseStudies.map((study) => (
              <div 
                key={study.id} 
                className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card fade-up"
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
                      {Math.ceil(study.summary.length / 100)} min read
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
        )}

        <div className="mt-12 text-center">
          <Link 
            to="/case-study" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300"
          >
            View All Case Studies <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyPreview;
