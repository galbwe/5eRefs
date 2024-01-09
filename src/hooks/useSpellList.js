import { useState, useEffect } from "react";

export const useSpellList = () => {
  const [spellList, setSpellList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const url = "https://www.dnd5eapi.co/api/spells";
        const headers = new Headers({ Accept: "application/json" });
        const response = await fetch(url, { headers: headers });
        const status = await response.status;
        console.log(status);
        if (status != 200) {
          throw new Error("Unable to fetch spell list");
        }
        const data = await response.json();
        setSpellList(data.results);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
        setError("");
      }
    })();
  }, []);
  return { spells: spellList, loading, error };
};
