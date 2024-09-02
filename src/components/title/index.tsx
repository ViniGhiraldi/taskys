import { StyleSheet, Text, TextProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Title = (props: TextProps) => {
    return <Text style={styles.title} {...props}/>
}

const styles = StyleSheet.create({
    title: {
        fontSize: theme.fontSize.large,
        fontFamily: theme.fonts.oxanium400,
        color: theme.colors["default-text"]
    }
})