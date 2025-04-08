
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsByCategory = () => {
  const categories = [
    { name: "โครงสร้างพื้นฐาน", value: 65, color: "#FF8B28" },
    { name: "ไฟฟ้าสาธารณะ", value: 35, color: "#3182CE" },
    { name: "ประปา/น้ำท่วม", value: 24, color: "#38B2AC" },
    { name: "ขยะ/ความสะอาด", value: 18, color: "#48BB78" },
    { name: "ความปลอดภัย", value: 12, color: "#ED8936" },
    { name: "อื่นๆ", value: 2, color: "#A0AEC0" },
  ];
  
  const total = categories.reduce((sum, category) => sum + category.value, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>เรื่องร้องเรียนตามหมวดหมู่</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden flex">
            {categories.map((category, index) => (
              <div
                key={index}
                className="h-full transition-all duration-500"
                style={{
                  width: `${(category.value / total) * 100}%`,
                  backgroundColor: category.color,
                }}
                title={`${category.name}: ${category.value} เรื่อง (${((category.value / total) * 100).toFixed(1)}%)`}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="truncate">{category.name}</p>
                    <p className="font-medium">{category.value}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {((category.value / total) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsByCategory;
