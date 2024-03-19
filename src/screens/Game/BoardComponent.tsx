import React, { useCallback, useState } from "react"
import { PanResponderGestureState, View } from "react-native"
import { Board } from "../../types/server/class/Board"
import { Surface } from "react-native-paper"
import { BoardRowComponent } from "./BoardRowComponent"
import { POSITION } from "../../types/server/class/chess"
import { SharedValue } from "react-native-reanimated"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Player } from "../../types/server/class/Player"

interface BoardComponentProps {
    grid: (ChessPiece | null)[][]
    player: Player
}

export const BoardComponent: React.FC<BoardComponentProps> = ({ grid, player }) => {
    return (
        <Surface elevation={3} style={{ borderRadius: 15, overflow: "hidden", transform: [{ rotate: player.color == 1 ? "180deg" : "0deg" }] }}>
            {grid.map((row, index) => (
                <BoardRowComponent key={index} row={row} index={index} />
            ))}
        </Surface>
    )
}
