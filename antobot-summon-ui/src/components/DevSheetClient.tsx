'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Wrench } from "lucide-react"
import { DevTestComponent } from "./DevTestComponent"
import { useEffect, useMemo, useState } from "react"

interface DevSheetProps {
    initialise: () => Promise<ROSLIB.Ros>
    isConnected: boolean
}
type DevComponentProps = {
    latitude: number
    longitude: number
    accuracy: number

}

export function DevSheet({ initialise, isConnected }: DevSheetProps) {
    const [props, setProps] = useState<DevComponentProps>({ latitude: 0, longitude: 0, accuracy: 0 })
    const [geostate, setGeoState] = useState<0 | 1 | 2 | 3 | String | null>(null);

    useEffect(() => {
        setGeoState(0)
        getLocation()
    }, [])

    const testGPSAccuracy = () => {
        console.log("Testing GPS accuracy...")
        getLocation()

        // setProps({ latitude: 0, longitude: 0 })
        console.log("GPS accuracy test complete. Current coordinates:", props)
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
    }, [])
    navigator.geolocation.getCurrentPosition
    const getLocation: () => Promise<void> = async () => {
        console.log("Getting location...")
        setGeoState(1)
        let coords: GeolocationCoordinates = ({} as GeolocationCoordinates)
        if (!geo) return;
        geo.getCurrentPosition((async (position) => {
            console.log("Current position:", position)
            coords = position.coords
            console.log("Coordinates obtained:", coords)
            setGeoState(2)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for the position to be set
            console.log("----> Returning coordinates:", coords)
            setGeoState(3)
            setProps({ latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy })
        }), (error) => {
            console.error("Error getting location:", error)
            setGeoState(JSON.stringify(error.message))
            return
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="h-10 px-3 gap-2 ">
                    <Wrench className="h-6 w-6" />
                    {/* <span className="hidden md:inline">Show Dev Options</span> */}
                    <span className="sr-only md:hidden">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 flex flex-col">
                <SheetHeader className="flex-shrink-0">
                    <SheetTitle>Dev Options</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto mt-6 p-4">
                    <div className="space-y-6 pb-6">
                        <DevTestComponent
                            buttonText="Test GPS Accuracy"
                            subtitle="GPS Metrics"
                            properties={[
                                { label: "Latitude", value: props.latitude ? props.latitude.toFixed(6) : "N/A" },
                                { label: "Longitude", value: props.longitude ? props.longitude.toFixed(6) : "N/A" },
                                { label: "Accuracy", value: props.accuracy ? `${props.accuracy}m` : "N/A" },
                            ]}
                            onTest={testGPSAccuracy}
                            customComponetns={<div>
                                {
                                    geostate && <div className="bg-green-500 ">{`geostate is not null, and is ${geostate}. end`}</div>
                                }
                            </div>}
                        />

                        <DevTestComponent
                            buttonText="Test Connectivity with Robot"
                            subtitle="Connectivity Metrics"
                            onTest={initialise}
                            properties={[
                                // { label: "Battery Level", value: "87%" },
                                // { label: "Voltage", value: "24.3V" },
                                // { label: "Current", value: "2.1A" },
                            ]}
                            customComponetns={
                                <div className="flex flex-col gap-2">
                                    {isConnected === true && <div className="text-green-500">Robot is online!</div>}
                                    {isConnected === false && <div className="text-red-500">Error pinging robot</div>}
                                </div>
                            }
                        />

                        {/* <DevTestComponent
                            buttonText="Test Network Status"
                            subtitle="Connection Metrics"
                            properties={[
                                { label: "Signal Strength", value: "-45 dBm" },
                                { label: "Robot Status", value: robotState.toUpperCase() },
                                { label: "Latency", value: "23ms" },
                            ]}
                            onTest={() => console.log("Testing network...")}
                        />

                        <DevTestComponent
                            buttonText="Test Motor Status"
                            subtitle="Motor Metrics"
                            properties={[
                                { label: "Left Motor", value: "OK" },
                                { label: "Right Motor", value: "OK" },
                                { label: "Speed", value: "1.2 m/s" },
                            ]}
                            onTest={() => console.log("Testing motors...")}
                        />

                        <DevTestComponent
                            buttonText="Test Sensors"
                            subtitle="Sensor Metrics"
                            properties={[
                                { label: "Lidar", value: "Active" },
                                { label: "Camera", value: "720p" },
                                { label: "IMU", value: "Stable" },
                            ]}
                            onTest={() => console.log("Testing sensors...")}
                        />

                        <DevTestComponent
                            buttonText="Test Navigation"
                            subtitle="Navigation Metrics"
                            properties={[
                                { label: "Path Planning", value: "Ready" },
                                { label: "Obstacle Avoidance", value: "Active" },
                                { label: "Localization", value: "Good" },
                            ]}
                            onTest={() => console.log("Testing navigation...")}
                        /> */}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
