import React from "react"
import { View } from "react-native"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface } from "react-native-paper"
import { BoardSquareComponent } from "./BoardSquareComponent"

interface BoardRowComponentProps {
    row: (ChessPiece | null)[]
    index: number
}

export const BoardRowComponent: React.FC<BoardRowComponentProps> = ({ row, index }) => {
    return (
        <Surface style={{ width: "100%", flexDirection: "row" }}>
            {row.map((piece, index2) => (
                <BoardSquareComponent key={`${index}, ${index2}`} piece={piece} />
            ))}
        </Surface>
    )
}
