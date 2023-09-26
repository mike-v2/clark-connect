'use client';

import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export default function Home() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'streets-vector'
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-122.6675, 45.6591],  // Center on Clark County
        zoom: 10
      });
    }
  }, [mapDiv]);

  return (
    <div className='h-screen'>
      <div className="h-full w-full" ref={mapDiv} />
    </div>
  )
};