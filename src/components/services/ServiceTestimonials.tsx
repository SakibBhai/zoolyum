
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const ServiceTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "Zoolyum completely transformed our brand identity and online presence. Their strategic approach and creative execution delivered results beyond our expectations.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Solutions",
      rating: 5,
      service: "Branding & Website Design"
    },
    {
      id: 2,
      content: "Working with Zoolyum on our digital marketing campaign was a game-changer. They understood our audience perfectly and created targeted content that significantly increased our conversion rates.",
      author: "Michael Chen",
      position: "Marketing Director, GrowFast",
      rating: 5,
      service: "Digital Marketing & Growth"
    },
    {
      id: 3,
      content: "The content strategy Zoolyum developed for our company has positioned us as thought leaders in our industry. Their storytelling approach has resonated deeply with our audience.",
      author: "Emma Roberts",
      position: "Founder, Elevated Living",
      rating: 5,
      service: "Content Creation & Strategy"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Client Success
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-secondary">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-secondary/70">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div 
            className="overflow-hidden rounded-xl bg-white shadow-lg p-6 md:p-10"
          >
            <div className="flex flex-col h-full">
              <div className="flex mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="h-5 w-5 text-primary fill-primary" 
                  />
                ))}
              </div>
              
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow"
              >
                <p className="text-xl md:text-2xl text-secondary/90 italic mb-8">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div className="mt-auto">
                  <p className="font-semibold text-secondary">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="text-sm text-secondary/60">
                    {testimonials[activeIndex].position}
                  </p>
                  <p className="text-sm text-primary font-medium mt-1">
                    Service: {testimonials[activeIndex].service}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-secondary" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === activeIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
