
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkItem } from "@/types/links";
import LinkEditForm from "./LinkEditForm";
import { Pencil, Trash, Plus, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample initial data
const initialLinks: LinkItem[] = [
  {
    id: "home",
    title: "หน้าหลัก",
    url: "/",
    description: "หน้าแรกของเว็บไซต์"
  },
  {
    id: "report",
    title: "แจ้งเรื่อง",
    url: "/report",
    description: "หน้าแจ้งเรื่องร้องเรียน"
  }
];

const LinkManagement: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<LinkItem | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const { toast } = useToast();
  
  const handleAddLink = () => {
    setEditingLink(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSaveLink = (link: LinkItem) => {
    if (editingLink) {
      // Update existing link
      setLinks(links.map(l => l.id === link.id ? link : l));
      toast({
        title: "ลิงก์ถูกอัพเดทแล้ว",
        description: `"${link.title}" ได้รับการอัพเดทเรียบร้อย`,
      });
    } else {
      // Add new link
      // Check if ID already exists
      if (links.some(l => l.id === link.id)) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: `ID "${link.id}" มีอยู่ในระบบแล้ว กรุณาใช้ ID อื่น`,
          variant: "destructive"
        });
        return;
      }
      
      setLinks([...links, link]);
      toast({
        title: "เพิ่มลิงก์แล้ว",
        description: `"${link.title}" ถูกเพิ่มเข้าระบบเรียบร้อยแล้ว`,
      });
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteConfirm = () => {
    if (linkToDelete) {
      setLinks(links.filter(link => link.id !== linkToDelete.id));
      toast({
        title: "ลบลิงก์แล้ว",
        description: `"${linkToDelete.title}" ถูกลบออกจากระบบแล้ว`,
      });
      setLinkToDelete(null);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>จัดการลิงก์ภายใน</CardTitle>
        <Button onClick={handleAddLink} size="sm" className="gap-1">
          <Plus size={16} /> เพิ่มลิงก์
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="py-2 px-4 text-left font-medium">ID</th>
                <th className="py-2 px-4 text-left font-medium">ชื่อลิงก์</th>
                <th className="py-2 px-4 text-left font-medium hidden md:table-cell">URL</th>
                <th className="py-2 px-4 text-left font-medium hidden lg:table-cell">คำอธิบาย</th>
                <th className="py-2 px-4 text-right font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {links.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">
                    ไม่พบข้อมูลลิงก์ กรุณาเพิ่มลิงก์ใหม่
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4">{link.id}</td>
                    <td className="py-2 px-4">{link.title}</td>
                    <td className="py-2 px-4 hidden md:table-cell">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        {link.url.length > 20 ? link.url.slice(0, 20) + '...' : link.url}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="py-2 px-4 hidden lg:table-cell">
                      {link.description && link.description.length > 30 
                        ? link.description.slice(0, 30) + '...' 
                        : link.description}
                    </td>
                    <td className="py-2 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditLink(link)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setLinkToDelete(link)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      
      <LinkEditForm
        link={editingLink}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLink}
      />
      
      <AlertDialog open={!!linkToDelete} onOpenChange={() => setLinkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
            <AlertDialogDescription>
              การกระทำนี้ไม่สามารถยกเลิกได้ ลิงก์ "{linkToDelete?.title}" จะถูกลบออกจากระบบอย่างถาวร
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-700">
              ลบลิงก์
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default LinkManagement;
