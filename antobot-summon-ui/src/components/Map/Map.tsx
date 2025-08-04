'use client'
import React, { useEffect, useRef } from 'react';
// import Plotly from 'plotly.js-dist'

// ===================================================================
// 1. TYPE DEFINITIONS (Copied from the previous example)
// ===================================================================
// These interfaces define the 'shape' of the mapData prop.

interface MapPosition {
    x: number;
    y: number;
}

interface MapOrigin {
    position: MapPosition;
}

interface MapInfo {
    height: number;
    width: number;
    resolution: number;
    origin: MapOrigin;
}
interface MapPlotProps {
    // We accept `mapData` or `null` to handle cases where data is still loading.
    mapData: MapData | null;
}
export interface MapData {
    info: MapInfo;
    data: number[] | Int8Array;
}

export const MapPlot: React.FC<MapPlotProps> = ({ mapData }) => {

    const plotRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // We only proceed if the div has been rendered and we have map data.
        if (plotRef.current && mapData) {
            const { width, resolution, origin } = mapData.info;
            const data = mapData.data;

            const occupiedX: number[] = [];
            const occupiedY: number[] = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i] > 0) {
                    const row = Math.floor(i / width);
                    const col = i % width;
                    const x = col * resolution + origin.position.x;
                    const y = row * resolution + origin.position.y;
                    occupiedX.push(x);
                    occupiedY.push(y);
                }
            }

            // The Plotly trace definition remains the same.
            const trace: Partial<Plotly.ScatterData> = {
                x: occupiedX,
                y: occupiedY,
                mode: 'markers',
                type: 'scatter',
                marker: {
                    color: 'black',
                    symbol: 'square',
                    size: 5,
                },
                name: 'Occupied Cells',
            };

            // Define the layout of the plot for a better appearance.
            const layout: Partial<Plotly.Layout> = {
                autosize: true,
                plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background
                paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent paper background

                yaxis: {
                    showticklabels: false,
                    //black grid lines with 0.5 opacity
                    // gridcolor: 'rgba(0, 0, 0, 0.1)',
                    fixedrange: true,
                },
                xaxis: {
                    scaleanchor: 'y', // This and the next line ensure a 1:1 aspect ratio
                    scaleratio: 1,
                    showticklabels: false,
                    // gridcolor: 'rgba(0, 0, 0, 0.1)',
                    fixedrange: true,
                },
                margin: { l: 50, r: 50, b: 50, t: 70 },
            };

            // Use Plotly.react() for declarative, efficient updates in React.
            // It creates the plot on the first run and intelligently updates it on subsequent runs.
            // Plotly.react(plotRef.current, [trace as Plotly.Data], layout);
        }
    }, [mapData]); // Dependency Array: This effect re-runs ONLY when `mapData` changes.

    // The component renders a single div, which the 'ref' connects to our code.
    return <div ref={plotRef} style={{ width: '100%', height: '500px' }} />;
};