import { CharactersScreen } from "../../components/CharactersScreen";
import { CharacterProvider } from "../../contexts/CharactorContext";

export const HomePage = () => (
  <CharacterProvider>
    <CharactersScreen />
  </CharacterProvider>
);
