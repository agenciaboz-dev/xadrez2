import { createContext, useState } from "react"
import React from "react"

export interface Settings {
    goals: number
    objects: number
    scenery: number
    scenery_scale: number
    offsetBottom: number
    offsetTop: number
}

interface SettingsContextValue {
    settings: Settings
    setSettings: (value: Settings) => void
}

interface SettingsProviderProps {
    children: React.ReactNode
}

const SettingsContext = createContext<SettingsContextValue>({} as SettingsContextValue)

export default SettingsContext

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({
        goals: 2,
        objects: 25,
        scenery: 5,
        scenery_scale: 1,
        offsetBottom: 170,
        offsetTop: 135,
    })

    return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>
}
