
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const CaseStudyPreview = () => {
  // Sample featured case studies - just showing 2 for the preview
  const featuredCaseStudies = [
    {
      id: 1,
      title: "Luxury Fashion Brand Rebranding",
      category: "branding",
      summary: "Complete brand transformation for a high-end fashion label, resulting in 40% increase in brand recognition and 25% sales growth.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "March 15, 2023",
      readTime: "12 min read"
    },
    {
      id: 2,
      title: "E-commerce Conversion Rate Optimization",
      category: "marketing",
      summary: "Strategic digital marketing campaign that increased conversion rates by 85% and boosted revenue by $1.2M within six months.",
      image: "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2365&q=80",
      date: "April 22, 2023",
      readTime: "10 min read"
    },
  ];

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
                    {study.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {study.readTime}
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
