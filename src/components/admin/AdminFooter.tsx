
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useFooterLinks, FooterLink, FooterLinkInput } from "@/components/hooks/useFooterLinks";
import FooterLinkList from "./footer/FooterLinkList";
import FooterLinkForm from "./footer/FooterLinkForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const AdminFooter = () => {
  const { footerLinks, isLoading, addFooterLink, updateFooterLink, deleteFooterLink } = useFooterLinks();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentFooterLink, setCurrentFooterLink] = useState<FooterLink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddFooterLink = (newFooterLink: FooterLinkInput) => {
    addFooterLink.mutate(newFooterLink, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
      },
    });
  };

  const handleEditFooterLink = (footerLink: FooterLink) => {
    setCurrentFooterLink(footerLink);
    setIsEditDialogOpen(true);
  };

  const handleUpdateFooterLink = (updatedFooterLink: FooterLink) => {
    updateFooterLink.mutate(updatedFooterLink, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setCurrentFooterLink(null);
      },
    });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteFooterLink.mutate(deleteId, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeleteId(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Footer Links</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Footer Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Footer Links</CardTitle>
          <CardDescription>
            Add, edit, or remove links in the site footer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FooterLinkList
            footerLinks={footerLinks}
            onEdit={handleEditFooterLink}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Footer Link</DialogTitle>
          </DialogHeader>
          <FooterLinkForm
            onSubmit={handleAddFooterLink}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Footer Link</DialogTitle>
          </DialogHeader>
          {currentFooterLink && (
            <FooterLinkForm
              footerLink={currentFooterLink}
              onSubmit={handleUpdateFooterLink}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this footer link? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminFooter;
