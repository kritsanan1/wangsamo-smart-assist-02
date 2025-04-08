
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'แจ้งเหตุผ่านเว็บไซต์หรือ Line',
      description: 'กรอกรายละเอียด เลือกประเภทเรื่องร้องเรียน และแนบรูปภาพหรือวิดีโอ ระบบจะระบุตำแหน่งโดยอัตโนมัติ',
    },
    {
      number: 2,
      title: 'AI วิเคราะห์และจัดส่งเรื่อง',
      description: 'ระบบ AI จะวิเคราะห์เนื้อหา จัดหมวดหมู่ และส่งต่อเรื่องร้องเรียนไปยังหน่วยงานที่เกี่ยวข้อง',
    },
    {
      number: 3,
      title: 'ติดตามความคืบหน้า',
      description: 'คุณสามารถติดตามสถานะเรื่องร้องเรียน และรับการแจ้งเตือนเมื่อมีความคืบหน้า',
    },
    {
      number: 4,
      title: 'เรื่องร้องเรียนได้รับการแก้ไข',
      description: 'เมื่อเรื่องร้องเรียนได้รับการแก้ไขแล้ว คุณจะได้รับการแจ้งเตือน และสามารถให้คะแนนความพึงพอใจได้',
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">วิธีการทำงาน</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          เรียนรู้วิธีใช้งานระบบ Smart Wangsammo เพื่อแจ้งเหตุหรือร้องเรียนปัญหาในพื้นที่อำเภอวังสามหมอ
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`mb-6 p-6 rounded-lg transition-all duration-300 ${activeStep === step.number ? 'bg-wangsammo-orange text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'}`}
                onClick={() => setActiveStep(step.number)}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activeStep === step.number ? 'bg-white text-wangsammo-orange' : 'bg-wangsammo-orange text-white'}`}>
                    {activeStep > step.number ? <Check size={18} /> : step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                    <p className={activeStep === step.number ? 'text-white/90' : 'text-gray-600'}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="bg-wangsammo-dark rounded-lg p-8 text-white max-w-md">
              <h3 className="text-2xl font-bold mb-4">เริ่มต้นใช้งานวันนี้</h3>
              <p className="mb-6">
                เพียงไม่กี่ขั้นตอน คุณก็สามารถมีส่วนร่วมในการพัฒนาชุมชนอำเภอวังสามหมอให้น่าอยู่ยิ่งขึ้น
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-wangsammo-orange mr-2" />
                  <span>ไม่จำเป็นต้องลงทะเบียน</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-wangsammo-orange mr-2" />
                  <span>ใช้งานง่าย ไม่ซับซ้อน</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-wangsammo-orange mr-2" />
                  <span>ติดตามสถานะได้อย่างโปร่งใส</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-wangsammo-orange mr-2" />
                  <span>รองรับการแนบรูปภาพและวิดีโอ</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-wangsammo-orange hover:bg-wangsammo-orange/90">เริ่มต้นใช้งานทันที</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
