import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

const WeatherCard = ({weatherData}) => {

    //capitalize all words of a string. 
  const capitalizeWords = (string) => {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  return(
    <Card>
      <Card.Content>
          <Card.Header className="weather-header" >You're in {weatherData.name}.</Card.Header>
          <div className="flex">
            <p>It's {moment().format('dddd')}, {moment().format('LL')}.</p>
            <p>The temperature is {weatherData.main.temp} degrees.</p>
          </div>
          <div className="flex center">
            <p>Humidity: {weatherData.main.humidity} %</p>
          </div>
          <div className="flex">
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
          </div>

          <p>Description: {capitalizeWords(weatherData.weather[0].description)}</p>
      </Card.Content>
    </Card>
  );
}



export default WeatherCard;