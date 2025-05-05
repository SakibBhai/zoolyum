
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudy } from "@/types/case-study";
import { FileText } from "lucide-react";

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  visibleItems: number;
  loadMore: () => void;
  calculateReadTime: (study: CaseStudy) => string;
}

const CaseStudyGrid = ({ caseStudies, visibleItems, loadMore, calculateReadTime }: CaseStudyGridProps) => {
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-800">No case studies found</h3>
        <p className="text-gray-500">
          No case studies match your current filter. Try selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {caseStudies.slice(0, visibleItems).map((study, index) => (
          <Link
            key={study.id}
            to={`/case-study/${study.id}`} 
            className="group bg-white rounded-xl overflow-hidden transition-all hover:shadow-xl hover:translate-y-[-5px] fade-up border border-gray-200"
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
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                  {study.industry}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {calculateReadTime(study)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-gray-800">{study.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{study.summary}</p>
              <span className="inline-flex items-center text-primary group-hover:gap-2 transition-all">
                Read Case Study <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {visibleItems < caseStudies.length && (
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
  );
};

export default CaseStudyGrid;
