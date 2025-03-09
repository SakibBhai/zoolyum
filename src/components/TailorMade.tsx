
import { ArrowRight } from "lucide-react";

const TailorMade = () => {
  const stats = [
    { category: "Excellence through Innovation", number1: "1000+", number2: "120k" },
    { category: "Trusted partner for business success", number1: "5000+", number2: "710k" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          Empowering your <span className="text-primary">business with</span><br/>
          tailor-made solutions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            {stats.map((stat, index) => (
              <div key={index} className="mb-10">
                <h3 className="text-gray-900 font-semibold mb-4">{stat.category}</h3>
                <div className="flex space-x-12">
                  <div>
                    <span className="text-primary text-3xl font-bold">{stat.number1}</span>
                    <p className="text-gray-600 text-sm mt-1">Clients served</p>
                  </div>
                  <div>
                    <span className="text-primary text-3xl font-bold">{stat.number2}</span>
                    <p className="text-gray-600 text-sm mt-1">Projects delivered</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">
                    Our dedicated team works tirelessly to deliver exceptional results for every client, 
                    regardless of size or industry.
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-6">
            <div className="bg-gray-100 w-full h-64 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TailorMade;
