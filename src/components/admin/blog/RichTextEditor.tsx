
import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  ListOrdered, 
  List, 
  AlignLeft, 
  AlignCenter,
  AlignRight, 
  Link,
  Image,
  Video,
  Undo,
  Redo,
  Save,
  Trash
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange }) => {
  const [content, setContent] = useState(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };
  
  // These functions would normally interact with the textarea to apply formatting
  // For this demo, we'll just show the buttons but not implement the actual formatting
  const applyFormatting = (format: string) => {
    console.log(`Applying format: ${format}`);
    // In a real implementation, this would insert HTML or markdown tags
  };
  
  const insertLink = (url: string, text: string) => {
    console.log(`Inserting link: ${url} with text: ${text}`);
    // In a real implementation, this would insert an <a> tag
    const linkMarkdown = `[link:${url}:${text}]`;
    const newContent = content + linkMarkdown;
    setContent(newContent);
    onChange(newContent);
  };
  
  const insertImage = (url: string) => {
    console.log(`Inserting image: ${url}`);
    // In a real implementation, this would insert an <img> tag
    const imageMarkdown = `[image:${url}]`;
    const newContent = content + imageMarkdown;
    setContent(newContent);
    onChange(newContent);
  };
  
  return (
    <div className="rich-text-editor border rounded-md">
      <div className="toolbar flex flex-wrap items-center gap-1 p-1 border-b bg-gray-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('underline')}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('ordered-list')}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('unordered-list')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('align-left')}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('align-center')}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('align-right')}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" title="Insert Link">
              <Link className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Insert Link</h4>
              <div className="grid gap-2">
                <Input type="url" placeholder="URL" id="link-url" />
                <Input type="text" placeholder="Link Text" id="link-text" />
                <Button onClick={() => {
                  const url = (document.getElementById('link-url') as HTMLInputElement).value;
                  const text = (document.getElementById('link-text') as HTMLInputElement).value;
                  if (url) insertLink(url, text || url);
                }}>
                  Insert Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" title="Insert Image">
              <Image className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Insert Image</h4>
              <div className="grid gap-2">
                <Input type="url" placeholder="Image URL" id="image-url" />
                <Button onClick={() => {
                  const url = (document.getElementById('image-url') as HTMLInputElement).value;
                  if (url) insertImage(url);
                }}>
                  Insert Image
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('video')}
          title="Insert Video"
        >
          <Video className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-5 bg-gray-300 mx-1"></div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('undo')}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('redo')}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      <textarea 
        className="w-full min-h-[200px] p-3 focus:outline-none"
        value={content}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default RichTextEditor;
