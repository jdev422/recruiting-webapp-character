import { useCharacter } from "../../contexts/CharactorContext";
import { SkillCheckCard } from "../SkillCheckCard";
import { AttributeList } from "../AttributeList";
import { ClassList } from "../ClassList";
import { SkillsList } from "../SkillsList";

import "./styles.css";
import { PartySkillCheckCard } from "../PartySkillCheckCard";

export const CharactersScreen = () => {
  const { characters, addCharacter } = useCharacter();

  return (
    <div className="character-screen">
      <div>
        <div>
          <div className="add-character__button">
            <button onClick={addCharacter}>Add Character</button>
          </div>
          <PartySkillCheckCard />
        </div>
        {characters.map((_, index) => (
          <div className="character-card" key={index}>
            <h2>Character {index + 1}</h2>
            <SkillCheckCard index={index} />

            <div className="character-card__container">
              <AttributeList index={index} />
              <ClassList index={index} />
              <SkillsList index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
