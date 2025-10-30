// src/utils/seedFirestore.js
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const mockGames = [
  {
    sport: "Nogomet",
    teams: "Maribor vs Olimpija",
    score: "2 : 1",
    time: "78'",
    status: "V teku",
  },
  {
    sport: "Košarka",
    teams: "Cedevita Olimpija vs Partizan",
    score: "84 : 80",
    time: "Konec",
    status: "Končano",
  },
  {
    sport: "Tenis",
    teams: "Djoković vs Alcaraz",
    score: "6 : 4, 5 : 7, 3 : 2",
    time: "3. set",
    status: "V teku",
  },
  {
    sport: "Nogomet",
    teams: "Manchester City vs Real Madrid",
    score: "0 : 0",
    time: "45+'",
    status: "V teku",
  },
];

export const seedFirestore = async () => {
  try {
    for (const game of mockGames) {
      await addDoc(collection(db, "games"), game);
    }
    console.log("✅ Firestore uspešno napolnjen!");
  } catch (error) {
    console.error("Napaka pri vstavljanju podatkov:", error);
  }
};
