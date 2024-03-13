import React, { useRef } from "react"
import { Animated, PanResponder, Pressable, View } from "react-native"
import { ChessPiece } from "../../types/server/class/ChessPiece"
import { Surface, Text } from "react-native-paper"

interface BoardSquareComponentProps {
    piece: ChessPiece | null
}

export const BoardSquareComponent: React.FC<BoardSquareComponentProps> = ({ piece }) => {
    const size = 40
    const position = useRef(new Animated.ValueXY()).current // Use useRef to persist the position across re-renders

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: position.x, // dx is the accumulated distance of the gesture since the touch started along the X axis
                        dy: position.y, // dy is the same but for the Y axis
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                // You can add logic here for when the piece is released
                // For example, you could check if the piece has been dropped on a valid square and move it or reset its position
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start()
            },
        })
    ).current

    const onPress = () => {
        console.log(piece)
    }

    return (
        <View style={{ width: size, height: size, borderColor: "black", borderWidth: 1 }}>
            <Animated.View {...panResponder.panHandlers} style={[position.getLayout(), { flex: 1, justifyContent: "center", alignItems: "center" }]}>
                <Surface elevation={3} style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Text>{piece?.label}</Text>
                </Surface>
            </Animated.View>
        </View>
    )
}
