
import { LinkItem, LinkValidationErrors } from "@/types/links";

export const validateLink = (link: Partial<LinkItem>): LinkValidationErrors => {
  const errors: LinkValidationErrors = {};
  
  if (!link.id) {
    errors.id = "ID is required";
  }
  
  if (!link.title) {
    errors.title = "Title is required";
  }
  
  if (!link.url) {
    errors.url = "URL is required";
  } else {
    try {
      // Check if URL is valid
      new URL(link.url);
    } catch (error) {
      errors.url = "Please enter a valid URL";
    }
  }
  
  return errors;
};

export const isValidLink = (link: Partial<LinkItem>): boolean => {
  const errors = validateLink(link);
  return Object.keys(errors).length === 0;
};
