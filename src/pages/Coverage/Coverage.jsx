import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";
import { Search } from "lucide-react";

const Coverage = () => {
  const position = [23.685, 90.3563]; // Example: Dhaka, Bangladesh coordinates
  const serviceCenterData = useLoaderData();
  const mapRef = useRef(null)
  const handleSearch = (e) =>{
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenterData.find(cent=> cent.district.toLowerCase().includes(location.toLowerCase()));
    if(district){
        const coOrdinates = [district.latitude, district.longitude];
        mapRef.current.flyTo(coOrdinates, 11);
    }
  }
  return (
    <div className="my-10 md:my-15 lg:my-20">
      <h1 className="text-2xl md:text-4xl font-semibold text-secondary">
        We are available in 64 districts
      </h1>
      <div className="border-b-2 border-gray-300 pb-10">
        <form className="flex items-center pt-8" onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" name="location" />
          </label>
        </form>
      </div>
      <div className="h-[777px] w-full pt-11">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenterData.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
