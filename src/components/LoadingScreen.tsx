import React, { useEffect, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { Dimensions, Text, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface LoadingScreenProps {
    loading: boolean
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
    const { width, height } = Dimensions.get("screen")
    const [currentWidth, setCurrentWidth] = useState(width)

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    }

    const style = useAnimatedStyle(() => {
        return {
            width: withTiming(currentWidth, config),
        }
    })

    useEffect(() => {
        setCurrentWidth(loading ? width : 0)
    }, [loading])

    return (
        <Animated.View
            style={[
                {
                    backgroundColor: "white",
                    position: "absolute",
                    width,
                    height,
                    zIndex: 999,
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                },
                style,
            ]}
        >
            <Text numberOfLines={1} style={{}}>
                Carregando
            </Text>
        </Animated.View>
    )
}
