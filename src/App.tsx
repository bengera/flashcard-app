import { useState } from "react";
import data from "../data.json";
import { StatisticsPanel } from "./components/statistics-panel";
import { Header } from "./components/header";
import type { Flashcard } from "./types/flashcard";
import { StudyPanel } from "./components/study";

function App() {
  const [cards, setCards] = useState<Flashcard[]>(data.flashcards); // al cards direct from json
  const [hideMasteredCards, setHideMasteredCards] = useState(false); // state for checkbox input of hiding mastered cards
  const [currentIdx, setCurrentIdx] = useState(0); // curret card being viewed

  return (
    <div className="app">
      <h1 className="u-visually-hidden">Study Flashcards</h1>
      <Header />

      <main>
        <StudyPanel
          cards={cards}
          setCards={setCards}
          hideMasteredCards={hideMasteredCards}
          setHideMasteredCards={setHideMasteredCards}
          currentIdx={currentIdx}
          setCurrentIdx={setCurrentIdx}
        />

        <StatisticsPanel cards={cards} />
      </main>
    </div>
  );
}

export default App;
