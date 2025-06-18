import { CharacterCard } from "../../components/CharacterCard";
import { CharacterProvider } from "../../contexts/CharactorContext";

export const HomePage = () => (
  <CharacterProvider>
    <CharacterCard />
  </CharacterProvider>
);
