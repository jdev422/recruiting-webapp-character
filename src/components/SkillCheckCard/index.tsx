import { useState } from "react";
import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";

import "./styles.css";

interface Props {
  index: number;
}

export const SkillCheckCard = ({ index }: Props) => {
  const { characters } = useCharacter();
  const character = characters[index];
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const skillValue = character.skills[selectedSkill] ?? 0;
    const total = roll + skillValue;
    setRollResult(roll);
    setSuccess(total >= dc);
  };

  return (
    <div className="skill-check__card">
      <h4 className="skill-check__title">Skill Check</h4>
      <div className="skill-check__controls">
        <label>
          Skill:
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          DC:
          <input
            type="number"
            min={0}
            value={dc}
            onChange={(e) => setDC(Number(e.target.value))}
          />
        </label>

        <button onClick={handleRoll}>Roll</button>
      </div>

      {rollResult !== null && (
        <div className="skill-check__result">
          <p>🎲 Roll: {rollResult}</p>
          <p>
            ✅ Result: {rollResult + (character.skills[selectedSkill] ?? 0)} ( +
            {character.skills[selectedSkill] ?? 0} {selectedSkill})
          </p>
          <p>
            {success ? "✅ Success!" : "❌ Failure."} (Needed {dc} or more)
          </p>
        </div>
      )}
    </div>
  );
};
