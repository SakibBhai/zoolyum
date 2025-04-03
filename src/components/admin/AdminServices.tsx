
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Crown, Monitor, Rocket, Video, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface ServiceItem {
  name: string;
  icon: string;
}

interface ServiceLine {
  title: string;
  description: string;
  icon: string;
  model: string;
  services: ServiceItem[];
}

const availableIcons = [
  { name: 'Crown', component: <Crown size={20} /> },
  { name: 'Monitor', component: <Monitor size={20} /> },
  { name: 'Rocket', component: <Rocket size={20} /> },
  { name: 'Video', component: <Video size={20} /> },
];

const AdminServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceLines, setServiceLines] = useState<ServiceLine[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Try to get services from Supabase
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('section', 'services')
          .single();
          
        if (error) {
          console.error('Error fetching services:', error);
          // If not found, load from component
          import('@/components/Services').then((module) => {
            const ServicesComponent = module.default;
            // Access the serviceLines from the component instance
            const component = new ServicesComponent({});
            if (component.serviceLines) {
              setServiceLines(component.serviceLines);
            }
          }).catch(err => {
            console.error('Error importing Services component:', err);
            // Fallback to default services
            setServiceLines(getDefaultServices());
          });
          return;
        }
        
        if (data?.content) {
          setServiceLines(JSON.parse(data.content));
        } else {
          setServiceLines(getDefaultServices());
        }
      } catch (error) {
        console.error('Error parsing services data:', error);
        setServiceLines(getDefaultServices());
      }
    };
    
    fetchServices();
  }, []);
  
  const getDefaultServices = (): ServiceLine[] => {
    return [
      {
        title: "Branding & Identity",
        description: "Build iconic brands with strong positioning and premium aesthetics.",
        icon: "Crown",
        model: "One-Time High-Ticket Projects",
        services: [
          { name: "Personal Branding for CEOs & Entrepreneurs", icon: "UserRound" },
          { name: "Corporate & Business Branding", icon: "Palette" },
          { name: "Luxury Brand Strategy & Identity", icon: "Crown" },
          { name: "Brand Positioning & Messaging", icon: "Target" },
          { name: "Logo, Color Palette & Visual Identity", icon: "Palette" },
          { name: "Brand Guidelines & Tone of Voice", icon: "BookOpen" }
        ]
      },
      {
        title: "Digital Marketing & Growth",
        description: "Drive targeted traffic, generate leads, and scale brands online.",
        icon: "Rocket",
        model: "Monthly Retainers, Performance-Based Ad Services",
        services: [
          { name: "Social Media Management & Growth", icon: "ChartBar" },
          { name: "Paid Ads (Google, FB, IG, LinkedIn)", icon: "Target" },
          { name: "SEO & Organic Growth", icon: "ChartBar" },
          { name: "Email & Funnel Marketing", icon: "Target" },
          { name: "High-Impact Marketing Strategy", icon: "Rocket" }
        ]
      }
    ];
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'services')
        .maybeSingle();
        
      let saveError;
      
      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('site_content')
          .update({ content: JSON.stringify(serviceLines) })
          .eq('section', 'services');
          
        saveError = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('site_content')
          .insert([{ 
            section: 'services', 
            content: JSON.stringify(serviceLines) 
          }]);
          
        saveError = insertError;
      }
      
      if (saveError) {
        throw saveError;
      }
      
      toast({
        title: "Success",
        description: "Service lines saved successfully.",
      });
    } catch (error) {
      console.error('Error saving services:', error);
      toast({
        title: "Error",
        description: "Failed to save service lines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddServiceLine = () => {
    setServiceLines([...serviceLines, {
      title: "New Service Line",
      description: "Description of your new service line.",
      icon: "Crown",
      model: "Model of your service",
      services: [{ name: "New Service Item", icon: "Crown" }]
    }]);
  };

  const handleRemoveServiceLine = (index: number) => {
    const newServiceLines = [...serviceLines];
    newServiceLines.splice(index, 1);
    setServiceLines(newServiceLines);
  };

  const handleAddServiceItem = (lineIndex: number) => {
    const newServiceLines = [...serviceLines];
    newServiceLines[lineIndex].services.push({ name: "New Service Item", icon: "Crown" });
    setServiceLines(newServiceLines);
  };

  const handleRemoveServiceItem = (lineIndex: number, itemIndex: number) => {
    const newServiceLines = [...serviceLines];
    newServiceLines[lineIndex].services.splice(itemIndex, 1);
    setServiceLines(newServiceLines);
  };

  const handleServiceLineChange = (index: number, field: keyof ServiceLine, value: string) => {
    const newServiceLines = [...serviceLines];
    newServiceLines[index][field] = value;
    setServiceLines(newServiceLines);
  };

  const handleServiceItemChange = (lineIndex: number, itemIndex: number, field: keyof ServiceItem, value: string) => {
    const newServiceLines = [...serviceLines];
    newServiceLines[lineIndex].services[itemIndex][field] = value;
    setServiceLines(newServiceLines);
  };

  const renderIconPreview = (iconName: string) => {
    const icon = availableIcons.find(i => i.name === iconName);
    return icon?.component || <Crown size={20} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Service Lines</h2>
        <div className="flex gap-2">
          <Button onClick={handleAddServiceLine} size="sm" className="gap-1">
            <Plus size={16} />
            Add Service Line
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {serviceLines.map((serviceLine, index) => (
          <AccordionItem key={index} value={`service-${index}`} className="border rounded-lg p-2">
            <div className="flex justify-between items-center">
              <AccordionTrigger className="py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  {renderIconPreview(serviceLine.icon)}
                  <span>{serviceLine.title}</span>
                </div>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveServiceLine(index);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <AccordionContent className="pt-4 pb-2">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={serviceLine.title}
                      onChange={(e) => handleServiceLineChange(index, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={serviceLine.description}
                      onChange={(e) => handleServiceLineChange(index, 'description', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select
                        value={serviceLine.icon}
                        onValueChange={(value) => handleServiceLineChange(index, 'icon', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIcons.map((icon) => (
                            <SelectItem key={icon.name} value={icon.name}>
                              <div className="flex items-center gap-2">
                                {icon.component}
                                <span>{icon.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Service Model</Label>
                      <Input
                        value={serviceLine.model}
                        onChange={(e) => handleServiceLineChange(index, 'model', e.target.value)}
                        placeholder="e.g., Monthly Retainer, Project-Based, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Services</Label>
                      <Button 
                        onClick={() => handleAddServiceItem(index)} 
                        variant="outline" 
                        size="sm"
                        className="gap-1"
                      >
                        <Plus size={14} />
                        Add Service
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {serviceLine.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-center gap-3">
                          <Select
                            value={service.icon}
                            onValueChange={(value) => handleServiceItemChange(index, serviceIndex, 'icon', value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Icon" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableIcons.map((icon) => (
                                <SelectItem key={icon.name} value={icon.name}>
                                  <div className="flex items-center gap-2">
                                    {icon.component}
                                    <span>{icon.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Input
                            value={service.name}
                            onChange={(e) => handleServiceItemChange(index, serviceIndex, 'name', e.target.value)}
                            className="flex-1"
                          />
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleRemoveServiceItem(index, serviceIndex)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {serviceLines.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No service lines found. Add your first service line to get started.</p>
          <Button onClick={handleAddServiceLine}>
            <Plus className="mr-2 h-4 w-4" /> Add Service Line
          </Button>
        </Card>
      )}
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminServices;
