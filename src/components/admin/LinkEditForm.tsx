
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkItem, LinkValidationErrors } from "@/types/links";
import { validateLink } from "@/utils/validation";
import { AlertTriangle } from "lucide-react";

interface LinkEditFormProps {
  link?: LinkItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: LinkItem) => void;
}

const emptyLink: LinkItem = {
  id: '',
  title: '',
  url: '',
  description: ''
};

const LinkEditForm: React.FC<LinkEditFormProps> = ({ link, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<LinkItem>(emptyLink);
  const [errors, setErrors] = useState<LinkValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Initialize form when a link is provided
  useEffect(() => {
    if (link) {
      setFormData(link);
    } else {
      setFormData(emptyLink);
    }
    setErrors({});
    setTouched({});
  }, [link, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      const newErrors = validateLink({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof LinkItem] }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const newErrors = validateLink(formData);
    setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof LinkItem] }));
  };
  
  const handleSubmit = () => {
    // Validate all fields
    const newErrors = validateLink(formData);
    setErrors(newErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    
    // If no errors, save the link
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{link ? 'Edit Link' : 'Add New Link'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="id" className="text-sm font-medium">
              ID
            </label>
            <Input
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.id ? "border-red-500" : ""}
            />
            {errors.id && touched.id && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} />
                {errors.id}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && touched.title && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} />
                {errors.title}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && touched.url && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} />
                {errors.url}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.description ? "border-red-500" : ""}
              rows={3}
            />
            {errors.description && touched.description && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle size={12} />
                {errors.description}
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkEditForm;
