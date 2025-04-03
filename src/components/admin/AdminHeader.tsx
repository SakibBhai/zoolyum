
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from './common/FileUpload';
import { supabase } from '@/integrations/supabase/client';

interface HeaderData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  logoImage: string;
}

const AdminHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData>({
    title: 'Premier Digital Agency for Luxury & Premium Brands',
    subtitle: 'We design and develop beautiful digital experiences that convert your visitors into leads, customers and brand advocates.',
    ctaText: 'Get Started',
    ctaLink: '#contact',
    backgroundImage: '/lovable-uploads/d8065ca3-8770-4547-bd54-2883754725d0.png',
    logoImage: '/lovable-uploads/d8065ca3-8770-4547-bd54-2883754725d0.png',
  });

  const { toast } = useToast();

  // Fetch header data from Supabase if available
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('section', 'header')
          .single();

        if (error) {
          console.error('Error fetching header:', error);
          return;
        }

        if (data?.content) {
          setHeaderData(JSON.parse(data.content));
        }
      } catch (error) {
        console.error('Error parsing header data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', 'header')
        .maybeSingle();

      let saveError;

      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('site_content')
          .update({ content: JSON.stringify(headerData) })
          .eq('section', 'header');

        saveError = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('site_content')
          .insert([{ 
            section: 'header', 
            content: JSON.stringify(headerData) 
          }]);

        saveError = insertError;
      }

      if (saveError) {
        throw saveError;
      }

      toast({
        title: "Success",
        description: "Header settings saved successfully.",
      });
    } catch (error) {
      console.error('Error saving header:', error);
      toast({
        title: "Error",
        description: "Failed to save header settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (url: string) => {
    setHeaderData({
      ...headerData,
      logoImage: url
    });
  };

  const handleBackgroundUpload = (url: string) => {
    setHeaderData({
      ...headerData,
      backgroundImage: url
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Header</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={headerData.title}
                onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={headerData.subtitle}
                onChange={(e) => setHeaderData({...headerData, subtitle: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaText">CTA Button Text</Label>
                <Input
                  id="ctaText"
                  value={headerData.ctaText}
                  onChange={(e) => setHeaderData({...headerData, ctaText: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ctaLink">CTA Button Link</Label>
                <Input
                  id="ctaLink"
                  value={headerData.ctaLink}
                  onChange={(e) => setHeaderData({...headerData, ctaLink: e.target.value})}
                  placeholder="#contact or /blog"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Logo Image</Label>
              <FileUpload
                onUploadComplete={handleLogoUpload}
                currentImageUrl={headerData.logoImage}
                label="Upload Logo"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Background Image</Label>
              <FileUpload
                onUploadComplete={handleBackgroundUpload}
                currentImageUrl={headerData.backgroundImage}
                label="Upload Background"
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeader;
