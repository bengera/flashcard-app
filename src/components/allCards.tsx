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
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AllCards({
  cardsState: { setCards },
  visibleCards,
  flashCardControlsProps,
  showModal,
  setShowModal,
}: cardsStateProps) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [currentCardId, setCurrentCardId] = useState<string>("");
  const [cardDraft, setCardDraft] = useState<Flashcard | null>(null);
  const [showDeletionModal, setShowDeletionModal] = useState<boolean>(false);
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [numberOfCardsShown, setNumberOfCardsShown] = useState<number>(15);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (!question.trim() || !answer.trim() || !category.trim()) {
      setShowError(true)
      return;
    }
    setShowError(false);
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
    setAnswer(""); // blank space for cateogry to add my questions without retyping
    setShowToast(true);
     setToastMessage('Card created successfully.');
  }

  function handleOpenDropDown(cardId: string) {
   
    setOpenCardId((prevOpenCardId) =>
      prevOpenCardId === cardId ? null : cardId
    );
  }

  function handleOpenDeletetionModal(cardId: string) {
     setCurrentCardId(cardId);
     setShowModal(true);
    setShowDeletionModal(!showDeletionModal);
    
  }

  function handleDeleteCard(cardId: string) {
   
    console.log(`Current card ID is ${cardId}`)
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setShowDeletionModal(false);
    setShowModal(false);
    setShowToast(true);
    setToastMessage('Card deleted.');
  }

  function handleEditCard(cardId: string) {
    const cardToEdit = visibleCards.find((card) => card.id === cardId);
    setshowEditModal(true);
    setShowModal(true);
    setCurrentCardId(cardId);
    if (cardToEdit) {
      setCardDraft(cardToEdit);
    }
    
  }

  function handleUpdateCard(cardDraft: Flashcard) {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === cardDraft.id ? cardDraft : card))
    );
    setShowModal(false);
    setshowEditModal(false);
    setShowToast(true);
    setToastMessage('Card updated successfully.');
  }

  function handleShowCards(){
   
     if (numberOfCardsShown === 15 ) {
        setNumberOfCardsShown(visibleCards.length)
     } else {
      setNumberOfCardsShown(15);
     }
    
  }

  // const selectedCard = visibleCards.find(card =>  card.id === currentCardId);

  return (
    <>
      {showToast ? (
        <div className="toast u-shadow--thick">
          <div className="toast__inner-content">
            {toastMessage}
            <img
              className="toast__close"
              src="images/icon-cross.svg"
              alt="close notification"
              onClick={() => {setShowModal(false); setshowEditModal(false); setShowToast(false)}}
            />
          </div>
        </div>
      ) : null}
      <form className="card-form" onSubmit={handleSubmit}>
        <div className="form-group flex-group">
          <label htmlFor="question">Question</label>
          <input
            id="question"
            className={showError && !question.trim() ? "input-error u-shadow--thick-error" : ""}
            name="question"
            type="text"
            placeholder="e.g., What is the capital of France?"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
          />
          {showError && !question.trim() && (<p className="error-msg"> <img src="images/icon-error.svg" alt="error-icon" />Please enter a question</p>)}
         
        </div>

        <div className="form-group flex-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            className={showError && !answer.trim() ? "input-error u-shadow--thick-error" : ""}
            name="answer"
            placeholder="e.g., Paris"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          ></textarea>
          {showError && !answer.trim() && (<p className="error-msg"> <img src="images/icon-error.svg" alt="error-icon" />Please enter an answer</p>)}
        </div>

        <div className="form-group flex-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            className={showError && !category.trim() ? "input-error u-shadow--thick-error" : ""}
            name="category"
            type="text"
            placeholder="e.g., Geography"
            value={category}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setCategory(value.charAt(0).toUpperCase() + value.slice(1))}
            }
          />
         {showError && !category.trim() && (
           <p className="error-msg"> 
             <img src="images/icon-error.svg" alt="error-icon" />Please enter a category
           </p>
         )}
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
        {showDeletionModal ? (
        
          <div className="modal modal__deletion u-shadow--thick">
            <h2 className="modal__heading">Delete this card?</h2>
            <p>This action can't be undone.</p>
            <hr className="solid"></hr>
            <div className="modal__btn-container">
            <button onClick={() => {setShowDeletionModal(false); setShowModal(false); setOpenCardId('')}}>Cancel</button>
            <button onClick={() => handleDeleteCard(currentCardId)}>
              Delete Card
            </button>
            </div>
          </div>
          
        ) : null}
        {showEditModal ? (
          <div className="modal u-shadow--thick">
            <button className="modal__close">
              <img
                src="images/icon-cross.svg"
                alt="modal close"
                onClick={() => {setShowModal(false); setshowEditModal(false); setOpenCardId('')}}
              />
            </button>
            <h2 className="modal__heading">Edit your card</h2>
            <p className="modal__input-label">Question</p>
            <input
              className="modal__input"
              type="text"
              value={cardDraft?.question ?? ""}
              onChange={(e) =>
                setCardDraft((prev) =>
                  prev ? { ...prev, question: e.target.value } : prev
                )
              }
            />
            <p>Answer</p>
            <textarea
              className="modal__input"
              value={cardDraft?.answer ?? ""}
              onChange={(e) =>
                setCardDraft((prev) =>
                  prev ? { ...prev, answer: e.target.value } : prev
                )
              }
            />
            <p>Catergory</p>
            <input
              className="modal__input"
              type="text"
              value={cardDraft?.category ?? ""}
              onChange={(e) =>
                setCardDraft((prev) =>
                  prev ? { ...prev, category: e.target.value } : prev
                )
              }
            />
            <button className="btn-update u-rounded-pill u-shadow--thick" onClick={() => cardDraft && handleUpdateCard(cardDraft)}>
              Update Card
            </button>
          </div>
        ) : null}

        <div className="flashcard-controls">
          <FlashcardControls {...flashCardControlsProps} />
        </div>
      
          <div className="flashcards-preview">
            {visibleCards.slice(0,numberOfCardsShown).map((card) => {
              const isMastered = card.knownCount === 5;
              return (
                <article
                  className="flashcard-box u-shadow--thick"
                  key={card.id}
                >
                  <h2 className="flashcard-box__heading">{card.question}</h2>
                  <hr className="solid" />
                  <div className="flashcard-box-inner ">
                    {openCardId === card.id && !showModal ? (
                      <DropDown
                        cardId={card.id}
                        onDelete={handleOpenDeletetionModal}
                        onEdit={handleEditCard}
                      />
                    ) : null}

                    <span>Answer:</span>
                    <p className="flashcard-box__answer-text">{card.answer}</p>

                    <div className="flashcard-box__meta-data">
                      <p className="flashcard__tag u-shadow--thick">
                        {card.category}
                      </p>
                      <ProgressBar
                        knownCount={card.knownCount}
                        isMastered={isMastered}
                        variant="minicard"
                      />
                      <button
                        className="btn-menu"
                        aria-label="Card actions"
                        onClick={() => handleOpenDropDown(card.id)}
                      >
                        <img src="images/icon-menu.svg" alt="edit card" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <button style={{borderRadius: "999px"}} type="button" className="btn show-btn u-rounded-pill-narrow u-shadow " onClick={handleShowCards}>{numberOfCardsShown === 15 ? "Load More" : "Load Less"}</button>
       
      </div>
    </>
  );
}
