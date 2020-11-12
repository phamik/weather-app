import React, { useState, useEffect } from 'react';
import './LocationContainer.css';

const LocationContainer = ({ location, weather }) => {
  return (
    <>
      {location && (
        <h2>
          {weather.name} - {location.postcode}
        </h2>
      )}
    </>
  );
};

export default LocationContainer;
