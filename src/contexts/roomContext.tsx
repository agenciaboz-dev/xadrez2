import { createContext, useEffect, useState } from "react"
import React from "react"
import { Room } from "../types/server/class/Room"
import { POSITION } from "../types/server/class/chess"
import { ChessPiece } from "../types/server/class/ChessPiece"
import { useIo } from "../hooks/useIo"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>

    onSquarePress: (piece: ChessPiece | null) => void
    selectedPiece: ChessPiece | null
    movablePositions: POSITION[]
}

interface RoomProviderProps {
    children: React.ReactNode
}

const RoomContext = createContext<RoomContextValue>({} as RoomContextValue)

export default RoomContext

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
    const io = useIo()

    const [room, setRoom] = useState<Room | null>(null)
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
    const [movablePositions, setMovablePositions] = useState<POSITION[]>([])

    const onSquarePress = (piece: ChessPiece | null) => {
        setMovablePositions([])
        if (piece) {
            setSelectedPiece(piece)
            io.emit("piece:movements", piece.position)
        } else {
            setSelectedPiece(null)
        }
    }

    useEffect(() => {
        console.log({ movablePositions })
    }, [movablePositions])

    useEffect(() => {
        io.on("piece:movements", (positions: POSITION[]) => {
            setMovablePositions(positions)
        })

        return () => {
            io.off("piece:movements")
        }
    }, [])

    return (
        <RoomContext.Provider value={{ room, setRoom, onSquarePress: onSquarePress, selectedPiece, movablePositions }}>
            {children}
        </RoomContext.Provider>
    )
}
