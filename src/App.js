import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState("Indonesia");
  const [weatherData, setWeatherData] = useState(null)
  const currentDate = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`

  const API_KEY = "6e97b21b8eb0372cbb54dbaac158ce3d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log(data);
      setWeatherData(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, [])

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  }
  const getweatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png";
      case "Rain":
        return "/rain_with_cloud.png";
      case "Mist":
        return "/Tornado.png";
      case "Haze":
        return "/sun.png";
      default:
        return null;

    }
  }

  return (
    <div className="App">
      <div className='container'>
        {weatherData && (

          <>
            <h1 className='container_date'>{formattedDate}</h1>
            <div className='weather_data'>
              <h2 className='container_city'>{weatherData.name}</h2>
              <img
                className="container_img"
                src={getweatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                alt="weather Icon">

              </img>

              <h2 className='container_degree'>{weatherData.main.temp}</h2>
              <h2 className='country_per'>{weatherData.weather[0].main}</h2>
              <form className='form' onSubmit={handleSubmit}>
                <input type='text' className='input' placeholder='Enter city name' onChange={handleInputChange}></input>
                <button type='submit'>Get</button>
              </form>

            </div>
          </>

        )}
      </div>
    </div>
  );
}

export default App;
