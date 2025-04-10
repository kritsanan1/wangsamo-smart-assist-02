
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface StepNavigatorProps {
  stepNumber: number;
  stepTotal: number;
  stepDescription: string;
  onComplete?: () => void;
  className?: string;
}

export const StepNavigator = ({
  stepNumber,
  stepTotal,
  stepDescription,
  onComplete,
  className,
}: StepNavigatorProps) => {
  // Calculate progress percentage
  const progressPercentage = (stepNumber / stepTotal) * 100;
  const isLastStep = stepNumber === stepTotal;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Circular progress indicator */}
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="absolute">
            <Progress 
              value={progressPercentage} 
              className="h-12 w-12 rounded-full [transform:rotate(-90deg)]" 
            />
          </div>
          <span className="z-10 text-sm font-medium">
            {stepNumber}/{stepTotal}
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">
            ขั้นตอนที่ {stepNumber} จาก {stepTotal}
          </p>
          {isLastStep && (
            <Button 
              onClick={onComplete} 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Check className="h-4 w-4" />
              เสร็จสิ้น
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">{stepDescription}</p>
      </div>
    </div>
  );
};
