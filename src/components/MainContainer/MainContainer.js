import React, { useState, useEffect } from 'react';
import './MainContainer.css';
import SearchBar from '../SearchBar/SearchBar';
import LocationContainer from '../LocationContainer/LocationContainer';
import WeatherContainer from '../WeatherContainer/WeatherContainer';

// this component is responsible for combining the other components together 
function MainContainer({locationListDefault, weatherListDefault}) {
  const [input, setInput] = useState('');
  const [filteredLocation, setFilteredLocation] = useState();
  const [filteredWeather, setFilteredWeather] = useState();

  useEffect(() => {
    // matching location with weather data
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
    console.log("SOMETHING WENT WRONG WHEN LOADING DATA");
    return null;
  }

  return (
    <div className='main-container'>
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

export default MainContainer;
