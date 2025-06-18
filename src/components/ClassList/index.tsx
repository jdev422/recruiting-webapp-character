import { useCharacter } from "../../contexts/CharactorContext";
import { CLASS_LIST } from "../../consts";
import { meetsRequirements } from '../../utils/character/requirements';

export const ClassList = () => {
  const { attributes } = useCharacter();

  return (
    <div>
      <h2>Available Classes</h2>
      <ul>
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const isEligible = meetsRequirements(attributes, requirements);
          return (
            <li
              key={className}
              style={{
                padding: "8px",
                marginBottom: "4px",
                backgroundColor: isEligible ? "#d4f7dc" : "#fbeaea",
                border: "1px solid",
                borderColor: isEligible ? "green" : "red",
              }}
            >
              {className} {isEligible ? "✅" : "❌"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
