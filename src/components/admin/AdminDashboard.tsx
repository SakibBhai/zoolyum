
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, LineChart, PieChart } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Case Studies</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+6 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
            <div>
              <p className="font-medium">New Portfolio Item Added</p>
              <p className="text-sm text-muted-foreground">E-commerce Growth Campaign</p>
            </div>
            <span className="text-sm text-muted-foreground">2 days ago</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
            <div>
              <p className="font-medium">Blog Post Published</p>
              <p className="text-sm text-muted-foreground">10 Web Design Trends for 2023</p>
            </div>
            <span className="text-sm text-muted-foreground">5 days ago</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
            <div>
              <p className="font-medium">Case Study Updated</p>
              <p className="text-sm text-muted-foreground">Financial App Redesign</p>
            </div>
            <span className="text-sm text-muted-foreground">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
