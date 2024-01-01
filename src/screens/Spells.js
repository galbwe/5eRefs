import {useState} from 'react'
import { Text, StyleSheet, FlatList, TextInput, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSpell } from '../hooks/useSpell'

const Spells = ({spells, numberOptions}) => {
    const {spell, error, fetchSpellByIndex} = useSpell()
    const [query, setQuery] = useState('')
    options = selectOptions(query, spells, numberOptions)

    console.log(spell)
    console.log(error)

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder='search for spells'
                placeholderTextColor='grey'
                onChangeText={setQuery}
            />
            <FlatList
                data={options} 
                renderItem={({item}) => {
                    return (
                        <Item 
                            name={item.name} 
                            index={item.index}
                            onPress={() => fetchSpellByIndex(item.index)}
                        />
                    )
                }}
                keyExtractor={item => item.index}
            />
            {
                spell && (
                    <View style={styles.spellContent}>
                        <Text style={styles.spellTitle}>{spell.name}</Text>
                    </View>
                )
            }

        </SafeAreaView>
    )
}

const Item = ({name, index, onPress}) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <Text>{name}</Text>
        </Pressable>
    )
}


const selectOptions = (query, spells, limit) => {

    const optionScore = x => {
        if (x.toLowerCase().startsWith(query.toLowerCase)) {
            return 10
        }
        else if (x.toLowerCase().includes(query.toLowerCase())) {
            return 1
        }
        return 0
    }

    if (!query) {
        return []
    }

    spells.sort((a, b) => optionScore(b.name) - optionScore(a.name))
    return spells.slice(0, limit) 
}

const styles = StyleSheet.create({
    container: {
        background: 'blue',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,        
    },
    spellContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spellTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        backgroundColor: 'purple',
        minHeight: 40,
        width: '100%',
    }
})

export default Spells
