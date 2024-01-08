import { StyleSheet, ScrollView, View, Text } from 'react-native'

import {theme} from '../theme'
import StatBlockSection from './StatBlockSection'
import InfoText from './InfoText'


const MonsterDescription = ({monster}) => {

    const armorClass = getArmorClass(monster) 
    const speed = getSpeed(monster)

    return (
        <ScrollView contentContainerStyle={styles.monsterContent}>
            <StatBlockSection style={styles.statBlockBottomBorder}>
                <Text style={styles.monsterTitle}>{monster.name}</Text>
                <Text style={styles.monsterSubtitle}>
                    {monster.size} {monster.type}, {monster.alignment}
                </Text>
            </StatBlockSection>
            <StatBlockSection style={styles.statBlockBottomBorder}>
                <InfoText title={'Armor Class'} content={armorClass}/>
                <InfoText title={'Hit Points'} content={`${monster.hit_points} (${monster.hit_points_roll})`}/>
                <InfoText title={'Speed'} content={speed}/>
            </StatBlockSection>
            {/* ability score section */}
            <StatBlockSection style={styles.statBlockBottomBorder}>
                <View>
                    <InfoText title={'STR'} content={`${monster.strength} (${getAbilityModifier(monster.strength)})`}/>
                    <InfoText title={'CON'} content={`${monster.constitution} (${getAbilityModifier(monster.constitution)})`}/>
                    <InfoText title={'DEX'} content={`${monster.dexterity} (${getAbilityModifier(monster.dexterity)})`}/>
                    <InfoText title={'WIS'} content={`${monster.wisdom} (${getAbilityModifier(monster.wisdom)})`}/>
                    <InfoText title={'CHA'} content={`${monster.charisma} (${getAbilityModifier(monster.charisma)})`}/>
                    <InfoText title={'INT'} content={`${monster.intelligence} (${getAbilityModifier(monster.intelligence)})`}/>
                </View>
            </StatBlockSection>
        </ScrollView>
    )
}

const getArmorClass = (monster) => {
    const acs = monster.armor_class.map(x => x.value) 
    return Math.max(...acs) 
}


const getAbilityModifier = (score) => {
    const mod = Math.floor((score - 10) / 2)
    if (mod >= 0) {
        return `+${mod}`
    }
    return `-${mod}`
}


const getSpeed = (monster) => {
    const walkSpeed = monster.speed.walk
    const otherSpeeds = Object.entries(monster.speed).filter(x => x[0] !== 'walk').map(x => `${x[0]} ${x[1]}`)
    if (!otherSpeeds) {
        return walkSpeed
    }
    return [walkSpeed, ...otherSpeeds].join(', ')
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
    monsterSubtitle: {
        color: theme.colors.text,
        fontSize: theme.font.size.small,
        fontWeight: theme.font.weight.light,
        fontStyle: 'italic',        
    },
    statBlockBottomBorder: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 4,
    }
})

export default MonsterDescription