import React from "react";
import GoogleMapReact from "google-map-react";

const MapComp = ({ text }) => <div>{text}</div>;

const Map = ({ location, loading }) => {
  return (
    // Important! Always set the container height explicitly
    <>
      {!loading ? (
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={location}
            defaultZoom={5}
          >
            <MapComp lat={22.83} lng={88.33} />
          </GoogleMapReact>
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
};

export default Map;
