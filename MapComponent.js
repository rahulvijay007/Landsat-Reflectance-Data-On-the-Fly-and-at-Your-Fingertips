import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LandsatDataDisplay from './LandsatDataDisplay';
import Notification from './Notification'; // Notification component to show alerts

const MapComponent = () => {
    const [landsatData, setLandsatData] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Function to fetch Landsat data
    const fetchData = async () => {
        try {
            const response = await fetch('YOUR_LANDSAT_API_URL'); // Replace with your actual API URL
            if (!response.ok) throw new Error('Failed to fetch Landsat data');
            const data = await response.json();
            setLandsatData(data); // Update state with fetched data
        } catch (error) {
            console.error(error);
        }
    };

    // Function to check upcoming satellite passes
    const checkUpcomingPasses = async (lat, lng) => {
        try {
            const response = await fetch(`YOUR_PASS_CHECK_API_URL?lat=${lat}&lng=${lng}`); // Replace with your actual API URL
            if (!response.ok) throw new Error('Failed to fetch upcoming passes');
            const upcomingPasses = await response.json();
            return upcomingPasses;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Handle click on the map
    const handleMapClick = (event) => {
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    };

    // UseEffect for checking upcoming passes
    useEffect(() => {
        let intervalId;

        // Only set up the interval if a position is selected
        if (selectedPosition) {
            intervalId = setInterval(async () => {
                const passes = await checkUpcomingPasses(selectedPosition[0], selectedPosition[1]);
                if (passes.length > 0) {
                    setNotificationMessage(`Upcoming passes detected: ${passes.map(p => p.date).join(', ')}`);
                    setNotificationVisible(true);
                }
            }, 60000); // Check every 60 seconds
        }

        // Cleanup function
        return () => clearInterval(intervalId);
    }, [selectedPosition]);

    const handleCloseNotification = () => {
        setNotificationVisible(false);
    };

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={13} onClick={handleMapClick}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selectedPosition && (
                    <Marker position={selectedPosition}>
                        <Popup>
                            <span>Selected Location</span>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            <button onClick={fetchData}>Fetch Landsat Data</button>
            {landsatData && <LandsatDataDisplay data={landsatData} />}
            {notificationVisible && (
                <Notification message={notificationMessage} onClose={handleCloseNotification} />
            )}
        </div>
    );
};

export default MapComponent;
