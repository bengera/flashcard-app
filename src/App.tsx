// import { useState } from "react";
// // import "./App.css";

function App() {
return (
<div className="master-container">
    <header className="header">
        <div className="header__content">
            <img src="images\logo-small.svg" alt="logo" className="header__logo" />
            <div className="header__tab shadow">
                <button className="button-tab active">Study Mode</button>
                <button className="button-tab">All Cards</button>
            </div>
        </div>
    </header>
    <main>
        <section className="flashcard-section shadow">
            <div className="flashcard__header">
                <div className="flashcard__header-left">
                    <button className="button-categories">All Categories</button>
                    <div className="flashcard__checkbox-content">
                        <input className="checkbox-basic" type="checkbox" id="hide-mastered" />
                        <label htmlFor="hide-mastered">Hide Mastered
                        </label>
                    </div>
                </div>
                <button className="button-shuffle">Shuffle</button>

            </div> {/* flashcard__content end */}
            <hr className="solid"></hr>
            <div className="flashcard__container">
                <div className="flashcard__content"></div>
            </div>


        </section>
    </main>
</div>
);
}

export default App;