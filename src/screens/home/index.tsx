import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../../models/styles/styles"
import { AddTaskButton } from "../../components/addTaskButton"
import { Header } from "../../components/header"

export const Home = () => {
    return(
        <View style={styles.container}>
            <Header/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <AddTaskButton/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: theme.colors.background,
        gap: theme.distance.normal
    },
    scrollView: {
        flex: 1
    },
    main: {
        flex: 1,
        paddingHorizontal: theme.distance.normal,
    }
})