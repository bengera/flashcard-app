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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

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

  function handleOpenDropDown(cardId: string) {
    setOpenCardId((prevOpenCardId) =>
      prevOpenCardId === cardId ? null : cardId
    );
  }

  function handleOpenDeletetionModal() {
    setShowDeletionModal(!showDeletionModal);
  }

  function handleDeleteCard(cardId: string) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setShowDeletionModal(false);
    setShowToast(true);
    setToastMessage('Card deleted.');
  }

  function handleEditCard(cardId: string) {
    const cardToEdit = visibleCards.find((card) => card.id === cardId);
    setShowModal(!showModal);
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
    setShowToast(true);
    setToastMessage('Card updated successfully.');
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
              onClick={()=> setShowToast(false)}
            />
          </div>
        </div>
      ) : null}
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
        {showDeletionModal ? (
          <div className="modal modal__deletion">
            <h2>Delete this card?</h2>
            <p>This action can't be undone.</p>
            <button onClick={() => setShowDeletionModal(false)}>Cancel</button>
            <button onClick={() => handleDeleteCard(currentCardId)}>
              Delete Card
            </button>
          </div>
        ) : null}
        {showModal ? (
          <div className="modal">
            <button className="modal__close">
              <img
                src="images/icon-cross.svg"
                alt="modal close"
                onClick={() => setShowModal(false)}
              />
            </button>
            <h2>Edit your card</h2>
            <p>Question</p>
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
            <input
              className="modal__input"
              type="text"
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
            <button onClick={() => cardDraft && handleUpdateCard(cardDraft)}>
              Update Card
            </button>
          </div>
        ) : null}

        <div className="flashcard-controls">
          <FlashcardControls {...flashCardControlsProps} />
        </div>
        <main>
          <div className="flashcards-preview">
            {visibleCards.map((card) => {
              const isMastered = card.knownCount === 5;
              return (
                <article
                  className="flashcard-box u-shadow--thick"
                  key={card.id}
                >
                  <h2 className="flashcard-box__heading">{card.question}</h2>
                  <hr className="solid" />
                  <div className="flashcard-box-inner ">
                    {openCardId === card.id ? (
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
        </main>
      </div>
    </>
  );
}
