import React, { useContext, useRef } from "react"
import { PanResponder, PanResponderGestureState, Pressable, View } from "react-native"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface, Text } from "react-native-paper"
import { POSITION } from "../../types/server/class/chess"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import RoomContext from "../../contexts/roomContext"

interface BoardSquareComponentProps {
    piece: ChessPiece | null
    position: POSITION
}

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ piece, position }) => {
    const { onSquareDrag } = useContext(RoomContext)

    const size = 40
    const isPressed = useSharedValue(false)
    const offset = useSharedValue({ x: 0, y: 0 })
    const start = useSharedValue({ x: 0, y: 0 })

    const gesture = Gesture.Pan()
        // .runOnJS(true)
        .onBegin(() => {
            isPressed.value = true
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            }
            runOnJS(onSquareDrag)(position, [offset.value.x, offset.value.y])
        })
        .onEnd(() => {
            // start.value = {
            //     x: offset.value.x,
            //     y: offset.value.y,
            // }
            offset.value = { x: withSpring(0), y: withSpring(0) }
        })
        .onFinalize(() => {
            isPressed.value = false
        })

    const highlighted_style = null == position ? { borderColor: "black", borderWidth: 1 } : {}

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }, { scale: withSpring(isPressed.value ? 1.2 : 1) }],
            backgroundColor: isPressed.value ? "yellow" : "black",
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[{ width: size, height: size, borderColor: "black", borderWidth: 1 }, highlighted_style, animatedStyles]}>
                <Surface elevation={3} style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text>{piece?.label}</Text>
                </Surface>
            </Animated.View>
        </GestureDetector>
    )
}
