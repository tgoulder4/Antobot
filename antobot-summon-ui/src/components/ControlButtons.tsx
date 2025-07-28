"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, X } from "lucide-react"
import { useState } from "react"

interface ControlButtonsProps {
    state: "home" | "summoning" | "halted"
    onSummon: () => void
    onHalt: () => void
    onStop: () => void
    onPlay: () => void
    connectedState?: boolean
}

export function ControlButtons({ state, onSummon, onHalt, onStop, onPlay, connectedState }: ControlButtonsProps) {
    if (state === "home") {
        return (
            <div className="space-y-3 pt-4 pb-8">
                <Button
                    onClick={onSummon}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg font-medium rounded-lg"
                    disabled={!connectedState}
                >
                    <Play className="mr-2 h-5 w-5" />
                    Summon
                </Button>
            </div>
        )
    }

    if (state === "summoning") {
        return (
            <div className="space-y-3 pt-4 pb-8">
                <Button
                    onClick={onHalt}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-medium rounded-lg"
                >
                    <Pause className="mr-2 h-5 w-5" />
                    Halt
                </Button>
                <Button
                    onClick={onStop}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-lg font-medium rounded-lg bg-transparent"
                >
                    <X className="mr-2 h-5 w-5" />
                    Stop
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-3 pt-4 pb-8">
            <Button
                onClick={onPlay}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-medium rounded-lg"
            >
                <Play className="mr-2 h-5 w-5" />
                Play
            </Button>
            <Button
                onClick={onStop}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-lg font-medium rounded-lg bg-transparent"
            >
                <X className="mr-2 h-5 w-5" />
                Stop
            </Button>
        </div>
    )
}
