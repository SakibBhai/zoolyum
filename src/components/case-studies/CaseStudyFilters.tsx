
import { Dispatch, SetStateAction } from "react";

interface CaseStudyFiltersProps {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}

const CaseStudyFilters = ({ activeFilter, setActiveFilter }: CaseStudyFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 fade-up">
      <button 
        className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveFilter('all')}
      >
        All Projects
      </button>
      <button 
        className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'branding' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveFilter('branding')}
      >
        Branding
      </button>
      <button 
        className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'marketing' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveFilter('marketing')}
      >
        Marketing
      </button>
      <button 
        className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'web' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveFilter('web')}
      >
        Web Design
      </button>
      <button 
        className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'content' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        onClick={() => setActiveFilter('content')}
      >
        Content
      </button>
    </div>
  );
};

export default CaseStudyFilters;
