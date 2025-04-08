
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import LinkChecker from "@/components/util/LinkChecker";

// Define agency data structure
interface Agency {
  id: string;
  name: string;
  type: 'electricity' | 'water' | 'local';
  address: string;
  phone: string;
  email: string;
  website?: string;
  operatingHours?: string;
}

// Define sub-district data structure
interface SubDistrict {
  id: string;
  name: string;
  agencies: Agency[];
}

// Mock data for the 6 sub-districts and their agencies
const subDistricts: SubDistrict[] = [
  {
    id: "wangsammo",
    name: "ตำบลวังสามหมอ",
    agencies: [
      {
        id: "wm-local-1",
        name: "เทศบาลตำบลวังสามหมอ",
        type: "local",
        address: "123 หมู่ 1 ต.วังสามหมอ อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-387105",
        email: "info@wangsammo.go.th",
        website: "https://www.wangsammo.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      },
      {
        id: "wm-electricity-1",
        name: "การไฟฟ้าส่วนภูมิภาคสาขาวังสามหมอ",
        type: "electricity",
        address: "456 หมู่ 2 ต.วังสามหมอ อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-387111",
        email: "pea-wangsammo@pea.co.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      },
      {
        id: "wm-water-1",
        name: "การประปาส่วนภูมิภาคสาขาวังสามหมอ",
        type: "water",
        address: "789 หมู่ 3 ต.วังสามหมอ อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-387222",
        email: "pwa-wangsammo@pwa.co.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  },
  {
    id: "nongkungtubma",
    name: "ตำบลหนองกุงทับม้า",
    agencies: [
      {
        id: "nk-local-1",
        name: "องค์การบริหารส่วนตำบลหนองกุงทับม้า",
        type: "local",
        address: "123 หมู่ 1 ต.หนองกุงทับม้า อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-219065",
        email: "info@nongkungtubma.go.th",
        website: "https://www.nongkungtubma.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  },
  {
    id: "banmai",
    name: "ตำบลบ้านใหม่",
    agencies: [
      {
        id: "bm-local-1",
        name: "องค์การบริหารส่วนตำบลบ้านใหม่",
        type: "local",
        address: "123 หมู่ 1 ต.บ้านใหม่ อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-219066",
        email: "info@banmai.go.th",
        website: "https://www.banmai.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  },
  {
    id: "namsom",
    name: "ตำบลน้ำซึม",
    agencies: [
      {
        id: "ns-local-1",
        name: "องค์การบริหารส่วนตำบลน้ำซึม",
        type: "local",
        address: "123 หมู่ 1 ต.น้ำซึม อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-219067",
        email: "info@namsom.go.th",
        website: "https://www.namsom.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  },
  {
    id: "phasuk",
    name: "ตำบลผาสุก",
    agencies: [
      {
        id: "ps-local-1",
        name: "องค์การบริหารส่วนตำบลผาสุก",
        type: "local",
        address: "123 หมู่ 1 ต.ผาสุก อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-219068",
        email: "info@phasuk.go.th",
        website: "https://www.phasuk.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  },
  {
    id: "klangyen",
    name: "ตำบลคำโคกสูง",
    agencies: [
      {
        id: "kk-local-1",
        name: "องค์การบริหารส่วนตำบลคำโคกสูง",
        type: "local",
        address: "123 หมู่ 1 ต.คำโคกสูง อ.วังสามหมอ จ.อุดรธานี 41280",
        phone: "042-219069",
        email: "info@kamkoksong.go.th",
        website: "https://www.kamkoksong.go.th",
        operatingHours: "จันทร์-ศุกร์ 08:30-16:30 น."
      }
    ]
  }
];

const Contact = () => {
  const [activeTab, setActiveTab] = useState(subDistricts[0].id);

  // Get agencies for the active tab
  const activeSubDistrict = subDistricts.find(sd => sd.id === activeTab);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">ติดต่อหน่วยงาน</h1>
          <p className="text-gray-600">
            ข้อมูลติดต่อหน่วยงานต่างๆ ในพื้นที่อำเภอวังสามหมอ
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="flex flex-wrap gap-2">
            {subDistricts.map((subDistrict) => (
              <TabsTrigger 
                key={subDistrict.id} 
                value={subDistrict.id}
                className="data-[state=active]:bg-wangsammo-orange data-[state=active]:text-white"
              >
                {subDistrict.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {subDistricts.map((subDistrict) => (
            <TabsContent key={subDistrict.id} value={subDistrict.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subDistrict.agencies.map((agency) => (
                  <Card key={agency.id} className="overflow-hidden">
                    <div className={`h-2 ${
                      agency.type === 'local' ? 'bg-wangsammo-orange' : 
                      agency.type === 'electricity' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{agency.name}</CardTitle>
                          <CardDescription>
                            {agency.type === 'local' ? 'หน่วยงานท้องถิ่น' : 
                            agency.type === 'electricity' ? 'หน่วยงานไฟฟ้า' : 'หน่วยงานประปา'}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin size={18} className="text-gray-500 mt-1 min-w-[18px]" />
                        <span>{agency.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-gray-500 min-w-[18px]" />
                        <span>{agency.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-gray-500 min-w-[18px]" />
                        <span>{agency.email}</span>
                      </div>
                      {agency.website && (
                        <div className="flex items-center gap-2">
                          <Globe size={18} className="text-gray-500 min-w-[18px]" />
                          <LinkChecker url={agency.website} label={agency.website.replace("https://www.", "")} />
                        </div>
                      )}
                      {agency.operatingHours && (
                        <div className="mt-2 text-sm text-gray-500">
                          <strong>เวลาทำการ:</strong> {agency.operatingHours}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`tel:${agency.phone}`}>โทร {agency.phone}</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Contact;
