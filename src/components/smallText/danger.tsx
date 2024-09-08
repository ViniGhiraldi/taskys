import { StyleSheet, Text, TextProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Danger = (props: TextProps) => {
    return <Text style={styles.danger} {...props}/>
}

const styles = StyleSheet.create({
    danger: {
        fontSize: theme.fontSize.small,
        fontFamily: theme.fonts.oxanium400,
        color: theme.colors.danger
    }
})