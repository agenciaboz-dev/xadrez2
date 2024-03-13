import React, { useContext } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import SettingsContext from "../../contexts/settingsContext"
import { Slider } from "@miblanchard/react-native-slider"

interface ObjectSettingProps {
    navigation: NavigationProp<any, any>
}

export const ObjectSetting: React.FC<ObjectSettingProps> = ({ navigation }) => {
    const { settings, setSettings } = useContext(SettingsContext)

    return (
        <View style={{ width: 300 }}>
            <View style={{ flexDirection: "row", width: 300, justifyContent: "space-between" }}>
                <Text>{"elementos"}</Text>
                <Text>{settings.objects}</Text>
            </View>
            <Slider
                value={settings.objects}
                onValueChange={(value) => setSettings({ ...settings, objects: value[0] })}
                maximumValue={100}
                minimumValue={1}
                containerStyle={{ width: "100%" }}
                step={1}
            />
        </View>
    )
}
