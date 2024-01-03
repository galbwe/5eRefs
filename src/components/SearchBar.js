import { useState } from 'react'
import { Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native'

import { theme } from '../theme'

const SearchBar = ({
    data,
    nResults,
    rankItems,
    placeholder, 
    placeholderColor, 
    onSelectResult, 
    keyExtractor,
    getItemDisplayValue,
    getItemIndex,
}) => {
    const [query, setQuery] = useState('')
    const [searchResultsOpen, setOptionTrayOpen] = useState(false)
    const [searchResultsTop, setSearchResultsTop] = useState([0, 0])

    const results = rankItems(query, data, nResults)
    const [searchResultsX, searchResultsY] = searchResultsTop

    return (
       <>
            <TextInput 
                onLayout={({nativeEvent}) => {
                    if (nativeEvent.layout) {
                        const {x, y, height} = nativeEvent.layout
                        setSearchResultsTop([x, y + height])
                    }
                }}
                style={styles.searchBar}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
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
                    data={results} 
                    style={[styles.searchBarResults, {
                        position: 'absolute',
                        left: searchResultsX,
                        top: searchResultsY,
                        zIndex: 1,
                    }]}
                    renderItem={({item}) => {
                        return (
                            <Item 
                                name={getItemDisplayValue(item)} 
                                index={getItemIndex(item)}
                                // TODO: make pressing a search result dismiss the keyboard
                                onPress={() => {
                                    onSelectResult(item)
                                    setQuery('')
                                    setOptionTrayOpen(false)
                                }}
                            />
                        )
                    }}
                    keyExtractor={keyExtractor}
                />
            )
        }
       </> 
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


const styles = StyleSheet.create({
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
})


export default SearchBar

