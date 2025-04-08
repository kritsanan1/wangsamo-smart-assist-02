
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface TestReportProps {
  isOpen: boolean;
  onClose: () => void;
  test: {
    id: string;
    name: string;
    status: 'passed' | 'failed' | 'pending' | 'in_progress';
    description: string;
    dateRun?: string;
    notes?: string;
    score?: number;
    details?: {
      totalTests?: number;
      passedTests?: number;
      failedTests?: number;
      testDuration?: string;
      testCases?: Array<{
        name: string;
        status: 'passed' | 'failed';
        message?: string;
      }>;
    };
  };
}

const TestReportModal: React.FC<TestReportProps> = ({ isOpen, onClose, test }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-500">ผ่าน</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">ไม่ผ่าน</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">รอดำเนินการ</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">กำลังดำเนินการ</Badge>;
      default:
        return <Badge>ไม่ระบุ</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center">
            {getStatusIcon(test.status)}
            <DialogTitle className="ml-2">{test.name}</DialogTitle>
          </div>
          <DialogDescription>
            {test.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-500">สถานะ</div>
            <div>{getStatusBadge(test.status)}</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-500">วันที่ทดสอบ</div>
            <div className="font-medium">{test.dateRun || 'ไม่ระบุ'}</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-500">คะแนน</div>
            <div className="font-medium">{test.score || 0}%</div>
          </div>
          
          {test.details?.testDuration && (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-500">ระยะเวลาทดสอบ</div>
              <div className="font-medium">{test.details.testDuration}</div>
            </div>
          )}
        </div>
        
        {test.notes && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="text-sm font-medium mb-1">หมายเหตุ</div>
            <div className="text-sm text-red-700">{test.notes}</div>
          </div>
        )}
        
        {test.details?.testCases && test.details.testCases.length > 0 && (
          <>
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">รายละเอียดการทดสอบ</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">ทดสอบทั้งหมด</div>
                  <div className="font-medium text-xl">{test.details.totalTests || test.details.testCases.length}</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">ผ่านการทดสอบ</div>
                  <div className="font-medium text-xl text-green-600">{test.details.passedTests || test.details.testCases.filter(t => t.status === 'passed').length}</div>
                </div>
                
                <div className="p-3 bg-red-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">ไม่ผ่านการทดสอบ</div>
                  <div className="font-medium text-xl text-red-600">{test.details.failedTests || test.details.testCases.filter(t => t.status === 'failed').length}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {test.details.testCases.map((testCase, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {testCase.status === 'passed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span>{testCase.name}</span>
                      </div>
                      {testCase.status === 'passed' ? (
                        <Badge className="bg-green-500">ผ่าน</Badge>
                      ) : (
                        <Badge className="bg-red-500">ไม่ผ่าน</Badge>
                      )}
                    </div>
                    {testCase.message && (
                      <div className="mt-2 text-sm text-red-600">
                        {testCase.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TestReportModal;
