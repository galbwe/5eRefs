import { useState, useEffect } from "react";

export const useSpell = () => {
  const [index, setIndex] = useState("");
  const [spell, setSpell] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (index && (!spell || spell.index !== index)) {
      // fetch spell data
      (async () => {
        const url = `https://www.dnd5eapi.co/api/spells/${index}`;
        const headers = { Accept: "application/json" };
        try {
          const response = await fetch(url, { headers: headers });
          if (!response.ok) {
            throw new Error("Received error response from spell endpoint");
          }
          const data = await response.json();
          setSpell(data);
          setError("");
        } catch (e) {
          setError(e.message);
          setSpell({});
        }
      })();
    }
  }, [index]);

  return { spell, error, fetchSpellByIndex: setIndex };
};
