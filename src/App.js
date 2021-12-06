import { useState, useEffect } from "react";
import "./App.css";
import Map from "./component/map/map";
import Weather from "./component/weather/weather";
import Currency from "./component/currency/currency";

function App() {
  const [currLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(null);

  const getPosition = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(currentPosition);
    setLoading(false);
    // console.log(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPosition);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <Weather location={currLocation} loading={loading} setCountry={setCountry} />
      </div>
      <div className="row-map">
        <Map location={currLocation} loading={loading} />
        <div className="h-line"> </div>
        <Currency location={country} loading={loading} />
      </div>
    </div>
  );
}

export default App;
