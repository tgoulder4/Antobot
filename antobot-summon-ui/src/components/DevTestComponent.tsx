"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface DevTestComponentProps {
    buttonText: string
    subtitle: string
    properties: Array<{ label: string; value: any }>
    onTest?: () => void
}

export function DevTestComponent({ buttonText, subtitle, properties, onTest }: DevTestComponentProps) {
    return (
        <div className="space-y-3">
            <Button onClick={onTest} variant="black" className="w-full justify-start ">
                <MapPin className="mr-2 h-4 w-4" />
                {buttonText}
            </Button>

            <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">{subtitle}</h4>
                <div className="space-y-1 text-sm">
                    {properties.map((prop, index) => (
                        <div key={index} className="flex justify-between">
                            <span className="text-gray-600">{prop.label}:</span>
                            <span className="font-mono">{String(prop.value)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
