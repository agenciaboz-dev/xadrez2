import { createContext, useEffect, useState } from "react"
import React from "react"
import { Room } from "../types/server/class/Room"
import { POSITION } from "../types/server/class/chess"
import { ChessPiece } from "../types/server/class/ChessPiece"
import { useIo } from "../hooks/useIo"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>

    onSquarePress: (position: POSITION) => void
    selectedPiece: ChessPiece | null
    movablePositions: POSITION[]
    getPiece: (position: POSITION) => ChessPiece | null
    grid: (ChessPiece | null)[][]
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
    const [grid, setGrid] = useState<(ChessPiece | null)[][]>(new Array(8).fill(null).map(() => new Array(8).fill(null)))

    const getPiece = (position: POSITION) => {
        const grid = room?.game?.board.grid
        if (grid) {
            const piece = grid[position[0]][position[1]]
            return piece
        }

        return null
    }

    const onSquarePress = (position: POSITION) => {
        setMovablePositions([])

        const piece = getPiece(position)
        if (piece && selectedPiece != piece) {
            setSelectedPiece(piece)
            io.emit("piece:movements", piece.position)
        } else {
            const is_movable = !!movablePositions.find((item) => item[0] == position[0] && item[1] == position[1])
            if (is_movable) {
                io.emit("piece:move", { from: selectedPiece?.position, to: position })
            }
            setSelectedPiece(null)
        }
    }

    useEffect(() => {
        console.log({ movablePositions })
    }, [movablePositions])

    useEffect(() => {
        if (room?.game?.board) {
            setGrid(room.game.board.grid)
        }
    }, [room])

    useEffect(() => {
        io.on("piece:move", (from: POSITION, to: POSITION) => {
            const piece = grid[from[0]][from[1]]
            let new_grid = [...grid]
            new_grid[from[0]][from[1]] = null
            new_grid[to[0]][to[1]] = piece
            setGrid(new_grid)
        })
        return () => {
            io.off("piece:move")
        }
    }, [grid])

    useEffect(() => {
        io.on("piece:movements", (positions: POSITION[]) => {
            setMovablePositions(positions)
        })

        io.on("room:update", (room: Room) => {
            console.log("room updating")
            setRoom(room)
        })

        return () => {
            io.off("piece:movements")
            io.off("room:update")
        }
    }, [])

    return (
        <RoomContext.Provider value={{ room, setRoom, getPiece, onSquarePress, selectedPiece, movablePositions, grid }}>
            {children}
        </RoomContext.Provider>
    )
}
