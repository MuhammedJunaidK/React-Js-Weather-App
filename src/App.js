// Import required modules and components
import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { FaSun, FaMoon, FaCloud, FaCloudShowersHeavy, FaBolt, FaSnowflake, FaSmog, FaQuestion } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Define the functional component named 'App'
function App() {
  // Define state variables using the 'useState' hook
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // Construct the API URL for fetching weather data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=96a4310d06ebcf47cff96e67868180fe`;

  // Define the 'searchLocation' function to handle user input and API request
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      // If the user presses the "Enter" key in the input field

      // Make a GET request to the API and handle the response
      axios.get(url).then((response) => {
        // Set the 'data' state to the fetched weather data from the API
        setData(response.data);
        // Print the response data to the console (for debugging purposes)
        console.log(response.data);
      }).catch((error) => {
        // If the API request fails (e.g., due to an invalid city name or any other error)

        // Display a warning alert using the 'Swal.fire' method from the 'sweetalert2' library
        Swal.fire({
          icon: 'warning',
          // Show a warning icon in the alert

          title: 'Enter a valid city name',
          // Set the title of the alert to 'Enter a valid city name'

          text: 'Please enter a valid city name and try again.',
          // Set the text of the alert to 'Please enter a valid city name and try again.'
        });
      });

      // Reset the 'location' state to an empty string, clearing the input field for the next city name entry
      setLocation('');
    }
  };

  // Define the 'getWeatherIcon' function to map weather codes to corresponding weather icons
  const getWeatherIcon = (weatherCode) => {
    // Use a switch statement to return the appropriate weather icon component based on the weather code
    switch (weatherCode) {
      case '01d':
        return <FaSun />; // Clear sky (day)
      case '01n':
        return <FaMoon />; // Clear sky (night)
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <FaCloud />; // Clouds
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <FaCloudShowersHeavy />; // Rain
      case '11d':
      case '11n':
        return <FaBolt />; // Thunderstorm
      case '13d':
      case '13n':
        return <FaSnowflake />; // Snow
      case '50d':
      case '50n':
        return <FaSmog />; // Mist/Smoke/Haze
      default:
        return <FaQuestion />; // Unknown condition
    }
  };

  // Return the JSX elements for rendering the weather application
  return (
    <div className="app">
      {/* Input section for searching a location */}
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {/* Weather display section */}
      <div className="container">
        <div className="top">
          {/* Location name */}
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          {/* Temperature */}
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          {/* Weather description with icon */}
          <div className="description">
            {data.weather ? <p>{getWeatherIcon(data.weather[0].icon)} {data.weather[0].main}</p> : null}
          </div>
        </div>

        {/* Additional weather information */}
        {data.name !== undefined && (
          <div className="bottom">
            {/* Feels Like temperature */}
            <div className="feels">
              {data.main ? (
                <>
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  <p>Feels Like</p>
                </>
              ) : null}
            </div>
            {/* Humidity */}
            <div className="humidity">
              {data.main ? (
                <>
                  <p className="bold">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </>
              ) : null}
            </div>
            {/* Wind Speed */}
            <div className="wind">
              {data.wind ? (
                <>
                  <p className="bold">{data.wind.speed.toFixed()} KMPH</p>
                  <p>Wind Speed</p>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
