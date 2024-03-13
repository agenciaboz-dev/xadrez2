import React from "react"
import { View } from "react-native"
import { SvgUri } from "react-native-svg"

interface BackgroundProps {
    svg: string
    children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ svg, children }) => {
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <SvgUri uri={svg} style={{ flex: 1 }} />
            {children}
        </View>
    )
}
