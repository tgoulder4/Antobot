"use client"

import { useState } from "react"
import type { AppState } from "@/types/app-state"
import { AppHeader } from "./components/AppHeader"
import { StatusDisplay } from "./components/StatusDisplay"
import { ControlButtons } from "./components/ControlButtons"
import { ConnectionIndicator } from "./components/ConnectionIndicator"
import { useConnectionStatus } from "./hooks/useConnectionStatus"
import { summon } from "./lib/summon"
import { useLocation } from "./hooks/useLocation"
// import { toast } from "sonner"
import { mockMapData } from "./lib/mockMapData"
import LiveMapView from "./components/Map/LiveMapView"
export default function RobotControlApp() {
  const [state, setState] = useState<AppState>("home")
  const { isConnected, initialise } = useConnectionStatus()
  const loc = useLocation()

  async function handleSummon() {
    const r = await initialise()
    const { latitude, longitude, altitude } = loc;
    const res = await summon(r, latitude, longitude, altitude)
    // toast("Summon response:" + JSON.stringify(res))
    if (res.success) {
      setState("summoning")
    } else {
      // toast.error("Failed to summon robot:" + res.message)
    }
  }

  const handleHalt = () => {
    setState("halted")
  }

  const handleStop = () => {
    setState("home")
  }

  const handlePlay = () => {
    setState("summoning")
  }

  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="min-h-screen overflow-y-hidden bg-white w-full xl:w-1/2 max-w-[1000px] flex flex-col border-x border-gray-200">
          <AppHeader isConnected={isConnected} robotState={state} initialise={initialise} />

          <div className="flex-1 p-4 space-y-4">
            <div className="flex flex-col">

              <h1 className="text-[2.5em] font-bold text-black">Antobot Name</h1>

              <ConnectionIndicator isConnected={isConnected} />
            </div>

            <StatusDisplay state={state} />

            <LiveMapView />

            <ControlButtons
              connectedState={isConnected}
              state={state}
              onSummon={handleSummon}
              onHalt={handleHalt}
              onStop={handleStop}
              onPlay={handlePlay}
            />
          </div>
        </div>
      </div>
    </>
  )
}
