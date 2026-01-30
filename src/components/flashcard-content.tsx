import type { Flashcard } from "../types/flashcard"

type FlashcardContentProps = {
    reveal: boolean;
    setReveal: React.Dispatch<React.SetStateAction<boolean>>;
    currentCard: Flashcard | undefined;
}


export function FlashCardContent({reveal, setReveal, currentCard}: FlashcardContentProps)
{
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
                  <p className="flashcard__tag u-shadow--thick">
                    {currentCard.category}
                  </p>
        
                  <div className="flashcard__central-content">
                    <p className="flashcard__text">
                      {!reveal ? currentCard.question : currentCard.answer}
                    </p>
        
                    {reveal ? (
                      <button type="button" className="flashcard__button-reveal">
                        Answer:
                      </button>
                    ) : (
                      <button type="button" className="flashcard__button-reveal">
                        Click to reveal answer
                      </button>
                    )}
                  </div>
        
                  <div className="flashcard__progress-container">
                    <div
                      className="flashcard__progress-bar"
                      style={
                        { "--value": currentCard.knownCount } as React.CSSProperties
                      }
                    >
                      <div className="flashcard__progress-bar-fill"></div>
                    </div>
                    <p className="flashcard__progress-number">
                      {currentCard.knownCount}/5
                    </p>
                  </div>
                </div>
              </div>
    )
}