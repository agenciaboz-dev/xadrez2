import React from "react"
import { NavigationProp } from "@react-navigation/native"
import { Text, View } from "react-native"
import { Game } from "../../class/Game/Game"

interface ScoreContainerProps {
    game: Game
}

export const ScoreContainer: React.FC<ScoreContainerProps> = ({ game }) => {
    return (
        <View style={{ position: "absolute", height: 25, width: 75, right: 0, elevation: 999, zIndex: 999, borderColor: "red", borderWidth: 1 }}>
            <Text>erros: {game.misclicks}</Text>
        </View>
    )
}
