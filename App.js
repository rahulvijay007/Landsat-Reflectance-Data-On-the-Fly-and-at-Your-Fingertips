import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import axios from 'axios';
import './App.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal } from 'react-bootstrap'; // Import Bootstrap modal

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [landsatData, setLandsatData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLocationSelect = (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
  };

  const fetchLandsatData = async () => {
    const apiKey = 'IrYXqlUkkCayo4ts192mRQ8KeUct6gHfaRpNMa22';
    const url = `https://api.nasa.gov/planetary/earth/assets?lon=${lng}&lat=${lat}&dim=0.1&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      setLandsatData(response.data);
    } catch (error) {
      console.error("Error fetching Landsat data", error);
      setModalMessage("Error fetching Landsat data");
      setShowModal(true);
    }
  };

  const checkUpcomingPasses = async (lat, lng) => {
    if (!lat || !lng) {
      setModalMessage("Please select a valid location first.");
      setShowModal(true);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockResponse = [
        { date: '2024-10-10T14:32:00', passType: 'Landsat 8' },
        { date: '2024-10-12T16:45:00', passType: 'Landsat 8' },
      ];
      setModalMessage(`Next Landsat pass at ${mockResponse[0].date}`);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching upcoming passes:", error);
      setModalMessage("Failed to fetch upcoming passes.");
      setShowModal(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (landsatData) {
      setModalMessage(`Landsat data has been collected for your location at ${lat}, ${lng}`);
      setShowModal(true);
      checkUpcomingPasses(lat, lng);
    }
  }, [landsatData]);

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }}> {/* Background color applied */}
      <h1 className="text-center mb-4">Landsat Data Viewer</h1>
      <Map onLocationSelect={handleLocationSelect} />
      {lat && lng && (
        <div className="text-center mt-4">
          <p>Selected Location: {lat}, {lng}</p>
          <button className="btn btn-primary mx-2" onClick={fetchLandsatData}>Fetch Landsat Data</button>
          <button className="btn btn-secondary mx-2" onClick={() => checkUpcomingPasses(lat, lng)}>Check Upcoming Passes</button>
        </div>
      )}
      {landsatData && (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Landsat Data</h2>
            <p>Acquisition Date: {formatDate(landsatData.date)}</p>
            <p>Cloud Cover: {landsatData.cloudCover != null ? `${landsatData.cloudCover}%` : 'Data unavailable'}</p>
            <img className="card-img-top img-fluid" src={landsatData.url} alt="Landsat Image" />
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;













