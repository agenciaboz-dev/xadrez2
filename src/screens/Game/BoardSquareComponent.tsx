import React, { useContext, useRef } from "react"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface, Text } from "react-native-paper"
import RoomContext from "../../contexts/roomContext"
import schema from "../../style/colors.json"
import { Pressable } from "react-native"
import { POSITION } from "../../types/server/class/chess"

interface BoardSquareComponentProps {
    piece: ChessPiece | null
    position: POSITION
}

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ piece, position }) => {
    const { onSquarePress, selectedPiece, movablePositions } = useContext(RoomContext)

    const size = 40
    const even_row = position[0] % 2 === 0
    const even_column = position[1] % 2 === 0
    const white_square = schema.colors.secondary
    const black_square = schema.colors.inversePrimary
    const square_color = even_row ? (even_column ? white_square : black_square) : even_column ? black_square : white_square
    const is_movable = !!movablePositions.find((item) => item[0] == position[0] && item[1] == position[1])

    return (
        <Pressable onPress={() => onSquarePress(position)}>
            <Surface
                elevation={3}
                style={{
                    width: size,
                    height: size,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: square_color,
                    borderColor: selectedPiece && selectedPiece == piece ? "blue" : is_movable ? "yellow" : "transparent",
                    borderWidth: 2,
                }}
            >
                <Surface
                    elevation={piece ? 2 : 0}
                    style={{
                        borderRadius: 100,
                        width: size * 0.8,
                        height: size * 0.8,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: piece?.color == 0 ? "white" : "",
                        display: !piece ? "none" : "flex",
                    }}
                >
                    <Text style={{ color: piece?.color == 0 ? black_square : white_square }}>{piece?.label}</Text>
                </Surface>
            </Surface>
        </Pressable>
    )
}
