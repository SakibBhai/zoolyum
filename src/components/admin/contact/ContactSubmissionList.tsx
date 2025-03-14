
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

interface ContactSubmissionListProps {
  submissions: ContactSubmission[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ContactSubmissionList = ({ 
  submissions, 
  onMarkAsRead, 
  onDelete, 
  isLoading 
}: ContactSubmissionListProps) => {
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
