
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  colorClass?: string;
}

const StatCard = ({ title, value, description, icon, colorClass = "bg-wangsammo-orange/10 text-wangsammo-orange" }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-md ${colorClass}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const DashboardSummary = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="เรื่องร้องเรียนทั้งหมด" 
        value="156" 
        description="+12% จากเดือนที่แล้ว"
        icon={<span className="w-4 h-4 flex items-center justify-center">📝</span>}
      />
      <StatCard 
        title="กำลังดำเนินการ" 
        value="38" 
        description="24% ของเรื่องร้องเรียนทั้งหมด"
        icon={<span className="w-4 h-4 flex items-center justify-center">🔄</span>}
        colorClass="bg-blue-500/10 text-blue-500"
      />
      <StatCard 
        title="แก้ไขแล้ว" 
        value="112" 
        description="72% ของเรื่องร้องเรียนทั้งหมด"
        icon={<span className="w-4 h-4 flex items-center justify-center">✅</span>}
        colorClass="bg-green-500/10 text-green-500"
      />
      <StatCard 
        title="ระยะเวลาเฉลี่ย" 
        value="3.5 วัน" 
        description="ลดลง 16% จากเดือนที่แล้ว"
        icon={<span className="w-4 h-4 flex items-center justify-center">⏱️</span>}
        colorClass="bg-wangsammo-teal/10 text-wangsammo-teal"
      />
    </div>
  );
};

export default DashboardSummary;
