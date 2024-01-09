import { useState, useEffect } from "react";

export const useMonster = () => {
  const [index, setIndex] = useState("");
  const [monster, setMonster] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (index && (!monster || monster.index !== index)) {
      // fetch monster data
      (async () => {
        const url = `https://www.dnd5eapi.co/api/monsters/${index}`;
        const headers = { Accept: "application/json" };
        try {
          const response = await fetch(url, { headers: headers });
          if (!response.ok) {
            throw new Error("Received error response from monster endpoint");
          }
          const data = await response.json();
          setMonster(data);
          setError("");
        } catch (e) {
          setError(e.message);
          setMonster({});
        }
      })();
    }
  }, [index]);

  return { monster, error, fetchMonsterByIndex: setIndex };
};
