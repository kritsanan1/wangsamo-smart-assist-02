
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export type LinkValidationErrors = {
  [key in keyof LinkItem]?: string;
};
