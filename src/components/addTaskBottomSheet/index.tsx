import BottomSheet from "@gorhom/bottom-sheet"
import { useMemo } from "react"
import { ScrollView, StyleSheet } from "react-native";
import { theme } from "../../models/styles/styles";
import { AddTaskForm } from "./addTaskForm";

export const AddTaskBottomSheet = ({bottomSheetRef}: {bottomSheetRef: React.MutableRefObject<any>}) => {
    const snapPoints = useMemo(() => ['90%', '75%'], []);

    const handleCloseAddTaskBottomSheet = () => bottomSheetRef.current?.close();

    return (
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} style={styles.bottomSheet} enablePanDownToClose>
            <ScrollView style={styles.scrollView}>
                <AddTaskForm handleCloseAddTaskBottomSheet={handleCloseAddTaskBottomSheet}/>
            </ScrollView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: theme.colors.card,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100
    },
    scrollView: {
        flex: 1
    }
})