import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSpell } from '../hooks/useSpell'
import { theme } from '../theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SpellDescription from '../components/SpellDescription'
import SearchBar from '../components/SearchBar'
import { rankByStringMatch } from '../utils/sorting'


const Spells = ({spells, numberOptions}) => {
    const {spell, error, fetchSpellByIndex} = useSpell()

    return (
        <SafeAreaView style={styles.container}>
            <MaterialCommunityIcons name="wizard-hat" size={theme.font.size.extraLarge} color={theme.colors.text} />
            <SearchBar 
                data={spells}
                nResults={numberOptions}
                rankItems={rankSpells}
                placeholder={'search for spells'}
                placeholderColor={'grey'}
                onSelectResult={(item) => fetchSpellByIndex(item.index)}
                keyExtractor={(item) => item.index}
                getItemDisplayValue={(item) => item.name}
                getItemIndex={(item) => item.index}
            />
            {
                spell && <SpellDescription spell={spell}/>
            }

        </SafeAreaView>
    )
}


const rankSpells = (query, data, limit) => {

    const score = x => rankByStringMatch(x, query) 

    if (!query) {
        return []
    }

    data.sort((a, b) => score(b.name) - score(a.name))
    return data.slice(0, limit) 
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: theme.colors.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

})

export default Spells
