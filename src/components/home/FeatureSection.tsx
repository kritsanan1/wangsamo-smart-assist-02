
import { Camera, MapPin, MessageSquare, Check } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature = ({ title, description, icon }: FeatureProps) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow card-hover">
    <div className="inline-block p-4 bg-wangsammo-orange/10 text-wangsammo-orange rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      title: 'แจ้งเหตุด้วยภาพและวิดีโอ',
      description: 'อัปโหลดรูปภาพหรือวิดีโอเพื่อให้เห็นปัญหาได้ชัดเจน ระบบ AI จะวิเคราะห์เนื้อหาโดยอัตโนมัติ',
      icon: <Camera size={24} />
    },
    {
      title: 'ระบุตำแหน่งอัตโนมัติ',
      description: 'ระบบจะระบุตำแหน่งของคุณโดยอัตโนมัติ หรือคุณสามารถเลือกพิกัดบนแผนที่ได้เอง',
      icon: <MapPin size={24} />
    },
    {
      title: 'ระบบคัดกรองและจัดการเรื่องร้องเรียนอัจฉริยะ',
      description: 'AI จะวิเคราะห์เนื้อหาและจัดหมวดหมู่เรื่องร้องเรียนโดยอัตโนมัติ ทำให้ส่งต่อไปยังหน่วยงานที่เกี่ยวข้องได้อย่างรวดเร็ว',
      icon: <MessageSquare size={24} />
    },
    {
      title: 'ระบบแจ้งเตือนและติดตามสถานะ',
      description: 'ติดตามสถานะเรื่องร้องเรียนได้แบบเรียลไทม์ และรับการแจ้งเตือนเมื่อมีความคืบหน้า',
      icon: <Check size={24} />
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">ฟีเจอร์เด่น</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
