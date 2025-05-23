
import { Helmet } from "react-helmet";
import CampaignHero from "@/components/campaign/CampaignHero";
import CampaignPackages from "@/components/campaign/CampaignPackages";
import CampaignAbout from "@/components/campaign/CampaignAbout";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const CampaignPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Brand Guideline Campaign - Zoolyum Creative Agency</title>
        <meta name="description" content="Transform your brand with our comprehensive brand guideline packages. Choose from Essential, Premium, or Enterprise packages starting from 10,000 BDT." />
        <meta name="keywords" content="brand guidelines, branding packages, brand identity, logo design, Bangladesh" />
      </Helmet>
      <Navbar />
      <main>
        <CampaignHero />
        <CampaignAbout />
        <CampaignPackages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPage;
