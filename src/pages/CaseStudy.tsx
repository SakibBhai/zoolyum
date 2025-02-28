
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Calendar, User, Clock } from "lucide-react";
import Navbar from "../components/Navbar";

const CaseStudy = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState<number>(3);

  // Sample case studies
  const caseStudies = [
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
    {
      id: 3,
      title: "Premium SaaS Website Redesign",
      category: "web",
      summary: "Complete UX/UI overhaul for a B2B SaaS platform, resulting in 50% increase in user engagement and 30% reduction in bounce rate.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      date: "May 10, 2023",
      readTime: "15 min read"
    },
    {
      id: 4,
      title: "Video Content Strategy for Tech Startup",
      category: "content",
      summary: "Comprehensive video content strategy that increased social media engagement by 120% and generated 5,000+ qualified leads.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "June 8, 2023",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Luxury Hotel Brand Identity",
      category: "branding",
      summary: "Complete brand identity system for a 5-star hotel chain, leading to 45% increase in brand value and international recognition.",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      date: "July 12, 2023",
      readTime: "14 min read"
    },
    {
      id: 6,
      title: "Integrated Marketing Campaign for Retail",
      category: "marketing",
      summary: "Omnichannel marketing strategy that increased foot traffic by 60% and online sales by 75% during a competitive holiday season.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
      date: "August 5, 2023",
      readTime: "9 min read"
    }
  ];

  // Filter case studies based on active filter
  const filteredCaseStudies = activeFilter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

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
  }, [filteredCaseStudies]);

  const loadMore = () => {
    setVisibleItems(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-up">Case Studies</h1>
          <p className="text-lg text-muted-foreground mb-8 fade-up">
            Explore our client success stories and see how we've helped transform businesses across industries.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up">
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'branding' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('branding')}
            >
              Branding
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'marketing' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('marketing')}
            >
              Marketing
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'web' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Design
            </button>
            <button 
              className={`px-5 py-2 rounded-full transition-all ${activeFilter === 'content' ? 'bg-primary text-white' : 'bg-secondary hover:bg-secondary/80'}`}
              onClick={() => setActiveFilter('content')}
            >
              Content
            </button>
          </div>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.slice(0, visibleItems).map((study, index) => (
            <div 
              key={study.id} 
              className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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

        {/* Load more button */}
        {visibleItems < filteredCaseStudies.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
        
        {/* Call to action */}
        <div className="mt-24 glass rounded-xl p-8 text-center max-w-4xl mx-auto fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your success story?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Let's discuss how we can help transform your business and achieve remarkable results.
          </p>
          <a 
            href="/#contact" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Start a Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
