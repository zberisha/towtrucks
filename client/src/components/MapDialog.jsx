import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DraggableMarker from "./DraggableMarker";

export default function MapDialog({ onCoordinatesSubmit, initialCoords, trigger }) {
    const [open, setOpen] = useState(false);
    const [markerPos, setMarkerPos] = useState(initialCoords || null);

    const handleOpen = (isOpen) => {
        if (isOpen && initialCoords) {
            setMarkerPos(initialCoords);
        }
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        variant="ghost"
                        type="button"
                        className="border border-dashed border-orange-300 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950 text-orange-700 dark:text-orange-400"
                    >
                        Select Location On Map
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl w-full h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Select Location</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground -mt-1">
                    Click on the map to place a marker, or drag it to adjust.
                </p>

                <div className="flex-1 w-full overflow-hidden rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <DraggableMarker
                        selectedCoordinates={markerPos}
                        onSelect={(coords) => setMarkerPos(coords)}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    {markerPos ? (
                        <p className="text-sm text-muted-foreground">
                            {markerPos[0].toFixed(5)}, {markerPos[1].toFixed(5)}
                        </p>
                    ) : (
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                            No location selected yet
                        </p>
                    )}
                    <Button
                        type="button"
                        disabled={!markerPos}
                        onClick={() => {
                            if (markerPos) {
                                onCoordinatesSubmit(markerPos);
                            }
                            setOpen(false);
                        }}
                    >
                        Confirm Location
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
