
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { LayoutGrid, Columns, MonitorSmartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the layout types
type LayoutType = "standard" | "wide" | "compact";
type SidebarPosition = "left" | "right";

interface LayoutSettings {
  type: LayoutType;
  contentWidth: "container" | "full";
  sidebarVisible: boolean;
  sidebarPosition: SidebarPosition;
  responsiveLayout: boolean;
}

const LayoutCustomizer = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<LayoutSettings>({
    type: "standard",
    contentWidth: "container",
    sidebarVisible: false,
    sidebarPosition: "left",
    responsiveLayout: true,
  });

  const handleChange = (key: keyof LayoutSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Show a toast notification
    toast({
      title: "การตั้งค่าถูกเปลี่ยนแปลง",
      description: "เลย์เอาต์ของเว็บไซต์ถูกอัพเดตแล้ว",
    });

    // In a real application, we would apply these settings to the actual layout
    // For now, we'll just log them
    console.log("Layout settings updated:", { ...settings, [key]: value });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-50">
          <LayoutGrid />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Card>
          <CardHeader>
            <CardTitle>ปรับแต่งเลย์เอาต์</CardTitle>
            <CardDescription>
              ปรับแต่งรูปแบบการแสดงผลของเว็บไซต์
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>รูปแบบเลย์เอาต์</Label>
              <RadioGroup
                value={settings.type}
                onValueChange={(value) => handleChange("type", value)}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">มาตรฐาน</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wide" id="wide" />
                  <Label htmlFor="wide">กว้าง</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">กระชับ</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>ความกว้างของเนื้อหา</Label>
              <RadioGroup
                value={settings.contentWidth}
                onValueChange={(value) => handleChange("contentWidth", value as "container" | "full")}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="container" id="container" />
                  <Label htmlFor="container">ปกติ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">เต็มจอ</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sidebar">แสดงไซด์บาร์</Label>
                <div className="text-xs text-muted-foreground">
                  แสดงแถบด้านข้างสำหรับการนำทาง
                </div>
              </div>
              <Switch
                id="sidebar"
                checked={settings.sidebarVisible}
                onCheckedChange={(value) => handleChange("sidebarVisible", value)}
              />
            </div>

            {settings.sidebarVisible && (
              <div className="space-y-2">
                <Label>ตำแหน่งไซด์บาร์</Label>
                <RadioGroup
                  value={settings.sidebarPosition}
                  onValueChange={(value) => handleChange("sidebarPosition", value as SidebarPosition)}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="left" />
                    <Label htmlFor="left">ซ้าย</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="right" />
                    <Label htmlFor="right">ขวา</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <MonitorSmartphone className="h-4 w-4" />
                  <Label htmlFor="responsive">เว็บไซต์ตอบสนอง</Label>
                </div>
                <div className="text-xs text-muted-foreground">
                  ปรับขนาดอัตโนมัติสำหรับอุปกรณ์มือถือ
                </div>
              </div>
              <Switch
                id="responsive"
                checked={settings.responsiveLayout}
                onCheckedChange={(value) => handleChange("responsiveLayout", value)}
              />
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default LayoutCustomizer;
