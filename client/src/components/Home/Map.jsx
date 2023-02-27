import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function MapService() {
  const long = 5.369257;
  const lat = 35.364086;
  const [viewState, setViewState] = useState({
    longitude: long,
    latitude: lat,
    zoom: 13,
  });

  const [showPopup, setShowPopup] = useState(true);
  return (
    <Map
      mapStyle="mapbox://styles/madjed/cl3ohepqo009315od2lqlvz37"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_KEY}
      {...viewState}
      style={{ width: "100%", height: 500, visibility: "visible" }}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <Marker longitude={long} latitude={lat} anchor="bottom">
        <p className="map-marker">📌</p>
        {showPopup && (
          <Popup
            longitude={long}
            latitude={lat}
            anchor="top"
            onClose={() => setShowPopup(false)}
            focusAfterOpen={false}
          >
            National Street 78, Barika, Batna
          </Popup>
        )}
      </Marker>
    </Map>
  );
}
export default MapService;
