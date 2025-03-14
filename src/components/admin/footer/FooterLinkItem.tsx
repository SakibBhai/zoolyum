
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { FooterLink } from "@/components/hooks/useFooterLinks";

interface FooterLinkItemProps {
  footerLink: FooterLink;
  onEdit: (footerLink: FooterLink) => void;
  onDelete: (id: string) => void;
}

const FooterLinkItem = ({ footerLink, onEdit, onDelete }: FooterLinkItemProps) => {
  return (
    <TableRow key={footerLink.id}>
      <TableCell className="font-medium">{footerLink.section}</TableCell>
      <TableCell>{footerLink.title}</TableCell>
      <TableCell className="max-w-md truncate">{footerLink.url}</TableCell>
      <TableCell className="text-center">{footerLink.display_order}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(footerLink)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(footerLink.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FooterLinkItem;
