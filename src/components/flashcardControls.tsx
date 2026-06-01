type FlashcardControlProps ={
    onShuffle: () => void;
}

export function FlashcardControls({onShuffle}: FlashcardControlProps){
    return (
         <button
          type="button"
          className="btn btn--shuffle u-rounded-pill-narrow"
         onClick={onShuffle}
        >
          <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
          Shuffle
        </button>
    )
}