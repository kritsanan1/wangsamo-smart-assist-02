
import { Check } from 'lucide-react';

export interface TrackingStatusData {
  id: string;
  title: string;
  category: string;
  location: string;
  submittedDate: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  updates: {
    date: string;
    status: string;
    description: string;
  }[];
}

interface TrackingStatusProps {
  data: TrackingStatusData;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'in_progress':
      return 'bg-blue-500';
    case 'resolved':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'รอดำเนินการ';
    case 'in_progress':
      return 'กำลังดำเนินการ';
    case 'resolved':
      return 'แก้ไขแล้ว';
    case 'rejected':
      return 'ไม่สามารถดำเนินการได้';
    default:
      return status;
  }
};

const getCategoryText = (category: string) => {
  switch (category) {
    case 'infrastructure':
      return 'โครงสร้างพื้นฐาน';
    case 'electricity':
      return 'ไฟฟ้าสาธารณะ';
    case 'water':
      return 'ประปา/น้ำท่วม';
    case 'garbage':
      return 'ขยะ/ความสะอาด';
    case 'safety':
      return 'ความปลอดภัย';
    case 'others':
      return 'อื่นๆ';
    default:
      return category;
  }
};

const TrackingStatus = ({ data }: TrackingStatusProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-start border-b border-gray-200 pb-4 mb-4">
        <div>
          <h3 className="text-xl font-bold">{data.title}</h3>
          <p className="text-gray-600 mt-1">หมายเลขอ้างอิง: {data.id}</p>
        </div>
        <div className={`${getStatusColor(data.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {getStatusText(data.status)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">ประเภท</p>
          <p className="font-medium">{getCategoryText(data.category)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">สถานที่</p>
          <p className="font-medium">{data.location}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">วันที่แจ้ง</p>
          <p className="font-medium">{data.submittedDate}</p>
        </div>
      </div>
      
      <h4 className="text-lg font-medium mb-4">ความคืบหน้า</h4>
      <div className="space-y-4">
        {data.updates.map((update, index) => (
          <div 
            key={index} 
            className="border-l-4 pl-4 pb-4 relative"
            style={{ 
              borderColor: index === data.updates.length - 1 ? '#FF8B28' : '#E2E8F0',
              marginLeft: '10px'
            }}
          >
            <div 
              className={`w-6 h-6 rounded-full absolute -left-3 flex items-center justify-center ${index === data.updates.length - 1 ? 'bg-wangsammo-orange' : 'bg-gray-200'}`}
              style={{ top: '0px' }}
            >
              {index === data.updates.length - 1 && <Check size={16} className="text-white" />}
            </div>
            <div className="ml-2">
              <p className="text-sm text-gray-500">{update.date}</p>
              <p className="font-medium">{update.status}</p>
              <p className="text-gray-700">{update.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingStatus;
