
interface BlogHeaderProps {
  title: string;
  description: string;
}

const BlogHeader = ({ title, description }: BlogHeaderProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8 fade-up">
        {description}
      </p>
    </div>
  );
};

export default BlogHeader;
