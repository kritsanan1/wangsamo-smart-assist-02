
import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface LinkCheckerProps {
  url: string;
  label: string;
  checkInterval?: number; // in milliseconds, default 1 hour
}

const LinkChecker: React.FC<LinkCheckerProps> = ({ 
  url, 
  label, 
  checkInterval = 3600000 
}) => {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkLink = async () => {
    setStatus('loading');
    try {
      // In a real application, you would use a backend proxy to check the link
      // to avoid CORS issues. Here we're simulating a successful response most of the time
      // with occasional failures for demonstration
      
      // Simulated check (for demo purposes)
      const random = Math.random();
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network delay
      
      if (random > 0.9) { // 10% chance of failure for demo
        setStatus('invalid');
        toast({
          title: "พบลิงก์เสีย",
          description: `ลิงก์ ${label} ไม่สามารถเข้าถึงได้`,
          variant: "destructive"
        });
      } else {
        setStatus('valid');
      }
      
      setLastChecked(new Date());
    } catch (error) {
      setStatus('invalid');
      toast({
        title: "พบลิงก์เสีย",
        description: `ลิงก์ ${label} ไม่สามารถเข้าถึงได้`,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    checkLink();
    
    // Set up periodic checks
    const interval = setInterval(() => {
      checkLink();
    }, checkInterval);
    
    return () => clearInterval(interval);
  }, [url, checkInterval]);

  const formatLastChecked = () => {
    if (!lastChecked) return 'ไม่เคยตรวจสอบ';
    
    // Format date to Thai locale
    return lastChecked.toLocaleString('th-TH', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          {label} <ExternalLink size={14} />
        </a>
        
        {status === 'loading' && (
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin" />
        )}
        
        {status === 'valid' && (
          <CheckCircle size={16} className="text-green-500" />
        )}
        
        {status === 'invalid' && (
          <AlertTriangle size={16} className="text-red-500" />
        )}
      </div>
      
      {status === 'invalid' && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>
            ไม่สามารถเข้าถึงลิงก์นี้ได้ กรุณาตรวจสอบหรือแจ้งผู้ดูแลระบบ
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-xs text-gray-500 mt-1">
        ตรวจสอบล่าสุด: {formatLastChecked()}
      </p>
    </div>
  );
};

export default LinkChecker;
