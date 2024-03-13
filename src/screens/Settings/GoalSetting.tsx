import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface GoalSettingProps {
    navigation: NavigationProp<any, any>
}

export const GoalSetting: React.FC<GoalSettingProps> = ({ navigation }) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <View style={{ width: 300 }}>
            <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                <Text>{"objetivos"}</Text>
                <Text>{settings.goals}</Text>
            </View>
            <Slider
                value={settings.goals}
                onValueChange={(value) => setSettings({ ...settings, goals: value[0] })}
                maximumValue={10}
                minimumValue={1}
                containerStyle={{ width: "100%" }}
                step={1}
            />
        </View>
    )
}
