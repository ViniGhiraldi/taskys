import { Pressable, StyleSheet, View } from "react-native"
import { ITask } from "../../models/interfaces/ITask"
import { theme } from "../../models/styles/styles"
import { MaterialIcons } from "@expo/vector-icons"
import { Paragraph } from "../paragraph"
import { format } from "date-fns"
import { Divider } from "../divider"
import { SmallText } from "../smallText"
import { useAccordion } from "../../hooks/useAccordion"
import Animated, { runOnUI, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useState } from "react"

export const TaskCard = ({ conclusionDate, description, title }: ITask) => {
    const { animatedHeightStyle, animatedRef, isOpened, setHeight, animatedChevronStyle } = useAccordion();
    

    const [showMoreLines, setShowMoreLines] = useState(isOpened.value);

    const handleOpenAccordion = () => {
        setShowMoreLines(oldValue => !oldValue);
        runOnUI(setHeight)();
    }

    return(
        <View style={styles.card}>
            <Pressable style={styles.header} onPress={handleOpenAccordion}>
                <View style={styles.simpleBox}>
                    <MaterialIcons name="drag-indicator" size={20} color={theme.colors.muted} />
                    <Paragraph.regular numberOfLines={showMoreLines ? undefined : 1}>{title}</Paragraph.regular>
                </View>
                <View style={{...styles.simpleBox, flexShrink: 0}}>
                    <Paragraph.muted>{format(conclusionDate, 'dd/MM')}</Paragraph.muted>
                    <Animated.View style={[animatedChevronStyle]}>
                        <MaterialIcons name="keyboard-arrow-down" size={20}/>
                    </Animated.View>
                </View>
            </Pressable>
            <Animated.View style={[animatedHeightStyle]}>
                <View style={styles.content} ref={animatedRef} collapsable={false}>
                    <Divider.default/>
                    <SmallText.muted>{description}</SmallText.muted>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.normal,
        overflow: 'hidden'
    },
    header: {
        padding: theme.distance.normal,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.distance.normal,
        flexDirection: 'row'
    },
    content: {
        gap: theme.distance.normal,
        paddingHorizontal: theme.distance.normal,
        paddingBottom: theme.distance.normal,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    simpleBox: {
        alignItems: 'center',
        gap: theme.distance.normal,
        flexDirection: 'row',
        maxWidth: '100%',
        flexShrink: 1,
        overflow: 'hidden'
    }
})