import { AttributeList } from "../../components/AttributeList";
import { ClassList } from "../../components/ClassList";
import { CharacterProvider } from "../../contexts/CharactorContext";

export const HomePage = () => (
  <CharacterProvider>
    <AttributeList />
    <ClassList />
  </CharacterProvider>
);
