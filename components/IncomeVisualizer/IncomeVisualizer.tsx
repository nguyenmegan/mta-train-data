"use client";

import React, { useState, useEffect } from 'react';
import { Container, Text, Chip } from '@mantine/core'; // Correct imports
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts'; // Recharts imports
import stationData from '../../public/data/station_data.json';
import stationOrder from '../../public/data/station_order.json';

interface StationData {
    station: string;
    income: number;
    tract: string;
}

const normalizeStationName = (name: string) => name.trim().toLowerCase();

const colorMap: { [key: string]: string } = {
    A: '#0039A6',
    C: '#0039A6',
    E: '#0039A6',
    B: '#FF6319',
    D: '#FF6319',
    F: '#FF6319',
    M: '#FF6319',
    G: "#6CBE45",
    J: '#996633',
    Z: '#996633',
    L: '#A7A9AC',
    N: '#FCCC0A',
    Q: '#FCCC0A',
    R: '#FCCC0A',
    W: '#FCCC0A',
    S: '#808183',
    T: "#00ADD0",
    1: '#EE352E',
    2: '#EE352E',
    3: '#EE352E',
    4: '#00933C',
    5: '#00933C',
    6: '#00933C',
    7: '#B933AD',
};

export default function SubwayIncomeVisualizer() {
    const [selectedLine, setSelectedLine] = useState<string>('N');
    const [chartData, setChartData] = useState<StationData[]>([]);

    useEffect(() => {
        if (stationOrder[selectedLine]) {
            const orderedStations = stationOrder[selectedLine];

            const filteredData = orderedStations
                .map((stationName: string) => {
                    const stationInfo = stationData.find(
                        (station: any) => normalizeStationName(station.stop_name) === normalizeStationName(stationName)
                    );
                    if (stationInfo && stationInfo.median_household_income && stationInfo.tract) {
                        return {
                            station: stationInfo.stop_name,
                            income: parseInt(stationInfo.median_household_income, 10),
                            tract: stationInfo.tract,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            setChartData(filteredData as StationData[]);
        }
    }, [selectedLine]);

    if (!chartData || chartData.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    width: '800px',
                }}
            >
                {Object.keys(stationOrder).map((line) => (
                    <Chip
                        key={line}
                        checked={selectedLine === line}
                        onChange={() => setSelectedLine(line)}
                        variant="filled"
                        color={colorMap[line] || 'gray'}
                        size="sm"
                    >
                        {line}
                    </Chip>
                ))}
            </div>

            <div style={{ width: '1000px', height: '500px' }}>
                <LineChart
                    width={1000}
                    height={500}
                    data={chartData}
                    margin={{ top: 10, right: 20, bottom: 80, left: 60 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="station"
                        interval="preserveStartEnd"
                        tickFormatter={(value, index) => (index % Math.ceil(chartData.length / 10) === 0 ? value : '')}
                        tick={{ angle: -30, textAnchor: 'end' }}
                        height={60}
                    />
                    <YAxis
                        ticks={[0, 50000, 100000, 150000, 200000, 250000]}
                        domain={[0, 250000]}
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        offset={0}
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        labelFormatter={(label) => `Station: ${label}`}
                        contentStyle={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            padding: '10px',
                        }}
                        itemStyle={{
                            fontWeight: 'bold',
                            lineHeight: '1.5',
                        }}
                        labelStyle={{
                            fontWeight: 'bold',
                            color: '#333',
                            fontSize: '16px',
                        }}
                        wrapperStyle={{ borderColor: '#ccc' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke={colorMap[selectedLine] || '#8884d8'}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
                <Text size="sm" mt="md">
                    Source: U.S. Census 2022 ACS 5-year estimates
                </Text>
            </div>
        </Container>
    );
}
