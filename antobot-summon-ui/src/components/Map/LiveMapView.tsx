'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@/hooks/useLocation'; // Assuming this is the path to your hook
import { MapPlot } from './Map'; // Import the MapPlot component from Map.tsx
import type { MapData } from "@/components/Map/Map";
import type { Location } from "@/types/location"; // Assuming this is the path to your type

// --- Helper function to convert Geo Coords to Pixel Coords ---
const convertGeoToPixel = (
    location: Location,
    mapInfo: MapData['info'],
    mapBounds: { minX: number; maxX: number; minY: number; maxY: number },
    containerSize: { width: number; height: number }
) => {
    if (!location.latitude || !location.longitude) return null;

    // Calculate the percentage position within the geographical bounds
    const lonPercent = (location.longitude - mapBounds.minY) / (mapBounds.maxY - mapBounds.minY);
    const latPercent = (location.latitude - mapBounds.minX) / (mapBounds.maxX - mapBounds.minX);

    // Convert percentages to pixel coordinates within the container
    // We clamp the values between 0 and 1 to ensure the dot stays within the bounds.
    const left = Math.max(0, Math.min(1, lonPercent)) * containerSize.width;
    // For latitude, a higher value means further north, which is 'top' in screen coordinates, so we invert it.
    const top = (1 - Math.max(0, Math.min(1, latPercent))) * containerSize.height;

    return { top, left };
};


export const LiveMapView: React.FC = () => {
    const location = useLocation();
    const [mapData, setMapData] = useState<MapData | null>(null);

    // IMPORTANT: Define the geographical boundaries that your map represents.
    // You must adjust these values to match the actual area of your occupancy grid.
    const mapBounds = useMemo(() => ({
        //this should be in cartesian not lat lon
        minX: -2000,
        maxX: 2000,
        minY: -2000,
        maxY: 2000,
        //4000,4000 1px = 0.5cm
    }), []);

    // Calculate the user's pixel position. useMemo prevents recalculating on every render.
    const userPixelPosition = useMemo(() => {
        // For this example, we assume the map plot container is 70vh high.
        // A more robust solution might use a ResizeObserver to get the exact dimensions.
        const containerHeight = window.innerHeight * 0.7;
        const containerWidth = containerHeight; // Assuming a square map for simplicity
        if (!location.latitude || !location.longitude || !mapData) return null;
        return convertGeoToPixel(location, mapData?.info, mapBounds, { width: containerWidth, height: containerHeight });
    }, [location, mapData, mapBounds]);

    // Load some sample map data when the component mounts
    useEffect(() => {
        const sampleData: MapData = {
            info: { height: 500, width: 500, resolution: 0.1, origin: { position: { x: 0, y: 0 } } },
            data: new Array(500 * 500).fill(0),
        };
        sampleData.data[125250] = 100; // Example occupied cell
        setMapData(sampleData);
    }, []);

    return (
        // This is your preserved layout structure
        <div className="bg-gray-300 rounded-lg h-[70vh] relative flex items-center justify-center">

            {/* 1. The MapPlot component now renders the occupancy grid in the background */}
            <div className="absolute inset-0">
                <MapPlot mapData={mapData} />
            </div>

            {/* 2. The user's location dot, positioned dynamically */}
            {userPixelPosition && (
                <div
                    className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"
                    style={{
                        top: `${userPixelPosition.top}px`,
                        left: `${userPixelPosition.left}px`,
                        transform: 'translate(-50%, -50%)', // Center the dot on the exact coordinate
                    }}
                    title={`Lat: ${location.latitude?.toFixed(4)}, Lon: ${location.longitude?.toFixed(4)}`}
                ></div>
            )}

            {/* 3. The preserved 'antobot' div */}
            <div className="absolute bottom-16 right-12 w-8 h-12 bg-amber-200 border-2 border-amber-800 rounded-sm"></div>
        </div>
    );
};

export default LiveMapView;