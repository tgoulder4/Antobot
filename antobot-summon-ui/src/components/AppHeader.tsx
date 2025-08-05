
import type ROSLIB from "roslib"
import { DevSheet } from "./DevSheetClient"
import { useEffect } from "react"
import imgUrl from './WMGNewTransparent.png'
//get url
interface AppHeaderProps {
    robotState: string
    initialise: () => Promise<ROSLIB.Ros>
    isConnected: boolean
}

export function AppHeader({ robotState, isConnected, initialise }: AppHeaderProps) {
    useEffect(() => {

        const heroImg = document.getElementById('hero-img') as HTMLImageElement;
        if (heroImg) {
            heroImg.src = imgUrl;
            heroImg.alt = "WMG University of Warwick";
        }
    }, [])
    return (
        <>
            <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-center items-center space-x-4">
                        <img id="hero-img" alt="WMG University of Warwick" className="object-contain w-[175px] flex flex-1 justify-start" />
                        <p className="text-gray-300">|</p>
                        <p className="text-gray-400">Tye Goulder</p>
                    </div>
                    <DevSheet isConnected={isConnected} initialise={initialise} />
                </div>
            </div>
        </>
    )
}
