import React, { EventHandler, useEffect, useState } from "react";
// import { render, screen } from '@testing-library/react';
// import App from './App';
import { type WeatherData } from "./service/weather-data";
// type WeatherData = { weather: Array<{ description: String }> }

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState<string>("");


  const fetchData = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=313df0952d0a44e38ca0118cca3f0863`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setWeatherData(json);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData("boston");
  }, []);


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    fetchData(cityName);
    event.preventDefault();

  }

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCityName(event.target.value)
    event.preventDefault();

  }
  if (!weatherData) {
    return <div>
      loading
    </div>
  }
  return (
    <div>
      <h1>{weatherData.name} </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={cityName} onChange={handleTextChange} />
        <input type="submit" value="Submit" />
      </form>

      <h2>Temp: </h2>
      <h2>{weatherData.weather && weatherData.weather[0].description}</h2>
    </div>
  );

};

export default App;

