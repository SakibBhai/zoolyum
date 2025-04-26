
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Our Services - Zoolyum Creative Agency</title>
        <meta name="description" content="Explore our comprehensive range of creative and digital services designed to help your business grow and succeed." />
      </Helmet>
      <Navbar />
      <main>
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
