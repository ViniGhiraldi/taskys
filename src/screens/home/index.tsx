import { Button, Pressable, PressableProps, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { theme } from "../../models/styles/styles"
import { AddTaskButton } from "../../components/addTaskButton"
import { Header } from "../../components/header"
import { useEffect, useRef } from "react"
import { AddTaskBottomSheet } from "../../components/addTaskBottomSheet"
import { Paragraph } from "../../components/paragraph"
import { MaterialIcons } from "@expo/vector-icons"
import { useTasksContext } from "../../contexts/tasksContext"
import { TaskCard } from "../../components/taskCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Animated, { runOnUI } from "react-native-reanimated"
import { useAccordion } from "../../hooks/useAccordion"
import { IconButton } from "../../components/iconButton"

export const Home = () => {
    const { tasks, handleChangeTasks } = useTasksContext();
    const { animatedHeightStyle, animatedRef, setHeight, animatedChevronStyle } = useAccordion();

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

    useEffect(() => {
        setTimeout(() => runOnUI(setHeight)(), 1000)
    }, [])

    return(
        <View style={styles.container}>
            <Header/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <AddTaskButton handleOpenAddTaskBottomSheet={handleOpenAddTaskBottomSheet}/>
                        <View style={styles.pendings}>
                            <View style={styles.taskContainer}>
                                <View style={styles.headerTitle}>
                                    <Paragraph.bold>Pendentes</Paragraph.bold>
                                    <MaterialIcons name="horizontal-rule" size={20}/>
                                    <Paragraph.bold>{tasks.pendings ? tasks.pendings.length : 0}</Paragraph.bold>
                                </View>
                                {tasks.pendings && (
                                    <View style={styles.taskContainer}>
                                        <IconButton>
                                            <MaterialIcons name="hourglass-top" size={20}/>
                                        </IconButton>
                                        <Animated.View style={[animatedChevronStyle]}>
                                            <Pressable onPress={() => runOnUI(setHeight)()}>
                                                <MaterialIcons name="keyboard-arrow-down" size={20}/>
                                            </Pressable>
                                        </Animated.View>
                                    </View>
                                )}
                            </View>
                            {tasks.pendings && (
                                <Animated.View style={[animatedHeightStyle]}>
                                    <View style={styles.content} ref={animatedRef} collapsable={false}>
                                        {tasks.pendings.map((task, i) => (
                                            <TaskCard title={task.title} description={task.description} conclusionDate={new Date(task.conclusionDate)} key={i} />
                                        ))}
                                    </View>
                                </Animated.View>
                            )}
                        </View>
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
        overflow: 'hidden'
    },
    content: {
        gap: theme.distance.normal,
        paddingTop: theme.distance.normal,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.distance.normal
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.distance.small
    }
})