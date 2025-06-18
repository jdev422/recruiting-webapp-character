import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";

import "./styles.css";

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
    <div className="skills-list__container">
      <h3>Skills</h3>
      <p>Remaining Skill Points: {getRemainingSkillPoints()}</p>
      <ul>
        {SKILL_LIST.map((skill) => {
          const modifier = attributes[skill.attributeModifier];
          const calcModifier = Math.floor((modifier - 10) / 2);
          const total = getSkillTotal(skill.name, calcModifier);

          return (
            <li key={skill.name}>
              <div>
                <strong>{skill.name}</strong> - Points:{" "}
                {skillPoints[skill.name]}{" "}
                <button onClick={() => incrementSkill(skill.name)}>+</button>
                <button onClick={() => decrementSkill(skill.name)}>
                  -
                </button>{" "}
              </div>
              <div>
                Modifier ({skill.attributeModifier}): {calcModifier} | Total:{" "}
                {total}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
