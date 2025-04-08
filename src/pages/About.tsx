
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">เกี่ยวกับ Smart Wangsammo</h1>
          <p className="text-gray-600">
            แพลตฟอร์มแจ้งเหตุอัจฉริยะ ผสาน AI เพื่อชุมชนที่น่าอยู่
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">วิสัยทัศน์</h2>
            <p className="text-gray-700 mb-6">
              Smart Wangsammo มีวิสัยทัศน์ในการยกระดับการให้บริการด้านการรับเรื่องร้องเรียนของอำเภอวังสามหมอ โดยนำเทคโนโลยี AI มาช่วยในการจัดการเรื่องร้องเรียนให้มีประสิทธิภาพมากยิ่งขึ้น เพื่อพัฒนาคุณภาพชีวิตของประชาชนในพื้นที่
            </p>
            
            <h2 className="text-xl font-bold mb-4">เป้าหมาย</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>ลดระยะเวลาในการแก้ไขปัญหาให้กับประชาชน</li>
              <li>เพิ่มความโปร่งใสในกระบวนการจัดการเรื่องร้องเรียน</li>
              <li>สร้างฐานข้อมูลเชิงลึกเพื่อการวางแผนพัฒนาพื้นที่</li>
              <li>เพิ่มการมีส่วนร่วมของประชาชนในการพัฒนาชุมชน</li>
            </ul>
            
            <h2 className="text-xl font-bold mb-4">ประโยชน์ที่ได้รับ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">สำหรับประชาชน</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>สามารถแจ้งเหตุได้อย่างสะดวกรวดเร็ว</li>
                  <li>ติดตามสถานะการดำเนินการได้อย่างโปร่งใส</li>
                  <li>ได้รับการแจ้งเตือนเมื่อมีความคืบหน้า</li>
                  <li>มีช่องทางในการสื่อสารกับหน่วยงานที่เกี่ยวข้อง</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">สำหรับหน่วยงาน</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>ลดภาระงานในการคัดกรองเรื่องร้องเรียน</li>
                  <li>มีระบบจัดการที่มีประสิทธิภาพ</li>
                  <li>มีข้อมูลเชิงลึกสำหรับการวางแผน</li>
                  <li>เพิ่มความพึงพอใจของประชาชน</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">ทีมงาน</h2>
            <p className="text-gray-700 mb-6">
              Smart Wangsammo เป็นโครงการความร่วมมือระหว่างอำเภอวังสามหมอ องค์กรปกครองส่วนท้องถิ่นในพื้นที่ และทีมผู้พัฒนาเทคโนโลยี AI เพื่อพัฒนาระบบแจ้งเหตุอัจฉริยะที่ตอบโจทย์ความต้องการของพื้นที่
            </p>
            
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/a6f236b1-baea-4e08-9184-b2b786ccdb0a.png" 
                alt="Smart Wangsammo Logo" 
                className="h-24" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">ติดต่อเรา</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>สำนักงานอำเภอวังสามหมอ</strong><br />
                ที่อยู่: อำเภอวังสามหมอ จังหวัดอุดรธานี 41280
              </p>
              <p>
                <strong>เบอร์โทรศัพท์:</strong> 042-387105<br />
                <strong>อีเมล:</strong> wangsammo@email.com
              </p>
              <p>
                <strong>เวลาทำการ:</strong><br />
                วันจันทร์ - วันศุกร์: 8:30 - 16:30 น.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
