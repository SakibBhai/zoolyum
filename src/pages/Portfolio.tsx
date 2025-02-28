
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Code, Layout, Image, Film, PenTool, Palette, ExternalLink } from "lucide-react";

const Portfolio = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-up");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Luxury Brand Redesign",
      category: "Branding & Identity",
      description: "Complete rebranding for a premium jewelry company, including logo design, brand guidelines, and marketing materials.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Branding", "Logo Design", "Brand Strategy"],
      icon: <Palette className="h-6 w-6 text-primary" />
    },
    {
      id: 2,
      title: "E-commerce Growth Campaign",
      category: "Digital Marketing & Growth",
      description: "Implemented a comprehensive digital marketing strategy that increased online sales by 78% in just three months.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Social Media", "PPC", "SEO"],
      icon: <Layout className="h-6 w-6 text-primary" />
    },
    {
      id: 3,
      title: "Premium Real Estate Website",
      category: "Web & UI/UX Design",
      description: "Designed and developed a conversion-optimized website for a luxury real estate agency with virtual tour integration.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Web Design", "UI/UX", "Development"],
      icon: <Code className="h-6 w-6 text-primary" />
    },
    {
      id: 4,
      title: "Executive Brand Storytelling",
      category: "Content Creation & Storytelling",
      description: "Created a compelling brand story and content strategy for a high-profile tech CEO, boosting their industry presence.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Storytelling", "Content Strategy", "Personal Branding"],
      icon: <PenTool className="h-6 w-6 text-primary" />
    },
    {
      id: 5,
      title: "Video Marketing Campaign",
      category: "Content Creation & Storytelling",
      description: "Produced a series of viral video content that generated over 2 million views and significantly increased brand awareness.",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Video Production", "Social Media", "Viral Marketing"],
      icon: <Film className="h-6 w-6 text-primary" />
    },
    {
      id: 6,
      title: "SaaS Platform Interface Design",
      category: "Web & UI/UX Design",
      description: "Redesigned the user interface for a SaaS platform, improving user experience and reducing churn rate by 45%.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["UI/UX", "SaaS", "Web Application"],
      icon: <Image className="h-6 w-6 text-primary" />
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of successful projects across branding, marketing, web design, and content creation.
            </p>
          </div>

          {/* Filter - could be made functional in future versions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up">
            <button className="px-6 py-2 rounded-full bg-primary text-white font-medium">All</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">Branding</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">Marketing</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">Web Design</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">Content</button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-up">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <a href="#" className="text-white flex items-center gap-2 font-medium">
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {project.icon}
                    <span className="ml-2 text-sm font-medium text-gray-500">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center glass p-10 rounded-2xl fade-up">
            <h2 className="text-3xl font-bold mb-4">Ready to create your success story?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate on your next project and transform your vision into reality.
            </p>
            <a href="#contact" className="px-8 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary-hover transition-colors inline-block">
              Start a Project
            </a>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Portfolio;
