
interface BlogCategoryProps {
  categories: { name: string; label: string }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const BlogCategories = ({ categories, activeCategory, setActiveCategory }: BlogCategoryProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 fade-up">
      {categories.map(category => (
        <button
          key={category.name}
          className={`px-5 py-2 rounded-full transition-all ${
            activeCategory === category.name 
              ? 'bg-primary text-white' 
              : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => setActiveCategory(category.name)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
