"use client"

import { useState } from "react"
import type { AppState } from "@/types/app-state"
import { AppHeader } from "./components/AppHeader"
import { StatusDisplay } from "./components/StatusDisplay"
import { MapArea } from "./components/MapArea"
import { ControlButtons } from "./components/ControlButtons"



export default function RobotControlApp() {
  const [state, setState] = useState<AppState>("home")

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
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto border-x border-gray-200">
      {/* Header */}
      <AppHeader robotState={state} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between p-4 space-y-4">
        <div className="title-area">
          <h1 className="text-2xl font-bold text-black">Sam's Antobot</h1>
          <StatusDisplay state={state} />
          <MapArea />
        </div>

        <ControlButtons
          state={state}
          onSummon={handleSummon}
          onHalt={handleHalt}
          onStop={handleStop}
          onPlay={handlePlay}
        />
      </div>
    </div>
  )
}
