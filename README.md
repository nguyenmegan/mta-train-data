# MTA Open Data Challenge Submission

## Overview

The web application that offers dual-purpose tool for exploring New York City's subway system. This project is designed to assist travelers with practical information and raise awareness of socioeconomic diversity within the city, revealed through subway routes.

### Features

1. **Data Explorer**:
   - Provides essential station information such as bathroom availability, ADA accessibility, ridership levels, and proximity to nearby police stations.
   - Aids in planning subway travel with easy-to-access details about station amenities.

2. **Income Visualizer**:
   - Maps median household income by census tract to highlight socioeconomic contrasts encountered along subway routes.
   - Offers insights into NYC's unique economic diversity by visualizing income disparities across neighborhoods.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Data Sources](#data-sources)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Technologies Used

- **React**: Frontend library for building UI components.
- **Mantine UI**: Component library for React, used for styling and UI elements.
- **Recharts**: Visualization library for interactive and responsive data charts.

## Data Sources

The project relies on multiple datasets to provide accurate and up-to-date information about subway stations and neighborhood demographics:

| Data Source             | Details                                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------------------|
| Median Household Income | 2022 U.S. Census ACS 5-year estimates for median income data by census tract.                       |
| Station Locations       | MTA Subway Stations data matched with census tracts using GIS.                                      |
| Bathrooms               | MTA bathroom data for each station.                                                                 |
| ADA Accessibility       | Information on ADA-accessible stations from MTA.                                                    |
| Ridership Levels        | 2023 MTA ridership data.                                                                            |
| Police Stations         | Nearby police station locations for context on emergency and safety services.                       |
| MTA Line Colors         | Official line colors for consistent visual presentation.                                            |
| Subway Line Bullet Icons| Icons for each subway line.       