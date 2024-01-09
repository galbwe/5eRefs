// ----------------------------------------------------------------
// this import MUST be before all others or else the app will crash
import "react-native-gesture-handler";
// ----------------------------------------------------------------

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SpellScreen from "./src/screens/SpellScreen";
import MonsterScreen from "./src/screens/MonsterScreen";
import { useSpellList } from "./src/hooks/useSpellList";
import { useMonsterList } from "./src/hooks/useMonsterList";
import { theme } from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  const { spells } = useSpellList();
  const { monsters } = useMonsterList();

  const SpellScreenNavWrapper = () => {
    return <SpellScreen spells={spells} numberOptions={10} />;
  };

  const MonsterScreenNavWrapper = () => {
    return <MonsterScreen monsters={monsters} numberOptions={10} />;
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator defaultStatus="Monsters">
        <Drawer.Screen name="Spells" component={SpellScreenNavWrapper} />
        <Drawer.Screen name="Monsters" component={MonsterScreenNavWrapper} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
});
