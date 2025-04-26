
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import CaseStudyPreview from "@/components/CaseStudyPreview";
import Footer from "@/components/Footer";

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Case Studies - Zoolyum Creative Agency</title>
        <meta name="description" content="Discover detailed case studies of how we've helped businesses transform and achieve remarkable results." />
      </Helmet>
      <Navbar />
      <main>
        <CaseStudyPreview />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
