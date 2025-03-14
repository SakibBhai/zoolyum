
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FaqList from "./faq/FaqList";
import FaqForm from "./faq/FaqForm";
import { useFaqs, FAQ } from "@/components/hooks/useFaqs";

const AdminFaq = () => {
  const { faqs, isLoading, deleteFaq, saveFaq } = useFaqs();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({});
  const [faqToDeleteId, setFaqToDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setCurrentFaq({
      question: "",
      answer: "",
      category: "General",
      is_highlighted: false,
      display_order: faqs.length + 1
    });
    setIsFormOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setCurrentFaq(faq);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setFaqToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (faqToDeleteId) {
      await deleteFaq(faqToDeleteId);
      setIsDeleteDialogOpen(false);
      setFaqToDeleteId(null);
    }
  };

  const handleSubmit = async (faq: Partial<FAQ>) => {
    const success = await saveFaq(faq);
    if (success) {
      setIsFormOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage FAQs</h2>
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New FAQ
        </Button>
      </div>
      
      <FaqList
        faqs={faqs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      
      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentFaq.id ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            <DialogDescription>
              {currentFaq.id 
                ? "Update the question and answer details" 
                : "Fill in the details to add a new FAQ item"}
            </DialogDescription>
          </DialogHeader>
          <FaqForm
            initialFaq={currentFaq}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the FAQ item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminFaq;
