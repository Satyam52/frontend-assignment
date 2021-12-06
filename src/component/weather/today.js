import React from "react";
import axios from "axios";
import Moment from "react-moment";

const Today = ({ location, loading, setCountry }) => {
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setWeather(res.data);
        setCountry(res.data.sys.country);
      } catch (error) {
        console.error(error);
      }
    };
    !loading && getData();
  }, [loading]);
  return (
    <>
      {!loading && weather ? (
        <div className="center">
          <div className="weather-time-date center">
            <Moment format="h:mm a, MMM DD">{weather.dt * 1000}</Moment>
          </div>
          <div className="center city-name">{weather.name}</div>
          <div className="weather-temp">
            <img
              src={`https://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              style={{ width: "40px", height: "40px" }}
              alt="weather-alt"
            />{" "}
            <span className="center">
              {Math.round(weather.main.temp - 273.15)}°C{" "}
            </span>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Today;
