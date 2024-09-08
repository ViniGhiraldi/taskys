import { StyleSheet, Text, TextProps } from "react-native";
import { theme } from "../../models/styles/styles";

export const SmallText = (props: TextProps) => {
    return <Text style={styles.smallText} {...props}/>
}

const styles = StyleSheet.create({
    smallText:{
        fontFamily: theme.fonts.oxanium400,
        fontSize: theme.fontSize.small,
        color: theme.colors.muted
    }
})