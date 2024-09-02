import { StyleSheet, Text, TextProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Bold = (props: TextProps) => {
    return <Text style={styles.bold} {...props}/>
}

const styles = StyleSheet.create({
    bold: {
        fontSize: theme.fontSize.normal,
        fontFamily: theme.fonts.oxanium700,
        color: theme.colors["default-text"]
    }
})