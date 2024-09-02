import { StyleSheet, Text, View } from "react-native"
import { theme } from "../../models/styles/styles"

export const Header = () => {
    return(
        <View style={styles.header}>
            <Text style={styles.logo}>Taskys</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.distance.normal,
        paddingTop: theme.distance.normal + 40,
    },
    logo: {
        fontFamily: theme.fonts.oxanium700,
        fontSize: theme.fontSize.normal,
        textTransform: 'uppercase',
        color: theme.colors["default-text"]
    }
})