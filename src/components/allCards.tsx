import { useState } from "react";
import type { Flashcard } from "../types/flashcard";
import type React from "react";
import type { FlashCardControlProps } from "./flashcardControls";
import { FlashcardControls } from "./flashcardControls";
import { ProgressBar } from "./progress-bar";
import { DropDown } from "./dropDown";


type cardsStateProps = {
  cardsState: {
    cards: Flashcard[];
    setCards: React.Dispatch<React.SetStateAction<Flashcard[]>>;
  };
  flashCardControlsProps: FlashCardControlProps;
  visibleCards: Flashcard[];
  
};

export function AllCards({
  cardsState: { setCards },
  visibleCards,
  flashCardControlsProps,
}: cardsStateProps) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(question, answer, category);

    const newCard: Flashcard = {
      id: crypto.randomUUID(),
      question,
      answer,
      category,
      knownCount: 0,
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setQuestion("");
    setAnswer("");
    // blank space for cateogry to add my questions without retyping
  }


  function handleOpenDropDown(cardId: string){
    console.log(cardId);
    setIsOpen(prev => !prev);
  }
  

  return (
    <>
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="form-group flex-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            name="question"
            type="text"
            placeholder="e.g., What is the capital of France?"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
          />
        </div>

        <div className="form-group flex-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            name="answer"
            placeholder="e.g., Paris"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          ></textarea>
        </div>

        <div className="form-group flex-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="e.g., Geography"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          />
        </div>

        <button
          className="btn-submit u-rounded-pill u-shadow--thick"
          type="submit"
        >
          <img src="images/icon-circle-plus.svg" alt="icon-plus" />
          Create Card
        </button>
      </form>

      <div className="flashcards-container">
        {/* Flashcard controls component here */}
        <div className="flashcard-controls">
          <FlashcardControls {...flashCardControlsProps} />
        </div>
        <main>
          <div className="flashcards-preview">

            {
              visibleCards.map((card) => {
                const isMastered = card.knownCount === 5;
                return (
                  <article className="flashcard-box u-shadow--thick" key={card.id}>
                    <h2 className="flashcard-box__heading">{card.question}</h2>
                    <hr className="solid" />
                    <div className="flashcard-box-inner ">
                      {isOpen ?  <DropDown/> : null}
                     
                      <span>Answer:</span>
                      <p className="flashcard-box__answer-text">{card.answer}</p>

                      <div className="flashcard-box__meta-data">
                        <p className="flashcard__tag u-shadow--thick">{card.category}</p>
                        <ProgressBar knownCount={card.knownCount} isMastered={isMastered} variant="minicard" />
                        <button className="btn-menu" aria-label="Card actions" onClick={()=> handleOpenDropDown(card.id)}><img src="images/icon-menu.svg" alt="edit card" /></button>
                      </div>
                    </div>
                  </article>
                );
              })
            }

          </div> 
        </main>
      </div>
    </>
  );
}
