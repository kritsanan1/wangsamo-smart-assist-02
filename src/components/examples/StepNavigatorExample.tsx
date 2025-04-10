
import React, { useState } from "react";
import { StepNavigator } from "@/components/ui/step-navigator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const steps = [
  "กรอกข้อมูลส่วนตัว",
  "อัพโหลดรูปภาพประกอบ",
  "ระบุตำแหน่งบนแผนที่",
  "ยืนยันข้อมูล"
];

export const StepNavigatorExample = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    toast({
      title: "การดำเนินการเสร็จสิ้น",
      description: "ส่งข้อมูลเรียบร้อยแล้ว ขอบคุณสำหรับการใช้บริการ",
    });
  };
  
  return (
    <div className="space-y-8 p-6 border rounded-lg max-w-xl mx-auto">
      <StepNavigator 
        stepNumber={currentStep}
        stepTotal={steps.length}
        stepDescription={steps[currentStep - 1]}
        onComplete={handleComplete}
      />
      
      <div className="space-y-4 mt-8">
        <div className="p-4 border rounded bg-muted/20">
          <p className="text-center text-muted-foreground">
            {currentStep === steps.length ? 
              "พร้อมที่จะยืนยันข้อมูลและส่งแบบฟอร์ม" : 
              `กำลังดำเนินการ: ${steps[currentStep - 1]}`}
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            ย้อนกลับ
          </Button>
          
          {currentStep < steps.length && (
            <Button onClick={handleNext}>
              ถัดไป
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepNavigatorExample;
