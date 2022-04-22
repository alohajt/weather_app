import React, { EventHandler, useEffect, useState } from "react";
import { type WeatherData } from "../service/weather-data";
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from '../store'

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState<string>("");

  // const [cityName, setCityName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>()
  const fetchData = async (city: string) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=313df0952d0a44e38ca0118cca3f0863`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      // setWeatherData(json);
      dispatch({type:'GET_WEATHER_SUCCESS',payload:json.main })
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

  const convertTemp = (temp: number) => {
    return Math.ceil(temp - 273.15)
  }

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQst8vcOxn0BCuQLyVoSdCrNlEuTwJskeJzbQ&usqp=CAU"
  const styles = {
    paperContainer: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        style={styles.paperContainer}
      >
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              {weatherData.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <input type="text" value={cityName} onChange={handleTextChange} />
              <input type="submit" value="Submit" />
            </form>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Temp: {weatherData.main && convertTemp(weatherData.main.temp)} C
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="h3">
              {weatherData.weather && weatherData.weather[0].description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="h3">
              Max Temp:{weatherData.main && convertTemp(weatherData.main.temp_max)} C <br />
              Min Temp: {weatherData.main && convertTemp(weatherData.main.temp_min)} C
            </Typography>
          </Grid>
        </Grid>
      </Box>

    </>
  );

};

export default App;

