
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Zoolyum Creative Agency</title>
        <meta name="description" content="Get in touch with Zoolyum's creative team to discuss your project and explore how we can help you achieve your goals." />
      </Helmet>
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
