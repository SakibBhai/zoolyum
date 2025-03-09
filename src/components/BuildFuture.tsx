
import { ArrowRight } from "lucide-react";

const BuildFuture = () => {
  const services = [
    {
      title: "Thrive in a digital first world",
      description: "We help brands navigate the complex digital landscape with tailored strategies that drive growth and engagement."
    },
    {
      title: "Let's turn your vision into reality",
      description: "Our creative team transforms your ideas into compelling brand experiences that resonate with your target audience."
    },
    {
      title: "Where innovation meets strategy",
      description: "We combine innovative thinking with strategic planning to deliver solutions that give you a competitive edge."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          Build the future of your <br/>
          business today.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-5">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  {index + 1}
                </span>
                <ArrowRight className="text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildFuture;
