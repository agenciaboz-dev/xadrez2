import React from "react"
import { BackHandler, Platform } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { Button, Surface } from "react-native-paper"
import { Logo } from "../../components/Logo"
import { RoomsList } from "./RoomsList"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Surface style={{ flex: 1, gap: 50, alignItems: "center", paddingTop: 100, paddingBottom: 50, paddingHorizontal: 50 }}>
            <Logo />
            <RoomsList />

            {Platform.OS != "ios" && (
                <Button onPress={() => BackHandler.exitApp()} mode="outlined">
                    Sair
                </Button>
            )}
        </Surface>
    )
}
