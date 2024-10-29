"use client";

import { useState } from 'react';
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, Grid, MultiSelect, Tooltip, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import Image from 'next/image';
import stationData from '../../public/data/station_data.json';
import classes from './TableSort.module.css';
import '../../styles/global.css';

const routeIcons: { [key: string]: string } = {
    1: '/img/bullets/1.svg',
    2: '/img/bullets/2.svg',
    3: '/img/bullets/3.svg',
    4: '/img/bullets/4.svg',
    5: '/img/bullets/5.svg',
    6: '/img/bullets/6.svg',
    7: '/img/bullets/7.svg',
    A: '/img/bullets/a.svg',
    B: '/img/bullets/b.svg',
    C: '/img/bullets/c.svg',
    D: '/img/bullets/d.svg',
    E: '/img/bullets/e.svg',
    F: '/img/bullets/f.svg',
    G: '/img/bullets/g.svg',
    H: '/img/bullets/h.svg',
    J: '/img/bullets/j.svg',
    L: '/img/bullets/l.svg',
    M: '/img/bullets/m.svg',
    N: '/img/bullets/n.svg',
    Q: '/img/bullets/q.svg',
    R: '/img/bullets/r.svg',
    S: '/img/bullets/s.svg',
    SIR: '/img/bullets/sir.svg',
    W: '/img/bullets/w.svg',
    Z: '/img/bullets/z.svg',
};

// Borough options for filter
const boroughOptions = [
    { value: 'Queens', label: 'Queens' },
    { value: 'Manhattan', label: 'Manhattan' },
    { value: 'Brooklyn', label: 'Brooklyn' },
    { value: 'Bronx', label: 'Bronx' },
    { value: 'Staten Island', label: 'Staten Island' },
];

// Route line options for filter
const lineOptions = Object.keys(routeIcons).map((line) => ({ value: line, label: line }));

// Column selection options
const columnOptions = [
    { value: 'stop_name', label: 'Stop Name' },
    { value: 'borough', label: 'Borough' },
    { value: 'daytime_routes', label: 'Lines' },
    { value: 'median_household_income', label: 'Income' },
    { value: '2023_average_weekday_ridership', label: 'Weekday' },
    { value: '2023_average_weekend_ridership', label: 'Weekend' },
    { value: 'ada_accessible', label: 'ADA ♿️' },
    { value: 'police_station', label: 'NYPD 🚓' },
    { value: 'bathroom', label: 'Restroom' },
];

const renderRouteIcons = (route: string) => {
    const iconPath = routeIcons[route];
    return iconPath ? <Image src={iconPath} alt={`Route ${route}`} width={16} height={16} /> : route;
};

// Borough translator function
const translateBorough = (borough: string) => {
    const mapping: { [key: string]: string } = { Q: 'Queens', M: 'Manhattan', Bk: 'Brooklyn', Bx: 'Bronx', SI: 'Staten Island' };
    return mapping[borough] || borough;
};

// Sorting header component
const Th = ({ children, reversed, sorted, onSort, tooltip }: { children: React.ReactNode, reversed: boolean, sorted: boolean, onSort: () => void, tooltip: string }) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    const headerContent = (
        <UnstyledButton onClick={onSort} className={classes.control}>
            <Group justify="space-between">
                <Text fw={500} fz="sm">{children}</Text>
                <Center className={classes.icon}>
                    <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </Center>
            </Group>
        </UnstyledButton>
    );

    return (
        <Table.Th className={classes.th}>
            {tooltip ? (
                <Tooltip label={tooltip} position="top" withArrow>
                    {headerContent}
                </Tooltip>
            ) : (
                headerContent
            )}
        </Table.Th>
    );
};

interface FilterDataOptions {
    sortBy: string | null;
    reversed: boolean;
    search: string;
    selectedRoutes: string[];
    selectedBoroughs: string[];
}

interface StationData {
    station_id: string;
    stop_name: string;
    borough: string;
    daytime_routes: string;
    median_household_income: number | null;
    '2023_average_weekday_ridership': number | null;
    '2023_average_weekend_ridership': number | null;
    ada_accessible: boolean;
    police_station: boolean;
    bathroom: boolean;
    [key: string]: string | number | null | boolean;
}

const filterData = (data: StationData[], search: string, selectedRoutes: string[], selectedBoroughs: string[]): StationData[] => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => {
        const matchesSearch = Object.keys(item).some((key) =>
            item[key]?.toString().toLowerCase().includes(query)
        );
        const matchesRoute = selectedRoutes.length === 0 || selectedRoutes.some(route => item.daytime_routes.includes(route));
        const matchesBorough = selectedBoroughs.length === 0 || selectedBoroughs.includes(translateBorough(item.borough));
        return matchesSearch && matchesRoute && matchesBorough;
    });
};

// Data sorting function
const sortData = (data: StationData[], { sortBy, reversed, search, selectedRoutes, selectedBoroughs }: FilterDataOptions) => {
    if (!sortBy) return filterData(data, search, selectedRoutes, selectedBoroughs);

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue === null) return reversed ? -1 : 1;
        if (bValue === null) return reversed ? 1 : -1;

        if (sortBy === 'median_household_income' || sortBy === '2023_average_weekday_ridership' || sortBy === '2023_average_weekend_ridership') {
            const aNum = parseFloat(aValue.toString().replace(/[^0-9.-]+/g, ""));
            const bNum = parseFloat(bValue.toString().replace(/[^0-9.-]+/g, ""));
            return reversed ? bNum - aNum : aNum - bNum;
        }

        return reversed ? bValue.toString().localeCompare(aValue.toString()) : aValue.toString().localeCompare(bValue.toString());
    });

    return filterData(sortedData, search, selectedRoutes, selectedBoroughs);
};

const initialVisibleColumns = ['stop_name', 'borough', 'daytime_routes']
const transformedStationData = stationData.map((data) => ({
    ...data,
    station_id: data.station_id.toString(), 
    median_household_income: data.median_household_income ? Number(data.median_household_income) : null,
}));

export function TableSort() {
    const [search, setSearch] = useState('');
    const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);
    const [sortedData, setSortedData] = useState<StationData[]>(transformedStationData);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

    const setSorting = (field: string) => {
        const reversed: boolean = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(transformedStationData, { sortBy: field, reversed, search, selectedRoutes, selectedBoroughs }));
    };
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(transformedStationData, { sortBy, reversed: reverseSortDirection, search: value, selectedRoutes, selectedBoroughs }));
    };

    const handleRouteChange = (value: string[]) => {
        setSelectedRoutes(value);
        setSortedData(sortData(transformedStationData, { sortBy, reversed: reverseSortDirection, search, selectedRoutes: value, selectedBoroughs }));
    };

    const handleBoroughChange = (value: string[]) => {
        setSelectedBoroughs(value as never[]);
        setSortedData(sortData(transformedStationData, { sortBy, reversed: reverseSortDirection, search, selectedRoutes, selectedBoroughs: value as never[] }));
    };

    const handleColumnChange = (value: string[]) => {
        setVisibleColumns(value);
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.station_id}>
            {visibleColumns.includes('stop_name') && <Table.Td>{row.stop_name}</Table.Td>}
            {visibleColumns.includes('borough') && <Table.Td>{translateBorough(row.borough)}</Table.Td>}
            {visibleColumns.includes('daytime_routes') && (
                <Table.Td>
                    <Group>
                        {row.daytime_routes.split(' ').map((route) => (
                            <span key={route}>{renderRouteIcons(route)}</span>
                        ))}
                    </Group>
                </Table.Td>
            )}
            {visibleColumns.includes('median_household_income') && <Table.Td>{row.median_household_income ? `$${Number(row.median_household_income).toLocaleString()}` : 'N/A'}</Table.Td>}
            {visibleColumns.includes('2023_average_weekday_ridership') && <Table.Td>{row['2023_average_weekday_ridership']?.toLocaleString() || 'N/A'}</Table.Td>}
            {visibleColumns.includes('2023_average_weekend_ridership') && <Table.Td>{row['2023_average_weekend_ridership']?.toLocaleString() || 'N/A'}</Table.Td>}
            {visibleColumns.includes('ada_accessible') && <Table.Td>{row.ada_accessible ? '♿️' : '🚫'}</Table.Td>}
            {visibleColumns.includes('police_station') && <Table.Td>{row.police_station ? '🚓' : '🚫'}</Table.Td>}
            {visibleColumns.includes('bathroom') && <Table.Td>{row.bathroom ? '🚽' : '🚫'}</Table.Td>}
        </Table.Tr>
    ));

    return (
        <Grid justify="center" align="center" gutter="lg">
            <Grid.Col span={12}>
                <MultiSelect
                    data={columnOptions}
                    label="Select Columns to Display"
                    placeholder="Choose columns"
                    value={visibleColumns}
                    onChange={handleColumnChange}
                    searchable
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput label="Search by any field" placeholder="Type to search" value={search} onChange={handleSearchChange} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <MultiSelect data={lineOptions} label="Filter by Lines" placeholder="Select lines" value={selectedRoutes} onChange={handleRouteChange} searchable />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <MultiSelect data={boroughOptions} label="Filter by Borough" placeholder="Select boroughs" value={selectedBoroughs} onChange={handleBoroughChange} searchable />
            </Grid.Col>
            <Grid.Col span={12}>
                <ScrollArea>
                    <Table highlightOnHover horizontalSpacing="sm" verticalSpacing="8px" miw={700} layout="fixed">
                        <Table.Thead>
                            <Table.Tr>
                                {visibleColumns.includes('stop_name') && (
                                    <Th sorted={sortBy === 'stop_name'} reversed={reverseSortDirection} onSort={() => setSorting('stop_name')} tooltip={''}>
                                        Stop Name
                                    </Th>
                                )}
                                {visibleColumns.includes('borough') && (
                                    <Th sorted={sortBy === 'borough'} reversed={reverseSortDirection} onSort={() => setSorting('borough')} tooltip={''}>
                                        Borough
                                    </Th>
                                )}
                                {visibleColumns.includes('daytime_routes') && (
                                    <Th sorted={sortBy === 'daytime_routes'} reversed={reverseSortDirection} onSort={() => setSorting('daytime_routes')} tooltip={''}>
                                        Lines
                                    </Th>
                                )}
                                {visibleColumns.includes('median_household_income') && (
                                    <Th sorted={sortBy === 'median_household_income'} reversed={reverseSortDirection} onSort={() => setSorting('median_household_income')} tooltip="2022 Median Household Income">
                                        Income
                                    </Th>
                                )}
                                {visibleColumns.includes('2023_average_weekday_ridership') && (
                                    <Th sorted={sortBy === '2023_average_weekday_ridership'} reversed={reverseSortDirection} onSort={() => setSorting('2023_average_weekday_ridership')} tooltip="2023 Average Weekday Ridership">
                                        Weekday
                                    </Th>
                                )}
                                {visibleColumns.includes('2023_average_weekend_ridership') && (
                                    <Th sorted={sortBy === '2023_average_weekend_ridership'} reversed={reverseSortDirection} onSort={() => setSorting('2023_average_weekend_ridership')} tooltip="2023 Average Weekend Ridership">
                                        Weekend
                                    </Th>
                                )}
                                {visibleColumns.includes('ada_accessible') && (
                                    <Th sorted={sortBy === 'ada_accessible'} reversed={reverseSortDirection} onSort={() => setSorting('ada_accessible')} tooltip={''}>
                                        ADA ♿️
                                    </Th>
                                )}
                                {visibleColumns.includes('police_station') && (
                                    <Th sorted={sortBy === 'police_station'} reversed={reverseSortDirection} onSort={() => setSorting('police_station')} tooltip={''}>
                                        NYPD 🚓
                                    </Th>
                                )}
                                {visibleColumns.includes('bathroom') && (
                                    <Th sorted={sortBy === 'bathroom'} reversed={reverseSortDirection} onSort={() => setSorting('bathroom')} tooltip="Open from 7am to 7pm">
                                        Restroom
                                    </Th>
                                )}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length > 0 ? rows : (
                                <Table.Tr>
                                    <Table.Td colSpan={visibleColumns.length}>
                                        <Text fw={500} ta="center">Nothing found</Text>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Grid.Col>
        </Grid>
    );
}
