import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
// import './LocationContainer.css';

function App() {
  const [input, setInput] = useState("");
  const [locationListDefault, setLocationListDefault] = useState();
  const [weatherListDefault, setWeatherListDefault] = useState();
  const [filteredLocation, setFilteredLocation] = useState();
  const [filteredWeather, setFilteredWeather] = useState();

  useEffect(() => {
    (async () => {
       return await fetch("http://localhost:3030/locations")
        .then((response) => response.json())
        .then((data) => {
          setLocationListDefault(data);
        });
    })();
    (async () => {
      return await fetch("http://localhost:3030/weather")
       .then((response) => response.json())
       .then((data) => {
        setWeatherListDefault(data);
       });
   })();

   if (filteredLocation && filteredLocation.length === 1){
    const locationCoordinates = {
      lon: Math.round(filteredLocation[0].longitude * 100) / 100,
      lat: Math.round(filteredLocation[0].latitude * 100) / 100,
    }

    const filterWeather = weatherListDefault.filter((location) => 
      locationCoordinates.lon === location.coord.lon &&
      locationCoordinates.lat === location.coord.lat
    );
    console.log("filterLocationList: ", filterWeather)
    setFilteredWeather(filterWeather);
  }
  }, []);

  console.log("data: ", weatherListDefault)

  const updateInput = (input) => {
    const filterLocationList = locationListDefault.filter((location) => {
      return location.postcode.toLowerCase().includes(input.toLowerCase());
    });

    setInput(input);
    setFilteredLocation(filterLocationList);
  };

  return (
    <div className="App">
      <h1>Select a location List</h1>
        <SearchBar 
          input={input} 
          updateInput={updateInput}
          suggestions={filteredLocation}
        />
      
      {filteredLocation && filteredLocation.length === 1 && filteredWeather && filteredWeather.length === 1 && 
        <div className="container">
          <div className="location-row">
            <h2>{filteredLocation[0].postcode}</h2>
            <h2>{filteredWeather[0].name}</h2>
          </div>
          <div className="weather-row">

          </div>
      </div>
      }
    </div>
  );
}

export default App;
