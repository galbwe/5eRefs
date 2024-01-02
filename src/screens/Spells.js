import {useState} from 'react'
import { Text, StyleSheet, FlatList, TextInput, Pressable, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSpell } from '../hooks/useSpell'
import { theme } from '../theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { levelWithSuffix } from '../utils/math'


const Spells = ({spells, numberOptions}) => {
    const {spell, error, fetchSpellByIndex} = useSpell()
    const [query, setQuery] = useState('')
    const [searchResultsOpen, setOptionTrayOpen] = useState(false)
    const [searchResultsTop, setSearchResultsTop] = useState([0, 0])

    const options = selectOptions(query, spells, numberOptions)
    const [searchResultsX, searchResultsY] = searchResultsTop

    return (
        <SafeAreaView style={styles.container}>
            <MaterialCommunityIcons name="wizard-hat" size={theme.font.size.extraLarge} color={theme.colors.text} />
            <TextInput 
                onLayout={({nativeEvent}) => {
                    if (nativeEvent.layout) {
                        const {x, y, height} = nativeEvent.layout
                        setSearchResultsTop([x, y + height])
                    }
                }}
                style={styles.searchBar}
                placeholder='search for spells'
                placeholderTextColor='grey'
                onChangeText={q => {
                    setQuery(q)
                    if (!searchResultsOpen) {
                        setOptionTrayOpen(true)
                    }
                    if (searchResultsOpen && !q) {
                        setOptionTrayOpen(false)
                    }
                }}
            />
            {
                searchResultsOpen && (
                    <FlatList
                        data={options} 
                        style={[styles.searchBarResults, {
                            position: 'absolute',
                            left: searchResultsX,
                            top: searchResultsY,
                            zIndex: 1,
                        }]}
                        renderItem={({item}) => {
                            return (
                                <Item 
                                    name={item.name} 
                                    index={item.index}
                                    // TODO: make pressing a search result dismiss the keyboard
                                    onPress={() => {
                                        fetchSpellByIndex(item.index)
                                        setQuery('')
                                        setOptionTrayOpen(false)
                                    }}
                                />
                            )
                        }}
                        keyExtractor={item => item.index}
                    />
                )
            }
            {
                spell && (
                    <ScrollView contentContainerStyle={styles.spellContent}>
                        {/* TODO: add more information about each spell */}
                        <Text style={styles.spellTitle}>{spell.name}</Text>
                        {spell.level && (
                            <Text
                                style={styles.spellSubtitle} 
                            >
                                {`${levelWithSuffix(spell.level)}-level`} {spell.school?.name.toLowerCase()}
                            </Text>
                        )}
                        <View style={styles.spellInfoGroup}>
                            <Text style={styles.spellInfoCategory}>Casting Time:</Text>
                            <Text style={styles.spellInfoData}>{spell.casting_time}</Text>
                        </View>
                        <View style={styles.spellInfoGroup}>
                            <Text style={styles.spellInfoCategory}>Range:</Text>
                            <Text style={styles.spellInfoData}>{spell.range}</Text>
                        </View>
                        <View style={styles.spellInfoGroup}>
                            <Text style={styles.spellInfoCategory}>Components:</Text>
                            <Text style={styles.spellInfoData}>
                                {spell.components.join(', ')}
                            </Text>
                        </View>
                        <View style={styles.spellInfoGroup}>
                            <Text style={styles.spellInfoCategory}>Duration:</Text>
                            <Text style={styles.spellInfoData}>
                                {spell.concentration ? (
                                    `Concentration, ${spell.duration.toLowerCase()}`
                                ) : (
                                    spell.duration
                                )}
                            </Text>
                        </View>

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

        </SafeAreaView>
    )
}

const Item = ({name, index, onPress}) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <Text style={styles.searchResultsItem}>{name}</Text>
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
        width: '100%',
        backgroundColor: theme.colors.primary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    searchBar: {
        height: 45,
        backgroundColor: theme.colors.primaryShade,
        color: theme.colors.text,
        fontSize: theme.font.size.small,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        width: '60%',
        borderWidth: 1,
        borderColor: theme.colors.accent,
        borderRadius: 5,
    },
    searchBarResults: {
        backgroundColor: theme.colors.primaryShade,
        width: '60%',
        paddingBottom: 10,
    },
    searchResultsItem: {
        color: theme.colors.accent,
        width: '100%',
        height: 30,
        fontSize: theme.font.size.small,
        marginTop: 5,
        paddingHorizontal: 10, 
    },
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
    },
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

export default Spells
