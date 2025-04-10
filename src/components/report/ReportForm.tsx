
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
import { MapPin, Camera, MessageSquare, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GoogleMapComponent from "@/components/maps/GoogleMap";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StepNavigator } from "@/components/ui/step-navigator";

interface LocationCoords {
  lat: number;
  lng: number;
}

const ReportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    name: "",
    contact: "",
    email: "",
  });
  const [locationCoords, setLocationCoords] = useState<LocationCoords>({
    lat: 17.3083, // Default to Wang Sam Mo coordinates
    lng: 103.7489,
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const steps = [
    "ข้อมูลเหตุการณ์",
    "ระบุตำแหน่ง",
    "แนบรูปภาพหรือวิดีโอ",
    "ข้อมูลติดต่อ",
  ];

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
          setLocationCoords({
            lat: latitude,
            lng: longitude,
          });
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

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      
      setLocationCoords({ lat, lng });
      setFormData((prev) => ({
        ...prev,
        location: `${lat}, ${lng}`,
      }));
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    switch(currentStep) {
      case 1:
        if (!formData.title) errors.push("กรุณาระบุหัวข้อเรื่องร้องเรียน");
        if (!formData.category) errors.push("กรุณาเลือกประเภทเรื่องร้องเรียน");
        if (!formData.description) errors.push("กรุณาระบุรายละเอียดเรื่องร้องเรียน");
        break;
      case 2:
        if (!formData.location) errors.push("กรุณาระบุตำแหน่งที่เกิดเหตุ");
        break;
      case 4:
        if (!formData.name) errors.push("กรุณาระบุชื่อ-นามสกุล");
        if (!formData.contact) errors.push("กรุณาระบุเบอร์โทรศัพท์");
        break;
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev < steps.length ? prev + 1 : prev);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev > 1 ? prev - 1 : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    const errors: string[] = [];
    if (!formData.title) errors.push("กรุณาระบุหัวข้อเรื่องร้องเรียน");
    if (!formData.category) errors.push("กรุณาเลือกประเภทเรื่องร้องเรียน");
    if (!formData.description) errors.push("กรุณาระบุรายละเอียดเรื่องร้องเรียน");
    if (!formData.location) errors.push("กรุณาระบุตำแหน่งที่เกิดเหตุ");
    if (!formData.name) errors.push("กรุณาระบุชื่อ-นามสกุล");
    if (!formData.contact) errors.push("กรุณาระบุเบอร์โทรศัพท์");
    
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      toast({
        title: "ไม่สามารถส่งเรื่องร้องเรียนได้",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // Simulate form submission
    try {
      console.log("Submitting incident report:", {
        ...formData,
        coordinates: locationCoords,
        files: files ? Array.from(files).map(file => file.name) : [],
      });
      
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
        setCurrentStep(1);
      }, 1500);
    } catch (error) {
      console.error("Error submitting incident report:", error);
      toast({
        title: "ไม่สามารถส่งเรื่องร้องเรียนได้",
        description: "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">หัวข้อเรื่องร้องเรียน <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="กรุณาระบุหัวข้อเรื่องร้องเรียน"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">ประเภทเรื่องร้องเรียน <span className="text-red-500">*</span></Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
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
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
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
              
              <div className="mt-4 border rounded-md overflow-hidden">
                <GoogleMapComponent 
                  height="350px"
                  center={locationCoords}
                  zoom={15}
                  markers={[
                    {
                      id: "incident-location",
                      position: locationCoords,
                      title: "ตำแหน่งเหตุการณ์",
                    }
                  ]}
                  onMapClick={handleMapClick}
                />
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                คุณสามารถระบุตำแหน่งโดยคลิกบนแผนที่ หรือกดปุ่มระบุตำแหน่งเพื่อใช้ตำแหน่งปัจจุบันของคุณ
              </p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <StepNavigator 
        stepNumber={currentStep}
        stepTotal={steps.length}
        stepDescription={steps[currentStep - 1]}
        onComplete={handleSubmit}
        className="mb-6"
      />
      
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {renderStepContent()}
      
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          ย้อนกลับ
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={handleNext}
          >
            ถัดไป
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-wangsammo-orange hover:bg-wangsammo-orange/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังส่ง..." : "ส่งเรื่องร้องเรียน"}
          </Button>
        )}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2">
        ข้อมูลของคุณจะถูกเก็บเป็นความลับ และใช้เพื่อการติดตามเรื่องร้องเรียนเท่านั้น
      </p>
    </form>
  );
};

export default ReportForm;
