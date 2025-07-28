
import type ROSLIB from "roslib"
import { DevSheet } from "./DevSheetClient"

interface AppHeaderProps {
    robotState: string
    initialise: () => Promise<ROSLIB.Ros>
    isConnected: boolean
}

export function AppHeader({ robotState, isConnected, initialise }: AppHeaderProps) {
    return (
        <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-center items-center space-x-4">
                    <img src="/WMGNewTransparent.png" alt="WMG University of Warwick" className="object-contain w-[175px] flex justify-start" />
                    <p className="">|</p>
                    <p className="">Tye Goulder</p>
                </div>
                <DevSheet isConnected={isConnected} initialise={initialise} />
            </div>
        </div>
    )
}
