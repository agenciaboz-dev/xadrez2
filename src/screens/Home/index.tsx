import React, { useState } from "react"
import { BackHandler, Platform, View } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { Button, Surface } from "react-native-paper"
import { Logo } from "../../components/Logo"
import { RoomsList } from "./RoomsList"
import { RoomFormComponent } from "./RoomFormComponent"
import { Room } from "../../types/server/class/Room"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [showRoomForm, setShowRoomForm] = useState(false)
    const [joiningRoom, setJoiningRoom] = useState<Room>()

    const joinRoomButtom = (room: Room) => {
        setJoiningRoom(room)
        setShowRoomForm(true)
    }

    const closeModal = () => {
        setShowRoomForm(false)
        setJoiningRoom(undefined)
    }

    return (
        <Surface style={{ flex: 1, gap: 30, alignItems: "center", paddingTop: 50, paddingBottom: 50, paddingHorizontal: 50 }}>
            <Logo />
            <RoomsList joinRoomButtom={joinRoomButtom} navigation={navigation} />
            <View style={{ gap: 20, width: "100%" }}>
                <Button mode="contained-tonal" onPress={() => setShowRoomForm(true)}>
                    criar sala
                </Button>
                {Platform.OS != "ios" && (
                    <Button onPress={() => BackHandler.exitApp()} mode="outlined" style={{ width: "auto" }}>
                        sair
                    </Button>
                )}
            </View>
            <RoomFormComponent visible={showRoomForm} close={closeModal} navigation={navigation} joining_room={joiningRoom} />
        </Surface>
    )
}
