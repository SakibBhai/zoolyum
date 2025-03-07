
import { useState } from "react";
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

// Sample data
const initialCaseStudies = [
  {
    id: 1,
    title: "Financial App Redesign",
    industry: "Finance",
    summary: "Redesigned a financial app to improve user experience and increase engagement",
    challenge: "The client's existing app had low engagement and poor user satisfaction",
    solution: "Complete UX overhaul with simplified flows and modern design system",
    results: "72% increase in daily active users, 43% increase in transaction volume",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "E-commerce Conversion Optimization",
    industry: "Retail",
    summary: "Optimized checkout flow and product pages to increase conversion rates",
    challenge: "High cart abandonment rates and low product page conversion",
    solution: "Streamlined checkout process and enhanced product visualization",
    results: "36% reduction in cart abandonment, 28% increase in overall conversions",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const AdminCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCase, setCurrentCase] = useState({
    id: 0,
    title: "",
    industry: "",
    summary: "",
    challenge: "",
    solution: "",
    results: "",
    image: "",
  });
  const { toast } = useToast();

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentCase({
      id: Date.now(),
      title: "",
      industry: "",
      summary: "",
      challenge: "",
      solution: "",
      results: "",
      image: "",
    });
  };

  const handleEdit = (caseStudy: typeof currentCase) => {
    setIsEditing(true);
    setCurrentCase(caseStudy);
  };

  const handleDelete = (id: number) => {
    setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    toast({
      title: "Case study deleted",
      description: "The case study has been removed successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (caseStudies.some(cs => cs.id === currentCase.id)) {
      // Update existing case study
      setCaseStudies(caseStudies.map(cs => cs.id === currentCase.id ? currentCase : cs));
      toast({
        title: "Case study updated",
        description: "The case study has been updated successfully",
      });
    } else {
      // Add new case study
      setCaseStudies([...caseStudies, currentCase]);
      toast({
        title: "Case study added",
        description: "The new case study has been added successfully",
      });
    }
    
    setIsEditing(false);
    setCurrentCase({ id: 0, title: "", industry: "", summary: "", challenge: "", solution: "", results: "", image: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentCase({ id: 0, title: "", industry: "", summary: "", challenge: "", solution: "", results: "", image: "" });
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
    </div>
  );
};

export default AdminCaseStudies;
