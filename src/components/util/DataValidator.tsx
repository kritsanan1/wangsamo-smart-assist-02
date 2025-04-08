
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DataValidatorProps {
  data: any;
  validationRules: Array<{
    id: string;
    name: string;
    validate: (data: any) => boolean;
    message: string;
  }>;
  checkInterval?: number; // in milliseconds, default 1 day
  label: string;
}

const DataValidator: React.FC<DataValidatorProps> = ({ 
  data, 
  validationRules, 
  checkInterval = 86400000, // 1 day
  label
}) => {
  const [validationResults, setValidationResults] = useState<Array<{
    id: string;
    name: string;
    isValid: boolean;
    message: string;
  }>>([]);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const validateData = () => {
    setIsChecking(true);
    
    const results = validationRules.map(rule => ({
      id: rule.id,
      name: rule.name,
      isValid: rule.validate(data),
      message: rule.message
    }));
    
    setValidationResults(results);
    setLastChecked(new Date());
    setIsChecking(false);
    
    // If there are any validation failures, show a toast
    const failures = results.filter(r => !r.isValid);
    if (failures.length > 0) {
      toast({
        title: `พบปัญหาในข้อมูล ${label}`,
        description: `${failures.length} รายการไม่ผ่านการตรวจสอบ`,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    validateData();
    
    // Set up periodic checks
    const interval = setInterval(() => {
      validateData();
    }, checkInterval);
    
    return () => clearInterval(interval);
  }, [data, JSON.stringify(validationRules)]);

  const formatLastChecked = () => {
    if (!lastChecked) return 'ไม่เคยตรวจสอบ';
    
    return lastChecked.toLocaleString('th-TH', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
  };

  const isAllValid = validationResults.every(result => result.isValid);
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{label}</h3>
          {isAllValid ? (
            <CheckCircle size={16} className="text-green-500" />
          ) : (
            <AlertTriangle size={16} className="text-red-500" />
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={validateData}
          disabled={isChecking}
        >
          {isChecking ? 'กำลังตรวจสอบ...' : 'ตรวจสอบอีกครั้ง'}
        </Button>
      </div>
      
      {!isAllValid && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            พบข้อมูลที่ไม่ถูกต้อง โปรดตรวจสอบและแก้ไข
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        {validationResults.map((result) => (
          <div key={result.id} className="flex items-start gap-2">
            {result.isValid ? (
              <CheckCircle size={16} className="text-green-500 mt-1" />
            ) : (
              <AlertTriangle size={16} className="text-red-500 mt-1" />
            )}
            <div>
              <p className={`text-sm ${result.isValid ? 'text-gray-700' : 'text-red-500 font-medium'}`}>
                {result.name}
              </p>
              {!result.isValid && (
                <p className="text-xs text-red-400">{result.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
        <Info size={14} />
        <p>ตรวจสอบล่าสุด: {formatLastChecked()}</p>
      </div>
    </div>
  );
};

export default DataValidator;
