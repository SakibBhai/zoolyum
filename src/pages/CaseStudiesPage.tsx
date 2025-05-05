
import { Helmet } from "react-helmet";
import CaseStudy from "./CaseStudy";

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Case Studies - Zoolyum Creative Agency</title>
        <meta name="description" content="Discover detailed case studies of how we've helped businesses transform and achieve remarkable results." />
      </Helmet>
      <main>
        <CaseStudy />
      </main>
    </div>
  );
};

export default CaseStudiesPage;
