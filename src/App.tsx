// import { useState } from "react";
// // import "./App.css";
import { StatisticCard } from "./components/statistic-card";
import data from "../data.json";
import { useState } from "react";

function App() {
  const cards = data.flashcards;
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentCard = cards[currentIdx];
  const isMastered = currentCard.knownCount === 5;
  const [reveal, setReveal] = useState(false);

  return (
    <div className="app">
      <h1 className="u-visually-hidden">Study Flashcards</h1>
      <header className="header">
        <div className="header__content">
          <img
            src="images/logo-small.svg"
            alt="logo"
            className="header__logo"
          />
          <div className="tabs u-shadow">
            <button className="tab tab--active u-rounded-pill-narrow">
              Study Mode
            </button>
            <button type="button" className="tab u-rounded-pill-narrow">
              All Cards
            </button>
          </div>
        </div>
      </header>
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
                  type="checkbox"
                  id="hide-mastered"
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
                <p className="flashcard__question">{currentCard.question}</p>
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
                  className={`flashcard__progress-bar ${
                    isMastered ? "flashcard__progress-bar--mastered" : ""
                  }`}
                ></div>
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
              disabled={isMastered}
            >
              <img src="images/icon-circle-check.svg" alt="check-icon" />I know
              this
            </button>

            <button
              type="button"
              className="btn btn--reset u-rounded-pill u-shadow--thick"
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
              onClick={() => setCurrentIdx(currentIdx - 1)}
            >
              <img src="images/icon-chevron-left.svg" alt="arrow-left" />
            </button>
            <p className="study__card-counter">
              Card {currentIdx + 1} of {cards.length}
            </p>

            <button
              type="button"
              className="btn btn__right-button"
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              <img src="images/icon-chevron-right.svg" alt="arrow-right" />
            </button>
          </div>
        </section>

        <section className="statistics u-shadow">
          <h2 className="statistics__heading">Study Statistics</h2>
          <StatisticCard
            label="Total Cards"
            number={cards.length}
            icon="stats-total"
            variant="blue"
          />
          <StatisticCard
            label="Mastered"
            number={11}
            icon="stats-mastered"
            variant="teal"
          />
          <StatisticCard
            label="In Progress"
            number={21}
            icon="stats-in-progress"
            variant="red"
          />
          <StatisticCard
            label="Not Started"
            number={8}
            icon="stats-not-started"
            variant="pink"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
