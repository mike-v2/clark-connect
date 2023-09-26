'use client';

import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic'
import Circle from '@arcgis/core/geometry/Circle'


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

      const simpleLineSymbol = new SimpleLineSymbol({
        style: "solid",
        color: "black",
        width: '3px',
      });

      const renderer = new SimpleRenderer({
        symbol: simpleLineSymbol,
      });

      const cTranLayer = new GeoJSONLayer({
        url: '/json/cTranRoutesConverted.json',
        renderer: renderer,
        title: "C-Tran Routes"
      });

      map.add(cTranLayer);
    }
  }, [mapDiv]);

  return (
    <div className='h-screen'>
      <div className="h-full w-full" ref={mapDiv} />
    </div>
  )
};