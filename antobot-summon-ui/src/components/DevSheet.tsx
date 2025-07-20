import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { DevTestComponent } from "./DevTestComponent"

interface DevSheetProps {
    robotState: string
}

export function DevSheet({ robotState }: DevSheetProps) {
    const testGPSAccuracy = () => {
        console.log("Testing GPS accuracy...")
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="h-10 px-3 gap-2">
                    <Menu className="h-6 w-6" />
                    <span className="hidden md:inline">Show Dev Options</span>
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
                                { label: "Accuracy", value: "±2.3m" },
                                { label: "Satellites", value: "12" },
                                { label: "Fix Type", value: "3D" },
                            ]}
                            onTest={testGPSAccuracy}
                        />

                        <DevTestComponent
                            buttonText="Test Battery Status"
                            subtitle="Power Metrics"
                            properties={[
                                { label: "Battery Level", value: "87%" },
                                { label: "Voltage", value: "24.3V" },
                                { label: "Current", value: "2.1A" },
                            ]}
                            onTest={() => console.log("Testing battery...")}
                        />

                        <DevTestComponent
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
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
