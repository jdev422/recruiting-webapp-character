import { Attributes } from "../../contexts/CharactorContext";

/**
 * Determines if the character meets the minimum attribute requirements
 * for a given class. A character qualifies if all attributes are
 * greater than or equal to the class's required values.
 *
 * Requirement from task:
 * "Display classes on the screen (see CLASS_LIST) and visually change the UI
 * when the character meets the minimum requirements for that class,
 * that is, all attributes are greater than or equal to the class minimums."
 */
export const meetsRequirements = (
  characterAttributes: Attributes,
  classRequirements: Record<string, number>
): boolean => {
  return Object.entries(classRequirements).every(([attr, min]) => {
    return characterAttributes[attr as keyof Attributes] >= min;
  });
};
