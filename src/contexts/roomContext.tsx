import { createContext, useCallback, useEffect, useState } from "react"
import React from "react"
import { Room } from "../types/server/class/Room"
import { POSITION } from "../types/server/class/chess"
import { ChessPiece } from "../types/server/class/ChessPiece"
import { useIo } from "../hooks/useIo"
import { Chessboard } from "../types/server/class/Board"
import { Player } from "../types/server/class/Player"

interface RoomContextValue {
    room: Room | null
    setRoom: React.Dispatch<React.SetStateAction<Room | null>>
    player: Player | null
    setPlayer: React.Dispatch<React.SetStateAction<Player | null>>

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
    const [player, setPlayer] = useState<Player | null>(null)
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
    const [movablePositions, setMovablePositions] = useState<POSITION[]>([])
    const [grid, setGrid] = useState<(ChessPiece | null)[][]>(new Array(8).fill(null).map(() => new Array(8).fill(null)))

    const getPiece = useCallback(
        (position: POSITION) => {
            const piece = grid[position[0]][position[1]]
            return piece
        },
        [grid]
    )

    const onSquarePress = (position: POSITION) => {
        setMovablePositions([])

        const piece = getPiece(position)
        if (piece && piece.color == player?.color && selectedPiece != piece) {
            console.log(piece)
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

    useEffect(() => {}, [movablePositions])

    useEffect(() => {
        if (room?.game?.board) {
            setGrid(room.game.board.grid)
        }
        setMovablePositions([])
    }, [room])

    useEffect(() => {
        io.on("piece:move", (grid: Chessboard) => {
            setGrid(grid)
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
        <RoomContext.Provider value={{ room, setRoom, getPiece, onSquarePress, selectedPiece, movablePositions, grid, player, setPlayer }}>
            {children}
        </RoomContext.Provider>
    )
}
