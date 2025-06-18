import { useCharacter } from "../../contexts/CharactorContext";

export const AttributeList = () => {
  const { attributes, increment, decrement } = useCharacter();
  return (
    <div>
      {Object.entries(attributes).map(([attr, value]) => (
        <div key={attr}>
          <span>{attr}</span>
          <button onClick={() => decrement(attr as any)}>-</button>
          <span>{value}</span>
          <button onClick={() => increment(attr as any)}>+</button>
        </div>
      ))}
    </div>
  );
};
