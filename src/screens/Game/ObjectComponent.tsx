import React, { useContext, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Pressable } from "react-native"
import { GameObject } from "../../class/Element/Element"
import { Game } from "../../class/Game/Game"
import { Goal } from "../../class/Goal/Goal"
import images from "../../images"
import SettingsContext from "../../contexts/settingsContext"
import { Image } from "expo-image"

interface ObjectComponentProps {
    navigation: NavigationProp<any, any>
    object: GameObject | Goal
    game: Game
}

export const ObjectComponent: React.FC<ObjectComponentProps> = ({ navigation, object, game }) => {
    const zIndex = object instanceof Goal && object.found ? 998 : object.elevation

    const [pressed, setPressed] = useState(false)

    const { settings } = useContext(SettingsContext)
    const size = object.width * (object.scenery ? settings.scenery_scale : 1)

    const onPress = () => {
        game.onObjectPress(object)
    }

    return (
        <Pressable
            style={{
                position: "absolute",
                bottom: object.y,
                left: object.x,
                elevation: zIndex,
                zIndex: zIndex,
                pointerEvents: object.scenery ? "none" : object instanceof Goal && object.found ? "none" : "auto",
            }}
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
        >
            <Image source={object.image} style={{ width: object.width, height: object.height }}></Image>

            {pressed && !(object instanceof Goal) && (
                <Image source={images.onPress} style={{ width: object.width, height: object.height, position: "absolute" }} />
            )}

            {object instanceof Goal && object.found && (
                <Image source={images.found} style={{ width: object.width, height: object.height, position: "absolute" }} />
            )}
        </Pressable>
    )
}
