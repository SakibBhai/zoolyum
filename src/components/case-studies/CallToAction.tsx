
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-12 text-center max-w-4xl mx-auto fade-up">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Ready to create your success story?</h2>
      <p className="text-lg text-gray-600 mb-8">
        Let's discuss how we can help transform your business and achieve remarkable results.
      </p>
      <Button 
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full"
        asChild
      >
        <a href="/#contact">Start a Project</a>
      </Button>
    </div>
  );
};

export default CallToAction;
