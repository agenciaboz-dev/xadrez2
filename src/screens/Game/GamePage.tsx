import React, { useContext, useEffect } from "react"
import { View } from "react-native"
import { Surface, Text } from "react-native-paper"
import RoomContext from "../../contexts/roomContext"
import { useIo } from "../../hooks/useIo"
import { BoardComponent } from "./BoardComponent"

interface GamePageProps {}

export const GamePage: React.FC<GamePageProps> = ({}) => {
    const io = useIo()
    const { room } = useContext(RoomContext)

    useEffect(() => {
        if (room) {
            console.log(room)
        }

        return () => {
            io.emit("room:leave")
        }
    }, [])

    return room?.game ? (
        <Surface style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
            <BoardComponent board={room.game?.board} />
        </Surface>
    ) : null
}
