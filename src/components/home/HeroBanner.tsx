
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-wangsammo-dark to-wangsammo-blue py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Smart Wangsammo
            </h1>
            <h2 className="text-xl md:text-3xl font-medium mb-6">
              แพลตฟอร์มแจ้งเหตุอัจฉริยะ ผสาน AI เพื่อชุมชนที่น่าอยู่
            </h2>
            <p className="text-lg mb-8">
              ช่วยให้การแจ้งเหตุและร้องเรียนปัญหาในพื้นที่เป็นเรื่องง่าย รวดเร็ว และมีประสิทธิภาพ ด้วยเทคโนโลยี AI ที่ช่วยในการคัดกรอง จัดหมวดหมู่ และติดตามสถานะการแก้ไขปัญหา
            </p>
            <div className="flex space-x-4">
              <Link to="/report">
                <Button className="bg-wangsammo-orange hover:bg-wangsammo-orange/90 text-white px-8 py-6 text-lg">
                  แจ้งเหตุเดี๋ยวนี้
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  ติดตามเรื่องร้องเรียน
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img
              src="/lovable-uploads/53dd83bd-e8cc-4c7e-b9e5-c582da9a51dc.png"
              alt="Wang Sam Mo District"
              className="max-w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
