import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { Appearance, StyleSheet, Text, View } from "react-native"
import { Routes } from "./src/Router"
import { Providers } from "./src/Providers"
import { Snackbar } from "./src/components/Snackbar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function App() {
    Appearance.setColorScheme("light")

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" hidden />
                <Providers>
                    <Routes />
                    <Snackbar />
                </Providers>
            </GestureHandlerRootView>
        </>
    )
}
