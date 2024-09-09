import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Success = (props: TouchableOpacityProps) => {
    return <TouchableOpacity style={styles.success} {...props}/>
}

const styles = StyleSheet.create({
    success:{
        padding: theme.distance["x-small"],
        borderRadius: theme.radius.normal,
        backgroundColor: theme.colors.success,
        color: theme.colors["success-text"]
    }
})