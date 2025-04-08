
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AiFeatures = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-wangsammo-dark to-wangsammo-blue text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">ความสามารถของระบบ AI</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-white/80">
          Smart Wangsammo ใช้เทคโนโลยี AI ที่ทันสมัยเพื่อจัดการเรื่องร้องเรียนได้อย่างมีประสิทธิภาพ
        </p>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="categorize" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/10 mb-8">
              <TabsTrigger value="categorize">การจัดหมวดหมู่</TabsTrigger>
              <TabsTrigger value="analysis">การวิเคราะห์</TabsTrigger>
              <TabsTrigger value="chatbot">ระบบตอบอัตโนมัติ</TabsTrigger>
              <TabsTrigger value="dashboard">แดชบอร์ดอัจฉริยะ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categorize" className="bg-white/5 p-6 rounded-lg animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">ระบบคัดกรองและจัดหมวดหมู่เรื่องร้องเรียนอัจฉริยะ</h3>
                  <p className="mb-4">
                    AI จะวิเคราะห์เนื้อหา ข้อความ รูปภาพ และวิดีโอที่ผู้ใช้งานส่งเข้ามา เพื่อจัดหมวดหมู่เรื่องร้องเรียนได้อย่างอัตโนมัติและแม่นยำ
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>จัดหมวดหมู่เรื่องร้องเรียนได้อย่างแม่นยำ</li>
                    <li>แยกประเภทปัญหาตามความเร่งด่วน</li>
                    <li>ส่งต่อเรื่องไปยังหน่วยงานที่เกี่ยวข้องโดยอัตโนมัติ</li>
                    <li>ลดขั้นตอนการคัดกรองด้วยมนุษย์</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-wangsammo-dark/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">ตัวอย่างการจัดหมวดหมู่</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">ถนนชำรุด</span>
                          <span className="text-wangsammo-orange">92%</span>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full mt-1">
                          <div className="bg-wangsammo-orange h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">ไฟฟ้าสาธารณะ</span>
                          <span className="text-wangsammo-orange">85%</span>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full mt-1">
                          <div className="bg-wangsammo-orange h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">ขยะ/ความสะอาด</span>
                          <span className="text-wangsammo-orange">78%</span>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full mt-1">
                          <div className="bg-wangsammo-orange h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="bg-white/5 p-6 rounded-lg animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">ระบบวิเคราะห์ความรู้สึกและระดับความรุนแรง</h3>
                  <p className="mb-4">
                    AI จะวิเคราะห์โทนของข้อความ ลักษณะของปัญหา และประเมินความรู้สึกของผู้ร้องเรียน เพื่อระบุระดับความเร่งด่วนของปัญหา
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>แยกแยะความรู้สึก (โกรธ กังวล เร่งด่วน)</li>
                    <li>ประเมินระดับความรุนแรงของปัญหา</li>
                    <li>จัดลำดับความสำคัญของการแก้ไขปัญหา</li>
                    <li>วิเคราะห์ผลกระทบต่อประชาชนในวงกว้าง</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-wangsammo-dark/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">ตัวอย่างการวิเคราะห์</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 p-3 rounded-md">
                        <p className="mb-2">"น้ำท่วมถนนบริเวณหน้าตลาดสด ประชาชนเดือดร้อนมาก ไม่สามารถสัญจรได้"</p>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 rounded bg-red-500 text-white text-xs">เร่งด่วนสูง</span>
                          <span className="px-2 py-1 rounded bg-yellow-500 text-white text-xs">ความรู้สึก: กังวล</span>
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md">
                        <p className="mb-2">"ไฟฟ้าสาธารณะดับที่ซอย 3 อยากให้มาซ่อมเมื่อสะดวก"</p>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 rounded bg-blue-500 text-white text-xs">ปานกลาง</span>
                          <span className="px-2 py-1 rounded bg-green-500 text-white text-xs">ความรู้สึก: เป็นกลาง</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chatbot" className="bg-white/5 p-6 rounded-lg animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">ระบบตอบคำถามเบื้องต้นอัตโนมัติ</h3>
                  <p className="mb-4">
                    ผสานการทำงานร่วมกับ Chatbot บนเว็บไซต์และ Line ที่สามารถตอบคำถามเกี่ยวกับการร้องเรียน ขั้นตอนการดำเนินการ และข้อมูลติดต่อของหน่วยงานได้ทันที
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ตอบคำถามที่พบบ่อยได้ทันที</li>
                    <li>ให้คำแนะนำเกี่ยวกับขั้นตอนการร้องเรียน</li>
                    <li>แจ้งข้อมูลติดต่อของหน่วยงานต่างๆ</li>
                    <li>ให้บริการตลอด 24 ชั่วโมง</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-wangsammo-dark/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">ตัวอย่างการสนทนา</h4>
                    <div className="space-y-3">
                      <div className="bg-white/10 p-3 rounded-md">
                        <p className="text-gray-300 text-sm mb-2">คำถาม:</p>
                        <p className="mb-2">ฉันจะแจ้งเรื่องถนนชำรุดได้อย่างไร?</p>
                      </div>
                      <div className="bg-wangsammo-orange/20 p-3 rounded-md">
                        <p className="text-gray-300 text-sm mb-2">Chatbot:</p>
                        <p className="mb-2">
                          คุณสามารถแจ้งเรื่องถนนชำรุดได้โดยคลิกที่ปุ่ม "แจ้งเหตุ" บนเว็บไซต์ หรือเลือกหมวดหมู่ "โครงสร้างพื้นฐาน" แล้วกรอกรายละเอียดพร้อมแนบรูปภาพเพื่อให้เห็นสภาพความเสียหาย และระบุตำแหน่งที่เกิดเหตุ หลังจากนั้นระบบจะส่งเรื่องไปยังกองช่างของ อบต.ที่รับผิดชอบพื้นที่ดังกล่าวโดยอัตโนมัติ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="bg-white/5 p-6 rounded-lg animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">แดชบอร์ดวิเคราะห์ข้อมูลเชิงลึกด้วย AI</h3>
                  <p className="mb-4">
                    AI จะวิเคราะห์ข้อมูลการร้องเรียนที่สะสมในระบบ เพื่อระบุแนวโน้มของปัญหา พื้นที่ที่มีปัญหาซ้ำซาก และช่วงเวลาที่มีการร้องเรียนมากที่สุด
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>แสดงแนวโน้มและสถิติเรื่องร้องเรียน</li>
                    <li>ระบุพื้นที่ที่มีปัญหาบ่อยด้วยแผนที่ความร้อน</li>
                    <li>แสดงประเภทของปัญหาที่พบบ่อย</li>
                    <li>วิเคราะห์ช่วงเวลาที่มีการร้องเรียนสูง</li>
                    <li>เปรียบเทียบข้อมูลแบบเรียลไทม์</li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-wangsammo-dark/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">ตัวอย่างแดชบอร์ด</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 p-3 rounded-md">
                        <h5 className="text-sm font-medium mb-1">จำนวนเรื่องร้องเรียนรายเดือน</h5>
                        <div className="h-20 flex items-end gap-1">
                          <div className="bg-wangsammo-orange h-1/3 w-full rounded-t"></div>
                          <div className="bg-wangsammo-orange h-2/3 w-full rounded-t"></div>
                          <div className="bg-wangsammo-orange h-1/2 w-full rounded-t"></div>
                          <div className="bg-wangsammo-orange h-5/6 w-full rounded-t"></div>
                          <div className="bg-wangsammo-orange h-full w-full rounded-t"></div>
                          <div className="bg-wangsammo-orange h-3/4 w-full rounded-t"></div>
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md">
                        <h5 className="text-sm font-medium mb-1">พื้นที่ที่มีปัญหาบ่อย</h5>
                        <div className="h-20 flex items-center justify-center">
                          <div className="bg-wangsammo-dark w-16 h-16 rounded-full flex items-center justify-center">
                            <div className="bg-wangsammo-orange w-12 h-12 rounded-full opacity-70"></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-md col-span-2">
                        <h5 className="text-sm font-medium mb-1">ประเภทเรื่องร้องเรียน</h5>
                        <div className="flex gap-1">
                          <div className="h-2 bg-wangsammo-orange flex-grow"></div>
                          <div className="h-2 bg-wangsammo-teal flex-grow"></div>
                          <div className="h-2 bg-wangsammo-blue flex-grow"></div>
                          <div className="h-2 bg-red-500 flex-grow"></div>
                          <div className="h-2 bg-green-500 flex-grow"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>ถนน</span>
                          <span>ไฟฟ้า</span>
                          <span>น้ำ</span>
                          <span>ขยะ</span>
                          <span>อื่นๆ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AiFeatures;
