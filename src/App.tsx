import React, { useState } from "react";
import data from "../data.json";
import { StatisticsPanel } from "./components/statistics-panel";
import { Header } from "./components/header";
import type { Flashcard } from "./types/flashcard";

function App() {
  const [cards, setCards] = useState<Flashcard[]>(data.flashcards);
  const [hideMasteredCards, setHideMasteredCards] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [reveal, setReveal] = useState(false);

  const currentCard = cards[currentIdx];
  const isMastered = currentCard.knownCount === 5;
  const visibleCards = hideMasteredCards
    ? cards.filter((card) => card.knownCount !== 5)
    : cards;

  return (
    <div className="app">
      <h1 className="u-visually-hidden">Study Flashcards</h1>
      <Header />

      <main>
        <section className="study u-shadow">
          <div className="study__header">
            <div className="study__filters">
              <button
                type="button"
                className="btn btn--categories u-rounded-pill-narrow"
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
                  onChange={(e) => setHideMasteredCards(e.target.checked)} // is true or false
                />
                <label className="study__label" htmlFor="hide-mastered">
                  Hide Mastered
                </label>
              </div>
            </div>
            <button
              type="button"
              className="btn btn--shuffle u-rounded-pill-narrow"
            >
              <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
              Shuffle
            </button>
          </div>{" "}
          {/* flashcard__content end */}
          <hr className="solid"></hr>
          <div className="flashcard">
            <img
              className="flashcard__decoration flashcard__decoration--top-star"
              src={
                !reveal
                  ? "images/pattern-star-blue.svg"
                  : "images/pattern-star-pink.svg"
              }
              alt="blue star pattern"
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
                <p className="flashcard__progress-number">{`${currentCard.knownCount}/5`}</p>
              </div>
            </div>
          </div>
          <div className="study__action-buttons">
            <button
              type="button"
              className={`btn btn-knowit u-rounded-pill u-shadow--thick ${
                isMastered ? "btn-knowit--mastered" : ""
              }`}
              onClick={() => {
                setCards((prevCard) =>
                  prevCard.map((card) =>
                    card.id === currentCard.id
                      ? { ...card, knownCount: card.knownCount + 1 }
                      : card
                  )
                );
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
                setCards((prevCard) =>
                  prevCard.map((card) =>
                    card.id === currentCard.id
                      ? { ...card, knownCount: 0 }
                      : card
                  )
                );
              }}
            >
              <img src="images/icon-reset.svg" alt="reset-icon" />
              Reset progress
            </button>
          </div>
          <hr className="solid"></hr>
          <div className="study__card-navigation">
            <button
              type="button"
              className="btn btn__left-button"
              onClick={() =>
                setCurrentIdx((prev) =>
                  prev === 0 ? cards.length - 1 : prev - 1
                )
              }
            >
              <img src="images/icon-chevron-left.svg" alt="arrow-left" />
            </button>
            <p className="study__card-counter">
              Card {currentIdx + 1} of {cards.length}
            </p>

            <button
              type="button"
              className="btn btn__right-button"
              onClick={() =>
                setCurrentIdx((prev) =>
                  prev === cards.length - 1 ? 0 : prev + 1
                )
              }
            >
              <img src="images/icon-chevron-right.svg" alt="arrow-right" />
            </button>
          </div>
        </section>
        <StatisticsPanel cards={cards} />
      </main>
    </div>
  );
}

export default App;
