import React from "react"
import { View } from "react-native"

interface FilterProps {
    hex: string
    opacity: number
}

export const Filter: React.FC<FilterProps> = ({ hex, opacity }) => {
    return (
        <View
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: hex, opacity, zIndex: 998, pointerEvents: "none" }}
        ></View>
    )
}
