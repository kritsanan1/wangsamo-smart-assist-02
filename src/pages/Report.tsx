
import ReportForm from "@/components/report/ReportForm";

const Report = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">แจ้งเหตุ</h1>
          <p className="text-gray-600">
            กรอกรายละเอียดเพื่อแจ้งเหตุหรือร้องเรียนปัญหาในพื้นที่อำเภอวังสามหมอ
          </p>
        </div>
        
        <ReportForm />
      </div>
    </div>
  );
};

export default Report;
