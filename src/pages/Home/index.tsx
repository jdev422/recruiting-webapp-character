import { AttributeList } from "../../components/AttributeList";
import { CharacterProvider } from "../../contexts/CharactorContext";

export const HomePage = () => (
  <CharacterProvider>
    <AttributeList />
  </CharacterProvider>
);
