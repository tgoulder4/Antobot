
import { DevSheet } from "./DevSheet"

interface AppHeaderProps {
    robotState: string
}

export function AppHeader({ robotState }: AppHeaderProps) {
    return (
        <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
            <div className="flex justify-between items-center">
                <img src="/WMGNewTransparent.png" alt="WMG University of Warwick" className="object-contain scale-50" />
                <DevSheet robotState={robotState} />
            </div>
        </div>
    )
}
