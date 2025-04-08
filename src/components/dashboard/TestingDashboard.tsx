
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileSearch,
  Brain,
  Gauge,
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'in_progress';
  description: string;
  dateRun?: string;
  notes?: string;
  score?: number;
}

interface TestCategory {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
}

const TestingDashboard = () => {
  // Sample data for demonstration purposes
  const [testCategories, setTestCategories] = useState<TestCategory[]>([
    {
      id: 'functional',
      name: 'ทดสอบฟังก์ชันการทำงาน',
      description: 'การทดสอบฟังก์ชันหลักของระบบ',
      testCases: [
        { id: 'func1', name: 'การเข้าถึงเว็บไซต์', status: 'passed', description: 'ทดสอบการเข้าถึงหน้าหลักและหน้าอื่นๆ', dateRun: '8 เม.ย. 2568', score: 100 },
        { id: 'func2', name: 'ฟอร์มการร้องเรียน', status: 'passed', description: 'ทดสอบการส่งข้อมูลผ่านฟอร์มร้องเรียน', dateRun: '8 เม.ย. 2568', score: 95 },
        { id: 'func3', name: 'ระบบติดตามสถานะ', status: 'in_progress', description: 'ทดสอบการติดตามสถานะเรื่องร้องเรียนและการแจ้งเตือน', dateRun: '8 เม.ย. 2568', score: 75 },
        { id: 'func4', name: 'การแสดงแผนที่', status: 'passed', description: 'ทดสอบการแสดงแผนที่และข้อมูลพื้นที่รับผิดชอบ', dateRun: '8 เม.ย. 2568', score: 90 },
        { id: 'func5', name: 'ช่องทางติดต่อหน่วยงาน', status: 'passed', description: 'ทดสอบการแสดงข้อมูลติดต่อหน่วยงาน', dateRun: '8 เม.ย. 2568', score: 100 },
        { id: 'func6', name: 'การตรวจสอบลิงก์ภายนอก', status: 'failed', description: 'ทดสอบระบบตรวจสอบลิงก์และแจ้งเตือน', dateRun: '8 เม.ย. 2568', notes: 'พบลิงก์เสียบางส่วนในหน้าติดต่อหน่วยงาน', score: 60 },
      ]
    },
    {
      id: 'ai',
      name: 'ทดสอบระบบ AI',
      description: 'การทดสอบความแม่นยำและประสิทธิภาพของระบบ AI',
      testCases: [
        { id: 'ai1', name: 'ระบบคัดกรองและจัดหมวดหมู่', status: 'passed', description: 'ทดสอบความแม่นยำในการจัดหมวดหมู่เรื่องร้องเรียน', dateRun: '8 เม.ย. 2568', score: 92 },
        { id: 'ai2', name: 'ระบบวิเคราะห์ความรู้สึก', status: 'in_progress', description: 'ทดสอบการวิเคราะห์ความรู้สึกและระดับความเร่งด่วน', dateRun: '8 เม.ย. 2568', score: 85 },
        { id: 'ai3', name: 'ระบบตอบคำถามเบื้องต้น (Chatbot)', status: 'passed', description: 'ทดสอบระบบ Chatbot ในการตอบคำถามพื้นฐาน', dateRun: '8 เม.ย. 2568', score: 88 },
        { id: 'ai4', name: 'ระบบวิเคราะห์ภาพ/วิดีโอ', status: 'pending', description: 'ทดสอบการวิเคราะห์ภาพและวิดีโอจากผู้ใช้งาน', dateRun: '7 เม.ย. 2568', notes: 'อยู่ในระหว่างการพัฒนา', score: 0 },
        { id: 'ai5', name: 'ระบบแจ้งเตือนอัจฉริยะ', status: 'in_progress', description: 'ทดสอบการแจ้งเตือนอัตโนมัติตามความเร่งด่วน', dateRun: '8 เม.ย. 2568', score: 70 },
      ]
    },
    {
      id: 'non_functional',
      name: 'ทดสอบที่ไม่ใช่ฟังก์ชัน',
      description: 'การทดสอบด้านประสิทธิภาพ ความปลอดภัย และการเข้าถึง',
      testCases: [
        { id: 'nft1', name: 'ความเร็วในการโหลดหน้าเว็บ', status: 'passed', description: 'ทดสอบความเร็วในการโหลดหน้าเว็บ', dateRun: '8 เม.ย. 2568', score: 85 },
        { id: 'nft2', name: 'ความเข้ากันได้กับเบราว์เซอร์', status: 'passed', description: 'ทดสอบความเข้ากันได้กับเบราว์เซอร์ต่างๆ', dateRun: '8 เม.ย. 2568', score: 95 },
        { id: 'nft3', name: 'การตอบสนองบนอุปกรณ์มือถือ', status: 'passed', description: 'ทดสอบการแสดงผลและใช้งานบนอุปกรณ์มือถือ', dateRun: '8 เม.ย. 2568', score: 90 },
        { id: 'nft4', name: 'ความปลอดภัยของข้อมูล', status: 'in_progress', description: 'ทดสอบการป้องกันการเข้าถึงข้อมูลส่วนบุคคล', dateRun: '8 เม.ย. 2568', score: 80 },
        { id: 'nft5', name: 'การเข้าถึงสำหรับผู้พิการ (Accessibility)', status: 'failed', description: 'ทดสอบการใช้งานสำหรับผู้พิการทางสายตา', dateRun: '8 เม.ย. 2568', notes: 'ต้องปรับปรุงการอ่านหน้าจอและคอนทราสต์', score: 65 },
      ]
    },
  ]);

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

  const calculateCategoryScore = (testCases: TestCase[]) => {
    const totalCases = testCases.length;
    if (totalCases === 0) return 0;
    
    const completedCases = testCases.filter(test => test.status !== 'pending');
    if (completedCases.length === 0) return 0;
    
    const totalScore = completedCases.reduce((sum, test) => sum + (test.score || 0), 0);
    return Math.round(totalScore / completedCases.length);
  };

  const getTotalTestsStatus = () => {
    const allTests = testCategories.flatMap(category => category.testCases);
    const total = allTests.length;
    const passed = allTests.filter(test => test.status === 'passed').length;
    const failed = allTests.filter(test => test.status === 'failed').length;
    const inProgress = allTests.filter(test => test.status === 'in_progress').length;
    const pending = allTests.filter(test => test.status === 'pending').length;
    
    return { total, passed, failed, inProgress, pending };
  };

  const statusSummary = getTotalTestsStatus();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileSearch className="h-4 w-4 mr-2" />
              การทดสอบทั้งหมด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusSummary.total}</div>
            <div className="text-xs text-muted-foreground">จำนวนการทดสอบทั้งหมด</div>
            <div className="grid grid-cols-4 gap-1 mt-2">
              <div className="h-1 bg-green-500" style={{width: `${(statusSummary.passed/statusSummary.total)*100}%`}}></div>
              <div className="h-1 bg-red-500" style={{width: `${(statusSummary.failed/statusSummary.total)*100}%`}}></div>
              <div className="h-1 bg-blue-500" style={{width: `${(statusSummary.inProgress/statusSummary.total)*100}%`}}></div>
              <div className="h-1 bg-yellow-500" style={{width: `${(statusSummary.pending/statusSummary.total)*100}%`}}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              ผ่านการทดสอบ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusSummary.passed}</div>
            <Progress className="h-2 mt-2" value={(statusSummary.passed / statusSummary.total) * 100} />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((statusSummary.passed / statusSummary.total) * 100)}% ของการทดสอบทั้งหมด
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
              กำลังดำเนินการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusSummary.inProgress + statusSummary.pending}</div>
            <Progress className="h-2 mt-2" value={((statusSummary.inProgress + statusSummary.pending) / statusSummary.total) * 100} />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(((statusSummary.inProgress + statusSummary.pending) / statusSummary.total) * 100)}% ของการทดสอบทั้งหมด
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Gauge className="h-4 w-4 mr-2 text-wangsammo-orange" />
              คะแนนเฉลี่ย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(testCategories.reduce((sum, category) => 
                sum + calculateCategoryScore(category.testCases), 0) / testCategories.length)}%
            </div>
            <Progress 
              className="h-2 mt-2" 
              value={Math.round(testCategories.reduce((sum, category) => 
                sum + calculateCategoryScore(category.testCases), 0) / testCategories.length)} 
            />
            <div className="text-xs text-muted-foreground mt-1">คะแนนประสิทธิภาพโดยรวม</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="functional" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="functional">
            <FileSearch className="h-4 w-4 mr-2" />
            ทดสอบฟังก์ชันการทำงาน
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Brain className="h-4 w-4 mr-2" />
            ทดสอบระบบ AI
          </TabsTrigger>
          <TabsTrigger value="non_functional">
            <Gauge className="h-4 w-4 mr-2" />
            ทดสอบที่ไม่ใช่ฟังก์ชัน
          </TabsTrigger>
        </TabsList>
        
        {testCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-sm">คะแนนเฉลี่ย:</div>
                <div className="font-bold text-lg">{calculateCategoryScore(category.testCases)}%</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              {category.testCases.map((test) => (
                <div key={test.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3 bg-gray-50 rounded-md">
                  <div className="md:col-span-6">
                    <div className="flex items-center">
                      {getStatusIcon(test.status)}
                      <span className="font-medium ml-2">{test.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{test.description}</p>
                    {test.notes && (
                      <p className="text-sm text-red-500 mt-1">{test.notes}</p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex items-center">
                    {getStatusBadge(test.status)}
                  </div>
                  <div className="md:col-span-2 flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    {test.dateRun || 'ไม่ระบุ'}
                  </div>
                  <div className="md:col-span-2">
                    {test.status !== 'pending' && (
                      <div className="flex flex-col items-end">
                        <span className="font-bold">{test.score}%</span>
                        <Progress 
                          className="h-2 w-full mt-1" 
                          value={test.score || 0} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TestingDashboard;
