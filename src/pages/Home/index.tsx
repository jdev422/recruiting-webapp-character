import { AttributeList } from "../../components/AttributeList";
import { ClassList } from "../../components/ClassList";
import { SkillsList } from "../../components/SkillsList";
import { CharacterProvider } from "../../contexts/CharactorContext";

export const HomePage = () => (
  <CharacterProvider>
    <AttributeList />
    <ClassList />
    <SkillsList />
  </CharacterProvider>
);
