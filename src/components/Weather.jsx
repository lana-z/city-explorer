import React from 'react';

const Weather = (props) => {
 
  return (

    <div className="weather-container">
        <h4></h4>
        <div>
            <p>Date: {props.forecast.date}</p>
            <p>Weather: {props.forecast.description}</p>
        </div>
    </div>
  );
};

export default Weather;