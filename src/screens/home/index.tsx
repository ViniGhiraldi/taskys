import { Button, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { theme } from "../../models/styles/styles"
import { AddTaskButton } from "../../components/addTaskButton"
import { Header } from "../../components/header"
import { useRef } from "react"
import { AddTaskBottomSheet } from "../../components/addTaskBottomSheet"
import { Paragraph } from "../../components/paragraph"
import { MaterialIcons } from "@expo/vector-icons"
import { useTasksContext } from "../../contexts/tasksContext"
import { TaskCard } from "../../components/taskCard"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Home = () => {
    const { tasks, handleChangeTasks } = useTasksContext();

    const bottomSheetRef = useRef<any>(null);

    const handleOpenAddTaskBottomSheet = () => bottomSheetRef.current?.expand();

    const handleRemoveAS = async () => {
        try {
            await AsyncStorage.removeItem('tasks');
            handleChangeTasks({});
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
            <Header/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <AddTaskButton handleOpenAddTaskBottomSheet={handleOpenAddTaskBottomSheet}/>
                    {tasks.pendings && (
                        <View style={styles.pendings}>
                            <View style={styles.taskContainer}>
                                <Paragraph.bold>Pendentes</Paragraph.bold>
                                <View style={styles.taskContainer}>
                                    <TouchableOpacity style={styles.iconButton}>
                                        <MaterialIcons name="hourglass-top" size={20}/>
                                    </TouchableOpacity>
                                    <MaterialIcons name="keyboard-arrow-up" size={20}/>
                                </View>
                            </View>
                            {tasks.pendings.map((task, i) => (
                                <TaskCard title={task.title} description={task.description} conclusionDate={new Date(task.conclusionDate)} key={i} />
                            ))}
                        </View>
                    )}
                    <Button title="Remove AS" onPress={handleRemoveAS}/>
                </View>
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
        paddingHorizontal: theme.distance.normal
    },
    main: {
        gap: theme.distance["x-large"]
    },
    pendings: {
        gap: theme.distance.normal
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.distance.normal
    },
    iconButton: {
        padding: theme.distance["x-small"],
        borderRadius: theme.radius.normal,
        backgroundColor: theme.colors.button
    }
})