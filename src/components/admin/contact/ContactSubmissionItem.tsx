
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { EyeOff, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ContactSubmission } from "@/components/hooks/useContactSubmissions";

interface ContactSubmissionItemProps {
  submission: ContactSubmission;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContactSubmissionItem = ({ 
  submission, 
  onMarkAsRead, 
  onDelete 
}: ContactSubmissionItemProps) => {
  return (
    <TableRow key={submission.id} className={!submission.is_read ? "bg-blue-50" : ""}>
      <TableCell className="font-medium">{submission.name}</TableCell>
      <TableCell>{submission.email}</TableCell>
      <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
      <TableCell>{format(new Date(submission.created_at), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{submission.is_read ? "Read" : "Unread"}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {!submission.is_read && (
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onMarkAsRead(submission.id)}
              title="Mark as read"
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          )}
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(submission.id)}
            title="Delete submission"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ContactSubmissionItem;
