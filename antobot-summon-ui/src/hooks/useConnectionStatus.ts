"use client"

import { useState, useEffect } from "react"
import { Ros } from "roslib"

export function useConnectionStatus() {
    const [isConnected, setIsConnected] = useState(false)
    const [rosConn, setRos] = useState<Ros | null>(null)

    const initialise = async () => {
        if (rosConn) {
            console.log("Already connected to the robot");
            return rosConn;
        }
        //using roslib to connect to the robot
        const ros = new Ros({
            url: 'wss://172.26.184.19:9090' // Replace with your robot's WebSocket URL
        })
        console.log("Connecting to robot via wss...")
        ros.on('connection', () => {
            setIsConnected(true);
            console.log("Connected to robot successfully");
            setRos(ros);
        });
        ros.on('error', (error) => {
            console.error("Error connecting to robot:", error);
            setIsConnected(false);
        });
        ros.on('close', () => {
            console.log("Connection to robot closed");
            setIsConnected(false);
            setRos(null);
        });

        return ros;
    }
    useEffect(() => {
        const main = async () => {
            return await initialise();
        }
        main()
        return () => {
            while (true) {
                if (!rosConn) {
                    console.log("Cleaning up connection...");
                    break;
                };
                // Close the connection after a short delay to ensure cleanup
                (new Promise(() => setTimeout(() => {
                    rosConn?.close();
                }, 1000)))
            }
        }

    }, [])

    return { isConnected, initialise }
}
