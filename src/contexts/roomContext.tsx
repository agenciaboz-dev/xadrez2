import { createContext, useState } from "react"
import React from "react"
import { Room } from "../types/server/class/Room"
import { POSITION } from "../types/server/class/chess"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>

    onSquareDrag: (from: POSITION, current_position: POSITION) => void

    hoveredPosition: POSITION | null
}

interface RoomProviderProps {
    children: React.ReactNode
}

const RoomContext = createContext<RoomContextValue>({} as RoomContextValue)

export default RoomContext

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
    const [room, setRoom] = useState<Room | null>(null)
    const [hoveredPosition, setHoveredPosition] = useState<POSITION | null>(null)

    const getSquare = (from: POSITION, x: number, y: number) => {
        const squares_count_x = Math.floor(y / 40)
        const squares_count_y = Math.floor(x / 40)

        const target_position: POSITION = [from[0] + squares_count_x, from[1] + squares_count_y]
        return target_position
    }

    const onSquareDrag = (from: POSITION, current_position: POSITION) => {
        const target_position = getSquare(from, current_position[0], current_position[1])
        console.log(target_position)
        // setHoveredPosition(target_position)
    }

    return <RoomContext.Provider value={{ room, setRoom, onSquareDrag, hoveredPosition }}>{children}</RoomContext.Provider>
}
