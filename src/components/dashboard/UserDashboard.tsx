
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, MessageSquare } from 'lucide-react';

interface UserData {
  name: string;
  avatar: string;
  stats?: {
    reports: number;
    resolved: number;
    pending: number;
  };
}

interface UserDashboardProps {
  userData: UserData;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userData }) => {
  return (
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{userData.name}</CardTitle>
            <p className="text-sm text-gray-500">ผู้ใช้งานระบบ</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mt-2 text-center">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-2xl font-bold text-wangsammo-orange">{userData.stats?.reports || 0}</p>
              <p className="text-sm text-gray-500">เรื่องร้องเรียนทั้งหมด</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-2xl font-bold text-green-500">{userData.stats?.resolved || 0}</p>
              <p className="text-sm text-gray-500">เรื่องที่แก้ไขแล้ว</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-2xl font-bold text-amber-500">{userData.stats?.pending || 0}</p>
              <p className="text-sm text-gray-500">เรื่องที่กำลังดำเนินการ</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">ดูประวัติทั้งหมด</Button>
          <Button className="bg-wangsammo-blue hover:bg-wangsammo-blue/90">แจ้งเรื่องใหม่</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
