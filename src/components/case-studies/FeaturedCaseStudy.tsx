
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { CaseStudy } from "@/types/case-study";

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudy;
  formatDate: (dateString: string) => string;
  calculateReadTime: (study: CaseStudy) => string;
}

const FeaturedCaseStudy = ({ caseStudy, formatDate, calculateReadTime }: FeaturedCaseStudyProps) => {
  return (
    <div className="mb-16 fade-up">
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={caseStudy.image} 
          alt={caseStudy.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-3">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs">
              {caseStudy.industry}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(caseStudy.created_at)}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {calculateReadTime(caseStudy)}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{caseStudy.title}</h2>
          <p className="text-gray-300 mb-6 line-clamp-2">{caseStudy.summary}</p>
          <Link 
            to={`/case-study/${caseStudy.id}`} 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-colors"
          >
            View Case Study <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCaseStudy;
