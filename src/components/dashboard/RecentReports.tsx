
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "รอดำเนินการ":
      return <Badge className="bg-yellow-500">รอดำเนินการ</Badge>;
    case "กำลังดำเนินการ":
      return <Badge className="bg-blue-500">กำลังดำเนินการ</Badge>;
    case "แก้ไขแล้ว":
      return <Badge className="bg-green-500">แก้ไขแล้ว</Badge>;
    case "ไม่สามารถดำเนินการ":
      return <Badge className="bg-red-500">ไม่สามารถดำเนินการ</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const RecentReports = () => {
  // Mock data for recent reports
  const recentReports = [
    {
      id: "WS-12345",
      title: "ถนนชำรุดบริเวณหน้าตลาดสด",
      category: "โครงสร้างพื้นฐาน",
      date: "8 เม.ย. 2568",
      status: "กำลังดำเนินการ",
    },
    {
      id: "WS-12344",
      title: "ไฟฟ้าสาธารณะดับที่ซอย 3",
      category: "ไฟฟ้าสาธารณะ",
      date: "7 เม.ย. 2568",
      status: "รอดำเนินการ",
    },
    {
      id: "WS-12343",
      title: "น้ำท่วมขังบริเวณสี่แยกหลัก",
      category: "ประปา/น้ำท่วม",
      date: "6 เม.ย. 2568",
      status: "แก้ไขแล้ว",
    },
    {
      id: "WS-12342",
      title: "ขยะไม่มีการจัดเก็บที่ชุมชนร่วมใจ",
      category: "ขยะ/ความสะอาด",
      date: "5 เม.ย. 2568",
      status: "กำลังดำเนินการ",
    },
    {
      id: "WS-12341",
      title: "ไฟเสียตามถนนสาย 2",
      category: "ไฟฟ้าสาธารณะ",
      date: "4 เม.ย. 2568",
      status: "แก้ไขแล้ว",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>หมายเลข</TableHead>
            <TableHead>เรื่อง</TableHead>
            <TableHead className="hidden md:table-cell">หมวดหมู่</TableHead>
            <TableHead className="hidden md:table-cell">วันที่</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell className="hidden md:table-cell">{report.category}</TableCell>
              <TableCell className="hidden md:table-cell">{report.date}</TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  รายละเอียด
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 text-center border-t">
        <Button variant="outline">ดูเพิ่มเติม</Button>
      </div>
    </div>
  );
};

export default RecentReports;
