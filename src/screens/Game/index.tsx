import React, { useContext, useEffect, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, ImageBackground, Pressable, Text, View } from "react-native"
import { Game } from "../../class/Game/Game"
import { ObjectComponent } from "./ObjectComponent"
import { GoalsContainer } from "./GoalsContainer"
import { ScoreContainer } from "./ScoreContainer"
import SettingsContext from "../../contexts/settingsContext"
import { GameForm } from "../../class/Game/GameForm"
import { Filter } from "../../components/Filter"
import { Timer } from "../../components/Timer"
import { ScoreModal } from "../../components/ScoreModal"
import { LoadingScreen } from "../../components/LoadingScreen"

interface GamePageProps {
    navigation: NavigationProp<any, any>
}

export const GamePage: React.FC<GamePageProps> = ({ navigation }) => {
    const { height, width } = Dimensions.get("screen")
    const { settings, setSettings } = useContext(SettingsContext)

    const [_, setReRender] = useState({})

    const triggerRerender = () => {
        setReRender({})
    }

    const game_settings: GameForm = { theme: 1, settings }

    const [game, setGame] = useState(new Game(game_settings, triggerRerender))
    const [scoreModal, setScoreModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const reset = () => {
        setGame(new Game({ ...game_settings, stage: game.stage }, triggerRerender))
    }

    const nextStage = () => {
        setScoreModal(false)
        setLoading(true)
        setTimeout(() => {
            const new_settings: GameForm = {
                ...game_settings,
                settings: {
                    ...game.settings,
                    objects: Math.floor(game.settings.objects * 1.1),
                },
                stage: game.stage + 1,
            }
            setGame(new Game(new_settings, triggerRerender))
            setTimeout(() => setLoading(false), 1000)
        }, 1000)
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

    useEffect(() => {
        if (game.found == game.goals.length) {
            setScoreModal(true)
        }
    }, [game.found])

    return (
        <ImageBackground
            style={{ flex: 1, position: "relative" }}
            imageStyle={{
                resizeMode: "cover",
                aspectRatio: 1,
            }}
            source={game.background}
        >
            <Pressable onPress={reset} style={{ elevation: 999, zIndex: 999, width: 50, borderColor: "red", borderWidth: 1 }}>
                <Text>reset</Text>
            </Pressable>
            {game.objects.map((object, index) => (
                <ObjectComponent key={`${object.x}.${object.y}.${index}`} object={object} navigation={navigation} game={game} />
            ))}
            {game.filter && <Filter hex={game.filter.hex} opacity={game.filter.opacity} />}
            <GoalsContainer game={game} />
            <ScoreContainer game={game} />
            <View
                style={{
                    position: "absolute",
                    borderColor: "blue",
                    borderWidth: 1,
                    width,
                    bottom: game.settings.offsetBottom,
                    top: game.settings.offsetTop,
                }}
            ></View>

            <Timer game={game} />
            <ScoreModal onClose={nextStage} open={scoreModal} game={game} navigation={navigation} />
            <LoadingScreen loading={loading} />
        </ImageBackground>
    )
}
