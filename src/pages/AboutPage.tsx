
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us - Zoolyum Creative Agency</title>
        <meta name="description" content="Learn about Zoolyum's creative agency, our mission, values, and the team behind our innovative digital solutions." />
      </Helmet>
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
