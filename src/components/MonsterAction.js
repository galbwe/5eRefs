import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

const MonsterAction = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
  },
  title: {
    color: theme.colors.accent,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.bold,
    marginBottom: 3,
  },
  content: {
    color: theme.colors.text,
  },
});

export default MonsterAction;
