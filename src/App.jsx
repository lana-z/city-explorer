import React, { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.jsx";
import CityForm from "./components/CityForm.jsx";
import Map from './components/Map.jsx';

let API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);


function App() {

  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  function changeCity(newCity) {

    // get the location data
    getLocation(newCity);

    // set the buttonClicked to true
    setButtonClicked(true);

    // print a map
    console.log("Changing to", newCity);
  }

  // Use API (locationIQ) to get the lat/lon
  async function getLocation(cityName){

    // 1. Call the API asynchronously
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      // 2. Put the city into state
      setCity(response.data[0].display_name)
      console.log(response.data);

      // 3. Put the lat/lon into state
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);

    } catch(error) {
      console.error(error.message);
      setErrorMessage(true);
    }

  }

  return (
    <div className="app-container">
      <Header />
      <div className='form-container'>
      <CityForm city={city} handleChangeCity={changeCity} />
      <Map latitude={latitude} longitude={longitude} />
      
      {buttonClicked && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
