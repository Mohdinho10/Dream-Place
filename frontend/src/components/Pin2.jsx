/* eslint-disable react/prop-types */
import { Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "./Pin.scss";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function Pin({ item }) {
  const [position, setPosition] = useState([60, 19]);
  const map = useMap();

  useEffect(() => {
    ELG.geocode()
      .text(item.address)
      .run((err, results) => {
        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        }
      });
  }, [item, map]);
  const img = item?.images[0];

  return (
    <Marker position={position}>
      <Popup>
        <div className="popup-container">
          <img src={img} alt="map" />
          <div className="text-container">
            <Link to={`/list/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

/* 
import { Marker, Popup } from "react-leaflet";
import "./Pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  const img = item?.images[0];
  console.log(item.images[0]);
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popup-container">
          <img src={img} alt="map" />
          <div className="text-container">
            <Link to={`/list/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin
*/
