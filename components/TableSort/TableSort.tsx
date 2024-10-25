"use client";

import { useState } from 'react';
import { Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, Grid, MultiSelect, rem } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import stationData from '../../public/data/station_data.json';
import classes from './TableSort.module.css';

// Mapping route names to SVG paths
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

// Options for MultiSelect
const boroughOptions = [
    { value: 'Queens', label: 'Queens' },
    { value: 'Manhattan', label: 'Manhattan' },
    { value: 'Brooklyn', label: 'Brooklyn' },
    { value: 'Bronx', label: 'Bronx' },
    { value: 'Staten Island', label: 'Staten Island' },
];

const lineOptions = Object.keys(routeIcons).map((line) => ({ value: line, label: line }));

const renderRouteIcons = (route: string) => {
    const iconPath = routeIcons[route];
    return iconPath ? <Image src={iconPath} alt={`Route ${route}`} width={16} height={16} /> : route;
};

// Borough translation helper
const translateBorough = (borough: string) => {
    const mapping: { [key: string]: string } = {
        Q: 'Queens',
        M: 'Manhattan',
        Bk: 'Brooklyn',
        Bx: 'Bronx',
        SI: 'Staten Island',
    };
    return mapping[borough] || borough;
};

// Table header component
const Th = ({ children, reversed, sorted, onSort }: any) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">{children}</Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
};

// Data filtering function
const filterData = (data: any[], search: string, selectedRoutes: string[], selectedBoroughs: string[]) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => {
        const matchesSearch = Object.keys(item).some((key) =>
            item[key as keyof any]?.toString().toLowerCase().includes(query)
        );
        const matchesRoute = selectedRoutes.length === 0 || selectedRoutes.some(route => item.daytime_routes.includes(route));
        const matchesBorough = selectedBoroughs.length === 0 || selectedBoroughs.includes(translateBorough(item.borough));
        return matchesSearch && matchesRoute && matchesBorough;
    });
};

// Data sorting function with null handling
const sortData = (data: any[], { sortBy, reversed, search, selectedRoutes, selectedBoroughs }: { sortBy: keyof any | null; reversed: boolean; search: string; selectedRoutes: string[]; selectedBoroughs: string[] }) => {
    if (!sortBy) return filterData(data, search, selectedRoutes, selectedBoroughs);

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortBy] as string | number | null;
        const bValue = b[sortBy] as string | number | null;

        if (aValue === null) return reversed ? -1 : 1; // Null values go to the end
        if (bValue === null) return reversed ? 1 : -1;

        if (sortBy === 'median_household_income' || sortBy === '2023_average_weekday_ridership' || sortBy === '2023_average_weekend_ridership') {
            const aNum = parseFloat(aValue.toString().replace(/[^0-9.-]+/g, ""));
            const bNum = parseFloat(bValue.toString().replace(/[^0-9.-]+/g, ""));
            return reversed ? bNum - aNum : aNum - bNum;
        }

        return reversed
            ? bValue.toString().localeCompare(aValue.toString())
            : aValue.toString().localeCompare(bValue.toString());
    });

    return filterData(sortedData, search, selectedRoutes, selectedBoroughs);
};

export function TableSort() {
    const [search, setSearch] = useState('');
    const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
    const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
    const [sortedData, setSortedData] = useState(stationData);
    const [sortBy, setSortBy] = useState<keyof any | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof any) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(stationData, { sortBy: field, reversed, search, selectedRoutes, selectedBoroughs }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(stationData, { sortBy, reversed: reverseSortDirection, search: value, selectedRoutes, selectedBoroughs }));
    };

    const handleRouteChange = (value: string[]) => {
        setSelectedRoutes(value);
        setSortedData(sortData(stationData, { sortBy, reversed: reverseSortDirection, search, selectedRoutes: value, selectedBoroughs }));
    };

    const handleBoroughChange = (value: string[]) => {
        setSelectedBoroughs(value);
        setSortedData(sortData(stationData, { sortBy, reversed: reverseSortDirection, search, selectedRoutes, selectedBoroughs: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.station_id}>
            <Table.Td style={{ width: '35%' }}>{row.stop_name}</Table.Td>{/* Wider Station Name */}
            <Table.Td style={{ width: '10%' }}>{translateBorough(row.borough)}</Table.Td>
            <Table.Td>
                <Group>
                    {row.daytime_routes.split(' ').map((route) => (
                        <span key={route}>{renderRouteIcons(route)}</span>
                    ))}
                </Group>
            </Table.Td>
            <Table.Td>{row.median_household_income ? `$${Number(row.median_household_income).toLocaleString()}` : 'N/A'}</Table.Td>
            <Table.Td>{row['2023_average_weekday_ridership'] !== null ? row['2023_average_weekday_ridership'].toLocaleString() : 'N/A'}</Table.Td>
            <Table.Td>{row['2023_average_weekend_ridership'] !== null ? row['2023_average_weekend_ridership'].toLocaleString() : 'N/A'}</Table.Td>
            <Table.Td style={{ width: '6%' }}>{row.ada_accessible ? '♿️' : '🚫'}</Table.Td>{/* Narrower */}
            <Table.Td style={{ width: '6%' }}>{row.police_station ? '🚓' : '🚫'}</Table.Td>{/* Narrower */}
            <Table.Td style={{ width: '6%' }}>{row.bathroom ? '🚽' : '🚫'}</Table.Td>{/* Narrower */}
        </Table.Tr>
    ));

    return (
        <Grid justify="center" align="center" gutter="lg">
            <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                    label="Search by any field"
                    placeholder="Type to search"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <MultiSelect
                    data={lineOptions}
                    label="Filter by Lines"
                    placeholder="Select lines"
                    value={selectedRoutes}
                    onChange={handleRouteChange}
                    searchable
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <MultiSelect
                    data={boroughOptions}
                    label="Filter by Borough"
                    placeholder="Select boroughs"
                    value={selectedBoroughs}
                    onChange={handleBoroughChange}
                    searchable
                />
            </Grid.Col>
            <Grid.Col span={12}>
                <ScrollArea>
                    <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                        <Table.Thead>
                            <Table.Tr>
                                <Th sorted={sortBy === 'stop_name'} reversed={reverseSortDirection} onSort={() => setSorting('stop_name')}>
                                    Stop Name
                                </Th>
                                <Th sorted={sortBy === 'borough'} reversed={reverseSortDirection} onSort={() => setSorting('borough')}>
                                    Borough
                                </Th>
                                <Th sorted={sortBy === 'daytime_routes'} reversed={reverseSortDirection} onSort={() => setSorting('daytime_routes')}>
                                    Routes
                                </Th>
                                <Th sorted={sortBy === 'median_household_income'} reversed={reverseSortDirection} onSort={() => setSorting('median_household_income')}>
                                    Income
                                </Th>
                                <Th sorted={sortBy === '2023_average_weekday_ridership'} reversed={reverseSortDirection} onSort={() => setSorting('2023_average_weekday_ridership')}>
                                    Weekday
                                </Th>
                                <Th sorted={sortBy === '2023_average_weekend_ridership'} reversed={reverseSortDirection} onSort={() => setSorting('2023_average_weekend_ridership')}>
                                    Weekend
                                </Th>
                                <Th sorted={sortBy === 'ada_accessible'} reversed={reverseSortDirection} onSort={() => setSorting('ada_accessible')}>
                                    ADA ♿️
                                </Th>
                                <Th sorted={sortBy === 'police_station'} reversed={reverseSortDirection} onSort={() => setSorting('police_station')}>
                                    NYPD 🚓
                                </Th>
                                <Th sorted={sortBy === 'bathroom'} reversed={reverseSortDirection} onSort={() => setSorting('bathroom')}>
                                    Restroom
                                </Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length > 0 ? rows : (
                                <Table.Tr>
                                    <Table.Td colSpan={9}>
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
