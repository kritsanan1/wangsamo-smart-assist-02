
import React from 'react';
import LinkManagement from '@/components/admin/LinkManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">ติดต่อหน่วยงาน</h1>
      
      <div className="grid gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลการติดต่อ</CardTitle>
            <CardDescription>ช่องทางในการติดต่อหน่วยงาน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium">ที่อยู่</h3>
                <p className="text-muted-foreground">เลขที่ 1 ถนนรัฐสภาเหนือ แขวงดุสิต เขตดุสิต กรุงเทพฯ 10300</p>
              </div>
              <div>
                <h3 className="font-medium">โทรศัพท์</h3>
                <p className="text-muted-foreground">02-123-4567</p>
              </div>
              <div>
                <h3 className="font-medium">อีเมล</h3>
                <p className="text-muted-foreground">contact@example.go.th</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Admin Link Management Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">จัดการลิงก์ (สำหรับผู้ดูแลระบบ)</h2>
          <LinkManagement />
        </section>
      </div>
    </div>
  );
};

export default Contact;
