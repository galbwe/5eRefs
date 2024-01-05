import { StyleSheet, ScrollView, View, Text } from 'react-native'

import {theme} from '../theme'


const MonsterDescription = ({monster}) => {

    return (
        <ScrollView contentContainerStyle={StyleSheet.monsterContent}>
            <Text style={styles.monsterTitle}>{monster.name}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    monsterContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        padding: 10,
    },
    monsterTitle: {
        color: theme.colors.secondary,
        fontSize: theme.font.size.large,
        fontWeight: 'bold',
        minHeight: 40,
        width: '100%',
    },
})

export default MonsterDescription