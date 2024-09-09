import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Default = (props: TouchableOpacityProps) => {
    return <TouchableOpacity style={styles.default} {...props}/>
}

const styles = StyleSheet.create({
    default:{
        padding: theme.distance["x-small"],
        borderRadius: theme.radius.normal,
        backgroundColor: theme.colors.button,
        color: theme.colors["default-text"]
    }
})