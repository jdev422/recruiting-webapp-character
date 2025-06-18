import { Attributes, Skills } from "../types";

const username = "jdev422";
const BASE_URL = `https://recruiting.verylongdomaintotestwith.ca/api/${username}/character`;

export const fetchCharacter = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.body;
};

export const saveCharacter = async (payload: {
  attributes: Attributes;
  skills: Skills;
}) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
