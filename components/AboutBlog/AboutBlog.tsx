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
      <tr>
        <td>Median Household Income</td>
        <td>2022 U.S. Census ACS 5-year estimates providing median income data by census tract.</td>
      </tr>
      <tr>
        <td>Station Locations</td>
        <td>Coordinates from <a href="https://data.ny.gov/Transportation/MTA-Subway-Stations/39hk-dx4f/about_data">MTA Subway Stations</a> matched with census tracts using GIS.</td>
      </tr>
      <tr>
        <td>Bathrooms</td>
        <td>Information from <a href="https://new.mta.info/agency/new-york-city-transit/bathrooms">MTA bathroom data</a> for each station.</td>
      </tr>
      <tr>
        <td>ADA Accessibility</td>
        <td>Data on accessibility features from <a href="https://new.mta.info/accessibility/stations">MTA ADA data</a>.</td>
      </tr>
      <tr>
        <td>Ridership Levels</td>
        <td>2023 ridership stats from <a href="https://new.mta.info/agency/new-york-city-transit/subway-bus-ridership-2023">MTA ridership data</a>.</td>
      </tr>
      <tr>
        <td>Police Stations</td>
        <td>Location of nearby police stations for emergency and safety context.</td>
      </tr>
      <tr>
        <td>MTA Line Colors</td>
        <td>Official line colors from <a href="https://data.ny.gov/Transportation/MTA-Colors/3uhz-sej2/about_data">MTA Colors</a> for a consistent visual experience.</td>
      </tr>
      <tr>
        <td>Subway Line Bullet Icons</td>
        <td>Icons for each line from <a href="https://iconduck.com/sets/mta-subway-bullet-icons">Iconduck’s MTA icons</a>.</td>
      </tr>
    </tbody>
  </Table>
);

const NYCSubwayVisualizerDocs: React.FC = () => {
  return (
    <Container>
      <Title order={1}>MTA Data Explorer</Title>
      <Text mt="md">
        The MTA Data Explorer offers an interactive look at the wealth disparities across New York City’s subway lines. By visualizing median household income data by census tract, it highlights the socioeconomic landscape encountered along subway routes, along with essential station amenities, ADA accessibility, ridership levels, and safety features.
      </Text>

      <Accordion mt="lg">
        <Accordion.Item value="About This Project">
          <Text>
            This project aims to increase awareness of economic divides within NYC by visualizing income data for each subway station. The NYC subway connects neighborhoods with diverse income levels, and this tool highlights the income contrasts between stops, providing insights into the city’s socioeconomic diversity.
          </Text>
          <Text mt="sm">
            Beyond income data, the visualizer serves as a practical data explorer, offering information on station bathrooms, ADA accessibility, ridership, and nearby police stations, creating a useful resource for anyone planning their subway travel in NYC.
          </Text>
        </Accordion.Item>

        <Accordion.Item value="Data Sources">
          <Text mt="sm">
            Several datasets were used to build this project, providing both income data and station amenities:
          </Text>
          <DataSourcesTable />
        </Accordion.Item>

        <Accordion.Item value="Visualization Technology">
          <Text>
            The visualization is built with <a href="https://recharts.org/en-US/" target="_blank">Recharts</a>, a library designed for responsive data visualizations within React applications. This choice allowed for customizable, interactive visuals, including income levels by station and line pathways.
          </Text>
        </Accordion.Item>

        <Accordion.Item value="Station Information and Practical Use">
          <Text mt="sm">
            Each station includes essential details, enabling users to make informed travel plans:
          </Text>
          <List spacing="xs" mt="xs">
            <List.Item>
              <b>Bathrooms</b>: Helpful for travelers, especially those with medical needs, families, or long commutes.
            </List.Item>
            <List.Item>
              <b>ADA Accessibility</b>: Ensures users with limited mobility can navigate the subway more easily.
            </List.Item>
            <List.Item>
              <b>Ridership Levels</b>: Helps anticipate crowd levels and wait times, making travel planning easier.
            </List.Item>
            <List.Item>
              <b>Nearby Police Stations</b>: Provides a sense of safety for riders and supports emergency response awareness.
            </List.Item>
          </List>
        </Accordion.Item>

        <Accordion.Item value="Future Directions">
          <Text>
            Potential areas for project expansion include:
          </Text>
          <List spacing="xs" mt="xs">
            <List.Item>
              <b>Additional Data Layers</b>: Integrate cost of living data, including housing costs, and information on local schools and hospitals.
            </List.Item>
            <List.Item>
              <b>Advanced User Interactions</b>: Add a time-lapse view to track income trends over time, and customizable views for targeted exploration.
            </List.Item>
            <List.Item>
              <b>Further Data Integration</b>: Include crime statistics and real estate trends to provide additional context around wealth disparities and gentrification.
            </List.Item>
          </List>
        </Accordion.Item>
      </Accordion>

      <Button variant="outline" mt="lg">
        <a href="[repository_url]" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
          View Project Repository
        </a>
      </Button>
    </Container>
  );
};

export default NYCSubwayVisualizerDocs;
