import React, { useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

const Nextdays = ({ location, loading }) => {
  const [forecast, setForecast] = React.useState([]);
  const [idx, setIdx] = React.useState(0);
  const setIndex = () => {
    if (idx + 3 < forecast.length) {
      setIdx(idx + 3);
    }
  };
  useEffect(() => {
    const getForecast = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.lat}&lon=${location.lng}&cnt=16&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setForecast(res.data.list);
      } catch (error) {
        console.error(error);
      }
    };
    !loading && getForecast();
  }, [loading]);

  return (
    <div className="center">
      <button className="forecast-button" onClick={() => setIndex()}>
        Next 3 Days Forecast
      </button>
      {forecast.length > 0 &&
        forecast.map((day, i) => {
          if (i >= idx && i < idx + 3) {
            return (
              <div className="forecast-card" key={i}>
                <span>
                  <Moment format="ddd, MMM DD">{day.dt * 1000}</Moment>
                </span>
                <span className="forecast-card-temp">
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  />
                  <span>
                    {Math.round(day.temp.max - 273)} /{" "}
                    {Math.round(day.temp.min - 273)}°C
                  </span>
                </span>
                <span>{day.weather[0].description}</span>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Nextdays;
