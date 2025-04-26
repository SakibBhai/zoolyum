
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import About from "@/components/about/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us - Zoolyum Creative Agency</title>
        <meta name="description" content="Learn about our story, mission, vision, and meet the talented team behind Zoolyum Creative Agency." />
        <meta name="keywords" content="about us, creative agency, team, mission, vision, company culture" />
        <meta property="og:title" content="About Us - Zoolyum Creative Agency" />
        <meta property="og:description" content="Discover the story, mission, and team behind Zoolyum Creative Agency." />
        <meta property="og:type" content="website" />
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
