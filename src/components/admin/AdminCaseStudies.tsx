
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentCase.id) {
        // Update existing case study
        const { error } = await supabase
          .from('case_studies')
          .update({
            title: currentCase.title,
            industry: currentCase.industry,
            summary: currentCase.summary,
            challenge: currentCase.challenge,
            solution: currentCase.solution,
            results: currentCase.results,
            image: currentCase.image
          })
          .eq('id', currentCase.id);
        
        if (error) {
          throw error;
        }
        
        setCaseStudies(caseStudies.map(cs => cs.id === currentCase.id ? currentCase : cs));
        toast({
          title: "Case study updated",
          description: "The case study has been updated successfully",
        });
      } else {
        // Add new case study
        const { data, error } = await supabase
          .from('case_studies')
          .insert({
            title: currentCase.title,
            industry: currentCase.industry,
            summary: currentCase.summary,
            challenge: currentCase.challenge,
            solution: currentCase.solution,
            results: currentCase.results,
            image: currentCase.image
          })
          .select();
        
        if (error) {
          throw error;
        }
        
        setCaseStudies([...caseStudies, data[0]]);
        toast({
          title: "Case study added",
          description: "The new case study has been added successfully",
        });
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error saving case study",
        description: error.message,
        variant: "destructive"
      });
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
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={currentCase.title} 
                  onChange={(e) => setCurrentCase({...currentCase, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={currentCase.industry}
                  onValueChange={(value) => setCurrentCase({...currentCase, industry: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea 
                  id="summary" 
                  value={currentCase.summary} 
                  onChange={(e) => setCurrentCase({...currentCase, summary: e.target.value})}
                  rows={2}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge">Challenge</Label>
                  <Textarea 
                    id="challenge" 
                    value={currentCase.challenge} 
                    onChange={(e) => setCurrentCase({...currentCase, challenge: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea 
                    id="solution" 
                    value={currentCase.solution} 
                    onChange={(e) => setCurrentCase({...currentCase, solution: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="results">Results</Label>
                  <Textarea 
                    id="results" 
                    value={currentCase.results} 
                    onChange={(e) => setCurrentCase({...currentCase, results: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={currentCase.image} 
                  onChange={(e) => setCurrentCase({...currentCase, image: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentCase.id !== 0 ? "Update Case Study" : "Add Case Study"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
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
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(cs)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(cs.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCaseStudies;
