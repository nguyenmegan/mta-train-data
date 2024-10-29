"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Card, Text } from '@mantine/core';
import stationData from '../../public/data/station_data.json';

const stationIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SubwayMap: React.FC = () => {
  return (
    <MapContainer center={[40.73061, -73.935242]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Loop through the station data and create markers */}
      {stationData.map((station) => (
        <Marker
          key={station.station_id}
          position={[station.gtfs_latitude, station.gtfs_longitude]}
          icon={stationIcon}
        >
          <Popup>
            {/* Popup content for each station */}
            <Card>
              <Text>{station.stop_name}</Text>
              <Text>Borough: {station.borough}</Text>
              <Text>Line: {station.line}</Text>
              <Text>Routes: {station.daytime_routes}</Text>
              <Text>Avg Weekday Ridership: {station['2023_average_weekday_ridership']}</Text>
              <Text>Avg Weekend Ridership: {station['2023_average_weekend_ridership']}</Text>
              <Text>ADA Accessible: {station.ada_accessible ? 'Yes' : 'No'}</Text>
            </Card>
          </Popup>
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <span>{station.stop_name} - {station.daytime_routes}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SubwayMap;
