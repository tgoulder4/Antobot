"use client"

import { useState, useEffect } from "react"

export function useConnectionStatus() {
    const [isConnected, setIsConnected] = useState(true)

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // pinging - we'd make an http GET call to the antobot here and wait for a response
                await new Promise((resolve) => setTimeout(resolve, 100))
                // await fetch('/ping') // exanple endpoitn 
                const connected = Math.random() > 0.1 //random chance
                setIsConnected(connected)
            } catch (error) {
                setIsConnected(false)
            }
        }


        checkConnection()
        const interval = setInterval(checkConnection, 5000)

        return () => clearInterval(interval)
    }, [])

    return { isConnected, setConnectedState: setIsConnected }
}
