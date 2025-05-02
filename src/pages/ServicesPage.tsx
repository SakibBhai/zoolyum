
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import ServicesContent from "@/components/services/ServicesContent";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServicePricing from "@/components/services/ServicePricing"; 
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import ServiceCta from "@/components/services/ServiceCta";
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
        <ServiceHero />
        <ServicesContent />
        <ServiceProcess />
        <ServicePricing />
        <ServiceTestimonials />
        <ServiceCta />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
