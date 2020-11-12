import React, { useState, useEffect } from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  const [locationListDefault, setLocationListDefault] = useState();
  const [weatherListDefault, setWeatherListDefault] = useState();

  useEffect(() => {
    (async () => {
      return await fetch('http://localhost:3030/locations')
        .then((response) => response.json())
        .then((data) => {
          setLocationListDefault(data);
        });
    })();
    (async () => {
      return await fetch('http://localhost:3030/weather')
        .then((response) => response.json())
        .then((data) => {
          setWeatherListDefault(data);
        });
    })();
  }, []);
  return (
    <div className='App'>
      <MainContainer
        locationListDefault={locationListDefault}
        weatherListDefault={weatherListDefault}
      />
    </div>
  );
}

export default App;
