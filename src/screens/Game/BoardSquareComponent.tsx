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
    const { onSquarePress, selectedPiece, movablePositions, player, room } = useContext(RoomContext)

    const size = 40
    const even_row = position[0] % 2 === 0
    const even_column = position[1] % 2 === 0
    const white_square = schema.colors.secondary
    const black_square = schema.colors.inversePrimary
    const square_color = even_row ? (even_column ? white_square : black_square) : even_column ? black_square : white_square
    const getPiece = (position?: POSITION) => (position ? room?.game.board.grid[position[0]][position[1]] : null)
    const is_movable = movablePositions.find((item) => item[0] == position[0] && item[1] == position[1])
    const is_attackable = !!getPiece(is_movable)

    const can_press =
        (piece?.color == player?.color || is_attackable || !!is_movable) && room?.game.players.length == 2 && room?.game.current_turn == player?.color


    return (
        <Pressable onPress={() => onSquarePress(position)} disabled={!can_press}>
            <Surface
                elevation={3}
                style={{
                    width: size,
                    height: size,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: square_color,
                    borderColor: selectedPiece && selectedPiece == piece ? "blue" : is_attackable ? "red" : is_movable ? "yellow" : "transparent",
                    borderWidth: 2,
                }}
            >
                <Surface
                    elevation={piece ? 2 : 0}
                    style={{
                        borderRadius: 100,
                        width: size * 0.85,
                        height: size * 0.85,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: piece?.color == 0 ? "white" : schema.colors.primaryContainer,
                        display: !piece ? "none" : "flex",
                    }}
                >
                    <Text style={{ color: piece?.color == 0 ? black_square : white_square }} variant="headlineMedium">
                        {piece?.label}
                    </Text>
                </Surface>
            </Surface>
        </Pressable>
    )
}
