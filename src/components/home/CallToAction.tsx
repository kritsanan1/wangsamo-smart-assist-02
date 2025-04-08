
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-wangsammo-orange rounded-xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">มาร่วมพัฒนาอำเภอวังสามหมอไปด้วยกัน</h2>
            <p className="text-lg mb-8">
              ช่วยกันแจ้งเหตุและร้องเรียนปัญหาเพื่อให้ชุมชนของเราน่าอยู่ยิ่งขึ้น ทุกการแจ้งเหตุของคุณมีความสำคัญต่อการพัฒนาอำเภอวังสามหมอ
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/report">
                <Button className="bg-white text-wangsammo-orange hover:bg-white/90 font-bold px-8 py-6 text-lg">
                  แจ้งเหตุเดี๋ยวนี้
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  เรียนรู้เพิ่มเติม
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
