import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'


const InfoText = ({title, content}) => {
    return (
        <View style={styles.InfoGroup}>
            <Text style={styles.InfoCategory}>{title}</Text>
            <Text style={styles.InfoData}>{content}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    InfoGroup: {
        display: 'flex',
        flexDirection: 'row'
    },
    InfoCategory: {
        color: theme.colors.accent,
        marginRight: 5,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.size.small,
    },
    InfoData: {
        color: theme.colors.text,
        fontWeight: theme.font.weight.normal,
        fontSize: theme.font.size.small,
    },
})


export default InfoText
