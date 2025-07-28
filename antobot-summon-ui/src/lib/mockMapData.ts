import type { MapData } from "@/components/Map/Map";

export const mockMapData: MapData = {
    //make a realistic map with obstacles
    info: {
        height: 100,
        width: 100,
        resolution: 0.1,
        origin: {
            position: { x: 0, y: 0 }
        }
    },
    data: new Int8Array(10000).fill(1) // Mock data for testing
}