import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { theme } from "../../models/styles/styles"

export const Default = (props: TouchableOpacityProps) => {
    return <TouchableOpacity style={styles.default} {...props}/>
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        gap: theme.distance.normal,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.rounded,
        padding: theme.distance.normal,
        justifyContent: 'center',
        alignItems: 'center'
    }
})