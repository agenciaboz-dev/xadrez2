import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface SizeSettingProps {}

export const SizeSetting: React.FC<SizeSettingProps> = ({}) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <View style={{ width: 300 }}>
            <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                <Text>{"tamanho"}</Text>
                <Text>{settings.size}</Text>
            </View>
            <Slider
                value={settings.size}
                onValueChange={(value) => setSettings({ ...settings, size: value[0] })}
                maximumValue={200}
                minimumValue={10}
                containerStyle={{ width: "100%" }}
                step={1}
            />
        </View>
    )
}
