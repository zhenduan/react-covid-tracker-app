import React, { useContext } from "react";
import {
  Map,
  CircleMarker,
  TileLayer,
  Tooltip,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { AppContext } from "../context";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import numeral from "numeral";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function DataMap() {
  const { countries } = useContext(AppContext);

  let minLat = -6.1751;
  let maxLat = 55.7558;
  let minLong = 37.6173;
  let maxLong = 139.6917;
  var centerLat = (minLat + maxLat) / 2;
  var distanceLat = maxLat - minLat;
  var bufferLat = distanceLat * 0.05;
  var centerLong = (minLong + maxLong) / 2;
  var distanceLong = maxLong - minLong;
  var bufferLong = distanceLong * 0.05;

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Covid-19 Cases in Countries</h3>
      <Map
        className="bubble-map"
        style={{ height: "480px", width: "100%" }}
        zoom={4}
        center={[centerLat, centerLong]}
        // bounds={[
        //   [minLong - bufferLat, minLong - bufferLong],
        //   [maxLat + bufferLat, maxLong + bufferLong],
        // ]}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {countries.map((country) => {
          return (
            <div key={country.country}>
              <CircleMarker
                center={[country.countryInfo.lat, country.countryInfo.long]}
                radius={20 * Math.log(country.cases / 1000000)}
                fillOpacity={0.5}
                stroke={false}
              >
                {/* <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>
                  {country.country + " total cases: " + country.cases}
                </span>
              </Tooltip> */}
              </CircleMarker>
              <Marker
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div className="popup__container">
                    {/* flag */}
                    <img src={country.countryInfo.flag} />
                    {/* Country name */}
                    <p>{country.country}</p>
                    {/* Total cases */}
                    <p>
                      Total cases:{" "}
                      <strong> {numeral(country.cases).format("0,0")} </strong>
                    </p>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </Map>
    </div>
  );
}

export default DataMap;
