
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/5">
      <div className="container mx-auto">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Contact Us
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl font-bold text-secondary">
            Let's Create Something Amazing
          </h2>
          <p className="mt-4 text-secondary/80 max-w-2xl mx-auto">
            Ready to transform your brand? Get in touch with us and let's discuss
            how we can help you achieve your goals.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email Us",
                description: "hello@zoolyum.com",
                link: "mailto:hello@zoolyum.com",
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: "Call Us",
                description: "+1 (555) 123-4567",
                link: "tel:+15551234567",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="p-6 rounded-2xl glass hover:shadow-lg transition-all duration-300 flex items-start space-x-4"
              >
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-secondary/70">{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-secondary/80 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass border-0 focus:ring-2 focus:ring-primary/20 transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary/80 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass border-0 focus:ring-2 focus:ring-primary/20 transition-shadow"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-secondary/80 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg glass border-0 focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span>Send Message</span>
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
