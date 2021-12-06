import React from "react";
import Today from "./today";
import "./weather.css";
import Forecast from "./forecast";

const Weather = ({ location, loading, setCountry }) => {
  return (
    <>
      <Today location={location} loading={loading} setCountry={setCountry} />
      <Forecast location={location} loading={loading} />
    </>
  );
};

export default Weather;
