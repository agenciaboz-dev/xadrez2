import React, { useContext, useEffect } from "react"
import { Surface } from "react-native-paper"
import RoomContext from "../../contexts/roomContext"
import { useIo } from "../../hooks/useIo"
import { BoardComponent } from "./BoardComponent"
import { NavigationProp } from "@react-navigation/native"

interface GamePageProps {
    navigation: NavigationProp<any, any>
}

export const GamePage: React.FC<GamePageProps> = ({ navigation }) => {
    const io = useIo()
    const { room, setRoom } = useContext(RoomContext)

    useEffect(() => {
        if (!room) {
            navigation.navigate("home")
        }
    }, [room])

    useEffect(() => {
        if (room) {
            console.log(room)
        }

        io.on("disconnect", (reason) => {
            setRoom(null)
        })

        return () => {
            io.emit("room:leave")
            io.off("disconnect")
        }
    }, [])

    return room?.game ? (
        <Surface style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
            <BoardComponent board={room.game?.board} />
        </Surface>
    ) : null
}
