import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import { useMonster } from "../hooks/useMonster";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../theme";
import SearchBar from "../components/SearchBar";
import { rankByStringMatch } from "../utils/sorting";
import MonsterDescription from "../components/MonsterDescription";

const MonsterScreen = ({ monsters, numberOptions }) => {
  const { monster, error, fetchMonsterByIndex } = useMonster();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <FontAwesome5
        name="dragon"
        size={theme.font.size.extraLarge}
        color={theme.colors.text}
      />
      <SearchBar
        data={monsters}
        nResults={numberOptions}
        rankItems={rankMonsters}
        placeholder={"search for monsters"}
        placeholderColor={"grey"}
        onSelectResult={(item) => fetchMonsterByIndex(item.index)}
        keyExtractor={(item) => item.index}
        getItemDisplayValue={(item) => item.name}
        getItemIndex={(item) => item.index}
      />
      {monster && <MonsterDescription monster={monster} />}
    </SafeAreaView>
  );
};

const rankMonsters = (query, data, limit) => {
  const score = (x) => rankByStringMatch(x, query);

  if (!query) {
    return [];
  }

  data.sort((a, b) => score(b.name) - score(a.name));
  return data.slice(0, limit);
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default MonsterScreen;
