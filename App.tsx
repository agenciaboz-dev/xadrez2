import { StatusBar } from "expo-status-bar"
import { Appearance, StyleSheet, Text, View } from "react-native"
import { Routes } from "./src/Router"
import { Providers } from "./src/Providers"

export default function App() {
    Appearance.setColorScheme("light")

    return (
        <>
            <StatusBar style="auto" hidden />
            <Providers>
                <Routes />
            </Providers>
        </>
    )
}