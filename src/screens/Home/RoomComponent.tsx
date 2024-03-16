import React from "react"
import { Room } from "../../types/server/class/Room"
import { Button, Surface, Text } from "react-native-paper"
import { NavigationProp } from "@react-navigation/native"

interface RoomComponentProps {
    room: Room
    joinRoomButtom: (value: Room) => void
    navigation: NavigationProp<any, any>
}

export const RoomComponent: React.FC<RoomComponentProps> = ({ room, navigation, joinRoomButtom }) => {
    const onJoinPress = () => {
        joinRoomButtom(room)
    }

    return (
        <Surface style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderRadius: 50 }}>
            <Text>{room.name}</Text>
            <Button mode="contained-tonal" onPress={onJoinPress}>
                <Text>go</Text>
            </Button>
        </Surface>
    )
}
