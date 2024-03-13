import React from "react"
import { Pressable, View } from "react-native"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface, Text } from "react-native-paper"

interface BoardSquareComponentProps {
    piece: ChessPiece | null
}

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ piece }) => {
    const size = 50

    const onPress = () => {
        console.log(piece)
    }

    return (
        <Pressable style={{ width: size, height: size, borderColor: "black", borderWidth: 1 }} onPress={onPress}>
            <Surface elevation={3} style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Text>{piece?.label}</Text>
            </Surface>
        </Pressable>
    )
}
