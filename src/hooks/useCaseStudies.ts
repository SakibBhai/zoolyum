
import { useState, useEffect } from "react";
import { CaseStudy } from "@/types/case-study";
import { supabase } from "@/integrations/supabase/client";

export const useCaseStudies = () => {
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

  return {
    caseStudies,
    isLoading,
    featuredCase,
    formatDate,
    calculateReadTime
  };
};
