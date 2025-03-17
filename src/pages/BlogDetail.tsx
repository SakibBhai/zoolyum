
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, ArrowLeft, Tag, Clock, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  additionalImages?: string[];
  videoUrl?: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the current blog post
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();

        if (postError) {
          throw postError;
        }

        // Process additional images if they exist in the content
        const processedPost = {
          ...postData,
          additionalImages: extractImageUrls(postData.content),
          videoUrl: extractVideoUrl(postData.content),
        };

        setPost(processedPost);

        // Fetch related posts in same category
        if (postData?.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("category", postData.category)
            .neq("id", id)
            .limit(3);

          if (relatedError) {
            throw relatedError;
          }

          setRelatedPosts(relatedData || []);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, toast]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/)?.length || 0;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  };

  // Extract image URLs from content with special format [image:url]
  const extractImageUrls = (content: string): string[] => {
    if (!content) return [];
    const regex = /\[image:(https?:\/\/[^\]]+)\]/g;
    const urls: string[] = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    return urls;
  };

  // Extract video URL from content with special format [video:url]
  const extractVideoUrl = (content: string): string | undefined => {
    if (!content) return undefined;
    const match = content.match(/\[video:(https?:\/\/[^\]]+)\]/);
    return match ? match[1] : undefined;
  };

  // Process content to render links and remove special formatting markers
  const processContent = (content: string): string => {
    if (!content) return "";
    
    // Remove image, video, and custom link markers from the displayed content
    let processedContent = content
      .replace(/\[image:(https?:\/\/[^\]]+)\]/g, "")
      .replace(/\[video:(https?:\/\/[^\]]+)\]/g, "")
      .replace(/\[link:(https?:\/\/[^\:]+):([^\]]+)\]/g, "");
    
    return processedContent;
  };

  // Convert URLs to clickable links and handle custom hyperlinks
  const renderContentWithLinks = (text: string) => {
    if (!text) return [];
    
    // Split first by custom link format [link:url:text]
    const parts = [];
    let lastIndex = 0;
    const linkRegex = /\[link:(https?:\/\/[^\:]+):([^\]]+)\]/g;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      // Add the text before this link
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }
      
      // Add the link with its text
      parts.push({
        type: 'custom-link',
        url: match[1],
        text: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }
    
    // Now process each part for regular URLs
    return parts.map((part, index) => {
      if (part.type === 'custom-link') {
        return (
          <a 
            key={index}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center"
          >
            {part.text}
            <LinkIcon size={14} className="ml-1" />
          </a>
        );
      } else {
        // Process regular URLs in this text part
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const textParts = part.content.split(urlRegex);
        
        return textParts.map((textPart, textIndex) => {
          if (textPart.match(urlRegex)) {
            return (
              <a 
                key={`${index}-${textIndex}`}
                href={textPart}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center"
              >
                {textPart}
                <LinkIcon size={14} className="ml-1" />
              </a>
            );
          }
          return <span key={`${index}-${textIndex}`}>{textPart}</span>;
        });
      }
    });
  };

  // Render a YouTube embed from a YouTube URL
  const renderYouTubeEmbed = (url: string) => {
    // Extract the video ID from various YouTube URL formats
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )?.[1];
    
    if (!videoId) return null;
    
    return (
      <div className="aspect-video w-full my-8">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        ) : post ? (
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="ghost" className="pl-0">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Button>
              </Link>
            </div>

            {/* Blog post content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    {calculateReadTime(post.content)}
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
                <div className="flex items-center justify-between border-y border-border py-4 mb-8">
                  <div className="flex items-center">
                    <User className="mr-2 text-muted-foreground" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-muted-foreground" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </div>

              {/* Featured image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Blog content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg font-medium">{post.excerpt}</p>
                
                {/* Render processed content with clickable links */}
                {processContent(post.content).split("\n\n").map((paragraph, index) => (
                  <p key={index} className="my-4 leading-relaxed text-gray-800">
                    {renderContentWithLinks(paragraph)}
                  </p>
                ))}

                {/* Additional Images Gallery */}
                {post.additionalImages && post.additionalImages.length > 0 && (
                  <div className="my-8">
                    <h3 className="text-xl font-bold mb-4">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.additionalImages.map((imgUrl, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden">
                          <img 
                            src={imgUrl} 
                            alt={`Additional image ${idx + 1}`} 
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Embed */}
                {post.videoUrl && renderYouTubeEmbed(post.videoUrl)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm bg-secondary px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.id}`}
                      className="rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] bg-card"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {related.category}
                        </span>
                        <h3 className="text-lg font-bold mt-3 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button>Return to Blog</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
