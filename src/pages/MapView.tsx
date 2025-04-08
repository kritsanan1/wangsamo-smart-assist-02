
import React, { useState } from 'react';
import GoogleMapComponent from '../components/maps/GoogleMap';

// Sample data for agency areas (these would come from an API in a real application)
const sampleAgencyAreas = [
  {
    id: 'agency1',
    name: 'เทศบาลตำบลวังสามหมอ',
    area: [
      { lat: 17.3183, lng: 103.7389 },
      { lat: 17.3283, lng: 103.7489 },
      { lat: 17.3183, lng: 103.7589 },
      { lat: 17.3083, lng: 103.7489 },
    ],
    color: '#FF8B28',
    complaints: ['infrastructure', 'electricity', 'water']
  },
  {
    id: 'agency2',
    name: 'อบต.หนองกุงทับม้า',
    area: [
      { lat: 17.2983, lng: 103.7389 },
      { lat: 17.3083, lng: 103.7489 },
      { lat: 17.2983, lng: 103.7589 },
      { lat: 17.2883, lng: 103.7489 },
    ],
    color: '#4B83E8',
    complaints: ['garbage', 'safety', 'others']
  }
];

// Convert the agency areas to polygon format for the map
const agencyPolygons = sampleAgencyAreas.map(agency => ({
  id: agency.id,
  paths: agency.area,
  options: {
    fillColor: agency.color,
    fillOpacity: 0.3,
    strokeColor: agency.color,
    strokeOpacity: 1,
    strokeWeight: 2
  }
}));

const MapView: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);

  // Filter polygons if an agency is selected
  const displayedPolygons = selectedAgency 
    ? agencyPolygons.filter(p => p.id === selectedAgency)
    : agencyPolygons;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">พื้นที่รับผิดชอบของหน่วยงาน</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">เลือกหน่วยงาน:</label>
        <select 
          className="w-full md:w-64 p-2 border rounded-md"
          value={selectedAgency || ''}
          onChange={(e) => setSelectedAgency(e.target.value || null)}
        >
          <option value="">ทั้งหมด</option>
          {sampleAgencyAreas.map(agency => (
            <option key={agency.id} value={agency.id}>{agency.name}</option>
          ))}
        </select>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <GoogleMapComponent 
          polygons={displayedPolygons}
          height="600px"
          zoom={12}
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">รายละเอียดพื้นที่รับผิดชอบ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleAgencyAreas.map(agency => (
            <div 
              key={agency.id} 
              className={`p-4 rounded-lg border ${selectedAgency === agency.id ? 'border-wangsammo-orange bg-orange-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: agency.color }} 
                />
                <h3 className="font-medium">{agency.name}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">ประเภทเรื่องร้องเรียนที่รับผิดชอบ:</p>
              <ul className="list-disc pl-5 text-sm">
                {agency.complaints.map((type, idx) => (
                  <li key={idx}>{getCategoryText(type)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to translate complaint types to Thai
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

export default MapView;
