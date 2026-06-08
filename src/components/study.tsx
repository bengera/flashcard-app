import React, {useEffect } from "react";
import { FlashCardContent } from "./flashcard-content";
import { EmptyPanel } from "./emptyPanel";
import type { Flashcard } from "../types/flashcard";
import { FlashcardControls, type FlashCardControlProps } from "./flashcardControls";


type StudyPanelProps = {
  cardsState: {
    cards: Flashcard[];
    setCards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
   
  };

   flashCardControlsProps: FlashCardControlProps;


  studyState: {
    setStudyMode: (mode: boolean) => void;
    reveal: boolean;
    setReveal: React.Dispatch<React.SetStateAction<boolean>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
  };

  controlState: {
    hideMasteredCards: boolean;
    setHideMasteredCards: React.Dispatch<React.SetStateAction<boolean>>;
    uniqueCat: string[];
    setUniqueCat: React.Dispatch<React.SetStateAction<string[]>>;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    showCategories: boolean;
    setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
    
  };

 
};

export function StudyPanel({
 cardsState,
 studyState,
 controlState,
 flashCardControlsProps,

}: StudyPanelProps) {
 const {cards, setCards} = cardsState;
   const {
    setStudyMode,
    reveal,
    setReveal,
    currentIdx,
    setCurrentIdx,
  } = studyState;

  const {
    hideMasteredCards,
    selectedCategories,
      
  } = controlState;

  const visibleCards = cards.filter((card) => {
    const categoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.includes(card.category);
    const masterFilter = hideMasteredCards ? card.knownCount !== 5 : true;
    return categoryFilter && masterFilter; // return if both true
  });

  const hasCards: boolean = visibleCards.length > 0;
  const currentCard = hasCards ? visibleCards[currentIdx] : undefined;
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





  useEffect(() => {
    if (currentIdx >= visibleCards.length) {
      setCurrentIdx(0);
    }
  }, [currentIdx, visibleCards.length, setCurrentIdx]);

  // TESTING DEV MODE EFFECTS
  useEffect(() => {
    console.log("categories updated:", selectedCategories);
  }, [selectedCategories]);

  // if (visibleCards.length === 0) return; // prevent error when no flashcards present
  return (
    <section className="study u-shadow">
      <div className="study__header">

       <FlashcardControls {...flashCardControlsProps} />
       
      </div>

      <hr className="solid" />

      {hasCards ? (
        <FlashCardContent
          reveal={reveal}
          setReveal={setReveal}
          currentCard={currentCard}
          
        />
      ) : (
        <EmptyPanel
        setStudyMode={setStudyMode}
        />
      )}
{/* Invisible from here when no cards -START */}
{hasCards ? (
  <>
 <div className="study__action-buttons">
        <button
          type="button"
          className={`btn btn-knowit u-rounded-pill u-shadow--thick ${
            isMastered ? "btn-knowit--mastered" : ""
          }`}
          onClick={() => {
            if (!currentCard) return;
            {
              setCards((prev) =>
                prev.map((card) =>
                  card.id === currentCard.id
                    ? { ...card, knownCount: Math.min(card.knownCount + 1, 5) }
                    : card
                )
              );
            }
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
            if (!currentCard) return;
            {
              setCards((prev) =>
                prev.map((card) =>
                  card.id === currentCard.id ? { ...card, knownCount: 0 } : card
                )
              );
            }
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

          <img className="study__arrow-btn" src="images/icon-chevron-left.svg" alt="arrow-left" />
                   <p className="study__card-button-text">Previous</p>

        </button>

        <p className="study__card-counter">
          Card {visibleCards.length === 0 ? 0 : currentIdx + 1} of{" "}
          {visibleCards.length}
        </p>

        <button
          type="button"
          className="btn btn__right-button"
          onClick={() => {
            nextCard();
          }}
        >
          <p className="study__card-button-text">Next</p>
          <img className="study__arrow-btn" src="images/icon-chevron-right.svg" alt="arrow-right" />
        </button>
      </div>
      </>
): null}
     
      {/* Invisible -END */}
    </section>
  );
}
