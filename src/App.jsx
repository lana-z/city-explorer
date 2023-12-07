import React, { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';
import Error from './components/Error.jsx';
import Weather from './components/Weather.jsx';

let VITE_API_KEY = import.meta.env.VITE_API_KEY;
let local_API = "http://localhost:3000"
console.log(local_API)
console.log(VITE_API_KEY);

function App() {

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [searchQuery, setSearchQuery] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState(null);


  async function changeCity(newCity) {

    await getLocation(newCity);
    
    await fetchWeatherData(newCity, latitude, longitude);

    setButtonClicked(true);

    console.log("Changing to", newCity);
  }

  // Use locationIQ API to get the lat/lon
  async function getLocation(cityName){

    // 1. Call the API on asynchronously
    let url = `https://us1.locationiq.com/v1/search?key=${VITE_API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      // 2. Put the city into state
      setCity(response.data[0].display_name)

      // 3. Put the lat/lon into state
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);


    // Clear the error message if it was previously set
    setErrorMessage('');

    } catch(error) {
      console.error(error.message);
      setErrorMessage('There was an error getting the location information.');
    }

  }

  async function fetchWeatherData(city, latitude, longitude) {
    try {
      const response = await axios.get(`${local_API}/weather?searchQuery=${city}&lat=${latitude}&lon=${longitude}`);
      console.log("Weather Response", response);
      setForecast(response.data);
    } catch (error) {
      console.error('There was an error fetching the weather data:', error);
      setErrorMessage('There was an error fetching the weather data.');
    }
  }

  return (
    <div className="app-container">
      <Header />
      {errorMessage && <Error message={errorMessage} />}
      <div className='form-container'>

      <CityForm 
      city={city} 
      handleChangeCity={changeCity} />
      
      <Map 
      latitude={latitude} 
      longitude={longitude} />

      {buttonClicked && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>

      )}

      {forecast && <Weather forecast={forecast} city={city} />}
      
      </div>
    </div>
  )
}

export default App
