import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";
import { calculateModifier } from "../../utils/character/modifiers";

import "./styles.css";

interface SkillsListProps {
  index: number;
}

export const SkillsList = ({ index }: SkillsListProps) => {
  const { characters, getRemainingSkillPoints, getSkillTotal, updateSkill } =
    useCharacter();

  const character = characters[index];
  const { skills, attributes } = character;

  const remainingPoints = getRemainingSkillPoints(index);

  return (
    <div className="skills-list__container">
      <h3>{character.name} - Skills</h3>
      <p>Remaining Skill Points: {remainingPoints}</p>
      <ul>
        {SKILL_LIST.map((skill) => {
          const attrScore = attributes[skill.attributeModifier];
          const mod = calculateModifier(attrScore);
          const pointsSpent = skills[skill.name] || 0;
          const total = getSkillTotal(index, skill.name, mod);

          return (
            <li key={skill.name}>
              <div>
                <strong>{skill.name}</strong> - Points: {pointsSpent}{" "}
                <button onClick={() => updateSkill(index, skill.name, 1)}>
                  +
                </button>
                <button onClick={() => updateSkill(index, skill.name, -1)}>
                  -
                </button>
              </div>
              <div>
                Modifier ({skill.attributeModifier}): {mod} | Total: {total}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
