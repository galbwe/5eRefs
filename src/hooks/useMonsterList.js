import { useState, useEffect } from "react";

export const useMonsterList = () => {
  const [monsterList, setMonsterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const url = "https://www.dnd5eapi.co/api/monsters";
        const headers = new Headers({ Accept: "application/json" });
        const response = await fetch(url, { headers: headers });
        const status = await response.status;
        console.log(status);
        if (status != 200) {
          throw new Error("Unable to fetch monster list");
        }
        const data = await response.json();
        setMonsterList(data.results);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);

        setError("");
      }
    })();
  }, []);
  return { monsters: monsterList, loading, error };
};
