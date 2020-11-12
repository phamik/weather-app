import React from 'react';
import './WeatherContainer.css';

function windDirection(angle) {
  let directions = [
    'North',
    'North-West',
    'West',
    'South-West',
    'South',
    'South-East',
    'East',
    'North-East',
  ];
  return directions[
    Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
  ];
}

const WeatherContainer = ({ weather }) => {
  // const {temp, feels_like, temp_max, temp_min, pressure, humidity} = weather.main;
  const { id, main, description, icon } = weather.weather[0];

  const {
    main: { temp, feels_like, temp_max, temp_min, pressure, humidity },
    visibility,
    wind: { speed, deg },
    clouds: { all },
  } = weather;

  const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className='wrapper'>
      <div className='main-info'>
        <span>Temperature (°F): {temp}</span>
        <span>Feels like (°F): {feels_like}</span>
        <span>Minimum temperature (°F): {temp_min}</span>
        <span>Maximum temperature (°F): {temp_max}</span>
        <span>Pressure (hPa): {pressure}</span>
        <span>Humidity (%): {humidity}</span>
        <span>Visibility (km): {visibility}</span>
      </div>

      <div className='weather-description'>
        <img alt='weather icon' src={imgUrl} />
        <h4>
          {main} - {description}
        </h4>
        <h5>
          Wind speed (m/s): {speed} <br />
          Wind Direction: {windDirection(deg)}
        </h5>
      </div>
    </div>
  );
};

export default WeatherContainer;
