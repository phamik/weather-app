import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import LocationContainer from './components/LocationContainer/LocationContainer';
import WeatherContainer from './components/WeatherContainer/WeatherContainer';

function App() {
  const [input, setInput] = useState('');
  const [locationListDefault, setLocationListDefault] = useState();
  const [weatherListDefault, setWeatherListDefault] = useState();
  const [filteredLocation, setFilteredLocation] = useState();
  const [filteredWeather, setFilteredWeather] = useState();

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

    if (filteredLocation && filteredLocation.length === 1) {
      const locationCoordinates = {
        lon: Math.round(filteredLocation[0].longitude * 100) / 100,
        lat: Math.round(filteredLocation[0].latitude * 100) / 100,
      };

      const filterWeather = weatherListDefault.filter(
        (location) =>
          locationCoordinates.lon === location.coord.lon &&
          locationCoordinates.lat === location.coord.lat
      );
      setFilteredWeather(filterWeather);
    }
  }, [filteredLocation, weatherListDefault]);

  const updateInput = (input) => {
    const filterLocationList = locationListDefault.filter((location) => {
      return location.postcode.toLowerCase().includes(input.toLowerCase());
    });

    setInput(input);
    setFilteredLocation(filterLocationList);
  };

  if (!locationListDefault) {
    return 'SOMETHING WENT WRONG'
  }

  return (
    <div className='App'>
      <h1>Select a location</h1>
      <SearchBar
        input={input}
        updateInput={updateInput}
        suggestions={filteredLocation}
      />

      {filteredLocation && filteredWeather && (
        <section className='container'>
          <div className='location-row'>
            <LocationContainer
              location={filteredLocation[0]}
              weather={filteredWeather[0]}
            />
          </div>
          <div className='weather-row'>
            <WeatherContainer weather={filteredWeather[0]} />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
