
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Use correct typing for Supabase site_content table
type SiteContent = Database['public']['Tables']['site_content']['Row'];

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

const AdminServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serviceContent, setServiceContent] = useState<string>('');
  const [serviceLines, setServiceLines] = useState<ServiceItem[]>([]);
  const { toast } = useToast();

  // Get default services if none are found in the database
  const getDefaultServices = (): ServiceItem[] => [
    {
      title: 'Web Development',
      description: 'We create custom websites and web applications that are fast, responsive, and optimized for search engines.',
      icon: 'code'
    },
    {
      title: 'UI/UX Design',
      description: 'Our design team creates beautiful interfaces that are intuitive to use and drive conversions.',
      icon: 'palette'
    },
    {
      title: 'Digital Marketing',
      description: 'We help you reach your target audience through SEO, social media, email marketing, and more.',
      icon: 'megaphone'
    }
  ];

  // Fetch services data from database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('section', 'services')
          .single() as { data: SiteContent | null, error: any };
          
        if (error) {
          console.error('Error fetching services:', error);
          // If not found, load from default services
          setServiceLines(getDefaultServices());
          return;
        }
        
        if (data?.content) {
          // Parse the content as both raw text for editing and as structured data for UI
          setServiceContent(data.content);
          try {
            setServiceLines(JSON.parse(data.content));
          } catch (parseError) {
            console.error('Error parsing service data:', parseError);
            setServiceLines(getDefaultServices());
          }
        } else {
          setServiceLines(getDefaultServices());
        }
      } catch (error) {
        console.error('Error in services fetch:', error);
        setServiceLines(getDefaultServices());
      }
    };
    
    fetchServices();
  }, []);

  const handleSaveServices = async () => {
    setIsLoading(true);
    
    try {
      // Try to parse the service content to make sure it's valid JSON
      let serviceData: ServiceItem[];
      
      try {
        serviceData = JSON.parse(serviceContent);
        
        // Validate the structure (each item needs title, description, icon)
        const isValid = Array.isArray(serviceData) && serviceData.every(item => 
          typeof item === 'object' && 
          'title' in item && 
          'description' in item && 
          'icon' in item
        );
        
        if (!isValid) {
          throw new Error('Invalid service data structure');
        }
      } catch (error) {
        toast({
          title: 'Invalid JSON format',
          description: 'The service data must be a valid JSON array with title, description, and icon properties.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      // Check if the services record already exists
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'services')
        .maybeSingle() as { data: SiteContent | null, error: any };
      
      let saveError;
      
      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('site_content')
          .update({ content: serviceContent })
          .eq('section', 'services') as { error: any };
        
        saveError = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('site_content')
          .insert([{
            section: 'services',
            content: serviceContent
          }]) as { error: any };
        
        saveError = insertError;
      }
      
      if (saveError) {
        throw saveError;
      }
      
      // Update the service lines in the UI
      setServiceLines(serviceData);
      
      toast({
        title: 'Success',
        description: 'Services updated successfully.',
      });
    } catch (error) {
      console.error('Error saving services:', error);
      toast({
        title: 'Error',
        description: 'Failed to save services. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Edit the services in JSON format. Each service must have a title, description, and icon property.
              </p>
              <Textarea
                value={serviceContent || JSON.stringify(serviceLines, null, 2)}
                onChange={(e) => setServiceContent(e.target.value)}
                rows={15}
                className="font-mono text-xs"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveServices}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
