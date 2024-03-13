import React, { useState } from "react"
import { BackHandler, Platform, View } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { Button, Surface } from "react-native-paper"
import { Logo } from "../../components/Logo"
import { RoomsList } from "./RoomsList"
import { RoomFormComponent } from "./RoomFormComponent"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [showRoomForm, setShowRoomForm] = useState(false)

    return (
        <Surface style={{ flex: 1, gap: 30, alignItems: "center", paddingTop: 50, paddingBottom: 50, paddingHorizontal: 50 }}>
            <Logo />
            <RoomsList />
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
            <RoomFormComponent visible={showRoomForm} close={() => setShowRoomForm(false)} navigation={navigation} />
        </Surface>
    )
}
