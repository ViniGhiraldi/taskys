import { StyleSheet, Text, TextProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Regular = (props: TextProps) => {
    return <Text style={styles.regular} {...props}/>
}

const styles = StyleSheet.create({
    regular: {
        fontSize: theme.fontSize.normal,
        fontFamily: theme.fonts.oxanium400,
        color: theme.colors["default-text"]
    }
})