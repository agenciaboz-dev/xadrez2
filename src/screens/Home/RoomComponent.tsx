import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import { Room } from "../../types/server/class/Room"
import { Button, Surface, Text } from "react-native-paper"
import { useIo } from "../../hooks/useIo"
import RoomContext from "../../contexts/roomContext"
import { NavigationProp } from "@react-navigation/native"

interface RoomComponentProps {
    room: Room
    joinRoomButtom: (value: Room) => void
    navigation: NavigationProp<any, any>
}

export const RoomComponent: React.FC<RoomComponentProps> = ({ room, navigation, joinRoomButtom }) => {
    const io = useIo()
    const { setRoom } = useContext(RoomContext)

    const [loading, setLoading] = useState(false)

    const onJoinPress = () => {
        joinRoomButtom(room)
    }

    useEffect(() => {
        io.on("room:join", (room: Room) => {
            close()
            setRoom(room)
            setLoading(false)
            navigation.navigate("game")
        })

        return () => {
            io.off("room:join")
        }
    }, [])

    return (
        <Surface style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderRadius: 50 }}>
            <Text>{room.name}</Text>
            <Button mode="contained-tonal" onPress={onJoinPress} loading={loading}>
                <Text>go</Text>
            </Button>
        </Surface>
    )
}
