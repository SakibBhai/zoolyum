
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { FAQ } from "@/components/hooks/useFaqs";

interface FaqItemProps {
  faq: FAQ;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
}

const FaqItem = ({ faq, onEdit, onDelete }: FaqItemProps) => {
  return (
    <TableRow key={faq.id}>
      <TableCell className="font-medium text-center">{faq.display_order}</TableCell>
      <TableCell className="font-medium max-w-md truncate">{faq.question}</TableCell>
      <TableCell>{faq.category || "General"}</TableCell>
      <TableCell>
        {faq.is_highlighted ? (
          <Badge variant="default">Highlighted</Badge>
        ) : (
          <Badge variant="outline">Regular</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(faq)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(faq.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FaqItem;
