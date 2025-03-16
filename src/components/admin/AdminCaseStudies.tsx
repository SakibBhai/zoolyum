
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CaseStudyForm from "./case-studies/CaseStudyForm";
import CaseStudyList from "./case-studies/CaseStudyList";

// Case study interface
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

const AdminCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCase, setCurrentCase] = useState<CaseStudy>({
    id: "",
    title: "",
    industry: "",
    summary: "",
    challenge: "",
    solution: "",
    results: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch case studies from Supabase
  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error fetching case studies",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, [toast]);

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentCase({
      id: "",
      title: "",
      industry: "",
      summary: "",
      challenge: "",
      solution: "",
      results: "",
      image: "",
    });
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setIsEditing(true);
    setCurrentCase(caseStudy);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
      toast({
        title: "Case study deleted",
        description: "The case study has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error deleting case study",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (updatedCaseStudy: CaseStudy) => {
    try {
      if (updatedCaseStudy.id) {
        // Update existing case study
        const { error } = await supabase
          .from('case_studies')
          .update({
            title: updatedCaseStudy.title,
            industry: updatedCaseStudy.industry,
            summary: updatedCaseStudy.summary,
            challenge: updatedCaseStudy.challenge,
            solution: updatedCaseStudy.solution,
            results: updatedCaseStudy.results,
            image: updatedCaseStudy.image
          })
          .eq('id', updatedCaseStudy.id);
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Case study updated",
          description: "The case study has been updated successfully",
        });
        fetchCaseStudies();
      } else {
        // Add new case study
        const { data, error } = await supabase
          .from('case_studies')
          .insert({
            title: updatedCaseStudy.title,
            industry: updatedCaseStudy.industry,
            summary: updatedCaseStudy.summary,
            challenge: updatedCaseStudy.challenge,
            solution: updatedCaseStudy.solution,
            results: updatedCaseStudy.results,
            image: updatedCaseStudy.image
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Case study added",
          description: "The new case study has been added successfully",
        });
        fetchCaseStudies();
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error saving case study",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    
    setIsEditing(false);
    setCurrentCase({ id: "", title: "", industry: "", summary: "", challenge: "", solution: "", results: "", image: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentCase({ id: "", title: "", industry: "", summary: "", challenge: "", solution: "", results: "", image: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Case Studies</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Case Study
        </Button>
      </div>

      {isEditing ? (
        <CaseStudyForm
          initialCaseStudy={currentCase}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CaseStudyList
          caseStudies={caseStudies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminCaseStudies;
