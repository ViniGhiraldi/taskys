import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const IconButton = (props: TouchableOpacityProps) => {
    return <TouchableOpacity style={styles.iconButton} {...props}/>
}

const styles = StyleSheet.create({
    iconButton:{
        padding: theme.distance["x-small"],
        borderRadius: theme.radius.normal,
        backgroundColor: theme.colors.button
    }
})