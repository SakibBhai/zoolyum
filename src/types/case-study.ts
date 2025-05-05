
export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string;
  image: string;
  created_at: string;
  category?: string; // For filtering
}
