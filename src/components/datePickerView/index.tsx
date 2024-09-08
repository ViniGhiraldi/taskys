import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { Paragraph } from "../paragraph"
import { theme } from "../../models/styles/styles"
import { format } from "date-fns";

interface IDatePickerView extends TouchableOpacityProps{
    date?: Date;
    errorDateMessage?: string;
}

export const DatePickerView = ({date, errorDateMessage, ...props}: IDatePickerView) => {
    return (
        <TouchableOpacity style={{...styles.datePickerView, borderWidth: errorDateMessage ? 1 : 0}} {...props}>
            <MaterialIcons name="calendar-today" size={theme.fontSize.large} />
            {date ? <Paragraph.regular>{format(date, 'dd/MM/yyyy')}</Paragraph.regular> : <Paragraph.muted>Selecione uma data</Paragraph.muted>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    datePickerView: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.normal,
        padding: theme.distance.normal,
        textAlignVertical: 'top',
        flexDirection: 'row',
        gap: theme.distance.normal,
        alignItems: 'center',
        borderColor: theme.colors.danger
    }
})