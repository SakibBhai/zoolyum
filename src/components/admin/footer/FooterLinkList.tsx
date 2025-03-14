
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FooterLinkItem from "./FooterLinkItem";
import { FooterLink } from "@/components/hooks/useFooterLinks";

interface FooterLinkListProps {
  footerLinks: FooterLink[];
  onEdit: (footerLink: FooterLink) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const FooterLinkList = ({ footerLinks, onEdit, onDelete, isLoading }: FooterLinkListProps) => {
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
            <TableHead>Section</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {footerLinks.map((footerLink) => (
            <FooterLinkItem
              key={footerLink.id}
              footerLink={footerLink}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FooterLinkList;
