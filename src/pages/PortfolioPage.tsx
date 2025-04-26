
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import PortfolioPreview from "@/components/PortfolioPreview";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Portfolio - Zoolyum Creative Agency</title>
        <meta name="description" content="View our portfolio of successful projects and creative solutions that have helped businesses achieve their goals." />
      </Helmet>
      <Navbar />
      <main>
        <PortfolioPreview />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
