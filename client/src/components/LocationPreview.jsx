import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import towTruckMarkerIcon from "./icons/TowTruckMarker";
import "./styles/Leaflet.css";

const LocationPreview = ({ coords, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 transition-colors group"
            style={{ height: "180px" }}
        >
            <MapContainer
                center={coords}
                zoom={14}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                doubleClickZoom={false}
                attributionControl={false}
                style={{ width: "100%", height: "100%", pointerEvents: "none" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={coords} icon={towTruckMarkerIcon} />
            </MapContainer>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors flex items-end justify-center pointer-events-none">
                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1.5 rounded-t-lg border border-b-0 border-orange-200 dark:border-orange-800">
                    <p className="text-xs font-medium text-orange-700 dark:text-orange-400">
                        Click to change location
                    </p>
                </div>
            </div>

            <div className="absolute top-2 right-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground pointer-events-none">
                {coords[0].toFixed(4)}, {coords[1].toFixed(4)}
            </div>
        </div>
    );
};

export default LocationPreview;
