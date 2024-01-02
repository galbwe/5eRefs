import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'


const SpellInfo = ({title, content}) => {
    return (
        <View style={styles.spellInfoGroup}>
            <Text style={styles.spellInfoCategory}>{title}</Text>
            <Text style={styles.spellInfoData}>{content}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    spellInfoGroup: {
        display: 'flex',
        flexDirection: 'row'
    },
    spellInfoCategory: {
        color: theme.colors.accent,
        marginRight: 5,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.size.small,
    },
    spellInfoData: {
        color: theme.colors.text,
        fontWeight: theme.font.weight.normal,
        fontSize: theme.font.size.small,
    },
})


export default SpellInfo
