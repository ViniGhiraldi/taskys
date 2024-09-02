import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { theme } from "../../models/styles/styles"
import { Paragraph } from "../paragraph"
import { AddTaskBottomSheet } from "../addTaskBottomSheet"
import { useRef } from "react"

export const AddTaskButton = () => {
    const bottomSheetRef = useRef<any>(null);

    const handleOpenAddTaskBottomSheet = () => bottomSheetRef.current?.expand();

    return (
        <>
            <TouchableOpacity style={styles.cardTransparent} onPress={handleOpenAddTaskBottomSheet}>
                <Ionicons name="add" size={20} />
                <Paragraph.regular>Adicionar tarefa</Paragraph.regular>
            </TouchableOpacity>
            <AddTaskBottomSheet bottomSheetRef={bottomSheetRef}/>
        </>
    )
}

const styles = StyleSheet.create({
    cardTransparent: {
        padding: theme.distance.normal,
        borderRadius: theme.radius.normal,
        borderWidth: 1,
        flexDirection: 'row',
        gap: theme.distance.normal,
        alignItems: 'center'
    }
})