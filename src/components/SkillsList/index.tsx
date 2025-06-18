import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";

export const SkillsList = () => {
  const {
    skillPoints,
    incrementSkill,
    decrementSkill,
    attributes,
    getRemainingSkillPoints,
    getSkillTotal,
  } = useCharacter();

  return (
    <div>
      <h2>Skills</h2>
      <p>Remaining Skill Points: {getRemainingSkillPoints()}</p>
      <ul>
        {SKILL_LIST.map((skill) => {
          const modifier = attributes[skill.attributeModifier];
          const calcModifier = Math.floor((modifier - 10) / 2);
          const total = getSkillTotal(skill.name, calcModifier);

          return (
            <li key={skill.name}>
              <strong>{skill.name}</strong> - Points: {skillPoints[skill.name]}{" "}
              <button onClick={() => incrementSkill(skill.name)}>+</button>
              <button onClick={() => decrementSkill(skill.name)}>-</button>{" "}
              Modifier ({skill.attributeModifier}): {calcModifier} | Total:{" "}
              {total}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
