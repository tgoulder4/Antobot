'use client'
import type { Location } from "@/types/location";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const useLocation = (): Location & { retrieveNewLocation: () => Location | { error: string } } => {
    const [error, setError] = useState<string | null>(null);
    const [coords, setCoords] = useState<GeolocationCoordinates>({} as GeolocationCoordinates);
    useEffect(() => {
        console.log("Getting location...")
        if (!geo) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        retrieveNewLocation();
    }, []);
    useEffect(() => {
        console.log("Coordinates updated:" + coords);
    }, [coords]);
    const retrieveNewLocation = () => {
        console.log("Retrieving new location...")
        //for testing purposes generate random coordinates
        // if (geo) {
        //     const mockCoords = {
        //         latitude: Math.random() * 180 - 90,
        //         longitude: Math.random() * 360 - 180,
        //         accuracy: Math.random() * 100
        //     }
        //     setCoords(mockCoords as any);
        //     return mockCoords as Location;
        // }
        geo && geo.getCurrentPosition((async (position) => {
            console.log("Current position:" + position)
            setCoords(position.coords)
            console.log("Coordinates obtained:" + position.coords)
            // await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for the position to be set
            console.log("----> Returning coordinates:" + position.coords)
            return { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy, altitude: position.coords.altitude }
        }), (err) => {
            console.error("Error getting location:", err)
            return { error: JSON.stringify(err.message) }
        })
    }
    const geo = useMemo(() => {
        if (navigator.geolocation) {
            console.log("geolocation: ")
            console.dir(navigator.geolocation, { depth: null })
            return navigator.geolocation
        } else {
            console.error("Geolocation is not supported by this browser.")
            return null
        }
    }, []);
    return { latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy, altitude: coords.altitude, retrieveNewLocation } as Location & { retrieveNewLocation: () => Location | { error: string } };
}