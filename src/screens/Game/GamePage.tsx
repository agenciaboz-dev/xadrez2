import React, { useContext, useEffect } from "react"
import { Surface } from "react-native-paper"
import RoomContext from "../../contexts/roomContext"
import { useIo } from "../../hooks/useIo"
import { BoardComponent } from "./BoardComponent"
import { NavigationProp } from "@react-navigation/native"
import { useSnackbar } from "../../hooks/useSnackbar"
import { GameText } from "./GameText"

interface GamePageProps {
    navigation: NavigationProp<any, any>
}

export const GamePage: React.FC<GamePageProps> = ({ navigation }) => {
    const io = useIo()

    const { room, setRoom, grid, setPlayer, player } = useContext(RoomContext)
    const snackbar = useSnackbar()

    useEffect(() => {
        if (!room) {
            navigation.navigate("home")
            setPlayer(null)
        }
    }, [room])

    useEffect(() => {
        if (room) {
            console.log(room)
        }

        io.on("disconnect", (reason) => {
            setRoom(null)
            setPlayer(null)
            snackbar("conexão perdida")
        })

        return () => {
            io.emit("room:leave")
            io.off("disconnect")
        }
    }, [])

    return room?.game && player ? (
        <Surface style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", gap: 50 }}>
            <GameText game={room.game} />
            <BoardComponent grid={grid} player={player} />
        </Surface>
    ) : null
}
