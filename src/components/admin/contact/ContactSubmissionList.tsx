
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContactSubmissionItem from "./ContactSubmissionItem";
import { ContactSubmission } from "@/components/hooks/useContactSubmissions";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";
import { useEffect } from "react";

interface ContactSubmissionListProps {
  submissions: ContactSubmission[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  onNewSubmission?: (submission: any) => void;
}

const ContactSubmissionList = ({ 
  submissions, 
  onMarkAsRead, 
  onDelete, 
  isLoading,
  onNewSubmission 
}: ContactSubmissionListProps) => {
  // Setup realtime subscription for contact_submissions table
  const { isConnected } = useRealtimeSubscription({
    table: 'contact_submissions',
    events: ['INSERT', 'UPDATE', 'DELETE'],
    onInsert: (payload) => {
      console.log('New contact submission received:', payload);
      onNewSubmission?.(payload.new);
    },
    onUpdate: (payload) => {
      console.log('Contact submission updated:', payload);
    },
    onDelete: (payload) => {
      console.log('Contact submission deleted:', payload);
    }
  });

  useEffect(() => {
    if (isConnected) {
      console.log('Real-time subscription to contact submissions is active');
    }
  }, [isConnected]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No contact submissions found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <h3 className="font-medium">Contact Submissions</h3>
        {isConnected ? (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Real-time updates active
          </span>
        ) : (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            Real-time updates connecting...
          </span>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <ContactSubmissionItem
              key={submission.id}
              submission={submission}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactSubmissionList;
