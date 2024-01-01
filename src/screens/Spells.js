import {useState} from 'react'
import { Dimensions, Text, View, StyleSheet, FlatList, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Spells = ({spells, numberOptions}) => {
    const [query, setQuery] = useState('')
    const [currentSpell, setCurrentSpell] = useState({})

    options = selectOptions(query, spells, numberOptions)

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
                renderItem={({item}) => <Spell name={item.name} index={item.index}/>}
                keyExtractor={item => item.index}
            />

        </SafeAreaView>
    )
}

const Spell = ({name, index}) => {
    return <Text>{name}</Text>
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
    }
})

export default Spells
