
import { ArrowRight } from "lucide-react";

const StrategySection = () => {
  const stats = [
    { number: "7000+", label: "Clients satisfied" },
    { number: "120k", label: "Projects completed" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">From strategy</span>
              <br />
              <span className="text-gray-900">to execution</span>
            </h2>
            
            <div className="bg-gray-100 w-full h-64 rounded-lg mt-10"></div>
          </div>
          
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="mb-12">
                <h3 className="text-gray-900 font-semibold mb-3">Excellence through innovation</h3>
                <div className="flex space-x-8 mt-6">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <span className="text-primary text-3xl font-bold">{stat.number}</span>
                      <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 max-w-lg">
                From strategic planning to flawless execution, we empower businesses with innovative solutions 
                that drive growth and create lasting connections with their audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
