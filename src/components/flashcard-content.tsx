import type { Flashcard } from "../types/flashcard";
import { ProgressBar } from "./progress-bar";

type FlashcardContentProps = {
  reveal: boolean;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
  currentCard: Flashcard | undefined;
};


export function FlashCardContent({
  reveal,
  setReveal,
  currentCard,
}: FlashcardContentProps) {
  if (!currentCard) {
    return null;
  }

  const isMastered = currentCard.knownCount === 5;


  return (
    <div className="flashcard">
      <img
        className="flashcard__decoration flashcard__decoration--top-star"
        src={
          !reveal
            ? "images/pattern-star-blue.svg"
            : "images/pattern-star-pink.svg"
        }
        alt="star pattern"
        aria-hidden="true"
      />
      <img
        className="flashcard__decoration flashcard__decoration--bottom-star"
        src={"images/pattern-star-yellow.svg"}
        alt="star pattern"
        aria-hidden="true"
      />

      <div
        className={`flashcard__content u-shadow--thick ${
          reveal ? "flashcard__content--revealed" : ""
        }`}
        onClick={() => setReveal(!reveal)}
      >
        <p className="flashcard__tag u-shadow--thick">{currentCard.category}</p>

        <div className="flashcard__central-content">
          <p className="flashcard__text">
            {!reveal ? currentCard.question : currentCard.answer}
          </p>

          {reveal ? (
            <p className="flashcard__reveal-text">Answer:</p>
          ) : (
           <p className="flashcard__reveal-text">Click to reveal answer</p>
          )}
        </div>

                 
          <ProgressBar
          knownCount={currentCard.knownCount}
          isMastered={isMastered}
          />
        
      </div>
    </div>
  );
}
