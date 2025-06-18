import { AttributeList } from "../AttributeList";
import { ClassList } from "../ClassList";
import { SkillsList } from "../SkillsList";
import "./styles.css"

export const CharacterCard = () => {
  return (
    <div className="character-card__container">
      <AttributeList />
      <ClassList />
      <SkillsList />
    </div>
  );
};
