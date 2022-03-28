import React, { EventHandler, useEffect, useState } from "react";
import { type WeatherData } from "./service/weather-data";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';


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

  console.log("weatherData.weather[0].main", weatherData);
  // const temp = (weatherData.main && weatherData.main.temp) − 273.15
  if (weatherData.main && weatherData.main.temp) {
    const temp = Math.ceil(weatherData.main.temp - 273.15)
    console.log("temp", temp);
  }

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst8vcOxn0BCuQLyVoSdCrNlEuTwJskeJzbQ&usqp=CAU"
  const styles = {
    paperContainer: {
        backgroundImage: `url(${image})`
    }
};

  return (
    <div>
      <Paper 
      style={styles.paperContainer}>
        <Typography variant="h2" component="h2" align="center">
          {weatherData.name}
        </Typography>

        <form onSubmit={handleSubmit}>
          <input type="text" value={cityName} onChange={handleTextChange} />
          <input type="submit" value="Submit" />
        </form>

        {/* <h2>Temp: {temp} C</h2>       */}
        <Typography variant="body1" component="h3" align="center">
          {weatherData.weather && weatherData.weather[0].description}
        </Typography>
        <Typography variant="body1" component="h3" align="center">
          Max Temp:{weatherData.main && weatherData.main.temp_max} K <br />
          Min Temp: {weatherData.main && weatherData.main.temp_min} K
        </Typography>
      </Paper>
    </div>
  );

};

export default App;

