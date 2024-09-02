import { StyleSheet, View } from "react-native"
import { theme } from "../../models/styles/styles"

export const Danger = () => {
    return <View style={styles.danger}/>
}

const styles = StyleSheet.create({
    danger: {
        height: 1,
        width: '100%',
        backgroundColor: theme.colors["danger-text"]
    }
})