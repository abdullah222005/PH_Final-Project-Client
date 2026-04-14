import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import L from "leaflet";

// Custom Marker Icon (Zapshift Brand Color)
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Coverage = () => {
  const position = [23.8103, 90.4125]; // Center of Bangladesh
  const serviceCenterData = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenterData.find((cent) =>
      cent.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 12, {
        duration: 2,
      });
    }
  };

  const focusLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 13);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 lg:py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div className="max-w-xl">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">
            Our Network
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-secondary mt-2">
            Available in <span className="text-primary">64 Districts</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Find the nearest Zapshift service point and check coverage in your
            area.
          </p>
        </div>

        {/* Modern Search Bar */}
        <form className="w-full md:w-96 relative group" onSubmit={handleSearch}>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            name="location"
            type="search"
            placeholder="Search your district..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary transition-colors">
            Find
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
        {/* Sidebar - Location List */}
        <div className="lg:col-span-1 bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 bg-white border-b border-gray-100">
            <h3 className="font-bold text-secondary text-lg">
              Service Centers
            </h3>
            <p className="text-xs text-gray-400">
              Total {serviceCenterData.length} active hubs
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {serviceCenterData.map((center, idx) => (
              <button
                key={idx}
                onClick={() => focusLocation(center.latitude, center.longitude)}
                className="w-full text-left p-4 bg-white rounded-2xl border border-transparent hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-gray-400 group-hover:text-primary transition-colors mt-1"
                    size={18}
                  />
                  <div>
                    <h4 className="font-bold text-secondary group-hover:text-primary transition-colors">
                      {center.district}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {center.covered_area.join(", ")}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3 relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Modern, cleaner map style
            />
            {serviceCenterData.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
                icon={customIcon}
              >
                <Popup className="zapshift-popup">
                  <div className="p-2">
                    <h3 className="font-bold text-primary text-lg border-b pb-1 mb-2">
                      {center.district}
                    </h3>
                    <p className="text-sm font-semibold text-secondary mb-1">
                      Coverage Areas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {center.covered_area.map((area, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-[10px] px-2 py-0.5 rounded-full text-gray-600"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Subtle Overlay Badge */}
          <div className="absolute bottom-6 left-6 z-[1000] bg-secondary/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium tracking-wide">
              Live Hub Monitoring Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
