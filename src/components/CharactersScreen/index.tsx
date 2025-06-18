import { useCharacter } from "../../contexts/CharactorContext";
import { AttributeList } from "../AttributeList";
import { ClassList } from "../ClassList";
import { SkillsList } from "../SkillsList";
import "./styles.css";

export const CharactersScreen = () => {
  const { characters } = useCharacter();

  return (
    <div className="character-screen">
      <div className="add-character__button">
        <button>Add Character</button>
      </div>
      {characters.map((_, index) => (
        <div className="character-card" key={index}>
          <h2>Character {index + 1}</h2>
          <div className="character-card__container">
            <AttributeList index={index} />
            <ClassList index={index} />
            <SkillsList index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};
