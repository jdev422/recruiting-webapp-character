import { useState } from "react";
import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";
import { rollSkillCheck } from "../../utils/character/rollSkillCheck";

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
  const [skillValue, setSkillValue] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleRoll = () => {
    const { results } = rollSkillCheck([character], selectedSkill, dc);
    const result = results[0];
    setRollResult(result.roll);
    setSkillValue(result.skillValue);
    setTotal(result.total);
    setSuccess(result.success);
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
            ✅ Result: {total} ( +{skillValue} {selectedSkill})
          </p>
          <p>{success ? "✅ Success!" : "❌ Failure."} (Needed {dc} or more)</p>
        </div>
      )}
    </div>
  );
};
