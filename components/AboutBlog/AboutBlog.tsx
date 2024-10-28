"use client";
import React from 'react';
import { Accordion, Container, Title, Text, List, Table, Button, TextInput, Textarea, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

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

const NYCSubwayVisualizerDocs: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      feedback: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log('Sending email to nguyenmegan@berkeley.edu:', values);
    alert('Feedback sent successfully!');
  };

  return (
    <Container>
      <Text mt="md">
        This web application offers a comprehensive tool for exploring New York City's subway system. Designed for both
        practical use and social awareness, the tool provides travelers with key subway information and highlights
        socioeconomic diversity across the city through subway routes.
      </Text>

      <Title order={2} mt="lg">Features</Title>
      <Text mt="sm">
        <b>Data Explorer:</b> Provides essential station details such as bathroom availability, ADA accessibility,
        ridership levels, and proximity to nearby police stations. This helps users plan subway travel with essential
        information at their fingertips.
      </Text>
      <Text mt="sm">
        <b>Income Visualizer:</b> Maps median household income by census tract to highlight socioeconomic contrasts
        encountered along subway routes. This visual insight into economic diversity offers a unique perspective on
        NYC's neighborhoods.
      </Text>

      <Accordion mt="lg">
        <Accordion.Item value="data-sources">
          <Accordion.Control>Data Sources</Accordion.Control>
          <Accordion.Panel>
            <Text mt="sm">The project utilizes several datasets for both income and station amenities:</Text>
            <DataSourcesTable />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="visualization-technology">
          <Accordion.Control>Visualization Technology</Accordion.Control>
          <Accordion.Panel>
            <Text>
              Built with <a href="https://recharts.org/en-US/" target="_blank">Recharts</a>, this project uses responsive,
              interactive data visualizations to represent income levels by station and line.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="station-information">
          <Accordion.Control>Station Information and Practical Use</Accordion.Control>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="future-directions">
          <Accordion.Control>Future Directions</Accordion.Control>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Button
        variant="outline"
        mt="lg"
        component="a"
        href="https://github.com/nguyenmegan/mta-train-data"
        target="_blank"
      >
        View Project Repository
      </Button>

      <Title order={2} mt="lg">Feedback</Title>
      <Text mt="sm">
        Feedback is welcome, including bug reports and improvement suggestions. Click the button below to send an
        email directly.
      </Text>

      <Button
        variant="outline"
        mt="sm"
        component="a"
        href="mailto:nguyenmegan@berkeley.edu"
      >
        Send Feedback via Email
      </Button>
    </Container>
  );
};

export default NYCSubwayVisualizerDocs;
