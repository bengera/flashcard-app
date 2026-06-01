import type { Flashcard } from "../types/flashcard";

type FlashcardControlProps ={
    onShuffle: () => void;
    onDropDown: () => void;
    hideMasteredCards: boolean;
    setHideMasteredCards: React.Dispatch<React.SetStateAction<boolean>>;
    showCategories: boolean;
    uniqueCat: string[]
    cards: Flashcard[]
    filterCategories: (category: string, checked: boolean) => void;
    selectedCategories:string[]
}

export function FlashcardControls({
    onShuffle,
    onDropDown,
    hideMasteredCards,
    setHideMasteredCards,
    showCategories,
    uniqueCat,
    cards,
    filterCategories,
    selectedCategories
}: FlashcardControlProps){
    return (
        <>
         <div className="study__filters">
            
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
         <button
          type="button"
          className="btn btn--shuffle u-rounded-pill-narrow"
         onClick={onShuffle}
        >
          <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
          Shuffle
        </button>
         </div>
        </>
    )
}