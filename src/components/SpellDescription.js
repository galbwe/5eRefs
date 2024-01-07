import { StyleSheet, ScrollView, View, Text } from "react-native"

import { theme } from '../theme'
import { levelWithSuffix } from '../utils/math'
import InfoText from "./InfoText"


const SpellDescription = ({spell}) => {
    return (
        <ScrollView contentContainerStyle={styles.spellContent}>
        <Text style={styles.spellTitle}>{spell.name}</Text>
        {spell.level && (
            <Text
                style={styles.spellSubtitle} 
            >
                {`${levelWithSuffix(spell.level)}-level`} {spell.school?.name.toLowerCase()}
            </Text>
        )}
        <InfoText title={'Casting Time:'} content={spell.casting_time}/>
        <InfoText title={'Range:'} content={spell.range}/>
        <InfoText title={'Components'} content={spell.components?.join(', ')}/>
        <InfoText 
            title={'Duration:'} 
            content={
                spell.concentration ? (
                    `Concentration, ${spell.duration.toLowerCase()}`
                ) : (
                    spell.duration
                )
            }
        />
        {
            spell.desc?.map((text, i) => {
                return (
                    <Text key={`${spell.index}-paragraph-${i}`} style={styles.paragraph}>{text}</Text>
                )
            })
        }
        </ScrollView>
    )
    }

const styles = StyleSheet.create({
    spellContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        padding: 10,
    },
    spellTitle: {
        color: theme.colors.secondary,
        fontSize: theme.font.size.large,
        fontWeight: 'bold',
        minHeight: 40,
        width: '100%',
    },
    spellSubtitle: {
        color: theme.colors.text,
        fontSize: theme.font.size.small,
        fontWeight: theme.font.weight.light,
        fontStyle: 'italic',
    },
    paragraph: {
        color: theme.colors.text,
        fontSize: theme.font.size.small,
        marginTop: 10,
        lineHeight: 24,
    },
})

export default SpellDescription