import React, { useEffect, useState } from "react";
import axios from "axios";
import TowTruckCard from "./TowTruckCard";
import { Truck } from "lucide-react";

const UserTowTrucks = () => {
    const [towtrucks, setTowtrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserTowTrucks = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                if (!userId) {
                    setError("User not found. Please login again.");
                    setLoading(false);
                    return;
                }
                const token = sessionStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/api/towtrucks/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTowtrucks(response.data);
            } catch (err) {
                console.error("Error fetching tow trucks:", err);
                setError("Failed to load tow trucks.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserTowTrucks();
    }, []);

    const handleEditTowTruck = async (id, updatedData) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/api/towtrucks/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setTowtrucks((prev) =>
                prev.map((truck) => (truck._id === id ? response.data : truck))
            );
        } catch (err) {
            console.error("Error updating tow truck:", err);
        }
    };

    const handleDeleteTowTruck = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/towtrucks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTowtrucks((prev) => prev.filter((truck) => truck._id !== id));
        } catch (err) {
            console.error("Error deleting tow truck:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 dark:border-orange-500" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 dark:text-red-400 mt-8 text-lg">{error}</div>;
    }

    if (towtrucks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Truck className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-lg font-medium">No tow trucks posted yet</p>
                <a href="/add" className="mt-2 text-sm text-orange-600 dark:text-orange-400 hover:underline">
                    Add your first listing
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight">My Listings</h2>
                <span className="text-xs text-muted-foreground">{towtrucks.length} total</span>
            </div>
            {towtrucks.map((truck) => (
                <TowTruckCard
                    key={truck._id}
                    truck={truck}
                    onEdit={handleEditTowTruck}
                    onDelete={handleDeleteTowTruck}
                />
            ))}
        </div>
    );
};

export default UserTowTrucks;
