import React from 'react';

const LandsatDataDisplay = ({ data }) => {
    return (
        <div>
            <h2>Landsat Data</h2>
            <p>Acquisition Date: {data.acquisitionDate}</p>
            <img src={data.imageUrl} alt="Landsat" />
            <p>Cloud Cover: {data.cloudCover}%</p>
        </div>
    );
};

export default LandsatDataDisplay;

