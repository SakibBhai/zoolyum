
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Portfolio from "./Portfolio";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Portfolio - Zoolyum Creative Agency</title>
        <meta name="description" content="View our portfolio of successful projects and creative solutions that have helped businesses achieve their goals." />
        <meta name="keywords" content="portfolio, projects, creative work, digital solutions, web design, branding" />
        <meta property="og:title" content="Portfolio - Zoolyum Creative Agency" />
        <meta property="og:description" content="Explore our portfolio of successful digital projects and creative solutions." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
