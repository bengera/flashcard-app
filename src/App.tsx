import { useEffect, useState } from "react";
import data from "../data.json";
// import data from "../data-empty.json"; // test for empty flashcards
import { StatisticsPanel } from "./components/statistics-panel";
import { Header } from "./components/header";
import { StudyPanel } from "./components/study";
import { AllCards } from "./components/allCards";
import type { Flashcard } from "./types/flashcard";


function App() {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const storedCards = localStorage.getItem('cards');
    return storedCards ? JSON.parse(storedCards) : data.flashcards; // fallback
  })
  const [hideMasteredCards, setHideMasteredCards] = useState(false); // state for checkbox input of hiding mastered cards
  const [currentIdx, setCurrentIdx] = useState(0); // current card being viewed
  const [studyMode, setStudyMode] = useState<boolean>(true); // true default!
  
  const [reveal, setReveal] = useState<boolean>(false); // show answer
  const [uniqueCat, setUniqueCat] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(false); // false by default


  const cardsState = {
  cards,
  setCards,

};

const studyState = {
  currentIdx,
  setCurrentIdx,
  reveal,
  setReveal,
  setStudyMode,
};

const controlsState = {
  hideMasteredCards,
  setHideMasteredCards,
  uniqueCat,
  setUniqueCat,
  selectedCategories,
  setSelectedCategories,
  showCategories,
  setShowCategories
};

const flashCardControlsProps = {
  onShuffle: () => setCards((prev) => shuffleArray(prev)),
  onDropDown: dropDown,
  hideMasteredCards,
  setHideMasteredCards,
  showCategories,
  uniqueCat,
  filterCategories,
  selectedCategories,
  cards,
};

  function filterCategories(category: string, checked: boolean) {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter((item) => item !== category);
      }
    });
  }

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

    const visibleCards = cards.filter((card) => {
    const categoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.includes(card.category);
    const masterFilter = hideMasteredCards ? card.knownCount !== 5 : true;
    return categoryFilter && masterFilter; // return if both true
  });

  // DROPDOWN CATEGORIES RENDER
  function dropDown() {
    setShowCategories(!showCategories);
    if (!showCategories) {
      const categories = cards.map((card) => card.category);
      const uniqueCategories = [...new Set(categories)];
      setUniqueCat(uniqueCategories.sort());
    }
  }

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
              cardsState={cardsState}
              studyState={studyState}
              controlState={controlsState}
              flashCardControlsProps={flashCardControlsProps}
              visibleCards={visibleCards}
             
              
            />
            <StatisticsPanel cards={cards} />
          </>
        ) : (
          <AllCards  
          cardsState={cardsState} 
         flashCardControlsProps={flashCardControlsProps}
         visibleCards={visibleCards}

          />
          
        )}
      </main>
    </div>
  );
}

export default App;
