import React, { useContext, useRef } from "react"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface, Text } from "react-native-paper"
import { POSITION } from "../../types/server/class/chess"
import RoomContext from "../../contexts/roomContext"
import schema from "../../style/colors.json"
import { Pressable } from "react-native"

interface BoardSquareComponentProps {
    piece: ChessPiece | null
    position: POSITION
}

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ piece, position }) => {
    const { onSquarePress, selectedPiece, movablePositions } = useContext(RoomContext)

    const size = 40
    const even_row = position[0] % 2 === 0
    const even_column = position[1] % 2 === 0
    const white_square = schema.colors.onSurfaceVariant
    const black_square = schema.colors.onPrimary
    const square_color = even_row ? (even_column ? white_square : black_square) : even_column ? black_square : white_square
    const is_movable = !!movablePositions.find((item) => item[0] == position[0] && item[1] == position[1])

    return (
        <Pressable onPress={() => onSquarePress(piece)}>
            <Surface
                elevation={3}
                style={{
                    width: size,
                    height: size,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: square_color,
                    borderColor: selectedPiece && selectedPiece == piece ? "red" : is_movable ? "yellow" : "transparent",
                    borderWidth: 2,
                }}
            >
                <Text style={{ color: square_color == white_square ? black_square : white_square }}>{piece?.label}</Text>
            </Surface>
        </Pressable>
    )
}
