import { StyleSheet, View } from "react-native"
import { theme } from "../../models/styles/styles"

export const Success = () => {
    return <View style={styles.success}/>
}

const styles = StyleSheet.create({
    success: {
        height: 1,
        width: '100%',
        backgroundColor: theme.colors["success-text"]
    }
})