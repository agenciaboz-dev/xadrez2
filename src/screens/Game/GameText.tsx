import React from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { Game } from "../../types/server/class/Game"

interface GameTextProps {
    game: Game
}

export const GameText: React.FC<GameTextProps> = ({ game }) => {
    return (
        <View style={{}}>
            {game.players.length < 2 ? (
                <Text variant="titleLarge">aguardando segundo jogador</Text>
            ) : (
                <Text>Vez do jogador {game.current_turn == 0 ? "branco" : "preto"}</Text>
            )}
        </View>
    )
}
