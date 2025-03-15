
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { useContactSubmissions } from "@/components/hooks/useContactSubmissions";
import ContactSubmissionList from "./contact/ContactSubmissionList";

const AdminContact = () => {
  const { 
    submissions, 
    isLoading, 
    fetchSubmissions, 
    markAsRead, 
    deleteSubmission,
    handleNewSubmission
  } = useContactSubmissions();

  const unreadCount = submissions.filter(sub => !sub.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
          <p className="text-muted-foreground">
            Manage contact form submissions from your website.
          </p>
        </div>
        <Button 
          onClick={fetchSubmissions} 
          variant="outline" 
          className="flex gap-2 items-center"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <div className="text-2xl font-bold">{unreadCount}</div>
            {unreadCount > 0 && <Badge className="bg-blue-500">New</Badge>}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="unread">
            Unread <Badge variant="outline" className="ml-2">{unreadCount}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <ContactSubmissionList
            submissions={submissions}
            onMarkAsRead={markAsRead}
            onDelete={deleteSubmission}
            isLoading={isLoading}
            onNewSubmission={handleNewSubmission}
          />
        </TabsContent>
        <TabsContent value="unread" className="space-y-4">
          <ContactSubmissionList
            submissions={submissions.filter(sub => !sub.is_read)}
            onMarkAsRead={markAsRead}
            onDelete={deleteSubmission}
            isLoading={isLoading}
            onNewSubmission={handleNewSubmission}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContact;
