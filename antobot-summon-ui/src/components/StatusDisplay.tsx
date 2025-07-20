interface StatusDisplayProps {
    state: "home" | "summoning" | "halted"
}

export function StatusDisplay({ state }: StatusDisplayProps) {
    const getStatusText = () => {
        switch (state) {
            case "home":
                return "IDLE"
            case "summoning":
                return "SUMMONING"
            case "halted":
                return "HALTED"
            default:
                return "UNKNOWN"
        }
    }

    return (
        <div className="bg-gray-200 rounded-lg p-3 text-center">
            <span className="text-gray-600 font-medium text-sm tracking-wide">{getStatusText()}</span>
        </div>
    )
}
