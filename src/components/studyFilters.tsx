import React from "react";
import type { Flashcard } from "../types/flashcard";

type StudyFiltersProps = {
  cards: Flashcard[];
  hideMasteredCards: boolean;
  setHideMasteredCards: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueCat: string[];
  setUniqueCat: React.Dispatch<React.SetStateAction<string[]>>;
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
};

export function StudyFilters({
  cards,
  hideMasteredCards,
  setHideMasteredCards,
  selectedCategories,
  setSelectedCategories,
  uniqueCat,
  setUniqueCat,
  showCategories,
  setShowCategories,
}: StudyFiltersProps) {

    
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function filterCategories(category: string, checked: boolean) {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter((item) => item !== category);
      }
    });
  }

      function dropDown() {
    setShowCategories(!showCategories);
    if (!showCategories) {
      const categories = cards.map((card) => card.category);
      const uniqueCategories = [...new Set(categories)];
      setUniqueCat(uniqueCategories.sort());
    }
  }
   

  return (
    <>
       <div className="study__filters">
          <button
            type="button"
            className="btn btn--categories u-rounded-pill-narrow"
            onClick={() => dropDown()}
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

          {/* RENDERING CATEGORIES */}
          {showCategories ? (
            <div className="study__categories-dropdown">
              {uniqueCat.map((item) => {
                const count = cards.filter(
                  (card) => card.category === item
                ).length;
                return (
                  <div className="category-item" key={item}>
                    <input
                      type="checkbox"
                      className="category-dropdown__checkbox"
                      onChange={(e) => filterCategories(item, e.target.checked)}
                      checked={selectedCategories.includes(item)}
                    />
                    <p className="category-item__description">{item}</p>
                    <p className="category-item__number">({count})</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="btn btn--shuffle u-rounded-pill-narrow"
          onClick={() => {
            setShuffledCards((prev) => shuffleArray(prev));
          }}
        >
          <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
          Shuffle
        </button>
        </>
  )
}