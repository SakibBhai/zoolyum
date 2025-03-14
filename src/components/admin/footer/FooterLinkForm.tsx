
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FooterLink, FooterLinkInput } from "@/components/hooks/useFooterLinks";

interface FooterLinkFormProps {
  onSubmit: (footerLink: FooterLinkInput | FooterLink) => void;
  footerLink?: FooterLink;
  onCancel: () => void;
}

const FooterLinkForm = ({ onSubmit, footerLink, onCancel }: FooterLinkFormProps) => {
  const [formData, setFormData] = useState<FooterLinkInput | FooterLink>({
    section: "",
    title: "",
    url: "",
    display_order: 0,
    ...(footerLink || {})
  });

  useEffect(() => {
    if (footerLink) {
      setFormData(footerLink);
    }
  }, [footerLink]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, section: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const predefinedSections = ["EXPLORE", "SERVICES", "CONNECT", "RESOURCES", "LEGAL"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="section">Section</Label>
        <Select
          value={formData.section}
          onValueChange={handleSectionChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {predefinedSections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          value={formData.display_order?.toString() || "0"}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {footerLink ? "Update" : "Add"} Footer Link
        </Button>
      </div>
    </form>
  );
};

export default FooterLinkForm;
