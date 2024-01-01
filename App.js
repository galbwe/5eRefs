import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Spells from './src/screens/Spells';
import { useSpellList } from  './src/hooks/useSpellList'
import { theme } from './src/theme'

export default function App() {
  const {spells, loading, error} = useSpellList()
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Spells spells={spells} numberOptions={10}/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10 
  }
});
