import React, { useState } from "react";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import ReportsByCategory from "@/components/dashboard/ReportsByCategory";
import RecentReports from "@/components/dashboard/RecentReports";
import TestingDashboard from "@/components/dashboard/TestingDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import FanPagePostUpdate from "@/components/social/FanPagePostUpdate";
import AIChatbot from "@/components/chat/AIChatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, TestTube, User, MessageSquare, UserCircle, LayoutDashboard } from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import StepNavigatorExample from "@/components/examples/StepNavigatorExample";

// Sample user data
const sampleUser = {
  name: "วรชัย สมิทธิไกร",
  avatar: "/placeholder.svg",
  stats: {
    reports: 12,
    resolved: 8,
    pending: 4,
  }
};

// Sample navigation links
const navLinks = [
  { text: "หน้าหลัก", href: "/" },
  { text: "แจ้งเรื่อง", href: "/report" },
  { text: "ติดตามเรื่อง", href: "/track" },
  { text: "แผนที่", href: "/map" },
  { text: "ติดต่อหน่วยงาน", href: "/contact" },
  { text: "แดชบอร์ด", href: "/dashboard" },
  { text: "เกี่ยวกับเรา", href: "/about" },
  { text: "ปรับแต่ง", href: "/customize" },
];

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    // Simulate login process
    setIsLoggedIn(true);
  };

  return (
    <div>
      <NavBar 
        links={navLinks} 
        user={isLoggedIn ? sampleUser : undefined}
        login={{ onLogin: handleLogin }}
      />
      
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">แดชบอร์ด</h1>
          <p className="text-gray-600">ข้อมูลเชิงลึกเกี่ยวกับเรื่องร้องเรียนในพื้นที่อำเภอวังสามหมอ</p>
        </div>
        
        {isLoggedIn && (
          <div className="mb-8">
            <UserDashboard userData={sampleUser} />
          </div>
        )}
        
        <Tabs defaultValue="reports">
          <TabsList className="mb-6">
            <TabsTrigger value="reports" className="flex items-center">
              <FileBarChart className="h-4 w-4 mr-2" />
              รายงานเรื่องร้องเรียน
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center">
              <UserCircle className="h-4 w-4 mr-2" />
              ฟีดข้อมูล
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              ผู้ช่วย AI
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center">
              <TestTube className="h-4 w-4 mr-2" />
              การทดสอบและประเมินผล
            </TabsTrigger>
            <TabsTrigger value="step-navigator" className="flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              ตัวช่วยนำทางขั้นตอน
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
          
          <TabsContent value="social">
            <div className="mb-8">
              <FanPagePostUpdate 
                onSubmit={(post) => console.log('Post submitted:', post)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="chatbot">
            <div className="mb-8 max-w-lg mx-auto">
              <AIChatbot />
            </div>
          </TabsContent>
          
          <TabsContent value="testing">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">การทดสอบและประเมินผล AI</h2>
              <TestingDashboard />
            </div>
          </TabsContent>
          
          <TabsContent value="step-navigator">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">ตัวอย่าง Step Navigator</h2>
              <StepNavigatorExample />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
