import { Settings } from "../../contexts/settingsContext"

export enum Stage {
    morning = 1,
    afternoon = 2,
    night = 3,
}

export declare interface GameForm {
    theme: ThemeOption
    settings: Settings
    stage?: Stage
}

export declare type ThemeOption = 1
