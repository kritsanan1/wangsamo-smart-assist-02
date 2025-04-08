
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';

// Define types for our component props
interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: Array<{
    id: string;
    position: google.maps.LatLngLiteral;
    title?: string;
  }>;
  polygons?: Array<{
    id: string;
    paths: google.maps.LatLngLiteral[];
    options?: google.maps.PolygonOptions;
  }>;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  height?: string;
}

// Container style for the map
const containerStyle = {
  width: '100%',
  height: '500px'
};

// Default center location (Wang Sam Mo, Thailand)
const defaultCenter = {
  lat: 17.3083, 
  lng: 103.7489
};

// You should replace this with a valid API key from your Google Cloud Console
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

const GoogleMapComponent: React.FC<MapProps> = ({ 
  center = defaultCenter, 
  zoom = 13, 
  markers = [],
  polygons = [],
  onMapClick,
  height = '500px'
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  return (
    <div className="w-full" style={{ height }}>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{ ...containerStyle, height }}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
        >
          {/* Render markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
            />
          ))}

          {/* Render polygons */}
          {polygons.map((polygon) => (
            <Polygon
              key={polygon.id}
              paths={polygon.paths}
              options={polygon.options || {
                fillColor: '#FF8B28',
                fillOpacity: 0.3,
                strokeColor: '#FF8B28',
                strokeOpacity: 1,
                strokeWeight: 2
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
