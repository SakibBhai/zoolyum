
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Code, Layout, Image, Film, PenTool, Palette, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  icon?: React.ReactNode;
}

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Process the data to add tags and icons based on categories
        const processedProjects: Project[] = data.map(project => {
          let icon;
          let tags: string[] = [];
          
          // Assign icon based on category
          if (project.category.includes("Branding")) {
            icon = <Palette className="h-6 w-6 text-primary" />;
            tags = ["Branding", "Logo Design", "Brand Strategy"];
          } else if (project.category.includes("Web")) {
            icon = <Code className="h-6 w-6 text-primary" />;
            tags = ["Web Design", "UI/UX", "Development"];
          } else if (project.category.includes("Digital Marketing")) {
            icon = <Layout className="h-6 w-6 text-primary" />;
            tags = ["Social Media", "PPC", "SEO"];
          } else if (project.category.includes("Content")) {
            icon = project.category.includes("Video") ? 
              <Film className="h-6 w-6 text-primary" /> : 
              <PenTool className="h-6 w-6 text-primary" />;
            tags = ["Content Strategy", "Storytelling", "Copywriting"];
          } else {
            icon = <Image className="h-6 w-6 text-primary" />;
            tags = ["Design", "Creative", "Visual"];
          }
          
          return {
            ...project,
            tags,
            icon
          };
        });
        
        setProjects(processedProjects);
        setDisplayedProjects(processedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error loading projects",
          description: "Failed to load portfolio projects. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  // Get unique categories for filter buttons
  const getCategories = () => {
    const categorySet = new Set<string>();
    categorySet.add("All");
    
    projects.forEach(project => {
      if (project.category.includes("Branding")) {
        categorySet.add("Branding");
      } else if (project.category.includes("Web")) {
        categorySet.add("Web Design");
      } else if (project.category.includes("Digital Marketing")) {
        categorySet.add("Marketing");
      } else if (project.category.includes("Content")) {
        categorySet.add("Content");
      }
    });
    
    return Array.from(categorySet);
  };

  // Filter projects based on selected category
  useEffect(() => {
    const filterProjects = () => {
      if (filter === "All") {
        setDisplayedProjects(projects);
      } else {
        const filtered = projects.filter(project => {
          if (filter === "Branding") return project.category.includes("Branding");
          if (filter === "Web Design") return project.category.includes("Web");
          if (filter === "Marketing") return project.category.includes("Digital Marketing");
          if (filter === "Content") return project.category.includes("Content");
          return project.category === filter;
        });
        setDisplayedProjects(filtered);
      }
    };

    filterProjects();
  }, [filter, projects]);

  // Animation on scroll
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

  const handleViewProject = (projectId: string) => {
    toast({
      title: "Project Details",
      description: "Project details page coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Header with animated gradient background */}
          <div className="relative text-center mb-16 fade-up overflow-hidden rounded-3xl p-8 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 animate-gradient z-0"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Portfolio
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore our collection of successful projects across branding, marketing, web design, and content creation. Each project represents our commitment to excellence and innovation.
              </p>
            </div>
          </div>

          {/* Filter - now functional */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-up">
            {getCategories().map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Projects Grid with animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button 
                          onClick={() => handleViewProject(project.id)} 
                          className="text-white flex items-center gap-2 font-medium hover:text-primary-hover transition-colors"
                        >
                          View Project <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        {project.icon}
                        <span className="ml-2 text-sm font-medium text-gray-500">{project.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                      {project.tags && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Show message if no projects match filter */}
              {displayedProjects.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
                  <p className="text-gray-500">Try selecting a different category filter</p>
                </div>
              )}
            </>
          )}

          {/* Testimonials Section */}
          <div className="mt-24 mb-16 fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our work speaks for itself, but our clients' words speak volumes about our commitment to excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Zoolyum transformed our brand. Their deep understanding of our market and creative execution exceeded all expectations.",
                  author: "Emma Thompson",
                  position: "CMO, LuxeJewels Inc.",
                  image: "https://randomuser.me/api/portraits/women/44.jpg"
                },
                {
                  quote: "The team at Zoolyum brought our digital marketing to the next level. The results speak for themselves - 78% sales increase!",
                  author: "Marcus Chen",
                  position: "Founder, EcoWare",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  quote: "Working with Zoolyum on our website redesign was seamless. They understand UX deeply and delivered a product our customers love.",
                  author: "Sarah Johnson",
                  position: "Director, PrimeRealty",
                  image: "https://randomuser.me/api/portraits/women/68.jpg"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 text-primary">
                        {/* Quote SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="currentColor" className="opacity-20">
                          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                        </svg>
                      </div>
                      <p className="italic text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center mt-auto">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mt-16 text-center glass p-10 lg:p-16 rounded-2xl fade-up relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"></div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to create your success story?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
                Let's collaborate on your next project and transform your vision into reality.
              </p>
              <Button
                size="lg"
                className="px-8 py-6 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary-hover transition-all hover:scale-105 shadow-lg"
              >
                Start a Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Portfolio;
