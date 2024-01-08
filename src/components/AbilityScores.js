import {View, StyleSheet, Text} from 'react-native'
import {theme} from '../theme'

// TODO: rename so we don't have pluralized component of an existing component, which gets confusing
const AbilityScores = ({str, con, dex, wis, cha, int}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.container, {width: '100%'}]}>
                <AbilityScore name='STR' ability={str} />
                <AbilityScore name='CON' ability={con} />
                <AbilityScore name='DEX' ability={dex} />
            </View>
            <View style={[styles.container, {width: '100%'}]}>
                <AbilityScore name='WIS' ability={wis} />
                <AbilityScore name='CHA' ability={cha} />
                <AbilityScore name='INT' ability={int} />
            </View>
            {/* <AbilityScore name='STR' ability={str} />
            <AbilityScore name='CON' ability={con} />
            <AbilityScore name='DEX' ability={dex} />
            <AbilityScore name='WIS' ability={wis} />
            <AbilityScore name='CHA' ability={cha} />
            <AbilityScore name='INT' ability={int} /> */}
        </View>
    )
}

const AbilityScore = ({name, ability}) => {
    return (
        <View style={styles.abilityScore}>
            <Text style={styles.abilityName}>{name}</Text>
            <Text style={styles.abilityValue}>{ability} ({getAbilityModifier(ability)})</Text>
        </View>
    )
}

const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    if (mod >= 0) {
        return `+${mod}`
    }
    return `-${mod}`
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    abilityScore: {
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    abilityName: {
        color: theme.colors.accent,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.size.small,
    },
    abilityValue: {
        color: theme.colors.text,
        fontWeight: theme.font.weight.normal,
        fontSize: theme.font.size.small,
    }
})

export default AbilityScores
