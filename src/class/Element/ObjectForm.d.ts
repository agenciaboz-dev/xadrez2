import { ImageSourcePropType } from "react-native"
import { Settings } from "../../contexts/settingsContext"

export declare interface ObjectForm {
    image: ImageSourcePropType
    width: number
    height: number
    settings: Settings
    scenery?: boolean
    goal?: boolean
}
