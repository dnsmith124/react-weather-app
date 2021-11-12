import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import { Button, Input, Form, Label } from "semantic-ui-react";
import './WeatherApp.scss';

const WeatherApp = () => {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [zip, setZip] = useState(null);
  const [isValidZip, setIsValidZip] = useState([true]);
  const [data, setData] = useState([]);

  const fetchDataForLatLong = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if(lat == null || long == null) return;
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
    });
  }

  const validateZip = (zip) => {
    if(isNaN(zip) || (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip) === false)) {
      setIsValidZip(false);
      return false;
    }

    setIsValidZip(true);
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validateZip(event.target[0].value)) return;
    setZip(event.target[0].value);
  }

  const fetchDataForZip = async () => {
    if(zip == null) return;
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?zip=${zip},us&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
      if (!res.ok) { throw res }
      res.json();
    })
    .then(result => {
      setData(result)
    })
    .catch((error) => {
      console.log(error)
      setIsValidZip(false);
    });
  }

  useEffect(() => {
    fetchDataForZip();
  }, [zip]);

  useEffect(() => {
    fetchDataForLatLong();
  }, [lat, long]);

  return (
    <div className="weather-app">
      {(typeof data.main != 'undefined') ? (
        <>
        <Weather weatherData={data}/>
          <h4>To see weather for a different location, enter a zip code in the box below. </h4>
          <Form onSubmit={handleSubmit}>
            <Label pointing='below' basic color='red' className={isValidZip ? 'hide' : 'show'}>Please enter a valid Zip Code</Label>
            <Input type="text" placeholder="Zip Code" />
            <Button type="submit">Submit</Button>
          </Form>
        </>
      ): (
        <>
          <h4>Please enable geolocation in your browser or enter your zip code in the box below. </h4>
          <Form onSubmit={handleSubmit}>
            <Label pointing='below' basic color='red' className={isValidZip ? 'hide' : 'show'}>Please enter a valid Zip Code</Label>
            <Input type="text" placeholder="Zip Code" />
            <Button type="submit">Submit</Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default WeatherApp;