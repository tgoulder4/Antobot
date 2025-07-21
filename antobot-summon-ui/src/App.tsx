"use client"

import { useState } from "react"
import type { AppState } from "@/types/app-state"
import { AppHeader } from "./components/AppHeader"
import { StatusDisplay } from "./components/StatusDisplay"
import { MapArea } from "./components/MapArea"
import { ControlButtons } from "./components/ControlButtons"
import { ConnectionIndicator } from "./components/ConnectionIndicator"
import { useConnectionStatus } from "./hooks/useConnectionStatus"



export default function RobotControlApp() {
  const [state, setState] = useState<AppState>("home")
  const { isConnected, setConnectedState } = useConnectionStatus()
  const handleSummon = () => {
    setState("summoning")
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
    <div className="w-screen flex justify-center">
      <div className="min-h-screen overflow-y-hidden bg-white w-full xl:w-1/2 max-w-[1000px] flex flex-col border-x border-gray-200">
        <AppHeader robotState={state} />

        <div className="flex-1 p-4 space-y-4">
          <div className="flex flex-col">

            <h1 className="text-[2.5em] font-bold text-black">Antobot Name</h1>

            <ConnectionIndicator isConnected={isConnected} />
          </div>

          <StatusDisplay state={state} />

          <MapArea />

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
  )
}
