
import { useState } from 'react';
import TrackingForm from "@/components/track/TrackingForm";
import TrackingStatus from "@/components/track/TrackingStatus";

const Track = () => {
  // Mock data for demonstration
  const [trackingData, setTrackingData] = useState<any>(null);

  // This would be set when the user searches for a report
  // For demo purposes, we'll set a sample one
  setTimeout(() => {
    setTrackingData({
      id: 'WS-12345',
      title: 'ถนนชำรุดบริเวณหน้าตลาดสด',
      category: 'infrastructure',
      location: 'หน้าตลาดสด อ.วังสามหมอ',
      submittedDate: '8 เมษายน 2568',
      status: 'in_progress',
      updates: [
        {
          date: '8 เม.ย. 2568 09:15',
          status: 'รับเรื่องแล้ว',
          description: 'ระบบได้รับเรื่องร้องเรียนของท่านแล้ว และกำลังส่งต่อไปยังเจ้าหน้าที่ที่เกี่ยวข้อง'
        },
        {
          date: '8 เม.ย. 2568 10:30',
          status: 'ส่งต่อเจ้าหน้าที่แล้ว',
          description: 'เรื่องร้องเรียนของท่านถูกส่งต่อไปยังกองช่าง อบต.วังสามหมอ เพื่อดำเนินการแก้ไข'
        },
        {
          date: '8 เม.ย. 2568 14:45',
          status: 'กำลังดำเนินการ',
          description: 'เจ้าหน้าที่กำลังดำเนินการตรวจสอบพื้นที่และวางแผนการซ่อมแซม คาดว่าจะเริ่มดำเนินการซ่อมแซมภายใน 2 วัน'
        }
      ]
    });
  }, 1000);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">ติดตามสถานะเรื่องร้องเรียน</h1>
          <p className="text-gray-600">
            ติดตามความคืบหน้าของเรื่องร้องเรียนที่คุณได้ส่งเข้ามา
          </p>
        </div>
        
        <TrackingForm />
        
        {trackingData && (
          <div className="mt-10 animate-fade-in">
            <TrackingStatus data={trackingData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
