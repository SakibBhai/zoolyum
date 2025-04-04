
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Helmet } from "react-helmet";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminCaseStudies from "@/components/admin/AdminCaseStudies";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminFaq from "@/components/admin/AdminFaq";
import AdminFooter from "@/components/admin/AdminFooter";
import AdminContact from "@/components/admin/AdminContact";
import AdminServices from "@/components/admin/AdminServices";
import AdminHeader from "@/components/admin/AdminHeader";
import { Shield, LogOut, ExternalLink } from "lucide-react";

const Admin = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Zoolyum CMS - Admin Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Security Banner */}
        <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-primary">
            <Shield className="h-4 w-4 mr-2" />
            <span>Secured Admin Area</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <span>Logged in as: {user?.email || "Administrator"}</span>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Zoolyum CMS</h1>
            <div className="flex gap-4 items-center">
              <div className="text-sm text-muted-foreground">
                Logged in as: {user?.email || "Administrator"}
              </div>
              <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Site
              </Button>
              <Button variant="destructive" onClick={logout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>
            
            <TabsContent value="header">
              <AdminHeader />
            </TabsContent>
            
            <TabsContent value="services">
              <AdminServices />
            </TabsContent>
            
            <TabsContent value="contact">
              <AdminContact />
            </TabsContent>
            
            <TabsContent value="portfolio">
              <AdminPortfolio />
            </TabsContent>
            
            <TabsContent value="case-studies">
              <AdminCaseStudies />
            </TabsContent>
            
            <TabsContent value="blog">
              <AdminBlog />
            </TabsContent>
            
            <TabsContent value="faq">
              <AdminFaq />
            </TabsContent>
            
            <TabsContent value="footer">
              <AdminFooter />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
