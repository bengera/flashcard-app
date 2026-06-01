import { useEffect, useState } from "react";
import data from "../data.json";
// import data from "../data-empty.json"; // test for empty flashcards
import { StatisticsPanel } from "./components/statistics-panel";
import { Header } from "./components/header";
import { StudyPanel } from "./components/study";
import { AllCards } from "./components/allCards";
import type { Flashcard } from "./types/flashcard";

function App() {
  // const [cards, setCards] = useState<Flashcard[]>(data.flashcards); // all cards direct from json
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const storedCards = localStorage.getItem('cards');
    return storedCards ? JSON.parse(storedCards) : data.flashcards; // fallback
  })
  const [hideMasteredCards, setHideMasteredCards] = useState(false); // state for checkbox input of hiding mastered cards
  const [currentIdx, setCurrentIdx] = useState(0); // current card being viewed
  const [studyMode, setStudyMode] = useState<boolean>(true); // true default!

   useEffect(
    function () {
      localStorage.setItem("cards", JSON.stringify(cards));
    },
    [cards],
  );

  return (
    <div className="app">
      <h1 className="u-visually-hidden">Study Flashcards</h1>
      <Header
        studyMode={studyMode}
        setStudyMode={setStudyMode}
      />

      <main className={studyMode ? "main" : "main-all-cards"}>
        {studyMode ? (
          <>
            <StudyPanel
              cards={cards}
              setCards={setCards}
              hideMasteredCards={hideMasteredCards}
              setHideMasteredCards={setHideMasteredCards}
              currentIdx={currentIdx}
              setCurrentIdx={setCurrentIdx}
            />
            <StatisticsPanel cards={cards} />
          </>
        ) : (
          <AllCards  
          cards={cards}
          setCards={setCards} />
        )}
      </main>
    </div>
  );
}

export default App;
