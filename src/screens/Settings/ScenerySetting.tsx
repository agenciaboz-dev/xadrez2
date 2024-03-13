import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface ScenerySettingProps {}

export const ScenerySetting: React.FC<ScenerySettingProps> = ({}) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <View style={{ width: 300 }}>
            <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                <Text>{"elementos cenário"}</Text>
                <Text>{settings.scenery}</Text>
            </View>
            <Slider
                value={settings.scenery}
                onValueChange={(value) => setSettings({ ...settings, scenery: value[0] })}
                maximumValue={15}
                minimumValue={1}
                containerStyle={{ width: "100%" }}
                step={1}
            />
        </View>
    )
}
