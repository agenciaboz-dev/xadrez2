import React from "react"
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/Home"
import { SettingsPage } from "./screens/Settings"
import { SettingsProvider } from "./contexts/settingsContext"
import { Text } from "react-native"
import constants from "expo-constants"
import { GamePage } from "./screens/Game/GamePage"
import schema from "./style/colors.json"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const Stack = createNativeStackNavigator()
    const navigator_options: NativeStackNavigationOptions = {
        headerStyle: {
            backgroundColor: "red",
        },
        headerTintColor: "white",
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerShown: false,
    }

    const home_header_options = {
        title: "Casa Lúdica alguma coisa",
        headerShown: false,
    }

    const CombinedDarkTheme = {
        ...NavigationDarkTheme,
        colors: { ...NavigationDarkTheme.colors, ...schema.colors },
    }

    return (
        <SettingsProvider>
            <NavigationContainer theme={CombinedDarkTheme}>
                <Stack.Navigator initialRouteName="home" screenOptions={navigator_options}>
                    <Stack.Screen name={"home"} component={Home} />
                    <Stack.Screen name={"settings"} component={SettingsPage} />
                    <Stack.Screen name={"game"} component={GamePage} />
                </Stack.Navigator>
            </NavigationContainer>
            <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text>
        </SettingsProvider>
    )
}
