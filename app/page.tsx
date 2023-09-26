'use client';

import { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import ColorVisualVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic'
import Circle from '@arcgis/core/geometry/Circle'

type Geometry = {
  type: string;
  coordinates: any[];
};

type Feature = {
  type: string;
  properties: {
    route_long_name: string;
    route_color: string;
  };
  geometry: Geometry;
};

type FeatureCollection = {
  type: string;
  features: Feature[];
};

export default function Home() {
  const mapDiv = useRef(null);
  const [routes, setRoutes] = useState<FeatureCollection>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/json/cTranRoutes.json");
        const data = await res.json();

        setRoutes(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (mapDiv.current && routes) {
      const map = new Map({
        basemap: 'streets-vector'
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-122.6675, 45.6591],  // Center on Clark County
        zoom: 10
      });

      const uniqueRoutes = Array.from(new Set(routes.features.map(feature => feature.properties.route_long_name)));

      const uniqueValueInfos = uniqueRoutes.map(route => {
        const routeColor = routes.features.find(feature => feature.properties.route_long_name === route)!.properties.route_color;
        return {
          value: route,
          symbol: new SimpleLineSymbol({
            style: "solid",
            color: routeColor,
            width: "3px"
          }),
          label: route
        };
      });

      const renderer = new UniqueValueRenderer({
        field: "route_long_name",
        uniqueValueInfos: uniqueValueInfos
      });

      const cTranLayer = new GeoJSONLayer({
        url: "/json/cTranRoutes.json",
        renderer: renderer,
        title: "C-Tran Routes"
      });

      map.add(cTranLayer);
    }
  }, [mapDiv, routes]);

  return (
    <div className='h-screen'>
      <div className="h-full w-full" ref={mapDiv} />
    </div>
  )
};