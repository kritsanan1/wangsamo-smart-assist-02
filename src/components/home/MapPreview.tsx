
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMapComponent from '../maps/GoogleMap';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

// Sample data for agency areas
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

const MapPreview: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">แผนที่รับผิดชอบ</h2>
          <p className="text-gray-600">ดูพื้นที่รับผิดชอบของหน่วยงานในอำเภอวังสามหมอ</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <GoogleMapComponent 
            polygons={agencyPolygons}
            height="400px"
          />
        </div>
        
        <div className="flex justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link to="/map">
              <MapPin size={16} />
              ดูรายละเอียดแผนที่เพิ่มเติม
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
