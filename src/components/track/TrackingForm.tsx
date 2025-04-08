
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const TrackingForm = () => {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) {
      toast({
        title: "กรุณากรอกหมายเลขอ้างอิง",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      if (trackingId.startsWith('WS-')) {
        // Found
        toast({
          title: "พบเรื่องร้องเรียนแล้ว",
          description: "กำลังแสดงสถานะของเรื่องร้องเรียน",
        });
      } else {
        // Not found
        toast({
          title: "ไม่พบเรื่องร้องเรียน",
          description: "กรุณาตรวจสอบหมายเลขอ้างอิงอีกครั้ง",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">ติดตามสถานะเรื่องร้องเรียน</h3>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking-id">หมายเลขอ้างอิง</Label>
            <Input
              id="tracking-id"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="เช่น WS-12345"
            />
            <p className="text-sm text-gray-500">
              กรอกหมายเลขอ้างอิงที่ได้รับหลังจากส่งเรื่องร้องเรียน
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-wangsammo-orange hover:bg-wangsammo-orange/90"
            disabled={isSearching}
          >
            {isSearching ? "กำลังค้นหา..." : "ค้นหา"}
          </Button>
        </form>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          หากคุณไม่ทราบหมายเลขอ้างอิง โปรดติดต่อเจ้าหน้าที่ที่เบอร์ 042-387105
        </p>
      </div>
    </div>
  );
};

export default TrackingForm;
