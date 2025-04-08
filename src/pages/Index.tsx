
import HeroBanner from "@/components/home/HeroBanner";
import FeatureSection from "@/components/home/FeatureSection";
import HowItWorks from "@/components/home/HowItWorks";
import AiFeatures from "@/components/home/AiFeatures";
import CallToAction from "@/components/home/CallToAction";
import MapPreview from "@/components/home/MapPreview";
import LinkChecker from "@/components/util/LinkChecker";
import DataValidator from "@/components/util/DataValidator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Sample validation rules for demonstration
const sampleValidationRules = [
  {
    id: 'rule1',
    name: 'ตรวจสอบความถูกต้องของชื่อหน่วยงาน',
    validate: (data: any) => data.agencies.every((a: any) => a.name.length > 0),
    message: 'พบหน่วยงานที่ไม่มีชื่อ'
  },
  {
    id: 'rule2',
    name: 'ตรวจสอบพื้นที่รับผิดชอบของหน่วยงาน',
    validate: (data: any) => data.agencies.every((a: any) => a.area.length >= 3),
    message: 'พบหน่วยงานที่มีข้อมูลพื้นที่ไม่สมบูรณ์'
  },
  {
    id: 'rule3',
    name: 'ตรวจสอบการกำหนดสีให้หน่วยงาน',
    validate: (data: any) => data.agencies.every((a: any) => a.color),
    message: 'พบหน่วยงานที่ไม่มีการกำหนดสี'
  }
];

// Sample data for demonstration
const sampleData = {
  agencies: [
    {
      id: 'agency1',
      name: 'เทศบาลตำบลวังสามหมอ',
      area: [
        { lat: 17.3183, lng: 103.7389 },
        { lat: 17.3283, lng: 103.7489 },
        { lat: 17.3183, lng: 103.7589 },
        { lat: 17.3083, lng: 103.7489 },
      ],
      color: '#FF8B28',
    },
    {
      id: 'agency2',
      name: 'อบต.หนองกุงทับม้า',
      area: [
        { lat: 17.2983, lng: 103.7389 },
        { lat: 17.3083, lng: 103.7489 },
        { lat: 17.2983, lng: 103.7589 },
      ],
      color: '#4B83E8',
    }
  ]
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeatureSection />
      <HowItWorks />
      <MapPreview />
      <AiFeatures />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ลิงก์ภายนอกที่เกี่ยวข้อง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <LinkChecker 
                  url="https://www.wangsammo.go.th" 
                  label="เว็บไซต์อำเภอวังสามหมอ" 
                  checkInterval={60000} // Check every minute (for demonstration)
                />
                <LinkChecker 
                  url="https://www.udoncity.go.th" 
                  label="เว็บไซต์เทศบาลนครอุดรธานี" 
                  checkInterval={60000}
                />
                <LinkChecker 
                  url="https://www.dla.go.th" 
                  label="กรมส่งเสริมการปกครองท้องถิ่น" 
                  checkInterval={60000}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>การตรวจสอบข้อมูล</CardTitle>
              </CardHeader>
              <CardContent>
                <DataValidator 
                  data={sampleData} 
                  validationRules={sampleValidationRules}
                  label="ข้อมูลพื้นที่รับผิดชอบ"
                  checkInterval={60000} // Check every minute (for demonstration)
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <CallToAction />
    </div>
  );
};

export default Index;
