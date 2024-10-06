# Landsat Reflectance Data: On the Fly and at Your Fingertips

### Celestial Mashup | NASA Space Apps Challenge 2024

## Table of Contents
- [Overview](#overview)
- [Project Features](#project-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Data Management](#data-management)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a web-based application developed as part of the 36-hour NASA Space Apps Challenge 2024. The platform enables users to receive notifications for upcoming Landsat satellite flyovers and provides access to Landsat Surface Reflectance data for specific locations. The data can be filtered by cloud coverage, and the platform visualizes satellite imagery for environmental monitoring, agriculture, and disaster management purposes.

## Project Features

- **Landsat Flyover Alerts**: Receive notifications when Landsat satellites (Landsat 8 and 9) pass over a user-defined location.
- **Surface Reflectance Data**: Access and view the processed Landsat Surface Reflectance data for defined regions.
- **Cloud Coverage Filtering**: Filter satellite imagery based on cloud coverage percentage to get the clearest scenes.
- **Data Visualization**: Display Landsat imagery using an interactive map interface.
- **Push Notifications**: Notify users about satellite data availability and flyover schedules via web notifications.
- **Multi-source Data**: Integration with Harmonized Landsat Sentinel-2 data and Landsat 8 and 9 Surface Reflectance products.

## Tech Stack

- **Frontend**: React.js, CSS Modules
- **Backend**: Python (Flask), Landsat API, Push Notifications
- **Database**: MySQL
- **Data Processing**: Landsat API, Cloud Filtering Mechanism
- **Push Notifications**: Web Push API (Push Notifications)
- **Visualization**: Leaflet.js for mapping and Landsat data rendering

## Installation

### Prerequisites
Ensure that you have the following installed:
- **Python 3.8+**
- **MySQL** database
- **Node.js** (for frontend development)
- **npm** (Node Package Manager)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nasa-space-apps-2024.git
   cd nasa-space-apps-2024
   ```

2. Set up a virtual environment:

   ```bash
   python3 -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install the Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the MySQL database:
   - Create a new MySQL database and update your `config.py` with the database credentials.
   - Run the following command to initialize the database schema:
   
   ```bash
   python manage.py db init
   python manage.py db migrate
   python manage.py db upgrade
   ```

5. Start the backend server:

   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the `frontend/` directory and install the Node.js dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend development server:

   ```bash
   npm start
   ```

## Usage

1. Users can sign up and configure locations for satellite notifications.
2. The app will automatically notify the user when a Landsat satellite passes over the specified location.
3. Users can view and filter the Landsat imagery data by cloud coverage and download surface reflectance data for further analysis.
4. The notification system runs in the background, ensuring users stay updated.

## Data Management

- **Data Sources**:
  - Landsat 8, 9, and Harmonized Landsat Sentinel-2 Surface Reflectance data.
  - Cloud filtering for selecting the clearest images.
- **Database**:
  - MySQL database is used for managing user data, satellite flyover events, and notification preferences.

## API Endpoints

- `/api/landsat-data`: Fetch Landsat surface reflectance data for a user-defined location.
- `/api/flyover-schedule`: Get the next Landsat flyover event for the user’s coordinates.
- `/api/notifications`: Subscribe to push notifications for satellite data availability.
  
## Database

- **Users Table**: Stores user information (email, location preferences, notification settings).
- **Flyover Events Table**: Contains information about upcoming satellite flyovers.
- **Satellite Data Table**: Stores surface reflectance data retrieved from the Landsat API.

## Contributing

We welcome contributions to improve the project! To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and commit them.
4. Open a pull request with a description of the changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
