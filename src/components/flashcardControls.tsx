import type { Flashcard } from "../types/flashcard";
import { useEffect, useRef } from "react";



export type FlashCardControlProps ={
    onShuffle: () => void;
    onDropDown: () => void;
    hideMasteredCards: boolean;
    setHideMasteredCards: React.Dispatch<React.SetStateAction<boolean>>;
    showCategories: boolean;
    setShowCategories: React.Dispatch<React.SetStateAction<boolean>>
    uniqueCat: string[]
    cards: Flashcard[]
    filterCategories: (category: string, checked: boolean) => void;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FlashcardControls({
    onShuffle,
    onDropDown,
    hideMasteredCards,
    setHideMasteredCards,
    showCategories,
    setShowCategories,
    uniqueCat,
    cards,
    filterCategories,
    selectedCategories,
    setSelectedCategories
    
}: FlashCardControlProps){

const catDropDown = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handlePageClick(e: MouseEvent){
    if (
      catDropDown.current && !catDropDown.current.contains(e.target as Node)
    ) {
      setShowCategories(false)
    }
    
  }

  document.addEventListener("mousedown", handlePageClick);

  return () => {
     document.removeEventListener("mousedown", handlePageClick);
  }
},[setShowCategories]);
  

    return (
      <>
         <div className="study__filters">
          <div ref={catDropDown}>
             <button
            type="button"
            className="btn btn--categories u-rounded-pill-narrow"
            onClick={onDropDown}
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
              <div className="category-item">
              <input className="category-dropdown__checkbox" type="checkbox" 
              checked={selectedCategories.length === 0} // check all box when array is empty
              onChange={() => {          
              setSelectedCategories([]);
              }}/>           
             
             
              <p className="category-item__description">All</p>
                    <p className="category-item__number">({cards.length})</p>
              </div>
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
                      checked={selectedCategories.length !== 0 && selectedCategories.includes(item)}
                    />
                    
                    <p className="category-item__description">{item}</p>
                    <p className="category-item__number">({count})</p>
                  </div>
                );
              })}
            </div>
          ) : null}
          </div>
        </div>
      
       
         <button
          type="button"
          className="btn btn--shuffle u-rounded-pill-narrow"
         onClick={onShuffle}
        >
          <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
          Shuffle
        </button>
        </>
       
    )
}