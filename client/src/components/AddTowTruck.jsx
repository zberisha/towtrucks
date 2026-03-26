import MapDialog from "./MapDialog";
import LocationPreview from "./LocationPreview";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Textarea } from "./ui/textarea.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AddTowTruck = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        phoneNumber: "",
        description: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [coords, setCoords] = useState(null);
    const [showMapDialog, setShowMapDialog] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleCoordinatesSubmit = (selectedCoords) => {
        setCoords(selectedCoords);
        if (errors.coords) {
            setErrors((prev) => ({ ...prev, coords: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        const name = formData.businessName.trim();
        if (!name) {
            newErrors.businessName = "Business name is required.";
        } else if (name.length < 2) {
            newErrors.businessName = "Business name must be at least 2 characters.";
        } else if (name.length > 100) {
            newErrors.businessName = "Business name must be under 100 characters.";
        }

        const phone = formData.phoneNumber.trim();
        if (!phone) {
            newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^[\d\s+\-()]{7,20}$/.test(phone)) {
            newErrors.phoneNumber = "Enter a valid phone number.";
        }

        if (!coords) {
            newErrors.coords = "Please select a location on the map.";
        }

        const desc = formData.description.trim();
        if (desc && desc.length < 10) {
            newErrors.description = "Description must be at least 10 characters if provided.";
        } else if (desc.length > 500) {
            newErrors.description = "Description must be under 500 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;

        const storedUserId = sessionStorage.getItem("userId");
        if (!storedUserId) {
            setErrors({ form: "User is not logged in." });
            return;
        }

        const payload = {
            businessName: formData.businessName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            description: formData.description.trim(),
            coords: coords ? { lat: coords[0], lng: coords[1] } : undefined,
            user: storedUserId,
        };

        try {
            const token = sessionStorage.getItem("token");
            await axios.post("http://localhost:5000/api/towtrucks", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setMessage("Business registered successfully!");
            setErrors({});
            navigate("/");
        } catch (err) {
            const serverError = err.response?.data?.error;
            if (err.response?.data?.errors) {
                const fieldErrors = {};
                err.response.data.errors.forEach((e) => {
                    fieldErrors[e.field] = e.message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ form: serverError || "Error registering business. Please try again." });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4" noValidate>
            <div className="flex flex-col gap-6">
                <Card className="border border-orange-100 dark:border-orange-900/30">
                    <CardHeader>
                        <CardTitle>Register a Business</CardTitle>
                        <CardDescription>
                            Enter your business details below to create a new listing.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-6">
                            {/* Business Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="businessName">Name of Business *</Label>
                                <Input
                                    id="businessName"
                                    name="businessName"
                                    type="text"
                                    placeholder="Enter business name"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className={errors.businessName ? "border-red-500 focus-visible:ring-red-500" : ""}
                                />
                                {errors.businessName && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="grid gap-2">
                                <Label>Location *</Label>
                                {coords ? (
                                    <MapDialog
                                        onCoordinatesSubmit={handleCoordinatesSubmit}
                                        initialCoords={coords}
                                        trigger={
                                            <button type="button" className="w-full text-left">
                                                <LocationPreview coords={coords} />
                                            </button>
                                        }
                                    />
                                ) : (
                                    <>
                                        <MapDialog
                                            onCoordinatesSubmit={handleCoordinatesSubmit}
                                        />
                                        {errors.coords && (
                                            <p className="text-sm text-red-600 dark:text-red-400">{errors.coords}</p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="grid gap-2">
                                <Label htmlFor="phoneNumber">Phone Number *</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Enter phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
                                />
                                {errors.phoneNumber && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Tell us about your business..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={`h-32 ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                <div className="flex justify-between">
                                    {errors.description ? (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                    ) : (
                                        <span />
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        {formData.description.length}/500
                                    </p>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Register Business
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have a listing?{" "}
                            <a href="/edit" className="underline underline-offset-4 hover:text-orange-700 dark:hover:text-orange-400">
                                Edit Listing
                            </a>
                        </div>

                        {message && (
                            <p className="text-green-600 dark:text-green-400 mt-3 text-center text-sm font-medium">{message}</p>
                        )}
                        {errors.form && (
                            <p className="text-red-600 dark:text-red-400 mt-3 text-center text-sm font-medium">{errors.form}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

export default AddTowTruck;
