
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUpload from "../common/FileUpload";
import { PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

interface CaseStudyFormProps {
  initialCaseStudy: CaseStudy;
  onSubmit: (caseStudy: CaseStudy) => void;
  onCancel: () => void;
}

const CaseStudyForm = ({ initialCaseStudy, onSubmit, onCancel }: CaseStudyFormProps) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy>(initialCaseStudy);
  const [industries, setIndustries] = useState<string[]>([
    "Finance", "Healthcare", "Technology", "Retail", "Education"
  ]);
  const [newIndustry, setNewIndustry] = useState("");
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);

  // Fetch existing industries from case_studies table
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('industry')
          .order('industry');
        
        if (error) {
          console.error('Error fetching industries:', error);
          return;
        }
        
        // Extract unique industries
        const uniqueIndustries = [...new Set(data.map(item => item.industry))];
        
        // Merge with default industries and deduplicate
        const allIndustries = [...new Set([...industries, ...uniqueIndustries])];
        
        setIndustries(allIndustries.sort());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchIndustries();
  }, []);

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

  const addCustomIndustry = () => {
    if (newIndustry && !industries.includes(newIndustry)) {
      setIndustries([...industries, newIndustry]);
      setCaseStudy({...caseStudy, industry: newIndustry});
      setNewIndustry("");
      setShowCustomIndustry(false);
    }
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
            <div className="flex gap-2">
              <Select 
                value={caseStudy.industry}
                onValueChange={(value) => {
                  if (value === "custom") {
                    setShowCustomIndustry(true);
                  } else {
                    setCaseStudy({...caseStudy, industry: value});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                  <SelectItem value="custom">
                    <div className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Custom
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Popover open={showCustomIndustry} onOpenChange={setShowCustomIndustry}>
                <PopoverTrigger className="hidden">Open</PopoverTrigger>
                <PopoverContent className="p-4 w-72">
                  <div className="space-y-2">
                    <Label htmlFor="new-industry">New Industry</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="new-industry" 
                        value={newIndustry}
                        onChange={(e) => setNewIndustry(e.target.value)}
                        placeholder="Enter industry name"
                        autoFocus
                      />
                      <Button type="button" onClick={addCustomIndustry}>
                        Add
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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
