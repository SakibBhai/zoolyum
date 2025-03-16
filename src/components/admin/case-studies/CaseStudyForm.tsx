
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "../common/FileUpload";

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

interface CaseStudyFormProps {
  initialCaseStudy: CaseStudy;
  onSubmit: (caseStudy: CaseStudy) => void;
  onCancel: () => void;
}

const CaseStudyForm = ({ initialCaseStudy, onSubmit, onCancel }: CaseStudyFormProps) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy>(initialCaseStudy);

  useEffect(() => {
    setCaseStudy(initialCaseStudy);
  }, [initialCaseStudy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(caseStudy);
  };

  const handleImageUpload = (url: string) => {
    setCaseStudy({...caseStudy, image: url});
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={caseStudy.title} 
              onChange={(e) => setCaseStudy({...caseStudy, title: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select 
              value={caseStudy.industry}
              onValueChange={(value) => setCaseStudy({...caseStudy, industry: value})}
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
              value={caseStudy.summary} 
              onChange={(e) => setCaseStudy({...caseStudy, summary: e.target.value})}
              rows={2}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea 
                id="challenge" 
                value={caseStudy.challenge} 
                onChange={(e) => setCaseStudy({...caseStudy, challenge: e.target.value})}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea 
                id="solution" 
                value={caseStudy.solution} 
                onChange={(e) => setCaseStudy({...caseStudy, solution: e.target.value})}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="results">Results</Label>
              <Textarea 
                id="results" 
                value={caseStudy.results} 
                onChange={(e) => setCaseStudy({...caseStudy, results: e.target.value})}
                rows={3}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <FileUpload 
              onUploadComplete={handleImageUpload}
              currentImageUrl={caseStudy.image}
              label="Case Study Image"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {caseStudy.id ? "Update Case Study" : "Add Case Study"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CaseStudyForm;
