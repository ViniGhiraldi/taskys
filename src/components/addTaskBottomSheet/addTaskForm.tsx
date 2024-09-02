import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Title } from "../title"
import { Ionicons } from "@expo/vector-icons"
import { Divider } from "../divider"
import { Paragraph } from "../paragraph"
import { theme } from "../../models/styles/styles"
import { useState } from "react"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface IAddTaskForm{
    handleCloseAddTaskBottomSheet: () => void;
}

export const AddTaskForm = ({handleCloseAddTaskBottomSheet}: IAddTaskForm) => {
    const [date, setDate] = useState<Date>();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateSelected = (e: DateTimePickerEvent, selectedDate?: Date) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Title>Adicionar tarefa</Title>
                <TouchableOpacity onPress={handleCloseAddTaskBottomSheet}>
                    <Ionicons name="close" size={20} />
                </TouchableOpacity>
            </View>
            <Divider.default />
            <View style={styles.field}>
                <Paragraph.regular>Título</Paragraph.regular>
                <TextInput style={styles.input} placeholderTextColor={theme.colors.muted} placeholder="Sobre o que se trata"/>
            </View>
            <View style={styles.field}>
                <Paragraph.regular>Descrição</Paragraph.regular>
                <TextInput style={styles.input} multiline numberOfLines={4} placeholderTextColor={theme.colors.muted} placeholder="Descreva brevemente a tarefa"/>        
            </View>
            <View style={styles.field}>
                <Paragraph.regular>Data de conclusão</Paragraph.regular>
                <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                    <Ionicons name="calendar-outline" size={theme.fontSize.large} />
                    <Text style={styles.textMuted}>Selecione uma data</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()}
                        testID="dateTimePicker"
                        mode="date"
                        is24Hour
                        display="default"
                        onChange={handleDateSelected}
                    />
                )}
            </View>
            <Divider.default />
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} />
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
        textAlignVertical: 'top'
    },
    datePicker: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.normal,
        padding: theme.distance.normal,
        textAlignVertical: 'top',
        flexDirection: 'row',
        gap: theme.distance.normal,
        alignItems: 'center'
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
        justifyContent: 'center'
    }
})