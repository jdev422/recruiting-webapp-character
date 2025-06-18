import { useState } from "react";
import { SKILL_LIST } from "../../consts";
import { useCharacter } from "../../contexts/CharactorContext";
import { rollSkillCheck } from "../../utils/character/rollSkillCheck";
import "./styles.css";

export const PartySkillCheckCard = () => {
  const { characters } = useCharacter();
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(0);
  const [results, setResults] = useState<any[] | null>(null);
  const [bestIndex, setBestIndex] = useState<number | null>(null);

  const handleRoll = () => {
    const { results, bestIndex } = rollSkillCheck(
      characters,
      selectedSkill,
      dc
    );
    setResults(results);
    setBestIndex(bestIndex);
  };

  return (
    <div className="partyskill-check__card">
      <h4 className="partyskill-check__title">Party Skill Check</h4>

      <div className="partyskill-check__controls">
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

      {results && (
        <div className="partyskill-check__result">
          {results.map((res) => (
            <div
              key={res.index}
              className={`character-result ${
                res.index === bestIndex ? "best-character" : ""
              }`}
            >
              <p>
                <strong>Character {res.index + 1}</strong>
              </p>
              <p>
                🎲 Roll: {res.roll}, Skill: +{res.skillValue} →{" "}
                <strong>Total: {res.total}</strong>
              </p>
              <p>{res.success ? "✅ Success!" : "❌ Failure."}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
