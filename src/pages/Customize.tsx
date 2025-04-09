
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const Customize = () => {
  const { toast } = useToast();
  const [progress, setProgress] = React.useState(33);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = () => {
    toast({
      title: "การแจ้งเตือน",
      description: "นี่คือตัวอย่างการแจ้งเตือน",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">ตัวอย่างคอมโพเนนต์ที่สามารถปรับแต่งได้</h1>
        <p className="text-muted-foreground">
          เลือกคอมโพเนนต์และปรับแต่งตามต้องการด้วยตัวปรับแต่งธีมและเลย์เอาต์
        </p>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="components">คอมโพเนนต์</TabsTrigger>
          <TabsTrigger value="forms">ฟอร์ม</TabsTrigger>
          <TabsTrigger value="feedback">การแสดงผล</TabsTrigger>
        </TabsList>
        
        <TabsContent value="components" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ปุ่มและการทำงาน</CardTitle>
                <CardDescription>ตัวอย่างปุ่มรูปแบบต่างๆ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>ปุ่มหลัก</Button>
                  <Button variant="secondary">ปุ่มรอง</Button>
                  <Button variant="destructive">ลบ</Button>
                  <Button variant="outline">เค้าร่าง</Button>
                  <Button variant="ghost">โปร่งใส</Button>
                  <Button variant="link">ลิงก์</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>แบดจ์และตัวแสดงสถานะ</CardTitle>
                <CardDescription>ตัวอย่างแบดจ์รูปแบบต่างๆ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>แบดจ์ปกติ</Badge>
                  <Badge variant="secondary">แบดจ์รอง</Badge>
                  <Badge variant="destructive">แบดจ์อันตราย</Badge>
                  <Badge variant="outline">แบดจ์เค้าร่าง</Badge>
                </div>
                <div className="space-y-2">
                  <Label>ความคืบหน้า</Label>
                  <Progress value={progress} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ตัวอย่างแบบฟอร์ม</CardTitle>
              <CardDescription>ตัวอย่างอินพุตสำหรับแบบฟอร์ม</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">ชื่อ</Label>
                <Input id="name" placeholder="ใส่ชื่อของคุณ" />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">อีเมล</Label>
                <Input id="email" type="email" placeholder="example@email.com" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="terms" />
                <Label htmlFor="terms">ยอมรับข้อตกลงและเงื่อนไข</Label>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="slider">การตั้งค่าสไลเดอร์</Label>
                  <span className="text-muted-foreground">{50}%</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>ส่งข้อมูล</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>การแจ้งเตือนและข้อความ</CardTitle>
              <CardDescription>ตัวอย่างการแจ้งเตือนและข้อความต่างๆ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={showToast}>แสดงการแจ้งเตือน</Button>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">ตัวอย่างข้อความ</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p>นี่เป็นตัวอย่างข้อความที่อาจแสดงในแอพพลิเคชัน</p>
                </div>
                <div className="bg-green-500/10 text-green-600 p-4 rounded-md">
                  <p>การดำเนินการสำเร็จ!</p>
                </div>
                <div className="bg-red-500/10 text-red-600 p-4 rounded-md">
                  <p>เกิดข้อผิดพลาด กรุณาลองอีกครั้ง</p>
                </div>
                <div className="bg-yellow-500/10 text-yellow-600 p-4 rounded-md">
                  <p>คำเตือน: การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-muted-foreground text-sm">
        <p>คุณสามารถปรับแต่งเว็บไซต์ได้ด้วยตัวปรับแต่งธีมและเลย์เอาต์ที่มุมล่างของหน้าจอ</p>
      </div>
    </div>
  );
};

export default Customize;
