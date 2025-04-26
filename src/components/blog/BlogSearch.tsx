
import { Search } from "lucide-react";

interface BlogSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BlogSearch = ({ searchTerm, setSearchTerm }: BlogSearchProps) => {
  return (
    <div className="relative max-w-md mx-auto mb-12 fade-up">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full px-4 py-3 pl-10 rounded-full border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
    </div>
  );
};

export default BlogSearch;
