// import { useState } from "react";
// // import "./App.css";

function App() {
return (
<div className="app">
    <header className="header">
        <div className="header__content">
            <img src="images\logo-small.svg" alt="logo" className="header__logo" />
            <div className="header__tab shadow">
                <button className="button-tab active button-rounded narrow">Study Mode</button>
                <button className="button-tab button-rounded">All Cards</button>
            </div>
        </div>
    </header>
    <main>
        <section className="flashcard-section shadow">
            <div className="flashcard__header">
                <div className="flashcard__filters">
                    <button className="button-categories button-rounded">All Categories
                        <img src="images/icon-chevron-down.svg" alt="arrow-icon" />
                    </button>
                    <div className="flashcard__checkbox-content">
                        <input className="checkbox-basic" type="checkbox" id="hide-mastered" />
                        <label htmlFor="hide-mastered">Hide Mastered
                        </label>
                    </div>
                </div>
                <button className="button--shuffle narrow">
                    <img src="images/icon-shuffle.svg" alt="shuffle-icon" />
                    Shuffle
                </button>

            </div> {/* flashcard__content end */}
            <hr className="solid"></hr>
            <div className="flashcard__container">
                <img className="blue-star" src="images/pattern-star-blue.svg" alt="blue star pattern" aria-hidden='true' />
                <img className="yellow-star" src="images/pattern-star-yellow.svg" alt="yellow star pattern" aria-hidden='true' />

                <div className="flashcard__content shadow-thick">
                    <p className="flashcard__tag shadow-thick">Web Development</p>
                    <div className="flashcard__central-content">
                    <p className="flashcard__question">What does HTML stand for?</p>
                    <button className="flashcard__button-reveal">Click to reveal answer</button>
                    </div>
                    <div className="flashcard__progress-container">
                        <div className="flashcard__progress-bar"></div>
                        <p className="flashcard__progress-number">0/5</p>
                    </div>
                </div>
            </div>
            <div className="flashcard__action-buttons">
                <button className="button-knowit button-rounded shadow-thick">
                    <img src="images/icon-circle-check.svg" alt="check-icon" />
                    I know this</button>
                <button className="button-reset button-rounded shadow-thick">
                    <img src="images/icon-reset.svg" alt="reset-icon" />
                    Reset progress</button>
                </div>

                 <hr className="solid"></hr>
                <div className="flashcard__card-navigation">
                    <button className="left-button">
                        <img src="images/icon-chevron-left.svg" alt="arrow-left" />
                   </button>
                   <p className="flashcard__card-counter">Card 1 of 40</p>

                  <button className="right-button">
                        <img src="images/icon-chevron-right.svg" alt="arrow-right" />
                   </button>
                </div>

        </section>
    </main>
</div>
);
}

export default App;