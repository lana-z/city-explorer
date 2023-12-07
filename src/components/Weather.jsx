import React from 'react';

const Weather = (props) => {
 
  return (

    <div className="weather-container">
      {props.forecast && (
        <div>
          <h4>Here's what you can expect the weather in {props.city} to be like.</h4>
          {props.forecast.data.map((day, index) => (
            <div key={index} className="weather-day">
              <p>Date: {day.datetime}</p>
              <p>Temp: {day.temp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;