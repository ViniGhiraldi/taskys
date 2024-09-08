import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Title } from "../title"
import { MaterialIcons } from "@expo/vector-icons"
import { Divider } from "../divider"
import { Paragraph } from "../paragraph"
import { theme } from "../../models/styles/styles"
import { useState } from "react"
import DatePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTasksContext } from "../../contexts/tasksContext"
import { IAllTasks } from "../../models/interfaces/IAllTasks"
import { compareDesc } from "date-fns"
import { ITask } from "../../models/interfaces/ITask"

interface IAddTaskForm{
    handleCloseAddTaskBottomSheet: () => void;
}

type TAddTaskForm = {
    title: string;
    description: string;
}

export const AddTaskForm = ({handleCloseAddTaskBottomSheet}: IAddTaskForm) => {
    const { handleChangeTasks } = useTasksContext();
    const { control, handleSubmit, formState: { errors } } = useForm<TAddTaskForm>();

    const [date, setDate] = useState<Date>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorDateMessage, setErrorDateMessage] = useState<string>();

    const handleDateSelected = (e: any, selectedDate?: Date) => {
        setDate(selectedDate);
        setErrorDateMessage(undefined);
        setShowDatePicker(false);
    }

    const handleAddTask = async (values: TAddTaskForm) => {
        if(!date){
            setErrorDateMessage('Selecione uma data');
            return;
        }
        
        try {
            //instanciando constante com os valores da nova tarefa
            const task = {...values, conclusionDate: date};

            //pegando as tarefas salvas no Async Storage
            const currentTasks = await AsyncStorage.getItem('tasks');

            //verificando se existe alguma tarefa salva no Async Storage
            if(currentTasks){
                //convertendo tarefas salvas no Async Storage para JSON
                const currentTasksParsed = JSON.parse(currentTasks) as IAllTasks;

                //verificando se existem tarefas pendentes salvas
                if(currentTasksParsed.pendings){
                    //ordenando tarefas pendentes por ordem de data de conclusão mais próxima
                    const pendingTasksInOrder = [task, ...currentTasksParsed.pendings].sort((a, b) => {
                        return new Date(a.conclusionDate) > new Date(b.conclusionDate) ? 1 : new Date(a.conclusionDate) < new Date(b.conclusionDate) ? -1 : 0;
                    })
                    const newTasks = {...currentTasksParsed, pendings: pendingTasksInOrder};

                    //atualizando as tarefas salvas no Async Storage e no estado local
                    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
                    handleChangeTasks(newTasks);
                }else{
                }
            }else{
                //adicionando nova tarefa como primeira tarefa pendente no Async Storage e no estado local
                await AsyncStorage.setItem('tasks', JSON.stringify({pendings: [task]}));
                handleChangeTasks({pendings: [task]});
            }

            //fechando bottom sheet
            handleCloseAddTaskBottomSheet();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Title>Adicionar tarefa</Title>
                <TouchableOpacity onPress={handleCloseAddTaskBottomSheet}>
                    <MaterialIcons name="close" size={20} />
                </TouchableOpacity>
            </View>
            <Divider.default />
            <View style={styles.field}>
                <Paragraph.regular>Título</Paragraph.regular>
                <Controller
                    control={control}
                    rules={{
                        required: "Adicione um título à tarefa"
                    }}
                    name="title"
                    render={({field: { value, onChange }}) => (
                        <TextInput style={{...styles.input, borderWidth: errors.title ? 1 : 0}} value={value} onChangeText={onChange} placeholderTextColor={theme.colors.muted} placeholder="Sobre o que se trata"/>
                    )}
                />
                {errors.title && <Paragraph.danger>{errors.title.message}</Paragraph.danger>}
            </View>
            <View style={styles.field}>
                <Paragraph.regular>Descrição</Paragraph.regular>
                <Controller
                    control={control}
                    rules={{
                        required: "Adicione uma descrição à tarefa"
                    }}
                    name="description"
                    render={({field: { value, onChange }}) => (
                        <TextInput style={{...styles.input, borderWidth: errors.description ? 1 : 0}} value={value} onChangeText={onChange} multiline numberOfLines={4} placeholderTextColor={theme.colors.muted} placeholder="Descreva brevemente a tarefa"/>        
                    )}
                />
                {errors.description && <Paragraph.danger>{errors.description.message}</Paragraph.danger>}
            </View>
            <View style={styles.field}>
                <Paragraph.regular>Data de conclusão</Paragraph.regular>
                <TouchableOpacity style={{...styles.datePicker, borderWidth: errorDateMessage ? 1 : 0}} onPress={() => setShowDatePicker(true)}>
                    <MaterialIcons name="calendar-today" size={theme.fontSize.large} />
                    {date ? <Paragraph.regular>{date.toISOString()}</Paragraph.regular> : <Text style={styles.textMuted}>Selecione uma data</Text>}
                </TouchableOpacity>
                {errorDateMessage && <Paragraph.danger>{errorDateMessage}</Paragraph.danger>}
                {showDatePicker && (
                    <DatePicker
                        value={date || new Date()}
                        mode="date"
                        
                        onChange={handleDateSelected}
                        minimumDate={new Date()}
                    />
                )}
            </View>
            <Divider.default />
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit(handleAddTask)}>
                <MaterialIcons name="add" size={20} />
                <Paragraph.bold>Adicionar</Paragraph.bold>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.distance.normal,
        gap: theme.distance.normal,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    field: {
        gap: theme.distance["x-small"]
    },
    input: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.normal,
        padding: theme.distance.normal,
        fontFamily: theme.fonts.oxanium400,
        fontSize: theme.fontSize.normal,
        color: theme.colors["default-text"],
        textAlignVertical: 'top',
        borderColor: theme.colors.danger
    },
    datePicker: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.normal,
        padding: theme.distance.normal,
        textAlignVertical: 'top',
        flexDirection: 'row',
        gap: theme.distance.normal,
        alignItems: 'center',
        borderColor: theme.colors.danger
    },
    textMuted: {
        fontFamily: theme.fonts.oxanium400,
        fontSize: theme.fontSize.normal,
        color: theme.colors.muted,
    },
    addButton: {
        flexDirection: 'row',
        gap: theme.distance.normal,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.rounded,
        padding: theme.distance.normal,
        justifyContent: 'center',
        alignItems: 'center'
    }
})