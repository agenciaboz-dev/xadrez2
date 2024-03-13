import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface SceneryScaleSettingProps {}

export const SceneryScaleSetting: React.FC<SceneryScaleSettingProps> = ({}) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <View style={{ width: 300 }}>
            <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                <Text>{"escala de cenário"}</Text>
                <Text>{settings.scenery_scale}</Text>
            </View>
            <Slider
                value={settings.scenery_scale}
                onValueChange={(value) => setSettings({ ...settings, scenery_scale: value[0] })}
                maximumValue={3}
                minimumValue={1}
                containerStyle={{ width: "100%" }}
                step={0.1}
            />
        </View>
    )
}
