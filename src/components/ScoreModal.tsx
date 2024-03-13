import React from "react"
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native"
import { Game } from "../class/Game/Game"
import { NavigationProp } from "@react-navigation/native"

interface ScoreModalProps {
    open: boolean
    onClose: () => void
    game: Game
    navigation: NavigationProp<any, any>
}

export const ScoreModal: React.FC<ScoreModalProps> = ({ open, onClose, game, navigation }) => {
    const elapsed_time = new Date(game.time).toLocaleTimeString("pt-br", { minute: "2-digit", second: "2-digit" })

    return (
        <Modal animationType="slide" transparent={true} visible={open}>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <View
                    style={{
                        backgroundColor: "#c8c8c870",
                        padding: 20,
                        borderColor: "yellow",
                        borderWidth: 2,
                        borderRadius: 50,
                        height: 400,
                        width: 300,
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{}}>
                        <Text style={{ fontSize: 30 }}>Parabéns! Você encontrou tudo</Text>
                        <Text>tempo: {elapsed_time}</Text>
                        <Text>erros: {game.misclicks}</Text>
                    </View>
                    <View>
                        {game.stage < 3 && (
                            <TouchableOpacity
                                style={{ backgroundColor: "#c8c8c860", padding: 10, borderRadius: 20, borderColor: "blue", borderWidth: 2 }}
                                onPress={() => onClose()}
                            >
                                <Text>Próximo cenário</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={{ backgroundColor: "#c8c8c860", padding: 10, borderRadius: 20, borderColor: "blue", borderWidth: 2 }}
                            onPress={() => navigation.navigate("home")}
                        >
                            <Text>Início</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
