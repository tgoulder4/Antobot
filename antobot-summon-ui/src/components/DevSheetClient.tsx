'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Wrench } from "lucide-react"
import { DevTestComponent } from "./DevTestComponent"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "@/hooks/useLocation"
import type { Location } from "@/types/location"
import { Ros, Topic, Message } from "roslib"
import { convertEuclideanToCartesian } from "@/conversions/euclideanToCartesian"
import { toast } from "sonner"

interface DevSheetProps {
    initialise: () => Promise<ROSLIB.Ros>
    isConnected: boolean
}
type DevComponentProps = {
    latitude: number
    longitude: number
    accuracy: number
    altitude: number
    cart: number[]
}

export function DevSheet({ initialise, isConnected }: DevSheetProps) {
    const [props, setProps] = useState<DevComponentProps>({ latitude: 0, longitude: 0, accuracy: 0, altitude: 0, cart: [] })
    const [geostate, setGeoState] = useState<0 | 1 | 2 | 3 | String | null>(null);
    const { latitude, longitude, accuracy, altitude, retrieveNewLocation } = useLocation();

    useEffect(() => {
        setGeoState(0)
        console.log("useLocation hook returned:" + { latitude, longitude, accuracy })
        //get cart
        async function main() {
            // const cart = await convertEuclideanToCartesian(latitude, longitude, accuracy);
            setProps({
                latitude,
                longitude,
                accuracy,
                altitude,
                cart: await convertEuclideanToCartesian(latitude, longitude, altitude)
            })
        }
        main()
    }, [latitude, longitude, accuracy])

    const testGPSAccuracy = () => {
        console.log("Testing GPS accuracy...")


        // setProps({ latitude: 0, longitude: 0 })
        console.log("GPS accuracy test complete. Current coordinates:" + props)
    }

    // const broadcastNewLocation = async () => {
    //     if (!isConnected) {
    //         console.error("Cannot broadcast location, not connected to robot");
    //         return;
    //     }
    //     console.log("Broadcasting new location to robot...");
    //     const ros = await initialise();
    //     const topic = new Topic({
    //         ros: ros,
    //         name: '/summon',
    //         messageType: 'geometry_msgs/PoseStamped'
    //     });
    //     const message = new Message({
    //         header: {
    //             frame_id: 'map',
    //             stamp: { sec: 0, nsec: 0 }
    //         },
    //         pose: {
    //             position: { x: props.latitude, y: props.longitude, z: 0 },
    //             orientation: { x: 0, y: 0, z: 0, w: 1 }
    //         }
    //     });
    //     topic.publish(message);
    //     console.log("Location broadcasted:", message);
    // }
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
                            buttonText="Get new co-ords"
                            subtitle="GPS Metrics automatically refresh every second. Click to manually refresh."
                            properties={[
                                { label: "Latitude", value: props.latitude ? props.latitude.toFixed(6) : "N/A" },
                                { label: "Longitude", value: props.longitude ? props.longitude.toFixed(6) : "N/A" },
                                { label: "Altitude", value: props.altitude ? `${props.altitude}m` : "N/A" },
                                { label: "Accuracy", value: props.accuracy ? `${props.accuracy}m` : "N/A" },
                                { label: 'In cartesian', value: props.cart.length > 0 ? `(${props.cart[0].toFixed(2)}, ${props.cart[1].toFixed(2)}, ${props.cart[2].toFixed(2)})` : "N/A" },
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


                        <DevTestComponent
                            buttonText="Broadcast Co-ordinates"
                            subtitle="Click to send current coordinates to robot"
                            onTest={async () => {
                                retrieveNewLocation();
                                //  broadcastNewLocation()
                            }}
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
