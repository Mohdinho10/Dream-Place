/* eslint-disable react/prop-types */
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ items }) {
  // const position = [51.505, -0.09];
  console.log(items);

  return (
    <MapContainer
      // center={
      //   items?.length === 1
      //     ? [items[0]?.latitude, items[0]?.longitude]
      //     : position
      // }
      center={[53.35, 18.8]}
      zoom={6}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items?.map((item) => (
        <Pin item={item} key={item?.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
