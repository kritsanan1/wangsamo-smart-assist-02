
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Image, FileImage, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostData {
  title: string;
  content: string;
  image?: string;
}

interface FanPagePostUpdateProps {
  post?: PostData;
  onSubmit: (post: PostData) => void;
}

const FanPagePostUpdate: React.FC<FanPagePostUpdateProps> = ({ post: initialPost, onSubmit }) => {
  const [post, setPost] = useState<PostData>(initialPost || { 
    title: '', 
    content: '', 
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demonstration purposes, we're just creating a URL for the uploaded image
      // In a real app, you would upload this to a server
      const imageUrl = URL.createObjectURL(file);
      setPost(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(post);
      toast({
        title: "โพสต์สำเร็จ",
        description: "ข้อความของคุณได้รับการเผยแพร่แล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเผยแพร่โพสต์ได้ โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>อัพเดทข้อมูลแฟนเพจ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              หัวข้อ
            </label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="เพิ่มหัวข้อโพสต์ที่นี่..."
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              เนื้อหา
            </label>
            <Textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              placeholder="เพิ่มเนื้อหาโพสต์ที่นี่..."
              className="min-h-[120px] w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              รูปภาพ
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="flex gap-2"
                onClick={() => document.getElementById('image')?.click()}
              >
                <FileImage size={16} />
                เพิ่มรูปภาพ
              </Button>
              {post.image && <span className="text-sm text-green-600">เพิ่มรูปภาพแล้ว</span>}
            </div>
            
            {post.image && (
              <div className="mt-4 border rounded-md overflow-hidden">
                <img
                  src={post.image}
                  alt="Preview"
                  className="w-full h-auto max-h-[200px] object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            ยกเลิก
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-wangsammo-teal hover:bg-wangsammo-teal/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังโพสต์...
              </>
            ) : (
              'โพสต์'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FanPagePostUpdate;
