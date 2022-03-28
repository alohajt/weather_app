import React, { EventHandler, useEffect, useState } from "react";
import { type WeatherData } from "./service/weather-data";

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState<string>("");

  const fetchData = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=313df0952d0a44e38ca0118cca3f0863`;
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
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

  console.log("weatherData.weather[0].main",weatherData);
  
  return (
    <div>
      <h1>{weatherData.name} </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={cityName} onChange={handleTextChange} />
        <input type="submit" value="Submit" />
      </form>

      <h2>Temp: {weatherData.main && weatherData.main.temp} K</h2>      
      <h2>{weatherData.weather && weatherData.weather[0].description}</h2>
      <h2>Max Temp: {weatherData.main && weatherData.main.temp_max} K</h2>
      <h2>Min Temp: {weatherData.main && weatherData.main.temp_min} K</h2>

    </div>
  );

};

export default App;

