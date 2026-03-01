interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  main_image: string;
  category: string;
  technologies: string[] | string;
  live_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export type { Project };
