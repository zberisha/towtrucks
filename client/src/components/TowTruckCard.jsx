import React, { useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import towTruckMarkerIcon from "./icons/TowTruckMarker";
import { Pencil, Trash2, MapPin, Phone } from "lucide-react";
import "./styles/Leaflet.css";

const TowTruckCard = ({ truck, onEdit, onDelete }) => {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editBusinessName, setEditBusinessName] = useState(truck.businessName);
    const [editDescription, setEditDescription] = useState(truck.description || "");
    const [editPhoneNumber, setEditPhoneNumber] = useState(truck.phoneNumber);

    const hasCoords = truck.coords && truck.coords.lat && truck.coords.lng;

    return (
        <Card className="overflow-hidden border border-orange-100 dark:border-orange-900/30">
            {/* Map preview with action buttons */}
            <div className="relative">
                {hasCoords ? (
                    <div className="h-32 w-full">
                        <MapContainer
                            center={[truck.coords.lat, truck.coords.lng]}
                            zoom={13}
                            scrollWheelZoom={false}
                            dragging={false}
                            zoomControl={false}
                            doubleClickZoom={false}
                            attributionControl={false}
                            style={{ width: "100%", height: "100%" }}
                            className="pointer-events-none"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[truck.coords.lat, truck.coords.lng]}
                                icon={towTruckMarkerIcon}
                            />
                        </MapContainer>
                    </div>
                ) : (
                    <div className="h-32 w-full bg-orange-50 dark:bg-neutral-900 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <MapPin className="h-6 w-6 mx-auto mb-1 opacity-40" />
                            <p className="text-xs">No location set</p>
                        </div>
                    </div>
                )}

                {/* Action buttons - top right, z-20 to stay above map tiles */}
                <div className="absolute top-2 right-2 z-[1000] flex gap-1.5">
                    <button
                        type="button"
                        onClick={() => setEditDialogOpen(true)}
                        className="h-7 w-7 rounded-md bg-white dark:bg-neutral-900 border border-orange-200 dark:border-orange-700 flex items-center justify-center text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors shadow"
                        title="Edit"
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleteDialogOpen(true)}
                        className="h-7 w-7 rounded-md bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-700 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors shadow"
                        title="Delete"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Card info */}
            <CardContent className="px-3 py-2.5 space-y-1">
                <h3 className="font-semibold text-sm leading-tight">{truck.businessName}</h3>

                {truck.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{truck.description}</p>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <a
                        href={`tel:${truck.phoneNumber}`}
                        className="inline-flex items-center gap-1.5 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                    >
                        <Phone className="h-3.5 w-3.5" />
                        {truck.phoneNumber}
                    </a>
                    {hasCoords && (
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {truck.coords.lat.toFixed(4)}, {truck.coords.lng.toFixed(4)}
                        </span>
                    )}
                </div>
            </CardContent>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogTitle>Edit Tow Truck</DialogTitle>
                    <DialogDescription>
                        Update the details of your tow truck listing.
                    </DialogDescription>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onEdit(truck._id, {
                                businessName: editBusinessName,
                                description: editDescription,
                                phoneNumber: editPhoneNumber,
                            });
                            setEditDialogOpen(false);
                        }}
                        className="space-y-4 mt-2"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor={`edit-name-${truck._id}`}>Business Name</Label>
                            <Input
                                id={`edit-name-${truck._id}`}
                                value={editBusinessName}
                                onChange={(e) => setEditBusinessName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`edit-phone-${truck._id}`}>Phone Number</Label>
                            <Input
                                id={`edit-phone-${truck._id}`}
                                value={editPhoneNumber}
                                onChange={(e) => setEditPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`edit-desc-${truck._id}`}>Description</Label>
                            <Textarea
                                id={`edit-desc-${truck._id}`}
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="h-24"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogTitle>Delete Tow Truck</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <span className="font-semibold">{truck.businessName}</span>? This action cannot be undone.
                    </DialogDescription>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                onDelete(truck._id);
                                setDeleteDialogOpen(false);
                            }}
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default TowTruckCard;
