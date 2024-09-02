import { StyleSheet, View } from "react-native"
import { theme } from "../../models/styles/styles"

export const Default = () => {
    return <View style={styles.default}/>
}

const styles = StyleSheet.create({
    default: {
        height: 1,
        width: '100%',
        backgroundColor: theme.colors.muted
    }
})