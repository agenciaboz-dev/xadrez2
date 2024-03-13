import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface OffsetSettingProps {}

export const OffsetSetting: React.FC<OffsetSettingProps> = ({}) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <>
            <View style={{ width: 300 }}>
                <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                    <Text>{"offset top"}</Text>
                    <Text>{settings.offsetTop}</Text>
                </View>
                <Slider
                    value={settings.offsetTop}
                    onValueChange={(value) => setSettings({ ...settings, offsetTop: value[0] })}
                    maximumValue={300}
                    minimumValue={0}
                    containerStyle={{ width: "100%" }}
                    step={1}
                />
            </View>
            <View style={{ width: 300 }}>
                <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                    <Text>{"offset bottom"}</Text>
                    <Text>{settings.offsetBottom}</Text>
                </View>
                <Slider
                    value={settings.offsetBottom}
                    onValueChange={(value) => setSettings({ ...settings, offsetBottom: value[0] })}
                    maximumValue={300}
                    minimumValue={0}
                    containerStyle={{ width: "100%" }}
                    step={1}
                />
            </View>
        </>
    )
}
