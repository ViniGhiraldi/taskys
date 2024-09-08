import { View } from "react-native"
import { measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export const useAccordion = () => {
    const animatedRef = useAnimatedRef<View>();
    const isOpened = useSharedValue(false);
    const height = useSharedValue(0);
    const animatedHeightStyle = useAnimatedStyle(() => ({
        height: withTiming(height.value)
    }))
    const animatedChevronStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: withTiming(`${isOpened.value ? 180 : 0}deg`, {
                    duration: 200
                })
            }
        ]
    }))

    const setHeight = () => {
        'worklet'

        height.value = !height.value ? Number(measure(animatedRef)?.height ?? 0) : 0;
        isOpened.value = !isOpened.value;
    }

    return {
        animatedRef,
        setHeight,
        isOpened,
        animatedHeightStyle,
        animatedChevronStyle
    }
}