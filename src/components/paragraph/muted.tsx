import { StyleSheet, Text, TextProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Muted = (props: TextProps) => {
    return <Text style={styles.muted} {...props}/>
}

const styles = StyleSheet.create({
    muted: {
        fontSize: theme.fontSize.small,
        fontFamily: theme.fonts.oxanium400,
        color: theme.colors.muted
    }
})