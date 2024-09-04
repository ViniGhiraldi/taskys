import { ScrollView, StyleSheet, View } from "react-native"
import { theme } from "../../models/styles/styles"
import { AddTaskButton } from "../../components/addTaskButton"
import { Header } from "../../components/header"
import { useRef } from "react"
import { AddTaskBottomSheet } from "../../components/addTaskBottomSheet"

export const Home = () => {
    const bottomSheetRef = useRef<any>(null);

    const handleOpenAddTaskBottomSheet = () => bottomSheetRef.current?.expand();

    return(
        <View style={styles.container}>
            <Header/>
            <ScrollView style={styles.scrollView}>
                <AddTaskButton handleOpenAddTaskBottomSheet={handleOpenAddTaskBottomSheet}/>
            </ScrollView>
            <AddTaskBottomSheet bottomSheetRef={bottomSheetRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        gap: theme.distance.normal
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: theme.distance.normal,
    },
})