"use client";
import React from 'react';
import { Accordion, Container, Title, Text, List, Table, Button } from '@mantine/core';

const DataSourcesTable = () => (
  <Table highlightOnHover>
    <thead>
      <tr>
        <th>Data Source</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {[
        ["Median Household Income", "2022 U.S. Census ACS 5-year estimates providing median income data by census tract."],
        ["Station Locations", <><a href="https://data.ny.gov/Transportation/MTA-Subway-Stations/39hk-dx4f/about_data">MTA Subway Stations</a> matched with census tracts using GIS.</>],
        ["Bathrooms", <><a href="https://new.mta.info/agency/new-york-city-transit/bathrooms">MTA bathroom data</a> for each station.</>],
        ["ADA Accessibility", <><a href="https://new.mta.info/accessibility/stations">MTA ADA data</a>.</>],
        ["Ridership Levels", <><a href="https://new.mta.info/agency/new-york-city-transit/subway-bus-ridership-2023">MTA ridership data</a> for 2023.</>],
        ["Police Stations", "Location of nearby police stations for emergency and safety context."],
        ["MTA Line Colors", <><a href="https://data.ny.gov/Transportation/MTA-Colors/3uhz-sej2/about_data">MTA Colors</a> for a consistent visual experience.</>],
        ["Subway Line Bullet Icons", <><a href="https://iconduck.com/sets/mta-subway-bullet-icons">Iconduck’s MTA icons</a>.</>],
      ].map(([source, details]) => (
        <tr key={String(source)}>
          <td>{source}</td>
          <td>{details}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const NYCSubwayVisualizerDocs: React.FC = () => (
  <Container>
    <Title order={1}>MTA Data Explorer</Title>
    <Text mt="md">
      This project, split into two parts, offers insights into New York City’s subway system. Part one, The Data Explorer, is a comprehensive tool for subway navigation, providing information on amenities like bathroom availability, ADA accessibility, ridership data, and nearby police stations. Part two, The Income Visualizer, presents median household income by census tract, revealing socioeconomic contrasts along subway routes and providing a view of NYC's economic diversity.
    </Text>

    <Accordion mt="lg">
      <Accordion.Item value="About This Project">
        <Text>
          This project visualizes income data for NYC subway stations, highlighting income contrasts between stops to showcase the city's socioeconomic diversity. The visualizer also provides essential subway data, creating a useful tool for planning subway travel in NYC.
        </Text>
      </Accordion.Item>

      <Accordion.Item value="Data Sources">
        <Text mt="sm">The project utilizes several datasets for both income and station amenities:</Text>
        <DataSourcesTable />
      </Accordion.Item>

      <Accordion.Item value="Visualization Technology">
        <Text>
          Built with <a href="https://recharts.org/en-US/" target="_blank">Recharts</a>, this project uses responsive, interactive data visualizations to represent income levels by station and line.
        </Text>
      </Accordion.Item>

      <Accordion.Item value="Station Information and Practical Use">
        <Text mt="sm">Key details available for each station:</Text>
        <List spacing="xs" mt="xs">
          {[
            ["Bathrooms", "Convenient for travelers, especially those with medical needs, families, or on long commutes."],
            ["ADA Accessibility", "Ensures accessible navigation for users with limited mobility."],
            ["Ridership Levels", "Helps anticipate crowd levels and plan travel accordingly."],
            ["Nearby Police Stations", "Provides a sense of safety and supports emergency response."],
          ].map(([title, description]) => (
            <List.Item key={title}>
              <b>{title}</b>: {description}
            </List.Item>
          ))}
        </List>
      </Accordion.Item>

      <Accordion.Item value="Future Directions">
        <Text>Potential project expansions include:</Text>
        <List spacing="xs" mt="xs">
          {[
            ["Additional Data Layers", "Add cost of living data, school locations, and hospital proximity."],
            ["Advanced User Interactions", "Introduce a time-lapse view to track income trends over time."],
            ["Further Data Integration", "Incorporate crime statistics and real estate trends for context on wealth disparities and gentrification."],
          ].map(([title, description]) => (
            <List.Item key={title}>
              <b>{title}</b>: {description}
            </List.Item>
          ))}
        </List>
      </Accordion.Item>
    </Accordion>

    <Button variant="outline" mt="lg">
      <a href="https://github.com/nguyenmegan/mta-train-data" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
        View Project Repository
      </a>
    </Button>
  </Container>
);

export default NYCSubwayVisualizerDocs;
