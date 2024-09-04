import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { theme } from "../../models/styles/styles"
import { Paragraph } from "../paragraph"

export const AddTaskButton = ({handleOpenAddTaskBottomSheet}: {handleOpenAddTaskBottomSheet: () => void}) => {
    return (
        <>
            <TouchableOpacity style={styles.cardTransparent} onPress={handleOpenAddTaskBottomSheet}>
                <Ionicons name="add" size={20} />
                <Paragraph.regular>Adicionar tarefa</Paragraph.regular>
            </TouchableOpacity>
            
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