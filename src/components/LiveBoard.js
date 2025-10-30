import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const LiveBoard = () => {
  const [games, setGames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Vse");

  // 🔄 poslušaj spremembe v realnem času
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "games"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGames(data);
    });
    return () => unsub();
  }, []);

  const filteredGames =
    selectedCategory === "Vse"
      ? games
      : games.filter((g) => g.sport === selectedCategory);

  return (
<div className="p-6 max-w-5xl mx-auto mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Rezultati v živo</h2>

  <div className="flex justify-center gap-3 mb-6">
    {["Vse", "Nogomet", "Košarka", "Tenis"].map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          selectedCategory === cat
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
    <table className="min-w-full text-sm text-gray-700">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Šport</th>
          <th className="p-3 text-left">Ekipe</th>
          <th className="p-3 text-left">Rezultat</th>
          <th className="p-3 text-left">Čas</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredGames.map((g) => (
          <tr key={g.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{g.sport}</td>
            <td className="p-3">{g.teams}</td>
            <td className="p-3 font-bold">{g.score}</td>
            <td className="p-3">{g.time}</td>
            <td className={`p-3 ${g.status === "V teku" ? "text-green-600" : "text-gray-500"}`}>{g.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default LiveBoard;
