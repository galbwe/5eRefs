import { StyleSheet, ScrollView, View, Text } from "react-native";

import { theme } from "../theme";
import StatBlockSection from "./StatBlockSection";
import InfoText from "./InfoText";
import AbilityScores from "./AbilityScores";
import MonsterAbility from "./MonsterAbility";

const MonsterDescription = ({ monster }) => {
  const armorClass = getArmorClass(monster);
  const speed = getSpeed(monster);

  return (
    <ScrollView contentContainerStyle={styles.monsterContent}>
      <StatBlockSection style={styles.statBlockBottomBorder}>
        <Text style={styles.monsterTitle}>{monster.name}</Text>
        <Text style={styles.monsterSubtitle}>
          {monster.size} {monster.type}, {monster.alignment}
        </Text>
      </StatBlockSection>
      <StatBlockSection style={styles.statBlockBottomBorder}>
        <InfoText title={"Armor Class"} content={armorClass} />
        <InfoText
          title={"Hit Points"}
          content={`${monster.hit_points} (${monster.hit_points_roll})`}
        />
        <InfoText title={"Speed"} content={speed} />
      </StatBlockSection>
      <StatBlockSection style={styles.statBlockBottomBorder}>
        <AbilityScores
          str={monster.strength}
          con={monster.constitution}
          dex={monster.dexterity}
          wis={monster.wisdom}
          cha={monster.charisma}
          int={monster.intelligence}
        />
      </StatBlockSection>
      {monster.special_abilities && monster.special_abilities.length > 0 && (
        <StatBlockSection style={styles.statBlockBottomBorder}>
          <Text style={styles.monsterTitle}>Special Abilities</Text>
          {monster.special_abilities.map((ability) => {
            return (
              <MonsterAbility title={ability.name} content={ability.desc} />
            );
          })}
        </StatBlockSection>
      )}
      <StatBlockSection>
        <Text style={styles.monsterTitle}>Actions</Text>
        {monster.actions.map((action) => {
          return <MonsterAbility title={action.name} content={action.desc} />;
        })}
      </StatBlockSection>
    </ScrollView>
  );
};

const getArmorClass = (monster) => {
  const acs = monster.armor_class.map((x) => x.value);
  return Math.max(...acs);
};

const getSpeed = (monster) => {
  const walkSpeed = monster.speed.walk;
  const otherSpeeds = Object.entries(monster.speed)
    .filter((x) => x[0] !== "walk")
    .map((x) => `${x[0]} ${x[1]}`);
  if (!otherSpeeds) {
    return walkSpeed;
  }
  return [walkSpeed, ...otherSpeeds].join(", ");
};

const styles = StyleSheet.create({
  monsterContent: {
    minWidth: "80%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    padding: 10,
  },
  monsterTitle: {
    color: theme.colors.secondary,
    fontSize: theme.font.size.large,
    fontWeight: "bold",
    minHeight: 40,
    width: "100%",
  },
  monsterSubtitle: {
    color: theme.colors.text,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.light,
    fontStyle: "italic",
  },
  statBlockBottomBorder: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 4,
  },
});

export default MonsterDescription;
