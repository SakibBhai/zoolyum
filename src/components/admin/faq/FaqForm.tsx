
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FAQ } from "@/components/hooks/useFaqs";

interface FaqFormProps {
  initialFaq: Partial<FAQ>;
  onSubmit: (faq: Partial<FAQ>) => void;
  onCancel: () => void;
}

const FaqForm = ({ initialFaq, onSubmit, onCancel }: FaqFormProps) => {
  const [faq, setFaq] = useState<Partial<FAQ>>(initialFaq);

  useEffect(() => {
    setFaq(initialFaq);
  }, [initialFaq]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(faq);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input 
              id="question" 
              value={faq.question || ''} 
              onChange={(e) => setFaq({...faq, question: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea 
              id="answer" 
              value={faq.answer || ''} 
              onChange={(e) => setFaq({...faq, answer: e.target.value})}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={faq.category || ''}
                onValueChange={(value) => setFaq({...faq, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Pricing">Pricing</SelectItem>
                  <SelectItem value="Projects">Projects</SelectItem>
                  <SelectItem value="About Us">About Us</SelectItem>
                  <SelectItem value="Results">Results</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input 
                id="display_order" 
                type="number"
                min="1"
                value={faq.display_order || ''} 
                onChange={(e) => setFaq({...faq, display_order: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="is_highlighted" 
              checked={faq.is_highlighted || false}
              onCheckedChange={(checked) => setFaq({...faq, is_highlighted: checked})}
            />
            <Label htmlFor="is_highlighted">Highlight this FAQ</Label>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {faq.id ? "Update FAQ" : "Add FAQ"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FaqForm;
