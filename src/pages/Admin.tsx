
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

const Admin = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="flex gap-4 items-center">
              <div className="text-sm text-muted-foreground">
                Logged in as: {user?.email}
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                View Site
              </Button>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
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
