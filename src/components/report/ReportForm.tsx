
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    name: "",
    contact: "",
    email: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "กำลังระบุตำแหน่ง",
        description: "กรุณารอสักครู่...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
          
          toast({
            title: "ระบุตำแหน่งสำเร็จ",
            description: "ระบบได้บันทึกตำแหน่งของคุณแล้ว",
          });
        },
        (error) => {
          toast({
            title: "ไม่สามารถระบุตำแหน่งได้",
            description: "โปรดกรอกตำแหน่งด้วยตนเอง",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "เบราว์เซอร์ไม่รองรับการระบุตำแหน่ง",
        description: "โปรดกรอกตำแหน่งด้วยตนเอง",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "ส่งเรื่องร้องเรียนสำเร็จ",
        description: "ระบบได้รับเรื่องร้องเรียนของคุณแล้ว หมายเลขอ้างอิง: WS-" + Math.floor(10000 + Math.random() * 90000),
      });
      setIsSubmitting(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        name: "",
        contact: "",
        email: "",
      });
      setFiles(null);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">หัวข้อเรื่องร้องเรียน <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="กรุณาระบุหัวข้อเรื่องร้องเรียน"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">ประเภทเรื่องร้องเรียน <span className="text-red-500">*</span></Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="กรุณาเลือกประเภทเรื่องร้องเรียน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="infrastructure">โครงสร้างพื้นฐาน (ถนน, สะพาน)</SelectItem>
            <SelectItem value="electricity">ไฟฟ้าสาธารณะ</SelectItem>
            <SelectItem value="water">ประปา/น้ำท่วม</SelectItem>
            <SelectItem value="garbage">ขยะ/ความสะอาด</SelectItem>
            <SelectItem value="safety">ความปลอดภัย</SelectItem>
            <SelectItem value="others">อื่นๆ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">รายละเอียด <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="กรุณาอธิบายรายละเอียดของปัญหา"
          rows={5}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">ตำแหน่งที่เกิดเหตุ <span className="text-red-500">*</span></Label>
        <div className="flex gap-2">
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="กรุณาระบุตำแหน่งที่เกิดเหตุ"
            className="flex-1"
            required
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleGetLocation}
            className="flex items-center gap-1"
          >
            <MapPin size={16} />
            ระบุตำแหน่ง
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          คุณสามารถระบุตำแหน่งเป็นที่อยู่ หรือกดปุ่มระบุตำแหน่งเพื่อใช้ตำแหน่งปัจจุบันของคุณ
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-upload">แนบรูปภาพหรือวิดีโอ (ไม่เกิน 5 ไฟล์)</Label>
        <div className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-wangsammo-orange transition-colors">
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Camera size={32} className="text-gray-400 mb-2" />
            <span className="font-medium">คลิกเพื่ออัปโหลดไฟล์</span>
            <span className="text-sm text-gray-500 mt-1">
              รองรับไฟล์ JPG, PNG, GIF และ MP4 (ไม่เกิน 10MB ต่อไฟล์)
            </span>
          </Label>
        </div>
        {files && (
          <p className="text-sm text-wangsammo-teal">
            เลือก {files.length} ไฟล์แล้ว
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MessageSquare size={20} />
          ข้อมูลติดต่อ
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อ-นามสกุล <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="กรุณาระบุชื่อ-นามสกุล"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">เบอร์โทรศัพท์ <span className="text-red-500">*</span></Label>
            <Input
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="กรุณาระบุเบอร์โทรศัพท์"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรุณาระบุอีเมล (ถ้ามี)"
            />
            <p className="text-sm text-gray-500">
              ระบบจะแจ้งเตือนความคืบหน้าของเรื่องร้องเรียนไปยังอีเมลนี้
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-wangsammo-orange hover:bg-wangsammo-orange/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "กำลังส่ง..." : "ส่งเรื่องร้องเรียน"}
        </Button>
        <p className="text-center text-sm text-gray-500 mt-2">
          ข้อมูลของคุณจะถูกเก็บเป็นความลับ และใช้เพื่อการติดตามเรื่องร้องเรียนเท่านั้น
        </p>
      </div>
    </form>
  );
};

export default ReportForm;
