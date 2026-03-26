import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import towTruckMarkerIcon from "./icons/TowTruckMarker";
import "./styles/Leaflet.css";

function LeafletHome() {
    const [towtrucks, setTowtrucks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/towtrucks")
            .then((response) => {
                setTowtrucks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tow trucks:", error);
            });
    }, []);

    return (
        <MapContainer center={[41.3281482, 19.8184435]} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {towtrucks.map((truck) => (
                <Marker
                    key={truck._id}
                    position={[truck.coords.lat, truck.coords.lng]}
                    icon={towTruckMarkerIcon}
                >
                    <Popup>
                        <h1>{truck.businessName}</h1>
                        <p>Tel : <a href={`tel:${truck.phoneNumber}`}>{truck.phoneNumber}</a></p>
                        <p>Description : {truck.description}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default LeafletHome;




