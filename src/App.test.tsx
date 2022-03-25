import React, { useEffect, useState } from "react";
// import { render, screen } from '@testing-library/react';
// import App from './App';

const App = () => {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=313df0952d0a44e38ca0118cca3f0863";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  return (
        <p>{advice}</p>
);

};

export default App;
