interface ConnectionIndicatorProps {
    isConnected: boolean
}

export function ConnectionIndicator({ isConnected }: ConnectionIndicatorProps) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className={`text-xs font-medium ${isConnected ? "text-green-600" : "text-red-600"}`}>
                {isConnected ? "Connected" : "Disconnected"}
            </span>
        </div>
    )
}
