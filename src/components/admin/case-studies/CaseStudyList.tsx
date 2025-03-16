
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
}

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
  onEdit: (caseStudy: CaseStudy) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const CaseStudyList = ({ caseStudies, onEdit, onDelete, isLoading }: CaseStudyListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {caseStudies.map((cs) => (
            <TableRow key={cs.id}>
              <TableCell className="w-24">
                <img 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-20 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{cs.title}</TableCell>
              <TableCell>{cs.industry}</TableCell>
              <TableCell className="max-w-xs truncate">{cs.summary}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(cs)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(cs.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CaseStudyList;
