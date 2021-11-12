import React from 'react';
import WeatherCard from './WeatherCard';

const Weather =  ({weatherData}) => {

  return(
    <>
      <WeatherCard weatherData={weatherData} />
    </>
  );
}

export default Weather;