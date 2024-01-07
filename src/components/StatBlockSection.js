import { StyleSheet, View } from "react-native"


const StatBlockSection = ({style, children}) => {
    return <View style={[styles.statBlockSection, style]}>{children}</View>
}


const styles = StyleSheet.create({
    statBlockSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 20,
    }
})

export default StatBlockSection
