"use client";

import React, { useState, useEffect } from 'react';
import { Container, Text, Chip } from '@mantine/core';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
import stationData from '../../public/data/station_data.json';
import stationOrder from '../../public/data/station_order.json';

interface StationData {
    station: string;
    income: number;
    tract: string;
}

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

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const station = label;
        const income = payload[0].value.toLocaleString();
        const tract = payload[0].payload.tract;

        return (
            <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>{station}</p>
                <p style={{ color: '#1d1d1d', margin: 0 }}>Census Tract: {tract}</p>
                <p style={{ color: '#1d1d1d', margin: 0 }}>Median Household Income: ${income}</p>
            </div>
        );
    }

    return null;
};

export default function SubwayIncomeVisualizer() {
    const [selectedLine, setSelectedLine] = useState<string>('N');
    const [chartData, setChartData] = useState<StationData[]>([]);

    useEffect(() => {
        if (stationOrder[selectedLine as keyof typeof stationOrder]) {
            const orderedStations = stationOrder[selectedLine as keyof typeof stationOrder];

            const filteredData = orderedStations
                .map((stationId: number) => {
                    const stationInfo = stationData.find(
                        (station: any) => station.station_id === stationId
                    );
                    if (stationInfo && stationInfo.median_household_income && stationInfo.tract) {
                        return {
                            station: stationInfo.stop_name,
                            income: Number(stationInfo.median_household_income),
                            tract: stationInfo.tract,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            setChartData(filteredData as unknown as StationData[]);
        }
    }, [selectedLine]);

    if (!chartData || chartData.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
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
                <AreaChart
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
                        angle={-25}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis
                        ticks={[0, 50000, 100000, 150000, 200000, 250000]}
                        domain={[0, 250000]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="income"
                        name="Median Household Income"
                        stroke={colorMap[selectedLine] || '#8884d8'}
                        fillOpacity={0.3}
                        fill={colorMap[selectedLine] || '#8884d8'}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
                <Text size="sm" mt="md">
                    Source: U.S. Census 2022 ACS 5-year estimates
                </Text>
            </div>
        </Container>
    );
}
