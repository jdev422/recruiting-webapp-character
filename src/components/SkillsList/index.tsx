import { useCharacter } from "../../contexts/CharactorContext";
import { SKILL_LIST } from "../../consts";
import { calculateModifier } from "../../utils/character/modifiers";

export const SkillsList = () => {
  const {
    attributes,
    skills,
    incrementSkill,
    decrementSkill,
    getAvailableSkillPoints,
    getUsedSkillPoints
  } = useCharacter();

  return (
    <div>
      <h2>Skills</h2>
      <p>
        Available Skill Points: {getUsedSkillPoints()} / {getAvailableSkillPoints()}
      </p>
      <ul>
        {SKILL_LIST.map(({ name, attributeModifier }) => {
          const modifier = calculateModifier(attributes[attributeModifier]);
          const basePoints = skills[name];
          const total = basePoints + modifier;

          return (
            <li key={name} style={{ marginBottom: "10px" }}>
              <strong>{name}</strong> - points: {basePoints}{" "}
              <button onClick={() => incrementSkill(name)}>+</button>{" "}
              <button onClick={() => decrementSkill(name)}>-</button>{" "}
              | modifier ({attributeModifier}): {modifier} | total: {total}
            </li>
          );
        })}
      </ul>
    </div>
  );
};