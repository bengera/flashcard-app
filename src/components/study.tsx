import React, { useState, useEffect } from "react";
import { FlashCardContent } from "./flashcard-content";
import type { Flashcard } from "../types/flashcard";


type StudyPanelProps = {
  cards: Flashcard[];
  setCards: React.Dispatch<React.SetStateAction<Flashcard[]>>;

  hideMasteredCards: boolean;
  setHideMasteredCards: React.Dispatch<React.SetStateAction<boolean>>;

  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
};

export function StudyPanel({
  cards,
  setCards,
  hideMasteredCards,
  setHideMasteredCards,
  currentIdx,
  setCurrentIdx,
}: StudyPanelProps) {
  const [reveal, setReveal] = useState(false); // show answer
  const visibleCards = hideMasteredCards
    ? cards.filter((card) => card.knownCount !== 5)
    : cards; // all cards shown unless hideMasteredCards is checked

  const currentCard = visibleCards[currentIdx];
  const isMastered = currentCard?.knownCount === 5; 

  function nextCard() {
    setReveal(false);
    return setCurrentIdx((prev) => {
      const lastIndex = visibleCards.length - 1; // last index is the length -1
      if (prev === lastIndex) return 0; // recognize last index, prevent it from goin beyond that
      return prev + 1; // add one if not last index
    });
  }

  function previousCard() {
    setReveal(false);
    setCurrentIdx((prev) => {
      const lastIndex = visibleCards.length - 1;
      if (prev === 0) return lastIndex;
      return prev - 1;
    });
  }

  function shuffleArray<T>(array: T[]): T[] {
   const shuffled = [...array];
   for (let i = shuffled.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
   }
   
   return shuffled;
  }

  useEffect(() => {
    if (currentIdx >= visibleCards.length) {
      setCurrentIdx(0);
    }
  }, [currentIdx, visibleCards.length, setCurrentIdx]);

if (visibleCards.length === 0) return; // prevent error when no flashcards present
  return (
    <section className="study u-shadow">
      <div className="study__header">
        <div className="study__filters">
          <button
            type="button"
            className="btn btn--categories u-rounded-pill-narrow"
          >
            All Categories
            <img src="images/icon-chevron-down.svg" alt="arrow-icon" />
          </button>

          <div className="study__option">
            <input
              className="study__checkbox"
              checked={hideMasteredCards}
              type="checkbox"
              id="hide-mastered"
              onChange={(e) => setHideMasteredCards(e.target.checked)}
            />
            <label className="study__label" htmlFor="hide-mastered">
              Hide Mastered
            </label>
          </div>
        </div>

        <button
          type="button"
          className="btn btn--shuffle u-rounded-pill-narrow"
          onClick={() => {
            setCards((prev) => shuffleArray(prev))
          }}   
        >
          <img src="images/icon-shuffle.svg" alt="shuffle-icon"/>
          Shuffle
        </button>
      </div>

      <hr className="solid" />
      <FlashCardContent 
      reveal={reveal} 
      setReveal={setReveal} 
      currentCard={currentCard}/>
      
      <div className="study__action-buttons">
        <button
          type="button"
          className={`btn btn-knowit u-rounded-pill u-shadow--thick ${
            isMastered ? "btn-knowit--mastered" : ""
          }`}
          onClick={() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === currentCard.id
                  ? { ...card, knownCount: card.knownCount + 1 }
                  : card,
              ),
            );
          }}
          disabled={isMastered}
        >
          <img src="images/icon-circle-check.svg" alt="check-icon" />
          {!isMastered ? "I know this" : "Already mastered"}
        </button>

        <button
          type="button"
          className="btn btn--reset u-rounded-pill u-shadow--thick"
          onClick={() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === currentCard.id ? { ...card, knownCount: 0 } : card,
              ),
            );
          }}
        >
          <img src="images/icon-reset.svg" alt="reset-icon" />
          Reset progress
        </button>
      </div>

      <hr className="solid" />

      <div className="study__card-navigation">
        <button
          type="button"
          className="btn btn__left-button"
          onClick={() => {
            previousCard();
          }}
        >
          <img src="images/icon-chevron-left.svg" alt="arrow-left" />
        </button>

        <p className="study__card-counter">
          Card {currentIdx + 1} of {visibleCards.length}
        </p>

        <button
          type="button"
          className="btn btn__right-button"
          onClick={() => {
            nextCard();
          }}
        >
          <img src="images/icon-chevron-right.svg" alt="arrow-right" />
        </button>
      </div>
    </section>
  );
}
