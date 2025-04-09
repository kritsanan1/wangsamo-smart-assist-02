
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Settings, Check } from "lucide-react";

export const ThemeCustomizer = () => {
  const {
    themeName,
    setThemeName,
    customTheme,
    updateCustomTheme,
    applyCustomTheme
  } = useTheme();

  const fontOptions = [
    { value: "Sarabun", label: "Sarabun (ปกติ)" },
    { value: "sans", label: "Sans Serif" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Monospace" },
  ];

  const borderOptions = [
    { value: "rounded-none", label: "เหลี่ยม" },
    { value: "rounded-sm", label: "มนนิดหน่อย" },
    { value: "rounded-md", label: "มนปานกลาง" },
    { value: "rounded-lg", label: "มนมาก" },
    { value: "rounded-xl", label: "มนมากที่สุด" },
    { value: "rounded-full", label: "วงกลม" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card>
          <CardHeader>
            <CardTitle>ปรับแต่งธีม</CardTitle>
            <CardDescription>
              ปรับแต่งหน้าตาของเว็บไซต์ตามต้องการ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ธีม</Label>
              <Select
                value={themeName}
                onValueChange={(value) => setThemeName(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกธีม" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">ปกติ (วังสามหมอ)</SelectItem>
                  <SelectItem value="minimal">เรียบง่าย</SelectItem>
                  <SelectItem value="vibrant">สีสันสดใส</SelectItem>
                  <SelectItem value="professional">มืออาชีพ</SelectItem>
                  {themeName === "custom" && (
                    <SelectItem value="custom">กำหนดเอง</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ฟอนต์</Label>
                <Select
                  value={customTheme.fontFamily}
                  onValueChange={(value) =>
                    updateCustomTheme({ fontFamily: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกฟอนต์" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ความมนของขอบ</Label>
                <Select
                  value={customTheme.borderRadius}
                  onValueChange={(value) =>
                    updateCustomTheme({ borderRadius: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกความมนของขอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    {borderOptions.map((border) => (
                      <SelectItem key={border.value} value={border.value}>
                        {border.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full"
                onClick={applyCustomTheme}
                disabled={themeName === "custom"}
              >
                <Check className="mr-2 h-4 w-4" /> ใช้การตั้งค่านี้
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;
