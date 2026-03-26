import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import towTruckMarkerIcon from "./icons/TowTruckMarker";
import "./styles/Leaflet.css";

function MapClickHandler({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

const DraggableMarker = ({
    selectedCoordinates,
    onSelect,
    style,
}) => {
    return (
        <div style={style || { width: "400px", height: "400px" }}>
            <MapContainer
                center={selectedCoordinates || [41.3281482, 19.8184435]}
                zoom={selectedCoordinates ? 13 : 8}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <MapClickHandler onSelect={onSelect} />

                {selectedCoordinates && (
                    <Marker
                        position={selectedCoordinates}
                        draggable={true}
                        icon={towTruckMarkerIcon}
                        eventHandlers={{
                            dragend: (e) => {
                                const { lat, lng } = e.target.getLatLng();
                                onSelect([lat, lng]);
                            },
                        }}
                    >
                        <Popup>
                            Lat: {selectedCoordinates[0].toFixed(4)} <br />
                            Lng: {selectedCoordinates[1].toFixed(4)}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default DraggableMarker;
