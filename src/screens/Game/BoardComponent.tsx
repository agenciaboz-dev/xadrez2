import React from "react"
import { View } from "react-native"
import { Board } from "../../types/server/class/Board"
import { Surface } from "react-native-paper"
import { BoardRowComponent } from "./BoardRowComponent"

interface BoardComponentProps {
    board: Board
}

export const BoardComponent: React.FC<BoardComponentProps> = ({ board }) => {
    return (
        <Surface style={{}}>
            {board.grid.map((row, index) => (
                <BoardRowComponent key={index} row={row} index={index} />
            ))}
        </Surface>
    )
}
