
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ReportsByCategory from "@/components/dashboard/ReportsByCategory";
import RecentReports from "@/components/dashboard/RecentReports";
import TestingDashboard from "@/components/dashboard/TestingDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, TestTube } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ด</h1>
        <p className="text-gray-600">ข้อมูลเชิงลึกเกี่ยวกับเรื่องร้องเรียนในพื้นที่อำเภอวังสามหมอ</p>
      </div>
      
      <Tabs defaultValue="reports">
        <TabsList className="mb-6">
          <TabsTrigger value="reports" className="flex items-center">
            <FileBarChart className="h-4 w-4 mr-2" />
            รายงานเรื่องร้องเรียน
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center">
            <TestTube className="h-4 w-4 mr-2" />
            การทดสอบและประเมินผล
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports">
          <div className="mb-8">
            <DashboardSummary />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <ReportsByCategory />
            </div>
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">เรื่องร้องเรียนล่าสุด</h2>
                <RecentReports />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="testing">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">การทดสอบและประเมินผล AI</h2>
            <TestingDashboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
